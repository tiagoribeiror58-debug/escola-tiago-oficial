import { MateriaConfig } from '@/types';

export const MATERIAS: MateriaConfig[] = [
  { slug: 'matematica', nome: 'Matemática', emoji: '∑' },
  { slug: 'portugues', nome: 'Português', emoji: 'Aa' },
  { slug: 'historia', nome: 'História', emoji: '⏳' },
  { slug: 'geografia', nome: 'Geografia', emoji: '🌍' },
  { slug: 'fisica', nome: 'Física', emoji: 'λ' },
  { slug: 'quimica', nome: 'Química', emoji: '⚗' },
  { slug: 'biologia', nome: 'Biologia', emoji: '🧬' },
  { slug: 'filosofia', nome: 'Filosofia', emoji: '∞', contexto: 'Foque em pensamento crítico, argumentação lógica e as grandes perguntas. Conecte com situações do cotidiano.' },
  { slug: 'sociologia', nome: 'Sociologia', emoji: '👥' },
  { slug: 'ingles', nome: 'Inglês', emoji: 'EN', contexto: 'Conduza partes da aula em inglês. Corrija erros gentilmente. Aumente progressivamente a complexidade do inglês usado.' },
  { slug: 'literatura', nome: 'Literatura', emoji: '📖' },
  { slug: 'programacao', nome: 'Programação', emoji: '<>', contexto: 'Ensine com exemplos práticos de código. Peça para o aluno escrever código. Foque em lógica antes de sintaxe.' },
  { slug: 'design', nome: 'Design', emoji: '◑', contexto: 'Foque em princípios visuais: hierarquia, contraste, alinhamento, proximidade. Use exemplos reais de bom e mau design.' },
  { slug: 'redacao', nome: 'Redação', emoji: '✎' },
  { slug: 'biohacking', nome: 'Biohacking', emoji: '🧪', contexto: 'Foque em otimização de performance humana: sono, nutrição, suplementação, exercício, cold exposure, luz solar. Sempre cite evidências científicas.' },
  { slug: 'neurociencia', nome: 'Neurociência', emoji: '🧠', contexto: 'Ensine como o cérebro funciona: aprendizado, memória, neuroplasticidade, hábitos. Conecte com aplicações práticas do dia a dia.' },
  { slug: 'economia', nome: 'Economia', emoji: '📊', contexto: 'Foque em micro e macroeconomia, finanças pessoais, investimentos e como a economia afeta o cotidiano.' },
  { slug: 'psicologia', nome: 'Psicologia', emoji: '🪞', contexto: 'Aborde comportamento humano, vieses cognitivos, inteligência emocional e técnicas práticas de autoconhecimento.' },
  { slug: 'oratoria', nome: 'Oratória', emoji: '🎤', contexto: 'Pratique comunicação persuasiva, storytelling, linguagem corporal e técnicas para falar em público com confiança.' },
  { slug: 'espanhol', nome: 'Espanhol', emoji: 'ES', contexto: 'Conduza partes da aula em espanhol. Corrija erros gentilmente. Aumente progressivamente a complexidade.' },
  { slug: 'arte', nome: 'Arte', emoji: '🎨', contexto: 'Explore história da arte, movimentos artísticos, técnicas e análise crítica de obras.' },
  { slug: 'musica', nome: 'Música', emoji: '♪', contexto: 'Ensine teoria musical, harmonia, ritmo e apreciação musical de forma prática e envolvente.' },
  { slug: 'logica', nome: 'Lógica', emoji: '⊢', contexto: 'Foque em raciocínio lógico, proposições, silogismos, falácias e resolução de problemas.' },
  { slug: 'empreendedorismo', nome: 'Empreendedorismo', emoji: '🚀', contexto: 'Foque em modelos de negócios, validação de ideias, growth, marketing e casos reais de startups.' },
];

export function getMateriaBySlug(slug: string): MateriaConfig | undefined {
  return MATERIAS.find(m => m.slug === slug);
}

export function calcularDiasParada(dataUltimaSessao: string): number {
  const ultima = new Date(dataUltimaSessao);
  const hoje = new Date();
  const diff = Math.floor((hoje.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function urgencia(dias: number | null): 'nova' | 'ok' | 'atencao' | 'urgente' {
  if (dias === null) return 'nova';
  if (dias <= 3) return 'ok';
  if (dias <= 7) return 'atencao';
  return 'urgente';
}
