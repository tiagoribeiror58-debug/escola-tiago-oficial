# Sistema de Matérias (`materias.ts`)

**Arquivo:** `src/lib/materias.ts`

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
}
```

---

## Hierarquia de 3 Níveis

Para matérias complexas (ex: Música), usa-se estrutura de 3 camadas:

```
Nível 1: Categoria        → /categoria/musica
         isCategory: true, children: [...]

Nível 2: Sub-área         → /categoria/musica/violao  
         isCategory: true, parent: 'musica', children: [...]

Nível 3: Tópico de sessão → /sessao/violao-acordes
         parent: 'violao', contexto: '...', ementa: [...]
```

**Regra:** Matéria com mais de 3 sub-áreas → obrigatório usar hierarquia.

---

## Ementa Invisível

Matérias técnicas com progressão clara (ex: Violão) têm `ementa: string[]`:

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

## Como adicionar uma nova matéria

**Matéria simples** (sem sub-áreas):
```ts
{
  slug: 'filosofia',
  nome: 'Filosofia',
  emoji: '🦉',
  contexto: 'Ensine a partir de problemas concretos...',
}
```

**Matéria como categoria** (com hierarquia):
```ts
{
  slug: 'idiomas',
  nome: 'Idiomas',
  emoji: '🌍',
  isCategory: true,
  children: [
    {
      slug: 'ingles',
      nome: 'Inglês',
      emoji: '🇺🇸',
      isCategory: true,
      parent: 'idiomas',
      children: [
        { slug: 'ingles-gramatica', nome: 'Gramática', emoji: '🇺🇸', parent: 'ingles', contexto: '...', ementa: [...] },
      ]
    }
  ]
}
```
