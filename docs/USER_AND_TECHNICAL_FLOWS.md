# 🔄 Ybernator — Fluxos de Usuário e Técnicos

> Este documento descreve cada fluxo do sistema do ponto de vista do usuário (o que ele vê e faz) e do ponto de vista técnico (o que acontece por baixo dos panos).

---

## FLUXO 1 — Autenticação

### Perspectiva do Usuário
1. Acessa o app e é redirecionado para `/auth`.
2. Digita e-mail e senha.
3. Clica em "Entrar" (ou "Criar conta").
4. É redirecionado para o Dashboard `/`.

### Perspectiva Técnica
```
[Auth.tsx] formulário submit
    │
    ▼
supabase.auth.signInWithPassword({ email, password })
    │
    ├── Sucesso → Supabase retorna JWT + refresh token (salvo no localStorage)
    │             → navigate('/')
    │
    └── Erro → toast de erro exibido
```

**Guarda de rota:**
- `ProtectedRoute.tsx` verifica `supabase.auth.getSession()` antes de renderizar qualquer página protegida. Se a sessão expirou, redireciona para `/auth`.

---

## FLUXO 2 — Dashboard (Página Principal)

### Perspectiva do Usuário
1. Vê os cards de matérias ordenados por urgência de estudo.
2. Clica num card para abrir o modal de detalhes da matéria.
3. No modal, vê o roadmap de tópicos e seleciona um para estudar.
4. Clica em "Estudar: [tópico]" e é levado para a sessão de chat.

### Perspectiva Técnica
```
[Index.tsx] monta
    │
    ├── useQuery → supabase.from('sessoes').select() [filtra por user_id]
    ├── useQuery → supabase.from('ementa_concluida').select()
    ├── useQuery → supabase.from('topicos_emergentes').select()
    │
    ▼
MateriaCard.tsx renderiza com status calculado:
    • diasParada → urgência = 'nova' | 'ok' | 'atencao' | 'urgente'

Usuário clica no card → MateriaDetailModal.tsx abre
    │
    ├── Carrega sessões desta matéria (filtradas do cache)
    ├── Calcula progresso no roadmap (ementa_concluida vs flatEmenta)
    ├── Renderiza timeline vertical de tópicos
    │
    ▼
Usuário seleciona tópico → useEffect dispara
    │
    └── supabase.functions.invoke('topic-preview', { materiaName, topicName })
        → Retorna preview de texto + links YouTube + leitura
        → Renderiza no sticky footer do modal

Usuário clica "Estudar" → navigate('/sessao/[slug]?sub=[topico]')
```

**Cache:** React Query mantém as sessões em cache por 5 minutos. Ao criar ou encerrar uma sessão, chamamos `queryClient.invalidateQueries(['sessoes'])` para forçar o refresh.

---

## FLUXO 3 — Sessão de Chat (O Coração do App)

### Perspectiva do Usuário
1. Entra na página `/sessao/[materia]?sub=[topico]`.
2. A IA tutora inicia automaticamente com uma mensagem de abertura contextualizada.
3. Conversa com a IA, recebendo respostas em tempo real (streaming — aparece letra por letra).
4. Ao final da mensagem da IA, surgem chips de sugestão (ex: "Aprofundar em X", "Me dê um exemplo", "Criar um tópico sobre Y").
5. Pode ativar o áudio (TTS) para ouvir as respostas.
6. Ao encerrar, a sessão é salva e o próximo tópico é sugerido.

### Perspectiva Técnica

#### 3.1 — Inicialização da Sessão
```
[Sessao.tsx] monta com params: materia, ?sub, ?resume
    │
    ├── Se ?resume → busca mensagens anteriores via useSessionMessages(session_key)
    │               → restaura o chat do ponto parado
    │
    └── Se ?sub (novo) → Sessao.tsx abre o ChatWindow com subTopico definido
```

#### 3.2 — Geração de System Prompt
```
[lib/buildPrompt.ts] buildSystemPrompt({
    materia,        // configuração completa da matéria
    topico,         // tópico atual da sessão
    historico,      // sessões anteriores desta matéria
    ementaConcluida // tópicos já marcados como concluídos
})
    │
    └── Retorna string de sistema com:
        • Identidade da IA tutora
        • Regras pedagógicas (não spoilar tópicos futuros)
        • Contexto do progresso do aluno
        • Instrução de formato Markdown + chips dinâmicos
        • Instruções de detecção de fim de sessão
```

#### 3.3 — Envio de Mensagem e Streaming
```
Usuário digita e pressiona Enter → handleSend(text) em ChatWindow.tsx
    │
    ▼
fetch(CHAT_URL, {
    method: 'POST',
    headers: { Authorization: Bearer JWT, x-api-key: BUILDSHIP_SECRET },
    body: JSON.stringify({
        messages: [...histórico],
        systemPrompt,
        materiaSlug,
        sessionKey,
        userApiKey: localStorage.getItem('user_api_key') || null
    })
})
    │
    ▼
Response: ReadableStream (SSE — Server-Sent Events)
    │
    ├── Cada chunk de texto → atualiza o estado local da mensagem em tempo real
    ├── A mensagem "cresce" palavra por palavra na tela
    │
    ▼
Stream termina (done: true)
    │
    ├── Extrai chips dinâmicos da resposta (padrão: [chip1|chip2|chip3])
    ├── Detecta se a IA gerou tag [CRIAR_TOPICO: X] → insere em topicos_emergentes
    ├── Detecta [FIM_SESSAO] ou [PROXIMO_TOPICO: X] → aciona encerramento
    └── Salva mensagens no cache do React Query
```

#### 3.4 — Chip de Criação de Tópico (Fluxo Especial)
```
Chip "Crie um tópico sobre X" é clicado
    │
    ▼
onClick intercepta via regex: /cri(?:e|ar)\s+(?:um\s+)?t[oó]pico.../i
    │
    ├── NÃO chama handleSend (não vai para a IA)
    │
    ├── setLoadingChip(action) → chip fica inativo com spinner
    │
    ▼
supabase.from('topicos_emergentes').insert({
    materia_slug, titulo, descricao, session_key
})
    │
    ├── Sucesso → queryClient.invalidateQueries(['topicos-emergentes'])
    │             toast: "Tópico criado com sucesso! 🎉"
    │
    └── Erro → toast: "Falha ao criar o tópico."
    │
    └── finally → setLoadingChip(null)
```

#### 3.5 — TTS (Texto para Voz)
```
Usuário clica no ícone de áudio → handleTTS(textoMensagem)
    │
    ▼
fetch(TTS_URL, { body: { text, speed } })
    │
    ▼
Retorna: { audioContent: "base64_string..." }
    │
    ▼
new Audio('data:audio/mp3;base64,' + audioContent).play()
```

#### 3.6 — Encerramento de Sessão
```
IA detecta fim do conteúdo → gera tag [FIM_SESSAO] ou usuário clica "Encerrar"
    │
    ▼
[Sessao.tsx] doEncerrar()
    │
    ├── supabase.from('sessoes').upsert({
    │       materia, topico, session_key, duracao_min,
    │       decisao_proxima, proximo_topico
    │   })
    │
    ├── Invalida queries de sessões → Dashboard atualiza urgência
    │
    └── navigate('/') → volta para o Dashboard
```

---

## FLUXO 4 — Quiz (Prática Espaçada SM-2)

### Perspectiva do Usuário
1. Acessa `/quiz`.
2. Vê questões de múltipla escolha geradas pela IA para os tópicos estudados.
3. Responde e recebe feedback imediato.
4. O sistema agenda automaticamente a próxima revisão usando SM-2.

### Perspectiva Técnica
```
[Quiz.tsx] carrega questões agendadas para hoje
    │
    ▼
useQuery → supabase.from('quiz_results') WHERE proxima_revisao <= hoje
    │
    ├── Sem questões agendadas → supabase.functions.invoke('quiz', { topicos })
    │                           → IA gera novas questões
    │                           → Salva em quiz_questions
    │
    ▼
Usuário responde
    │
    ▼
SM-2 calcula: novo_intervalo = intervalo_anterior * fator_facilidade
    │
    └── supabase.from('quiz_results').upsert({ proxima_revisao: dataCalculada })
```

---

## FLUXO 5 — Notas Contextuais

### Perspectiva do Usuário
1. Durante o chat, seleciona um trecho de texto.
2. Um menu flutuante aparece com a opção "Salvar Nota".
3. A nota é salva com contexto da matéria e sessão.
4. Pode visualizar todas as notas em `/notas`.

### Perspectiva Técnica
```
[ChatWindow.tsx] onMouseUp listener
    │
    ├── Detecta seleção de texto (window.getSelection())
    ├── Calcula posição → renderiza FloatingSelectionMenu
    │
    ▼
Usuário clica "Salvar"
    │
    └── supabase.from('study_notes').insert({
            user_id, materia_slug, session_key,
            content: textoSelecionado,
            context: mensagemCompleta
        })
        → toast de confirmação
```

---

## FLUXO 6 — Chat Flutuante Global

### Perspectiva do Usuário
1. Em qualquer página, clica no botão flutuante de chat.
2. Um widget de chat compacto abre no canto da tela.
3. Pode iniciar uma conversa rápida sobre qualquer matéria sem sair da página atual.

### Perspectiva Técnica
```
[FloatingChatContext.tsx] fornece:
    • isOpen: boolean
    • openChat(materiaSlug?: string): void
    • closeChat(): void

[FloatingChatWidget.tsx] consome o contexto
    │
    └── Quando isOpen = true → renderiza ChatWindow em modo compacto (overlay)
```

---

## Resumo de Pré-Condições para Produção

| Fluxo | Critério de Aprovação |
|---|---|
| Autenticação | Login/logout funciona; sessão persiste ao recarregar |
| Dashboard | Cards ordenados por urgência; modal abre com tópico correto |
| Chat + Streaming | Texto aparece em tempo real; sem mensagens duplicadas |
| Chips | Chips dinâmicos aparecem; chip de tópico salva no banco sem chamar IA |
| TTS | Áudio toca imediatamente; botão de pausa funciona |
| Encerramento | Sessão salva com duracao_min e proximo_topico |
| Quiz | Questões geradas; SM-2 calcula data correta da próxima revisão |
| Notas | Seleção de texto detectada; nota salva e visível em /notas |
| Chat Flutuante | Abre/fecha sem quebrar a página atual |
