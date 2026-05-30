# 🧪 Ybernator — Guia de QA (Quality Assurance)

> **Para quem é este documento:** Time de QA responsável por auditar o sistema antes do lançamento em produção.
> **Princípio:** Todo teste deve ser reproduzível. Documente qualquer comportamento inesperado com screenshot + URL + passos para reproduzir.

---

## Ambiente de Teste

Antes de iniciar, configure o ambiente corretamente:

```
URL da aplicação: [URL do ambiente de staging]
Conta de teste 1: qa-tester-1@test.com / senha: [fornecida pelo dev]
Conta de teste 2: qa-tester-2@test.com / senha: [fornecida pelo dev]
```

> ⚠️ **NUNCA use contas reais de alunos para testes.** Use apenas as contas de teste acima.

---

## Módulo 1 — Autenticação

### TC-01: Login com credenciais válidas
- **Passos:** Acesse `/auth` → Digite e-mail e senha válidos → Clique em "Entrar"
- **Resultado esperado:** Redirecionamento para `/` em menos de 3 segundos
- **Resultado inesperado:** Qualquer mensagem de erro ou tela em branco

### TC-02: Login com credenciais inválidas
- **Passos:** Acesse `/auth` → Digite e-mail correto e senha errada → Clique em "Entrar"
- **Resultado esperado:** Mensagem de erro visível ("Credenciais inválidas")
- **Resultado inesperado:** Redirecionamento para `/` ou tela branca sem mensagem

### TC-03: Persistência de sessão
- **Passos:** Faça login → Feche o navegador → Reabra o mesmo URL
- **Resultado esperado:** Usuário continua logado (vai direto para `/`)
- **Resultado inesperado:** Redirecionamento para `/auth`

### TC-04: Logout
- **Passos:** Estando logado → Localize o botão de logout → Clique
- **Resultado esperado:** Redirecionamento para `/auth`, sessão encerrada
- **Resultado inesperado:** Continua na mesma página ou erro

### TC-05: Acesso direto a rota protegida sem login
- **Passos:** Sem estar logado → Acesse `/sessao/anatomia` diretamente na URL
- **Resultado esperado:** Redirecionamento para `/auth`
- **Resultado inesperado:** Página carrega (falha de segurança!)

---

## Módulo 2 — Dashboard

### TC-06: Cards de matéria com urgência correta
- **Passos:** Faça login com conta que tenha histórico de sessões → Observe os cards
- **Resultado esperado:** Cards ordenados por urgência. Matérias sem sessão aparecem como "nova". Matérias com > 7 dias aparecem como "urgente".
- **O que verificar:** A cor e o texto de urgência devem corresponder ao número de dias parado.

### TC-07: Modal de detalhes da matéria
- **Passos:** Clique em qualquer card de matéria
- **Resultado esperado:** Modal abre com: nome da matéria, roadmap de tópicos, tópico atual destacado, botão de CTA no rodapé
- **Resultado inesperado:** Modal vazio, erro no console, ou modal que não abre

### TC-08: Seleção de tópico no roadmap
- **Passos:** No modal → Clique em um tópico diferente do atual
- **Resultado esperado:** Tópico selecionado fica destacado, o botão do rodapé muda para "Estudar: [nome do tópico]", uma prévia (gerada por IA) aparece abaixo
- **Resultado inesperado:** Nenhuma mudança visual ou erro

### TC-09: Preview de tópico (cache)
- **Passos:** Selecione o tópico A → Selecione o tópico B → Volte para o tópico A
- **Resultado esperado:** A prévia do tópico A carrega instantaneamente (do cache), sem nova chamada de API
- **Como verificar:** Abra o DevTools (F12) → Aba Network → Confirme que não há nova chamada para `topic-preview` ao retornar ao tópico A

### TC-10: Botão de estudo
- **Passos:** Selecione um tópico e clique em "Estudar: [tópico]"
- **Resultado esperado:** Redirecionamento para `/sessao/[materia]?sub=[topico]`
- **Resultado inesperado:** Erro ou redirecionamento sem o parâmetro `?sub`

---

## Módulo 3 — Sessão de Chat (Crítico)

### TC-11: Abertura de nova sessão
- **Passos:** Acesse `/sessao/[materia]?sub=[qualquer-topico]`
- **Resultado esperado:** Após 1-3 segundos, a IA inicia automaticamente com uma mensagem de boas-vindas mencionando o tópico escolhido. Texto aparece "digitando" (streaming).
- **Resultado inesperado:** Tela em branco, erro 500, ou mensagem genérica sem contexto do tópico

### TC-12: Envio de mensagem pelo usuário
- **Passos:** Digite qualquer texto no campo de chat → Pressione Enter (ou clique no botão enviar)
- **Resultado esperado:** Mensagem do usuário aparece imediatamente na tela. A IA começa a responder em streaming.
- **Resultado inesperado:** Mensagem não aparece, input trava, ou a IA não responde

### TC-13: Streaming da resposta da IA
- **Passos:** Envie uma mensagem e observe a resposta
- **Resultado esperado:** Texto aparece progressivamente, letra por letra (efeito de digitação). O scroll acompanha automaticamente.
- **Resultado inesperado:** Texto aparece todo de uma vez (não é streaming) ou aparece com muito atraso

### TC-14: Chips de sugestão após resposta
- **Passos:** Aguarde a IA terminar de responder
- **Resultado esperado:** Abaixo da última mensagem da IA, surgem 2-4 botões com sugestões de ação rápida (chips).
- **Resultado inesperado:** Nenhum chip aparece, ou chips aparecem com texto corrompido (ex: `[chip1|chip2]`)

### TC-15: Chip normal (não-tópico)
- **Passos:** Clique em um chip que NÃO seja de criar tópico (ex: "Me dê um exemplo")
- **Resultado esperado:** O texto do chip é enviado como mensagem do usuário. A IA responde em streaming.
- **Resultado inesperado:** Nada acontece ou erro no console

### TC-16: Chip de criação de tópico — fluxo feliz
- **Passos:** Aguarde a IA sugerir um chip tipo "Crie um tópico sobre X" → Clique nele
- **Resultado esperado:**
  1. O chip fica inativo e aparece um spinner ao lado do texto
  2. Um toast no canto da tela diz "Criando tópico no roadmap..."
  3. O toast muda para "Tópico 'X' criado com sucesso! 🎉"
  4. O chip volta ao estado normal (ou desaparece)
  5. Nenhuma mensagem nova é enviada no chat
- **Resultado inesperado:** Chip não reage, toast não aparece, ou o tópico não é criado

### TC-17: Chip de criação de tópico — verificar no banco
- **Passos:** Após TC-16 → Volte ao Dashboard → Abra o modal da matéria correspondente
- **Resultado esperado:** O tópico criado aparece na seção "✦ Tópicos Emergentes" do modal
- **Resultado inesperado:** Tópico não aparece (falha de persistência ou de invalidação de cache)

### TC-18: Retomada de sessão anterior
- **Passos:** Encerre uma sessão pela metade → Volte para o Dashboard → Abra o modal da matéria → Clique em "Retomar: [tópico]"
- **Resultado esperado:** Chat abre com todo o histórico anterior restaurado
- **Resultado inesperado:** Chat abre vazio (novo) ou sem o histórico

### TC-19: Funcionalidade de TTS (Áudio)
- **Passos:** Com a IA respondendo → Clique no ícone de áudio/speaker ao lado de uma mensagem
- **Resultado esperado:** Áudio começa a tocar em português. O ícone muda para indicar que está tocando.
- **Resultado inesperado:** Nenhum áudio, erro 500, ou áudio em outro idioma

### TC-20: Encerramento de sessão
- **Passos:** Durante o chat → Clique no botão "Encerrar sessão"
- **Resultado esperado:** Modal ou confirmação aparece → Ao confirmar, sessão é salva no banco → Redirecionamento para Dashboard com o card da matéria atualizado
- **Resultado inesperado:** Sessão não salva, erro silencioso, ou loop de redirecionamento

---

## Módulo 4 — Quiz

### TC-21: Geração de questões
- **Passos:** Acesse `/quiz` com uma conta que tenha sessões encerradas
- **Resultado esperado:** Questões de múltipla escolha carregam em menos de 10 segundos
- **Resultado inesperado:** Tela de carregamento infinita ou tela vazia

### TC-22: Resposta correta
- **Passos:** Selecione a alternativa correta em uma questão
- **Resultado esperado:** Feedback visual verde. Progresso avança. Próxima questão carrega.
- **Resultado inesperado:** Nenhum feedback, erro, ou acesso direto a outra questão sem confirmar

### TC-23: Resposta incorreta
- **Passos:** Selecione uma alternativa errada
- **Resultado esperado:** Feedback visual vermelho. Resposta correta é revelada. Progresso avança.
- **Resultado inesperado:** Nenhum feedback ou a alternativa correta não é indicada

---

## Módulo 5 — Notas

### TC-24: Criação de nota
- **Passos:** Durante o chat, selecione um trecho de texto com o mouse
- **Resultado esperado:** Um menu flutuante aparece próximo à seleção com a opção "Salvar Nota"
- **Resultado inesperado:** Menu não aparece

### TC-25: Visualização de notas salvas
- **Passos:** Crie pelo menos uma nota → Acesse `/notas`
- **Resultado esperado:** A nota criada aparece na lista com o conteúdo selecionado
- **Resultado inesperado:** Página vazia ou nota não encontrada

---

## Módulo 6 — Chat Flutuante Global

### TC-26: Abertura do chat flutuante
- **Passos:** Estando em `/`, clique no botão flutuante de chat (geralmente no canto inferior direito)
- **Resultado esperado:** Widget de chat abre sobreposto à página sem redirecionar
- **Resultado inesperado:** Redirecionamento para `/sessao` ou widget não abre

### TC-27: Chat flutuante não quebra a página atual
- **Passos:** Abra o chat flutuante em `/biblioteca` → Interaja com o chat → Feche o widget
- **Resultado esperado:** A página de Biblioteca continua exatamente como estava
- **Resultado inesperado:** Qualquer parte da Biblioteca recarregou ou sumiu

---

## Módulo 7 — Responsividade e Compatibilidade

### TC-28: Layout mobile (375px)
- **Passos:** No DevTools → Toggle device toolbar → iPhone SE (375px) → Navegue por todas as páginas
- **Resultado esperado:** Todos os elementos são acessíveis. Nenhum botão cortado. Scroll funciona.
- **Resultado inesperado:** Overflow horizontal, botões inacessíveis, ou texto sobreposto

### TC-29: Layout desktop (1280px)
- **Passos:** Navegador em 1280px de largura → Navegue por todas as páginas
- **Resultado esperado:** Layout se adapta corretamente, sem espaços em branco excessivos
- **Resultado inesperado:** Conteúdo centralizado em coluna estreita ou elementos desalinhados

### TC-30: Cross-browser
- **Passos:** Repita os testes críticos (TC-11, TC-13, TC-16) nos navegadores: Chrome, Firefox, Safari
- **Resultado esperado:** Comportamento idêntico nos 3 navegadores
- **Resultado inesperado:** Streaming não funciona no Firefox, ou áudio não toca no Safari

---

## Módulo 8 — Segurança (Crítico)

### TC-31: RLS — Isolamento de dados entre usuários
- **Passos:** Faça login com conta A → Observe os dados (sessões, tópicos) → Faça logout → Faça login com conta B
- **Resultado esperado:** Conta B NÃO vê os dados da conta A
- **Resultado inesperado:** Dados de outro usuário são visíveis (falha crítica de segurança!)

### TC-32: Rotas protegidas sem autenticação
- **Passos:** Sem login, acesse diretamente: `/`, `/sessao/anatomia`, `/quiz`, `/notas`
- **Resultado esperado:** Todas redirecionam para `/auth`
- **Resultado inesperado:** Qualquer página carrega sem autenticação (falha de segurança!)

### TC-33: Chaves de API não expostas no frontend
- **Passos:** Acesse qualquer página → DevTools → Network → Inspecione os headers das requisições
- **Resultado esperado:** Nenhuma chave de API (Gemini, Anthropic, Tavily) visível nos requests do frontend
- **Resultado inesperado:** Qualquer chave secreta visível nas requests

---

## Checklist de Aprovação para Produção

O QA deve marcar cada item antes de liberar para produção:

### Funcionalidade Core
- [ ] TC-01 a TC-05: Autenticação ✅
- [ ] TC-06 a TC-10: Dashboard ✅
- [ ] TC-11 a TC-20: Sessão de Chat ✅
- [ ] TC-21 a TC-23: Quiz ✅
- [ ] TC-24 a TC-25: Notas ✅
- [ ] TC-26 a TC-27: Chat Flutuante ✅

### Qualidade
- [ ] TC-28 a TC-29: Responsividade ✅
- [ ] TC-30: Cross-browser ✅

### Segurança (BLOQUEANTE — não liberar sem todos aprovados)
- [ ] TC-31: Isolamento de dados ✅
- [ ] TC-32: Rotas protegidas ✅
- [ ] TC-33: Chaves não expostas ✅

### Performance
- [ ] Sessão de chat inicia em menos de 5 segundos
- [ ] Dashboard carrega em menos de 3 segundos
- [ ] Nenhum erro no console do navegador em fluxos normais

---

## Como Reportar Bugs

Ao encontrar um problema, registre no Linear com:

1. **Título:** `[QA] [Módulo] Descrição curta do problema`
2. **Passos para reproduzir:** Numerados, exatos
3. **Resultado obtido:** O que aconteceu
4. **Resultado esperado:** O que deveria acontecer
5. **Evidência:** Screenshot ou gravação de tela
6. **Ambiente:** Browser, versão, resolução, URL
7. **Severidade:** Crítico (bloqueia) / Alto (prejudica) / Médio (incomoda) / Baixo (cosmético)

---

## Glossário para o Time de QA

| Termo | Significado |
|---|---|
| Supabase | Banco de dados onde os dados do aluno são salvos |
| BuildShip | Nova "cozinha" visual que processa as respostas da IA |
| Edge Function | Código de servidor legado (ainda em uso, sendo substituído pelo BuildShip) |
| SSE / Streaming | Técnica que faz o texto aparecer "digitando" em tempo real |
| React Query | Sistema de cache do frontend. Se dados não atualizam, pode ser um problema de invalidação |
| RLS | Row Level Security — proteção no banco que impede um usuário de ver dados de outro |
| Chip | Botões de sugestão que aparecem abaixo das mensagens da IA |
| session_key | Identificador único de cada conversa, permite retomar o chat |
| JWT | Token de autenticação que prova que o usuário está logado |
| SM-2 | Algoritmo de repetição espaçada que calcula quando o aluno deve revisar cada tópico |
