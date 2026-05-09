# Sistema de Matérias (`materias.ts`)

**Arquivos:** `src/lib/materias.ts` e submódulos em `src/lib/materias/`

---

## Estrutura `MateriaConfig`

```ts
interface MateriaConfig {
  slug: string;          // identificador único (usado na URL e no DB)
  nome: string;          // nome legível
  emoji: string;         // ícone visual
  contexto?: string;     // instrução específica para a IA (injeta no system prompt)
  ementa?: string[];     // lista ordenada de micro-tópicos (Ementa Invisível)
  isCategory?: boolean;  // se true, navega para /categoria/:slug em vez de abrir modal
  children?: MateriaConfig[]; // sub-matérias (hierarquia)
  parent?: string;       // slug da categoria pai
  subTopicos?: { slug: string; nome: string }[]; // (legado — substituído por children)
  layout?: 'chat' | 'split' | 'narrative' | 'canvas'; // (novo) Modo de visualização híbrida
  widget?: string;       // (novo) Nome do componente visual associado (ex: 'FinanceLab')
}
```

---

## Hierarquia de 3 Níveis

Para matérias complexas, usa-se estrutura de 3 camadas:

```
Nível 1: Categoria        → /categoria/performance-intelecto
         isCategory: true, children: [...]

Nível 2: Sub-área         → /categoria/performance-intelecto/mente-cognicao  
         isCategory: true, parent: 'performance-intelecto', children: [...]

Nível 3: Tópico de sessão → /sessao/metacognicao
         parent: 'mente-cognicao', contexto: '...', ementa: [...]
```

**Regra:** Matéria com mais de 3 sub-áreas → obrigatório usar hierarquia.

---

## Ementa Invisível

Matérias técnicas com progressão clara têm `ementa: string[]`:

```ts
ementa: [
  '1. Postura da mão esquerda e polegar',
  '2. Acorde Mi Menor (Em): formação e som limpo',
  '3. Acorde Lá Menor (Am): formação e som limpo',
  '4. Transição fluida entre Em e Am',
  '5. Acorde Sol Maior (G)',
  '6. Transição fluida entre G, Em e Am',
]
```

O `buildPrompt.ts` injeta esta lista no system prompt com a instrução:
> "Você não pode pular passos. Identifique em qual passo o aluno parou e ensine EXATAMENTE O PRÓXIMO."

---

## Funções utilitárias

```ts
// Busca recursiva por slug em qualquer nível da hierarquia
getMateriaBySlug(slug: string): MateriaConfig | undefined

// Retorna todos os slugs-folha (nós sem filhos) de uma categoria
// Usado em useMateriasEstado para agregar sessões de toda a hierarquia
getAllLeafSlugs(config: MateriaConfig): string[]

// Calcula dias desde a última sessão
calcularDiasParada(data: string): number

// Retorna urgência: 'nova' | 'ok' | 'atencao' | 'urgente'
urgencia(dias: number | null): string
```

---

## Catálogo de Matérias (atualizado 2026-05)

### 1. Performance & Intelecto (`performance-intelecto`)
- **Mente & Cognição** (`mente-cognicao`)
  - Metacognição (`metacognicao`)
  - Psicologia (`psicologia`)
  - Lógica (`logica`)
  - Saúde Mental & Resiliência (`saude-mental`)
- **Corpo & Biologia** (`corpo-biologia`)
  - Biohacking (`biohacking`)
  - Neurociência (`neurociencia`)
  - Nutrição Otimizada (`nutricao-otimizada`)
  - Fisiologia & Treino (`fisiologia-esporte`)

### 2. Negócios & Tecnologia (`tecnologia-negocios`)
- **Business & Growth** (`business-growth`)
  - Fundação & Startups (`empreendedorismo`)
  - Finanças & Valuation (`financas-equity`)
  - Finanças Corporativas (`financas-corporativas`)
  - Direito Empresarial & Tributário (`direito-empresarial`)
  - Operações & Supply Chain (`operacoes-supply-chain`)
  - Investimento Anjo & Venture Capital (`private-equity-vc`)
  - Marketing & Distribuição (`marketing-distribuicao`)
  - Vendas & Negociação (`vendas-b2b-b2c`)
  - Liderança & Gestão (`lideranca-gestao`)
- **Tecnologia & Produtos** (`tecnologia-produtos`)
  - Engenharia de Software (`programacao`)
  - Inteligência Artificial (`inteligencia-artificial`)
  - Gestão de Produto Digital (PM) (`product-management`)
  - Cloud Computing & DevOps (`cloud-devops`)
  - Design de Produto (UX/UI) (`design`)
  - Data Science (`data-science`)
  - Web3 & Cripto (`web3-cripto`)

### 3. Comunicação & Influência (`comunicacao-influencia`)
- **Influência & Persuasão** (`influencia-persuasao`)
  - Sedução & Dinâmicas Sociais (`seducao`)
  - Negociação Estratégica (`negociacao`)
  - Retórica & Lógica (`retorica`)
  - Oratória & Apresentação (`oratoria`)
- **Idiomas & Escrita** (`idiomas-escrita`)
  - Copywriting & Redação (`redacao`)
  - Inglês (`ingles`)
  - Espanhol (`espanhol`)
  - Francês (`frances`)

### 4. Fundamentos Acadêmicos (`fundamentos-academicos`)
- **Ciências Exatas** (`ciencias-exatas`)
  - Matemática (`matematica`)
  - Física (`fisica`)
  - Estatística & Dados (`estatistica`)
  - Química (`quimica`)
- **Humanidades** (`humanidades`)
  - História (`historia`)
  - Filosofia (`filosofia`)
  - Geografia (`geografia`)
  - Economia (`economia`)
  - Literatura (`literatura`)
  - Sociologia (`sociologia`)
- **Artes & Expressão** (`artes-expressao`)
  - Violão Prático (`violao`)
  - Teclas & Harmonia (`piano`)
  - Teoria Musical Aplicada (`teoria-musical`)
  - História da Arte (`historia-arte`)

---

## Como adicionar uma nova matéria

As matérias estão modularizadas em arquivos dentro de `src/lib/materias/`.
Adicione ou modifique o arquivo relevante (`performance.ts`, `negocios.ts`, `comunicacao.ts` ou `fundamentos.ts`), e a mudança refletirá automaticamente, pois `src/lib/materias.ts` agrega as estruturas principais.

Exemplo de Matéria no nível 3 (Tópico de sessão):
```ts
{
  slug: 'filosofia',
  nome: 'Filosofia',
  emoji: '🦉',
  parent: 'humanidades',
  contexto: 'Ensine a partir de problemas concretos...',
}
```
