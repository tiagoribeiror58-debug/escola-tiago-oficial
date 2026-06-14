import { MateriaConfig } from '@/types';

export const neurocienciaProfissional: MateriaConfig = {
  slug: 'neurociencia-profissional',
  nome: 'Professional Neuroscience',
  emoji: '🧠',
  isCategory: true,
  descricao: 'Neuroscience is not a profession — it is a lens. Learn to see every sector of the world through the human brain.',
  children: [
    {
      slug: 'neurociencia-geral',
      nome: 'General Neuroscience and Foundations',
      emoji: '🧠',
      parent: 'neurociencia-profissional',
      whyStart: 'The foundation of everything. Before applying neuroscience to any specific area, you must master the gears of the neural machine.',
      descricao: 'Fundamental mechanisms of the brain: from the cell to large networks, the biology of how we think, feel, and act.',
      contexto: `Focus: understanding the fundamental biology of the nervous system without premature behavioral shortcuts.

Mandatory approach:
- Always define the physical structure before cognitive function.
- Avoid teleological explanations (e.g., "the brain does this to..."). Describe the mechanism of selective pressure and chemistry.
- Destroy neuromyths right off the bat, separating hard neuroscience from brain-based self-help.`,
      fases: [
        {
          nome: 'Phase 1: Cellular Bases (The Machine and the Parts)',
          topicos: [
            'História da Neurociência: De Cajal e Golgi à Optogenética',
            'O Neurônio Anatômico: Dendritos, Soma, Axônio, Bainha de Mielina',
            'Potencial de Ação: O Princípio Tudo ou Nada e os Canais Iônicos',
            'Células da Glia: O Sistema de Suporte Silencioso (Astrócitos, Oligodendrócitos, Micróglia)',
            'A Sinapse: Fenda Sináptica, Vesículas e Receptores',
            'Neurotransmissores Fundamentais: Glutamato (Acelera) e GABA (Freia)',
            'Moduladores Neurais: Dopamina, Serotonina, Noradrenalina, Acetilcolina',
            'Integração Neural: Somatório Espacial e Temporal nos Dendritos',
            'Plasticidade Sináptica de Curto Prazo (Facilitação e Depressão)',
            'O Eixo Eletroquímico: Como a Química Vira Eletricidade e Vice-Versa'
          ]
        },
        {
          nome: 'Phase 2: Macroscopic Neuroanatomy (The Brain Map)',
          topicos: [
            'O Córtex Cerebral: As 6 Camadas e a Hierarquia do Processamento',
            'Lobos Cerebrais Básicos: Frontal, Parietal, Temporal, Occipital',
            'O Sistema Límbico: Amígdala, Hipocampo e o Cérebro Emocional',
            'Gânglios da Base: O Acelerador e Freio do Movimento e Pensamento',
            'O Tronco Encefálico: Ponte, Bulbo, Mesencéfalo e Sobrevivência Básica',
            'O Cerebelo: Muito Além do Equilíbrio e Coordenação',
            'Tálamo: A Estação de Roteamento Sensorial',
            'Hipotálamo: O Controlador Hormonal e o Eixo HPA',
            'Sistema Nervoso Periférico: Somático vs Autônomo (Simpático e Parassimpático)',
            'O Sistema Ventricular e o Líquido Cefalorraquidiano (LCR)',
            'A Barreira Hematoencefálica: Como o Cérebro se Protege do Próprio Sangue'
          ]
        },
        {
          nome: 'Phase 3: Sensory Systems and Perception (How We Feel)',
          topicos: [
            'O Princípio da Transdução Sensorial: Como a Física vira Biologia',
            'Sistema Visual: Da Retina ao Córtex Occipital (V1, V2, V3...)',
            'Vias Visuais: A Via "O Que" (Ventral) e a Via "Onde" (Dorsal)',
            'Sistema Auditivo: Cóclea, Células Ciliadas e Córtex Auditivo',
            'Somatossensorial: O Homúnculo de Penfield e a Percepção do Toque',
            'A Dor (Nocicepção): Córtex Insular e Modulação Endógena da Dor',
            'Olfato e Paladar: Os Sentidos Químicos e o Caminho Direto para o Límbico',
            'Propriocepção e Interocepção: Como o Cérebro Sente a Si Mesmo',
            'Integração Multissensorial: Como o Cérebro Junta as Peças (Ex: Efeito McGurk)',
            'O Cérebro Preditivo: Como a Percepção é uma Alucinação Controlada (Predictive Coding)'
          ]
        },
        {
          nome: 'Phase 4: Neuroplasticity and Learning (How We Change)',
          topicos: [
            'Neuroplasticidade Hebbiana: O Princípio Fundamental',
            'LTP (Potenciação de Longo Prazo): A Base Molecular da Memória',
            'LTD (Depressão de Longo Prazo): O Esquecimento como Ferramenta Biológica',
            'Neurogênese Adulta: O Debate e as Evidências no Hipocampo',
            'Períodos Críticos e Janelas de Plasticidade no Desenvolvimento',
            'Mielinização e Velocidade de Processamento na Infância e Adolescência',
            'Epigenética Neural: Como a Experiência Muda a Expressão Gênica no Cérebro',
            'Reorganização Cortical Após Lesões (Neuroplasticidade Estrutural)',
            'O Papel do Sono na Plasticidade e Consolidação (Replay Hipocampal)',
            'Fatores Tróficos: BDNF e o "Adubo" do Cérebro'
          ]
        },
        {
          nome: 'Phase 5: Brain Rhythms and Consciousness (Brain Time)',
          topicos: [
            'Eletroencefalografia (EEG) Básica: Ondas Alpha, Beta, Theta, Delta e Gamma',
            'O Ciclo Circadiano: O Núcleo Supraquiasmático e a Melatonina',
            'A Arquitetura do Sono: Fases NREM (1, 2, 3/4) e o Sono REM',
            'Sonhos e Sono REM: Paralisia Muscular e Consolidação Emocional',
            'O Sistema Ativador Reticular Ascendente (SARA) e o Estado de Vigília',
            'A Rede de Modo Padrão (Default Mode Network - DMN): O Cérebro em Repouso',
            'Atenção e a Rede Frontoparietal: O Foco Top-Down vs Bottom-Up',
            'Os Correlatos Neurais da Consciência: O Problema Difícil (Hard Problem)',
            'Estados Alterados de Consciência: Meditação, Fluxo (Flow) e Psicodélicos'
          ]
        }
      ]
    },
    {
      slug: 'neuro-saude-clinica',
      nome: 'Neuroscience in Health and Clinic',
      emoji: '🏥',
      parent: 'neurociencia-profissional',
      whyStart: 'Start at the root. Health and clinic is where neuroscience was born. Understanding the diseased brain teaches you what the healthy brain is.',
      descricao: 'Neurology, neuropsychology, and clinical research — the brain as an object of care.',
      contexto: `Focus: neurobiological mechanisms of neurological diseases and conditions. Always explain the neural substrate before talking about diagnosis or therapy.

Mandatory approach:
- Differentiate neuroscientist from neurologist and neuropsychologist. These are distinct careers.
- For each disease, explain the molecular/cellular mechanism before the clinical picture.
- Demystify diagnoses based on actual pathophysiology.`,
      fases: [
        {
          nome: 'Career Foundations',
          topicos: [
            'O que é um Neurocientista Clínico (vs Neurologista vs Neuropsicólogo)',
            'A Grade de Formação em Neurociência: Do Bacharelado ao Pós-Doc',
            'Como Funciona uma Equipe Multidisciplinar em Neurologia Hospitalar',
            'O Sistema Nervoso Central e Periférico: Anatomia Funcional Essencial',
            'Neuroanatomia Clínica: Lobos, Sulcos, Giros e Suas Funções',
            'Células da Glia: Astrócitos, Oligodendrócitos, Microglia — O Sistema de Suporte Ignorado',
            'A Barreira Hematoencefálica: Proteção e Limitação Terapêutica',
            'Neurotransmissores Essenciais: Glutamato, GABA, Dopamina, Serotonina, Acetilcolina',
            'Sinalização Elétrica: Potencial de Ação e Transmissão Sináptica',
            'Plasticidade Sináptica: LTP, LTD e a Biologia da Memória'
          ]
        },
        {
          nome: 'Neurological Diseases: Foundations and Mechanisms',
          topicos: [
            'Fisiopatologia do Alzheimer: Hipótese Amiloide, Tau e Além',
            'Doença de Parkinson: Substância Negra, Lewy Bodies e Vias Dopaminérgicas',
            'Esclerose Lateral Amiotrófica (ELA): Morte de Neurônio Motor e Progressão',
            'Esclerose Múltipla: Autoimunidade, Desmielinização e Surtos',
            'Epilepsia: Hiperexcitabilidade Neural, Tipos de Crise e Mecanismos de Anticonvulsivantes',
            'AVC Isquêmico vs Hemorrágico: Penumbra, Reperfusão e Janela Terapêutica',
            'Huntington: Proteína Huntingtina Mutante e Morte Estriatal',
            'Ataxias Cerebelares: Coordenação, Equilíbrio e Degeneração',
            'Esclerose Múltipla: Imunologia e Terapias Modificadoras de Doença',
            'Tumores Cerebrais: Gliomas, Meningiomas e Classificação OMS'
          ]
        },
        {
          nome: 'Clinical Neuropsychology',
          topicos: [
            'TDAH: Circuito Pré-Frontal, Dopamina e Noradrenalina — Além do Estereótipo',
            'Transtorno do Espectro Autista: Conectividade Neural e Heterogeneidade',
            'Transtornos de Ansiedade: Amígdala, HPA e o Loop do Medo',
            'Depressão Maior: Neurobiologia Além da Serotonina (BDNF, Glutamato, Inflamação)',
            'Psicose e Esquizofrenia: Hipótese Dopaminérgica e Glutamatérgica',
            'Transtorno Bipolar: Desregulação do Humor e Circuitos Límbicos',
            'Transtorno Obsessivo-Compulsivo: Corticostriatal-Thalamocortical em Loop',
            'TEPT: Memória de Medo, Extinção Falha e Hipocampo',
            'Transtornos de Personalidade: Substratos Neurais e Neuroimagem',
            'Demências Frontotemporais: Personalidade, Linguagem e Comportamento Social'
          ]
        },
        {
          nome: 'Clinical Assessment and Tools',
          topicos: [
            'Neuroimagem Clínica: Como Ler um Laudo de RM e TC',
            'PET Scan em Neurologia: Metabolismo, Amiloide e Tau Marcados',
            'EEG Clínico: Ritmos Cerebrais, Epilepsia e Encefalopatias',
            'Polissonografia: Lendo o Cérebro Durante o Sono',
            'Avaliação Neuropsicológica: Testes Cognitivos e o Que Eles Medem',
            'Líquido Cefalorraquidiano: Análise e Biomarcadores'
          ]
        },
        {
          nome: 'Therapies and Interventions',
          topicos: [
            'Reabilitação Neurológica: Neuroplasticidade como Motor da Recuperação',
            'Neuromodulação: TMS, tDCS, DBS e RTMS na Clínica',
            'Terapia Cognitivo-Comportamental com Base Neurocientífica',
            'Psicofarmacologia Clínica: Quando Medicar, Quando Não',
            'Dor Crônica: Sensibilização Central e o Cérebro que Não Para de Gritar',
            'Sono e Neurologia: Narcolepsia, Apneia, REM Behavior Disorder',
            'Neurologia Pediátrica: Desenvolvimento Neural e Vulnerabilidades',
            'Bioética em Neurociência Clínica: Capacidade, Consentimento e Neuroenhancement',
            'Comunicação de Diagnósticos Neurológicos: A Dimensão Humana',
            'O Futuro da Neurologia: Genômica, iPSCs e Medicina de Precisão Neural'
          ]
        }
      ]
    },
    {
      slug: 'psicologia-saude-mental',
      nome: 'Psychology and Mental Health',
      emoji: '🪞',
      parent: 'neurociencia-profissional',
      whyStart: 'The mind is the software running on the neural hardware. Understanding biases, emotions, and how to shield the mind against stress is the basis of resilience.',
      descricao: 'Cognitive biases, emotional regulation, burnout prevention, and psychological antifragility.',
      contexto: `Focus: real psychological mechanisms — biases, emotional regulation, behavioral patterns, and clinical resilience.

Mandatory approach:
- Explain the mechanism of the bias or pattern before giving examples.
- For emotional regulation: explain the physiological and cognitive process before any practical strategy.`,
      fases: [
        {
          nome: 'Behavioral Psychology and Biases',
          topicos: [
            'A Estrutura da Psique (Consciente vs Inconsciente)',
            'Vieses Cognitivos Fundamentais (Confirmação, Ancoragem)',
            'Teoria do Apego e Relacionamentos',
            'Inteligência Emocional e Regulação de Afeto',
            'Terapia Cognitivo-Comportamental (Práticas)',
            'Arquétipos e o Inconsciente Coletivo',
            'Sistemas 1 e 2: O Cérebro Rápido e Lento (Kahneman)',
            'Heurísticas e Atalhos Mentais',
            'Motivação: Teoria da Autodeterminação (Deci & Ryan)',
            'Condicionamento Clássico e Operante (Pavlov e Skinner)',
            'Psicologia do Trauma e Respostas Defensivas',
            'Autoeficácia e Mindset de Crescimento (Dweck)',
            'Personalidade: Big Five e Tipos MBTI',
            'Influência Social: Conformismo e Obediência (Milgram)',
            'Psicologia Positiva e Bem-Estar (Seligman)',
            'Narcisismo, Maquiavelismo e Psicopatia (Dark Triad)',
            'Mecanismos de Defesa e Autoengano',
            'Flexibilidade Cognitiva: Desaprender e Reaprender na Era da IA',
            'Psicologia da Colaboração Humano-IA: Identidade e Valor Próprio',
            'Antifragilidade Emocional: Transformando Estresse em Crescimento',
            'Dopamine Detox: Restaurando o Circuito de Recompensa',
            'Psicologia da Procrastinação: Raízes e Soluções',
            'Flow States: Psicologia do Desempenho Ótimo',
            'Síndrome do Impostor: Mecanismo e Superação'
          ]
        },
        {
          nome: 'Mental Health and Resilience',
          topicos: [
            'A Biologia do Estresse (Cortisol e Amígdala)',
            'Burnout vs Cansaço (Diferenças Estruturais)',
            'Antifragilidade (Crescendo com a Pressão)',
            'Reestruturação Cognitiva (TCC Aplicada)',
            'Gestão de Ansiedade e Gatilhos',
            'Regulação do Sistema Nervoso Autônomo (Respiração)',
            'Mindfulness e a Prática da Atenção Plena',
            'Terapia de Aceitação e Compromisso (ACT)',
            'Higiene do Sono para Saúde Mental',
            'Isolamento Social e Saúde Psicológica',
            'Procrastinação: Raízes Emocionais e Soluções',
            'Perfeccionismo Adaptativo vs Desadaptativo',
            'Construindo uma Rotina de Recuperação (Recovery Stack)',
            'Journaling Terapêutico e Processamento de Experiências',
            'Encontrando Propósito: Ikigai e Sentido na Vida',
            'Resiliência em Ambientes de Mudança Exponencial',
            'Gestão de Tecnoestresse e Sobrecarga de Informação',
            'Estoicismo Digital: Equilíbrio em Mercados Voláteis',
            'Eco-Ansiedade e Incerteza Existencial na Era da IA',
            'Limites Saudáveis com Tecnologia e Redes Sociais',
            'Solitude Produtiva: O Poder de Estar Só',
            'Terapia Baseada em Evidências: Quando Procurar Ajuda'
          ]
        }
      ]
    },
    {
      slug: 'neuro-farmaceutica',
      nome: 'Neuroscience in Pharmaceuticals and Biotech',
      emoji: '💊',
      parent: 'neurociencia-profissional',
      whyStart: 'Before creating a medicine for the brain, you need to understand what that medicine will alter — and why that is so difficult.',
      descricao: 'Psychopharmacology, drug development, and translational research.',
      contexto: `Focus: mechanisms of action of psychotropic drugs and how a drug for the CNS is developed.

Mandatory approach:
- Always explain the receptor or pathway the drug acts on before talking about clinical effects.
- Be transparent about what is approved vs what is in research.
- Differentiate evidence from phases 1, 2, and 3.`,
      fases: [
        {
          nome: 'Fundamental Pharmacology',
          topicos: [
            'Farmacodinâmica: Como Drogas Interagem com Receptores Neurais',
            'Farmacocinética no SNC: Absorção, Distribuição, Metabolismo e Excreção',
            'A Barreira Hematoencefálica: O Maior Obstáculo da Neurofarmacologia',
            'Tipos de Receptores: Ionotrópicos, Metabotrópicos, Nucleares',
            'Agonistas, Antagonistas, Agonistas Parciais e Moduladores Alostéricos',
            'Janela Terapêutica: A Linha Tênue Entre Cura e Toxicidade Neural',
            'Tolerância, Dependência e Abstinência: A Biologia do Vício',
            'Polimorfismos Genéticos e Variabilidade de Resposta a Psicofármacos'
          ]
        },
        {
          nome: 'Psychopharmacology by Class',
          topicos: [
            'Antidepressivos ISRS: Mecanismo Real, Limitações e Por Que Demoram Semanas',
            'IRSN, Tricíclicos e MAOIs: Quando a Serotonina Não Basta',
            'Ketamina e Esketamina para Depressão: O Mecanismo Glutamatérgico (AMPA)',
            'Lítio: O Mecanismo de Estabilização de Humor que Ainda Não Entendemos Bem',
            'Antipsicóticos Típicos e Atípicos: Bloqueio D2 e Efeitos Extrapiramidais',
            'Benzodiazepínicos: GABA-A, Tolerância e a Epidemia de Dependência',
            'Psicoestimulantes (Metilfenidato, Anfetamina): Dopamina e Noradrenalina no TDAH',
            'Anticonvulsivantes: Mecanismos de Múltiplos Alvos (Canais, GABA, Glutamato)',
            'Acetilcolinesterásicos (Donepezila): O Que Fazem e o Que Não Fazem no Alzheimer',
            'Moduladores de Sono: Zolpidem, Suvorexant e a Biologia da Sedação'
          ]
        },
        {
          nome: 'Psychedelics and Emerging Therapies',
          topicos: [
            'Psilocibina para Depressão Resistente: Receptores 5-HT2A e Neuroplasticidade',
            'MDMA para TEPT: Janela Terapêutica e Mecanismo Oxitocinérgico',
            'LSD e Estado Alterado: O Que o Receptor Serotonérgico Faz ao Default Mode Network',
            'Canabidiol (CBD): Mecanismo Real vs Hype de Mercado',
            'Ibogaína para Dependência de Opioides: Risco Cardíaco e Mecanismo Neural'
          ]
        },
        {
          nome: 'Development and Clinical Pipeline',
          topicos: [
            'O Pipeline de Desenvolvimento de Drogas CNS: Descoberta ao Mercado',
            'Modelos Animais de Doenças Neurológicas: Validade e Limitações',
            'Biomarkers no Desenvolvimento de Drogas CNS: Como Medir o Que Não Se Vê',
            'Fase 1, 2 e 3: O Que Cada Fase Testa e Por Que Tantas Falham',
            'Por Que 90% das Drogas CNS Falham na Fase 2: O Problema da Translação',
            'Medicina de Precisão em Neurologia: Alvos Genômicos e iPSCs',
            'Terapia Gênica para Doenças Neurológicas: AAV e Entrega ao SNC',
            'Anticorpos Monoclonais em Neurologia: Anti-amiloide e Anti-tau',
            'Organoides Cerebrais: Modelando Doenças Neurológicas in Vitro',
            'CRISPR em Neurologia: Corrigindo Mutações Causadoras de Doenças'
          ]
        },
        {
          nome: 'Regulatory and Market',
          topicos: [
            'Regulação FDA e ANVISA para Medicamentos Neurológicos',
            'Orphan Drug Designation: Incentivos para Doenças Raras Neurológicas',
            'Trials Adaptativos: Inovação no Design de Estudos Clínicos',
            'Propriedade Intelectual em Neurofarmacologia: Patentes e Genéricos',
            'O Papel do Neurocientista em Empresas Farmacêuticas (Discovery, Medical Affairs, HEOR)',
            'Farmacovigilância: Monitorando Efeitos Adversos Pós-Aprovação',
            'GLP-1 e Neurologia: O Inesperado Impacto da Semaglutida no Cérebro',
            'Nootropics: O Que a Ciência Diz vs O Que o Mercado Promete',
            'Reposicionamento de Drogas: Usar o Que Já Existe para Novas Indicações Neurológicas',
            'O Futuro da Psicofarmacologia: IA no Design de Moléculas e Alvos'
          ]
        }
      ]
    },
    {
      slug: 'neuro-tecnologia',
      nome: 'Neuroscience in Technology and AI',
      emoji: '🤖',
      parent: 'neurociencia-profissional',
      whyStart: 'Artificial neural networks were inspired by the brain. But the real brain is much stranger and more fascinating than any network we have built.',
      descricao: 'Brain-computer interfaces, brain-inspired AI, and neurotechnology.',
      contexto: `Focus: the real intersection between neuroscience and intelligent systems engineering.

Mandatory approach:
- Always compare the real mechanisms of the brain with artificial architectures (where they are similar, where they diverge radically).
- Be skeptical about neurotechnology promises: differentiate what exists today from what is projection.`,
      fases: [
        {
          nome: 'Foundations of Brain-AI Comparison',
          topicos: [
            'O Neurônio Real: Spike, Integração Dendrítica e Limiar de Disparo',
            'Perceptrons e Neurônios Artificiais: Onde a Analogia Funciona e Onde Colapsa',
            'Redes Neurais Profundas vs Córtex Visual: Hierarquia e Representação',
            'Backpropagation e Aprendizado Biológico: Existe Algo Parecido no Cérebro?',
            'Plasticidade de Hebb vs Gradient Descent: Dois Mundos de Aprendizado',
            'Atenção em Transformers vs Atenção Neural Biológica: Uma Comparação Crítica',
            'Memória de Trabalho no Cérebro vs Contexto em LLMs',
            'O Problema de Crédito Temporal: Desafio Compartilhado entre Cérebro e IA',
            'Sparse Coding e Redes Neuronais Esparsas no Córtex',
            'Computação Neural Energeticamente Eficiente: O que a IA pode aprender do Cérebro'
          ]
        },
        {
          nome: 'Brain-Computer Interfaces (BCI)',
          topicos: [
            'História das BCIs: Do Primeiro EEG a Neuralink',
            'Tipos de BCI: Invasivas, Semi-invasivas e Não-invasivas',
            'EEG para BCI: Sinal, Ruído e Processamento de Artefatos',
            'ECoG (Eletrocorticografia): Alta Resolução com Menor Invasividade',
            'Utah Array: O Eletrodo de Referência em BCIs Invasivas',
            'Spiking Neural Networks e Decodificação Neural em Tempo Real',
            'Neuralink: Tecnologia Real, Resultados Publicados e Limitações Atuais',
            'BrainGate: Histórico de Resultados em Paralisia Motora',
            'Decodificação de Fala a partir de Sinais Corticais',
            'BCIs para Reabilitação: Membros Prostéticos e Estimulação Functional',
            'Feedback Sensorial em Próteses: Fechando o Loop Neural',
            'BCIs para Comunicação Aumentativa em ELA e Paralisia'
          ]
        },
        {
          nome: 'Artificial Intelligence and Cognition',
          topicos: [
            'Aprendizado por Reforço e Núcleo Accumbens: Dopamina como Sinal de Erro',
            'Arquiteturas de Memória em IA vs Hipocampo e Neocórtex',
            'Curiosidade, Exploração e a Neurociência da Novidade Aplicada à IA',
            'Generative Models e o Cérebro Preditivo (Predictive Coding)',
            'Incerteza e Modulação Bayesiana: Como o Cérebro Calcula Probabilidades',
            'Morte Catastrófica em Redes Artificiais vs Plasticidade Contínua Biológica',
            'Modelos de Linguagem e Processamento de Linguagem Natural no Cérebro'
          ]
        },
        {
          nome: 'Stimulation and Neurotechnology',
          topicos: [
            'tDCS: Como Corrente Elétrica Modula a Excitabilidade Cortical',
            'TMS: Estimulação Magnética e Mapeamento Cortical',
            'Estimulação Cerebral Profunda (DBS): Circuitos, Alvos e Algoritmos',
            'Optogenética: Controlando Neurônios com Luz (e Suas Implicações Futuras)',
            'Ultrassom Focado Transcraniano: Estimulação Sem Eletrodos',
            'Neurofeedback em Tempo Real: Algoritmos e Validação Científica',
            'Realidade Virtual e Neuroreabilitação: Ilusão como Terapia'
          ]
        },
        {
          nome: 'Ethics and the Future',
          topicos: [
            'Privacidade Neural: Seus Dados Cerebrais São Seus?',
            'Neurodireitos: Legislação Emergente para Proteger o Cérebro',
            'Enhancement Cognitivo via Tecnologia: O Debate Bioético',
            'Consciência e IA: O Que a Neurociência Diz Sobre Sentir',
            'O Problema Difícil da Consciência: Qualia e Experiência Subjetiva',
            'Singularidade Tecnológica pela Lente da Neurociência: Realista?',
            'O Papel do Neurocientista em Empresas de IA e Deeptech',
            'Neuromorphic Computing: Chips que Pensam Como o Cérebro (Intel Loihi, IBM TrueNorth)',
            'O Futuro das BCIs em 10 Anos: O Que é Provável vs o Que é Ficção'
          ]
        }
      ]
    },
    {
      slug: 'neuromarketing',
      nome: 'Neuromarketing and Consumer Behavior',
      emoji: '🎯',
      parent: 'neurociencia-profissional',
      whyStart: 'Every purchase decision is a brain decision. Neuromarketing is understanding the hardware that generates desire before the person even knows they have it.',
      descricao: 'The neuroscience of desire, attention, and decision-making applied to the market.',
      contexto: `Focus: neural mechanisms of attention, emotion, and decision applied to consumer behavior.

Mandatory approach:
- Present the neural mechanism before talking about the marketing technique.
- Be skeptical: much of commercial "neuromarketing" exaggerates findings from small studies. Say this openly.
- Differentiate what has robust replication from what is hype.`,
      fases: [
        {
          nome: 'The Neuroscience of Decision',
          topicos: [
            'A Decisão de Compra: O Inconsciente Decide Antes da Consciência Perceber',
            'Sistema 1 e Sistema 2 de Kahneman: Intuição vs Razão no Consumo',
            'O Marcador Somático de Damasio: Emoção como Sinal de Valor',
            'Córtex Orbitofrontal e a Codificação de Valor Subjetivo',
            'Nucleus Accumbens e a Antecipação do Prazer de Compra',
            'A Dor do Pagamento: Córtex Insular e Relutância em Gastar',
            'Desconto Hiperbólico: Por Que Preferimos o Agora ao Melhor Depois',
            'Aversão à Perda: Kahneman, Tversky e a Assimetria Neural',
            'Efeito de Dotação: Por Que Valorizamos o que Possuímos',
            'Priming Neural: Como o Ambiente Muda a Decisão Sem Avisar',
            'Ancoragem Cognitiva: O Primeiro Número Sequestra o Cérebro',
            'Efeito de Enquadramento: Mesma Informação, Decisão Diferente',
            'Efeito de Decoy: O Terceiro Item que Vende o Segundo',
            'Paradoxo da Escolha: Por Que Mais Opções Paralisam o Consumidor'
          ]
        },
        {
          nome: 'Attention and Perception',
          topicos: [
            'Atenção Visual: Hierarquia do Saliency e Pré-atenção',
            'Eye-Tracking: O Que o Olho Vê vs o Que a Pessoa Acha que Vê',
            'Memória de Reconhecimento vs Recordação em Publicidade',
            'Neuroestética: Por Que Certos Designs São Esteticamente Convincentes',
            'Processamento Subliminar: Existe? O Que a Neurociência Diz de Verdade',
            'A Janela de Atenção: Quanto Tempo o Cérebro Dá para um Anúncio',
            'Mudança de Saliência: Por Que Contraste e Novidade Capturam Recursos Neurais',
            'Codificação Dupla: Texto + Imagem Simultâneos e a Memória'
          ]
        },
        {
          nome: 'Emotion and Brand Building',
          topicos: [
            'Neurônios-Espelho e Empatia no Consumo: Storytelling Neural',
            'Emoções Básicas de Ekman e Reconhecimento Facial em Pesquisa',
            'Emoção como Atalho de Julgamento: O Heurístico do Afeto',
            'Memória Episódica e Branding: O que o Consumidor Realmente Lembra',
            'Lealdade de Marca e Identidade Social: O Self-Concept Neural',
            'Música e Resposta Emocional: Dopamina, Chills e Memória',
            'Cor e Percepção Neural: O que a Neurociência de Fato Confirma',
            'Cheiro e Memória: O Sistema Olfativo como Canal Publicitário Subestimado',
            'Toque e Propriocepção: Neurociência do Varejo Físico'
          ]
        },
        {
          nome: 'Tools and Methodology',
          topicos: [
            'EEG in Pesquisa de Marketing: O que Mede e Suas Limitações',
            'fMRI em Estudos de Consumo: Custo, Escala e Validade Ecológica',
            'GSR (Resposta Galvânica da Pele) e Excitação Emocional',
            'Codificação Facial (FACS) em Testes de Conceito',
            'Métricas Neurais vs Métricas Declarativas: O Gap entre Falar e Sentir',
            'Design Experimental para Pesquisa de Neuromarketing Válida',
            'Como Não Fazer Neuromarketing: Os Erros Mais Comuns',
            'Neuromitos no Marketing: O que os Estudos Nunca Disseram'
          ]
        },
        {
          nome: 'Practical Applications and Ethics',
          topicos: [
            'Neuromarketing Digital: Predição de Clique e UX Baseada em Cognição',
            'Gamificação e o Circuito Dopaminérgico: Recompensa, Variabilidade e Vício',
            'Personalização por Dados Comportamentais: Linha entre Relevância e Manipulação',
            'Persuasão Éica vs Manipulação: Onde Está o Limite Neural',
            'Neurociência do Preço: Como o Cérebro Processa e Compara Valores',
            'Neuromarketing em Saúde Pública: Antismoking, Vacinas e Comportamento',
            'O Futuro do Neuromarketing: IA, Wearables e Predição de Comportamento em Tempo Real'
          ]
        }
      ]
    },
    {
      slug: 'neuroeducacao',
      nome: 'Neuroeducation',
      emoji: '📚',
      parent: 'neurociencia-profissional',
      whyStart: 'If the brain is the learning machine, education is the interface. Neuroeducation is hacking this interface based on what we know about neuroplasticity.',
      descricao: 'Applied neuroscience to learning, memory, and development.',
      contexto: `Focus: neural mechanisms of learning and how to translate them into real educational practice.

Mandatory approach:
- Demystify educational neuromyths by explaining what the actual mechanism says.
- Explain the neural substrate before the pedagogical technique.
- Be honest about the gap between laboratory and classroom.`,
      fases: [
        {
          nome: 'What Neuroeducation Really Is',
          topicos: [
            'O Que Neuroeducação É (e o Que Definitivamente Não É)',
            'A Crise dos Neuromitos: Estilos de Aprendizagem, Cérebro Esquerdo/Direito, 10%',
            'O Gap Translacional: Por Que Conhecimento Neural Não Vira Prática Fácil',
            'Neurociência como Lente Crítica para Avaliar Metodologias Educacionais'
          ]
        },
        {
          nome: 'Learning Mechanisms',
          topicos: [
            'LTP (Potenciação de Longo Prazo): O Mecanismo Molecular de Aprender',
            'LTD (Depressão de Longo Prazo): O Esquecimento como Recurso Neural',
            'A Regra de Hebb: "Neurons That Fire Together Wire Together"',
            'Consolidação de Memória: Do Hipocampo para o Córtex Noturno',
            'Memória Declarativa vs Procedural: Hipocampo vs Estriado vs Cerebelo',
            'Memória de Trabalho: Capacidade, Limites e Implicações para o Ensino',
            'Atenção Executiva: Córtex Pré-Frontal, Dopamina e Foco Sustentado',
            'Processamento Profundo vs Superficial: A Neurociência da Compreensão Real',
            'O Efeito de Espaçamento (Spacing Effect): Por Que Maratonar Não Funciona',
            'O Efeito de Intercalação (Interleaving): Por Que Misturar Assuntos Funciona',
            'Recuperação Ativa como Ferramenta Neural: O Test Effect e a Memória',
            'A Técnica de Elaboração: Conectar Conceitos Novos aos Antigos no Córtex',
            'Aprendizado por Geração: Escrever com Suas Palavras Fortalece Engramas',
            'A Ilusão de Fluência: Por Que Reler Parece e Não é Aprender',
            'Descanso e Aprendizagem: O Papel da Rede de Modo Padrão na Consolidação'
          ]
        },
        {
          nome: 'Sleep and Learning',
          topicos: [
            'Sono e Consolidação de Memória: As Etapas Críticas de NREM e REM',
            'Sistema Glinfático: A Lavagem Cerebral que Ocorre Durante o Sono',
            'Privação de Sono e Cognição: O Impacto no Aprendizado Escolar',
            'Higiene do Sono para Estudantes: Mecanismo e Protocolo Baseado em Evidências'
          ]
        },
        {
          nome: 'Emotion, Motivation, and Stress',
          topicos: [
            'Emoção como Âncora de Memória: Por Que Lembramos do que Sentimos',
            'A Amígdala e o Aprendizado: Medo, Recompensa e Atenção',
            'Cortisol e Aprendizado: Estresse Agudo Pode Ajudar, Crônico Destrói',
            'Dopamina e Motivação Intrínseca: O Circuito que Ama Aprender por Aprender',
            'Autoeficácia e Neuroplasticidade: A Crença no Crescimento Ativa o Cérebro',
            'Mindset de Crescimento de Dweck: O Suporte Neurobiológico',
            'Feedback e o Cérebro: Como o Erro Ativa o Aprendizado quando Processado',
            'Recompensa vs Punição como Ferramentas Pedagógicas: O Que a Neurociência Diz'
          ]
        },
        {
          nome: 'Populations and Development',
          topicos: [
            'Plasticidade Cerebral na Infância: Períodos Sensíveis e Janelas de Oportunidade',
            'Adolescência e Córtex Pré-Frontal Imaturo: O Cérebro em Construção',
            'Envelhecimento Cognitivo: Como o Cérebro do Adulto Aprende Diferente',
            'TDAH em Contexto Educacional: Estratégias Baseadas no Mecanismo Neural',
            'Dislexia: Processamento Fonológico, Córtex Temporal e Intervenção',
            'Discalculia: O Processamento Numérico e o Córtex Parietal',
            'Superdotação: Alta Performance Cognitiva e suas Bases Neurais',
            'Leitura e o Cérebro: O Triângulo da Leitura (Fonologia, Ortografia, Semântica)'
          ]
        },
        {
          nome: 'Technology and the Future of Education',
          topicos: [
            'Gamificação e Dopamina: Por Que Pode Funcionar (e Como Pode Falhar)',
            'Realidade Virtual e Aprendizagem Imersiva: Mecanismo Neural',
            'Tutores de IA e Aprendizado Adaptativo: Neurociência do Feedback Personalizado',
            'Carga Cognitiva na Educação Digital: Design de Interface e Memória de Trabalho',
            'Neuroeducação em Escala: O Abismo entre Laboratório e Política Pública',
            'O Papel do Neurocientista em Startups de Edtech',
            'O Futuro: Neurofeedback Educacional e Personalização Neural'
          ]
        },
        {
          nome: 'Metacognition and Practical Systems',
          topicos: [
            'Leitura Inspecional e Leitura Analítica',
            'A Ilusão da Fluência (Por que reler não funciona)',
            'Sistemas de Anotação Inteligente (Zettelkasten)',
            'Gestão de Carga Cognitiva e Foco (Deep Work)',
            'Feynman Technique: Explicar para entender',
            'Modelos Mentais de Primeiro Princípio',
            'Repetição Espaçada (Spaced Repetition e Anki)',
            'Recuperação Ativa: Testes como Ferramenta de Estudo',
            'O Efeito Geração e a Elaboração Ativa',
            'Interleaving: Alternando Tópicos para Reter Mais',
            'Como Criar um Sistema de Notas Permanentes',
            'Chunking: Agrupando Informação para Memória de Longo Prazo',
            'Sleep Learning: O Papel do Sono na Consolidação',
            'Calibração de Conhecimento: Saber o Que Você Não Sabe',
            'Construindo um Segundo Cérebro (PKM System)',
            'Produtividade Profunda: Cal Newport na Prática',
            'Estratégias para Estudar Matérias Difíceis',
            'IA como Parceira de Estudo: Usando LLMs para Aprender Melhor',
            'Técnica Pomodoro vs Time Blocking: Quando Usar Cada',
            'Digital Detox: Recuperando Atenção na Era das Notificações',
            'Curva do Esquecimento de Ebbinghaus: A Matemática da Memória',
            'Mapas Mentais e Visual Thinking para Retenção'
          ]
        }
      ]
    },
    {
      slug: 'neurociencia-pesquisa-academica',
      nome: 'Academic Research in Neuroscience',
      emoji: '🔬',
      parent: 'neurociencia-profissional',
      whyStart: 'Academia is where knowledge is generated — not consumed. Understanding how brain science is done makes you a critical reader of what the world calls "studies show".',
      descricao: 'How neuroscience is produced: methodology, publication, and critical interpretation.',
      contexto: `Focus: epistemology of neuroscience — how we generate, validate, and publish knowledge about the brain.

Mandatory approach:
- Teach how to read a scientific paper, not to consume its headline.
- Present the replication crisis in neuroscience without drama, but without minimizing it.
- Explain what strong evidence means vs weak evidence.`,
      fases: [
        {
          nome: 'Research Foundations',
          topicos: [
            'Como Funciona a Pesquisa Científica em Neurociência: Do Lab ao Paper',
            'O Método Científico Aplicado à Neurociência: Hipótese, Experimento, Refutação',
            'Tipos de Estudos: Correlacional, Experimental, Longitudinal, Caso-Controle',
            'Níveis de Análise: Molecular, Celular, Circuito, System, Comportamento'
          ]
        },
        {
          nome: 'Research Tools',
          topicos: [
            'fMRI: Sinal BOLD, o Que Mede de Verdade e Suas Limitações Críticas',
            'fMRI em Estado de Repouso: Redes Funcionais e Conectividade',
            'EEG/MEG: Resolução Temporal Alta, Espacial Baixa — Trade-offs',
            'Eletrofisiologia de Célula Única: Patch-Clamp e Registro Unitário',
            'Optogenética: Manipulando Circuitos com Especificidade de Célula',
            'Quimiogenética (DREADDs): Controle Farmacológico de Circuitos Neurais',
            'Microscopia de Dois-Fótons: Vendo Neurônios em Ação in Vivo',
            'Clearing Cerebral (CLARITY, iDISCO): O Cérebro Transparente',
            'Sequenciamento de RNA em Célula Única (scRNA-seq) em Neurociência',
            'Sequenciamento Espacial: Onde Cada Gene é Expresso no Cérebro',
            'Modelos Animais: Ratos, Camundongos, Primatas — Validade e Limites',
            'Organoides Cerebrais: Potencial e Limitações de Modelos 3D',
            'iPSCs Derivadas de Pacientes: Modelando Doenças Humanas em Laboratório'
          ]
        },
        {
          nome: 'Statistics and Methodology',
          topicos: [
            'Poder Estatístico: Por Que Estudos com n Pequeno São Perigosos',
            'P-valor, Alpha e o Que Significância Estatística Não Significa',
            'Correção para Múltiplas Comparações: FDR, Bonferroni em Neuroimagem',
            'Tamanho de Efeito: Por Que é Mais Importante que o P-valor',
            'Intervalos de Confiança em Neurociência: Como Interpretar',
            'Meta-Análise e Revisão Sistemática: Agregando Evidências Corretamente',
            'Desequilíbrio de Publicação: Por Que Resultados Negativos Desaparecem'
          ]
        },
        {
          nome: 'The Replication Crisis',
          topicos: [
            'A Crise de Replicação em Psicologia e Neurociência: O Que Deu Errado',
            'P-Hacking: Torturar Dados até Confessarem',
            'HARKing (Hypothesizing After Results are Known): Fraude Não-Intencional',
            'Falso-Positivos em fMRI: O Estudo do Salmão Morto',
            'Flutuações do Crânio em Estudos de Resting-State: Um Bug Persistente',
            'Open Science: Pre-Registration como Solução',
            'Dados Abertos, Código Aberto e Reprodutibilidade em Neurociência'
          ]
        },
        {
          nome: 'Grand Projects and the Future',
          topicos: [
            'Human Connectome Project: Mapeando Todas as Conexões do Cérebro',
            'BRAIN Initiative (EUA) e European Human Brain Project: Escopo e Resultados',
            'Allen Brain Atlas: O Mapa Genético do Cérebro',
            'Neurociência Computacional: Modelos Matemáticos e Simulações',
            'IA Acelerando a Descoberta em Neurociência: AlphaFold e Além'
          ]
        },
        {
          nome: 'Career and Ethics in Academia',
          topicos: [
            'Carreira Acadêmica: Graduação, Mestrado, Doutorado, Pós-Doc — O Caminho Real',
            'Financiamento de Pesquisa: Editais, Grants e a Política do Dinheiro Científico',
            'Como Escrever um Paper de Neurociência para Ser Publicado',
            'Peer Review: O Sistema de Revisão por Pares e Suas Falhas',
            'Publicar ou Perecer: O Incentivo Perverso da Academia',
            'Comunicação Científica: Como Falar de Neurociência Sem Sensacionalismo',
            'Ética na Pesquisa com Humanos: Comitê de Ética, TCLE e Anonimização',
            'Ética na Pesquisa com Animais: Os Três Rs (Replace, Reduce, Refine)',
            'Diversidade em Neurociência: Por Que Amostras WEIRD Distorcem a Ciência',
            'O Futuro: Neurociência de Precisão, Big Data e Consortiums Globais'
          ]
        }
      ]
    },
    {
      slug: 'neuro-performance-esporte',
      nome: 'Neuroscience in Sport and Performance',
      emoji: '⚡',
      parent: 'neurociencia-profissional',
      whyStart: 'Performance is not just muscle — it is the nervous system that commands the muscle. The brain tires before the body. This is the real game. And with the machine optimized, biology works in your favor.',
      descricao: 'Central fatigue, focus, neurofeedback, nutrition, and the science of cognitive-physical performance.',
      contexto: `Focus: neurobiology of human performance — motor, cognitive, nutritional, and emotional.

Mandatory approach:
- Explain the difference between peripheral fatigue (muscular) and central fatigue (neural) before any protocol.
- Always connect the metabolic and neural mechanism to practical application in training, competition, and nutrition.`,
      fases: [
        {
          nome: 'Motor Control and Learning',
          topicos: [
            'O Sistema Motor: Córtex Motor Primário, Gânglios da Base e Cerebelo',
            'Controle Voluntário do Movimento: Da Intenção à Contração Muscular',
            'A Unidade Motora: Motor Neuron + Fibras Musculares e o Recrutamento Neural',
            'Aprendizado Motor: Memória Procedural, Automação e o Cerebelo',
            'Fases do Aprendizado Motor: Cognitivo, Associativo, Autônomo (Fitts e Posner)',
            'Variabilidade Motora: Por Que Treinar em Condições Variadas Funciona',
            'Prática Mental e Visualização: Córtex Motor Ativa Mesmo Sem Movimento',
            'Transferência de Aprendizado Motor: Quando Aprender A Ajuda a Aprender B',
            'Bloqueio Contextual vs Prática Aleatória: A Neurociência do Treino Variado',
            'Neuroplasticidade Motora em Atletas de Elite: O Cérebro do Expert'
          ]
        },
        {
          nome: 'Fatigue and Peak Performance',
          topicos: [
            'Fadiga Central vs Fadiga Periférica: O Que Realmente Limita o Esforço',
            'O Governador Central de Tim Noakes: O Cérebro como Árbitro da Performance',
            'Teoria Psicoreguladora: RPE (Esforço Percebido) como Regulador Neural',
            'Neuroquímica do Esforço Máximo: Dopamina, Serotonina e Fadiga de Decisão',
            'Amônia Cerebral e Fadiga durante Exercício Prolongado',
            'Hipoglicemia e Função Cognitiva durante o Exercício: O Limite do Combustível',
            'Calor e Performance Cognitiva: Hipotálamo, Temperatura e Tomada de Decisão',
            'Altitude e Hipóxia: Impacto no Desempenho Neural e Motor'
          ]
        },
        {
          nome: 'Cognition in Sports',
          topicos: [
            'Tomada de Decisão em Fração de Segundo: O Córtex Pré-Motor em Esportes de Reação',
            'Tempo de Reação: Neurologia, Treino e Variação Individual',
            'Atenção Seletiva em Esportes: Quiet Eye e Foco Neural no Alvo',
            'Antecipação de Movimento do Oponente: Leitura de Pistas e Neurônios-Espelho',
            'Tomada de Decisão sob Pressão: O Papel do Córtex Pré-Frontal e da Amígdala',
            'Memória de Trabalho em Esportes Coletivos: Manter o Mapa Cognitivo do Jogo',
            'Criatividade Tática: Insight Neural no Contexto Esportivo'
          ]
        },
        {
          nome: 'Emotion, Stress, and Performance',
          topicos: [
            'Ansiedade de Competição: Cortisol, Amígdala e Underperformance',
            'A Curva de Yerkes-Dodson: Performance Ótima vs Sobre-Ativação',
            'Zona de Performance Ótima: A Neurociência por Trás do "Entrar em Modo"',
            'Flow State: O Estado Neural do Desempenho Máximo Sem Esforço',
            'Choking Under Pressure: Quando a Consciência Sabota o Automático',
            'Regulação Emocional em Atletas: Estratégias Baseadas no Córtex Pré-Frontal',
            'Mindfulness em Esportes: Atenção Presente e Resposta Autônoma',
            'Psicologia Positiva e Neuroquímica da Confiança: Testosterona e Cortisol',
            'Rituais Pré-Performance: Redes Neurais de Preparação e Ativação'
          ]
        },
        {
          nome: 'Optimized Nutrition and Metabolism',
          topicos: [
            'O Mecanismo da Insulina e Glicemia',
            'Macronutrientes: Proteínas, Carboidratos e Gorduras',
            'Jejum Intermitente e Autofagia',
            'Microbioma Intestinal e Eixo Intestino-Cérebro',
            'Suplementação Baseada em Evidências',
            'Proteína: Quantidade Ótima e Timing',
            'Gorduras Saturadas vs Insaturadas: O Debate Correto',
            'Carboidratos e Performance: Quando São Aliados',
            'Micronutrientes Críticos: Zinco, Ferro, B12 e Folato',
            'Dieta Cetogênica: Mecanismo, Benefícios e Riscos',
            'Inflamação Crônica e Comida Anti-inflamatória',
            'Hidratação e Eletrólitos na Performance',
            'Leitura de Rótulos: O Que Realmente Importa',
            'Nutrição para Cognição: O Cérebro na Mesa',
            'Comer para Longevidade: Azul Blue Zones',
            'GLP-1 e Semaglutida: A Ciência por Trás da Revolução',
            'Nutrigenômica: Dieta Personalizada por DNA',
            'Ultra-Processados: O Impacto Neurológico da Comida Industrial',
            'Suplementação Estratégica: O Stack Baseado em Evidências'
          ]
        },
        {
          nome: 'Physiology, Training, and Hypertrophy',
          topicos: [
            'Vias de Sinalização (mTOR) e Hipertrofia',
            'Sistemas Energéticos (ATP-CP, Glicolítico, Oxidativo)',
            'Sobrecarga Progressiva (O Motor do Crescimento)',
            'VO2 Max e Saúde Mitocondrial',
            'Recuperação Muscular e Prevenção de Lesões',
            'Fibras Musculares: Tipo I vs Tipo II',
            'Periodização: Ondulação e Ciclos de Treino',
            'Frequência, Volume e Intensidade: O Triângulo do Treino',
            'Deload: A Importância do Descanso Programado',
            'Cardio para Longevidade vs Cardio para Performance',
            'Zona 2: O Treino Aeróbico que Todo Mundo Ignora',
            'Hormônios e Treino: Testosterona, GH e Cortisol',
            'Mobilidade e Flexibilidade para Longevidade',
            'Nutrição Peri-Treino: O Que Comer e Quando',
            'Monitoramento de Performance: RPE, HRV e Métricas',
            'Exercícios Isométricos e Excêntricos para Tendões',
            'Treinamento Funcional vs Bodybuilding: Trade-offs',
            'Longevidade Física: O Protocolo de Peter Attia',
            'Rucking and Zone 2: O Cardio mais Eficiente que Existe'
          ]
        },
        {
          nome: 'Recovery, Pathologies, and Defense',
          topicos: [
            'Sono e Consolidação de Memória Motora: O Que Acontece Durante a Noite',
            'Privação de Sono e Performance: O Impacto Catastrófico no Tempo de Reação',
            'HRV (Variabilidade da Frequência Cardíaca): Janela para o Sistema Nervoso Autônomo',
            'Nutrição para o Cérebro em Performance: Glucose, Creatina e Cafeína',
            'Cafeína e o Sistema Nervoso Central: Adenosina, Atenção e Performance',
            'tDCS e TMS em Performance Esportiva: O Que os Estudos Realmente Mostram',
            'Neurofeedback para Atletas: Evidências, Protocolos e Ceticismo',
            'EEG Portátil em Monitoramento de Atletas: Estado da Arte',
            'Realidade Virtual em Treino Cognitivo para Esportes',
            'Concussão e Traumatismo Crânioencefálico Leve: Mecanismo, Sintomas e Retorno',
            'CTE (Encefalopatia Traumática Crônica): O Custo Neural dos Esportes de Contato',
            'Síndrome do Overtraining: Quando o SNC Entra em Colapso',
            'Burnout no Atleta: O Esgotamento Neural do Alto Rendimento',
            'Neurociência Militar: Tomada de Decisão em Situações de Vida ou Morte',
            'SERE Training e Resiliência Neural: Como o Estresse Extremo é Processado',
            'Performance Cognitiva em Privação de Sono e Estresse Agudo',
            'Dor como Percepção Neural: Por Que Atletas Suportam Mais',
            'O Papel do Neurocientista em Centros de Alto Rendimento e Defesa'
          ]
        }
      ]
    },
    {
      slug: 'fisiologia-extrema',
      nome: 'Human Hardware Mechanics',
      emoji: '🔋',
      isCategory: false,
      parent: 'neurociencia-profissional',
      whyStart: 'Your brain runs on a biological server. If the server falters, your intellect doesn\'t matter.',
      descricao: 'Sleep optimization, circadian rhythms, and metabolic pathways (mTOR, AMPK).',
      contexto: 'Pure scientific focus (Huberman, Peter Attia). No pseudoscience. Explain the metabolic pathway before talking about what to do.',
      fases: [
        {
          nome: 'Phase 0: Fundamentos — O Hardware da Vida',
          topicos: [
            'Ritmo Circadiano e Luz Solar Matinal',
            'O Sistema Glinfático e a Lavagem Cerebral Noturna',
            'Arquitetura do Sono: Transição N1, N2, N3 e REM',
            'A Pressão Homeostática de Adenosina',
            'A Glândula Pineal e a Secreção de Melatonina Endógena',
            'Cronotipos Genéticos (Ursos, Lobos, Leões, Golfinhos)',
            'Jet Lag Social e a Desincronização Circadiana',
            'O Efeito da Luz Azul Suprimindo a Melatonina',
            'Sensibilidade à Insulina vs Resistência Periférica',
            'Equilíbrio Sódio-Potássio na Bomba Celular'
          ]
        },
        {
          nome: 'Phase 1: Bioquímica da Performance — Os Motores Celulares',
          topicos: [
            'O que é a Via mTOR e o Paradoxo do Crescimento Celular',
            'AMPK: O Interruptor de Energia e Sobrevivência',
            'Autofagia e Senescência Celular (Células Zumbi)',
            'Flexibilidade Metabólica: Queimando Glicose vs Cetona',
            'Biogênese Mitocondrial: Aumentando o Motor da Célula',
            'NAD+ e as Sirtuínas (O Gene da Longevidade)',
            'Telômeros e a Enzima Telomerase',
            'Biodisponibilidade vs Densidade Nutricional',
            'Fatores Antinutricionais (Fitatos, Oxalatos, Lectinas)',
            'Micro-despertares (Arousals) e Apneia Oculta'
          ]
        },
        {
          nome: 'Phase 2: Nutrição de Precisão — Combustível para o Sistema',
          topicos: [
            'Neurotransmissores e Nutrição (Dopamina Base)',
            'Ômega-3 (EPA/DHA) e a Fluidez da Membrana Neural',
            'O Eixo Intestino-Cérebro e o Nervo Vago',
            'O Microbioma e a Produção de Serotonina Intestinal',
            'O Papel do Magnésio (Treonato/Bisglicinato) e Apigenina',
            'Suplementos com Evidência: Creatina, Magnésio, Vitamina D',
            'Dieta Cetogênica e Produção de Beta-Hidroxibutirato',
            'Carb Cycling Estratégico para Picos de Glicogênio',
            'Janela Alimentar e Otimização Metabólica',
            'A Fisiologia do Jejum Intermitente Prolongado (48h+)'
          ]
        },
        {
          nome: 'Phase 3: Estresse Hormético — Estímulos que Fortalecem',
          topicos: [
            'Hormesis: A Dose Certa de Estresse Biológico',
            'Exposição Ativa ao Frio (Crioterapia) e Vasoconstrição',
            'Ativação do Tecido Adiposo Marrom (Gordura Marrom)',
            'Liberação de Noradrenalina Induzida pelo Frio',
            'Termogênese e Cold Exposure',
            'Terapia de Choque Térmico (Sauna) e Proteínas Heat Shock (HSP)',
            'Protocolos de Luz: Manhã, Tarde e Noite',
            'Terapia de Luz Vermelha (Fotobiomodulação) em ATP',
            'Aterramento (Earthing) e Transferência de Elétrons',
            'Técnicas de Respiração (Wim Hof, Box Breathing)'
          ]
        },
        {
          nome: 'Phase 4: Movimento e Longevidade — Treino como Medicina',
          topicos: [
            'A Matemática da Zona 2 de Cardio (Ácido Lático Baseline)',
            'Zonas de Treino Aeróbico para Longevidade',
            'VO2 Max como o Maior Preditor de Expectativa de Vida',
            'Exercícios Isométricos de Super-compensação',
            'Modulação de Cortisol ao Longo do Dia',
            'O Sistema Linfático e a Eliminação de Metabólitos',
            'Métricas de Polissonografia (HRV durante o Sono)'
          ]
        },
        {
          nome: 'Phase 5: Monitoramento e Biofeedback — Medindo para Otimizar',
          topicos: [
            'HRV (Heart Rate Variability) como Marcador de Recuperação',
            'CGM (Continuous Glucose Monitor): Monitorando Glicose em Tempo Real',
            'Monitoring Wearables: O Que Vale Medir',
            'Jejum Prolongado: Benefícios e Riscos Estruturais'
          ]
        },
        {
          nome: 'Phase 6: Fronteira da Longevidade — Protocolos Avançados',
          topicos: [
            'Engenharia da Longevidade: Protocolos de Reversão Biológica',
            'Nutrição Baseada em Biomarcadores em Tempo Real',
            'Biohacking de Terceira Geração: Senolíticos e Reprogramação Celular',
            'Longevidade: O Protocolo de Bryan Johnson',
            'Peptídeos e Hormesis: Fronteiras da Otimização',
            'Grounding (Earthing): Evidências e Limitações'
          ]
        }
      ]
    },
    {
      slug: 'neuroquimica-foco',
      nome: 'Neurochemistry Protocols',
      emoji: '⚡',
      isCategory: false,
      parent: 'neurociencia-profissional',
      whyStart: 'Motivation is a myth; what exists is dopamine balance. Master the chemistry and you master behavior.',
      descricao: 'Dopamine management, Flow state, and resistance to acute stress.',
      contexto: 'Focus on neurotransmitter engineering. Treatment of the body as an output machine.',
      ementa: [
        'O Erro de Previsão de Recompensa (Mecânica da Dopamina)',
        'Serotonina vs Dopamina: Saciedade vs Busca',
        'Reset de Receptores: "Jejum" de Dopamina',
        'O Sistema Nervoso Autônomo (Simpático vs Parassimpático)',
        'Controle de Estresse Agudo via Respiração (Physiological Sigh)',
        'Neuroplasticidade Dirigida: Como forçar o cérebro a aprender',
        'Cafeína e o Bloqueio da Adenosina (Uso Estratégico)',
        'L-Teanina, Creatina e Suplementação Cognitiva',
        'Microdosing e a Ciência Emergente dos Psicodélicos',
        'A Matemática do Flow: Equação de Desafio vs Habilidade',
        'Redução da Atividade do Córtex Pré-Frontal (Transient Hypofrontality)',
        'Gatilhos Ambientais para Indução Rápida'
      ]
    }
  ]
};
