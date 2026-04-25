# Diretrizes do Projeto: Escola Tiago Oficial

Este documento define as regras mandatórias de comportamento da IA e princípios de design da interface.

## 1. Protocolo Pedagógico (IA)

- **Explicação → Pergunta:** Todo novo conceito deve ser primeiro explicado de forma clara e, imediatamente após, seguido de uma pergunta direta e obrigatória. Não é opcional — toda resposta com conteúdo novo deve terminar com uma pergunta.
- **Adaptação Dinâmica (bidirecional):**
  - Se o aluno errar ou travar → simplificar, dar passo menor, trocar a abordagem.
  - Se o aluno acertar com facilidade → aumentar a complexidade e avançar o conteúdo. Ambas as direções devem estar no `buildSystemPrompt`.
- **Lógica Invisível:** O aluno nunca deve ter acesso às regras de progressão, níveis numéricos (`1/3`, `2/3`) ou termos técnicos do sistema. A IA não deve mencionar "nível", "pontuação" ou "proficiência" na conversa.
- **Tom:** Direto e honesto como um professor rigoroso. Sem bajulações vazias. Elogie apenas progresso real.

## 2. Princípios de Interface (Modal e Dashboard)

- **Esconder a "Cozinha":** Remova qualquer exibição de níveis numéricos (ex: `1/3`), contadores de erros brutos ou estatísticas técnicas visíveis ao aluno.
- **Foco no Usuário:** O modal da matéria deve mostrar apenas a descrição da matéria, o progresso narrativo (ex: `"Conhecimento sólido"`, `"Em construção"`) e o histórico de sessões anteriores.
- **Simplicidade Radical:** Elimine elementos visuais confusos. Mostre apenas o que é essencial para o aluno saber onde parou e para onde vai.
- **Labels narrativos no lugar de números:**
  - `nivel 1` → `"Iniciando"`
  - `nivel 2` → `"Avançando"`
  - `nivel 3` → `"Conhecimento sólido"`

## 3. Design System

- **Tema:** Dark mode como padrão. Suporte a light via classe no `<html>` se necessário.
- **Variáveis semânticas obrigatórias:** Usar apenas variáveis CSS do Shadcn/ui (`--foreground`, `--muted-foreground`, `--background`, `--muted`, `--border`, `--ring`). Nunca hardcodar cores como `text-gray-500` ou `#333`.
- **Componentes:** Priorizar componentes já existentes no Shadcn/ui antes de criar novos.
- **Consistência:** Nenhuma tela deve ter paleta, tipografia ou espaçamentos diferentes das outras. O Design System é uma lei, não uma sugestão.
- **Animações:** Micro-animações apenas quando têm valor funcional (feedback de ação, carregamento). Sem animações decorativas que atrasem a interação.

## 4. Arquitetura de Estado e Dados

- **React Query para tudo remoto:** Nenhum dado do Supabase deve viver em `useState`. Se veio do banco, use `useQuery`.
- **Invalidação proativa:** Após salvar sessão → invalidar `['sessoes']` e `['chat-sessions', slug]` imediatamente.
- **Sem dados sensíveis no localStorage:** Estado de sessão vive apenas em memória + banco. Nada de tokens ou dados do aluno em storage local.
- **Tipos centralizados:** Todas as interfaces ficam em `src/types/index.ts`. Proibido criar tipos duplicados em arquivos de componente.

## 5. Regras de Encerramento de Sessão

- Sessões com menos de 4 mensagens devem ser salvas com `observacoes: "Sessão curta"` e dados mínimos derivados da última sessão.
- Após encerrar com sucesso: deletar `chat_messages` da sessão (evitar acúmulo desnecessário no banco).
- Redirecionar para dashboard após 1.5s com toast de confirmação visível.
- O botão "Encerrar" deve estar sempre acessível durante a sessão — nunca escondido.

## 6. Protocolo de Atualização de Documentação (OBRIGATÓRIO)

Toda vez que o agente implementar uma feature, alterar arquitetura, modificar o schema do banco, mudar o comportamento da IA ou adicionar uma nova matéria/categoria, ele **DEVE** verificar e atualizar os documentos afetados antes de fazer o commit:

| O que mudou | Documento a atualizar |
|---|---|
| Nova rota ou página | `README.md` (tabela de rotas) + `docs/architecture.md` |
| Nova coluna ou tabela no DB | `docs/database.md` |
| Mudança na edge function `/chat` ou `/extract` | `docs/edge-functions.md` |
| Nova matéria, categoria ou ementa | `docs/materias.md` |
| Mudança no `buildPrompt.ts` ou tags da IA | `docs/ai-protocol.md` |
| Mudança em qualquer princípio de arquitetura | `docs/architecture.md` |
| Nova dependência ou variável de ambiente | `README.md` |

**Regra de ouro:** Se um dev novo ler a documentação depois da sua mudança e ficar confuso, a documentação está desatualizada — e isso é falha do agente, não do dev.

- Docs desatualizados são dívida técnica invisível. Não deixar acumular.
- Se a mudança for pequena (ex: renomear um botão), basta uma linha de atualização no doc relevante.
- Commits que alteram código sem atualizar documentação afetada são considerados **incompletos**.

