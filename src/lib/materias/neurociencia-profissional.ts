import { MateriaConfig } from '@/types';

export const neurocienciaProfissional: MateriaConfig = {
  slug: 'neurociencia-profissional',
  nome: 'Neurociência Profissional',
  emoji: '🧠',
  isCategory: true,
  descricao: 'A neurociência não é uma profissão — é uma lente. Aprenda a enxergar cada setor do mundo através do cérebro humano.',
  children: [
    {
      slug: 'neurociencia-geral',
      nome: 'Neurociência Geral e Fundamentos',
      emoji: '🧠',
      parent: 'neurociencia-profissional',
      whyStart: 'A fundação de tudo. Antes de aplicar a neurociência a qualquer área específica, você precisa dominar as engrenagens da máquina neural.',
      descricao: 'Mecanismos fundamentais do cérebro: da célula às grandes redes, a biologia de como pensamos, sentimos e agimos.',
      contexto: `Foco: compreender a biologia fundamental do sistema nervoso sem atalhos comportamentais prematuros.

Abordagem obrigatória:
- Sempre defina a estrutura física antes da função cognitiva.
- Evite explicações finalistas (ex: "o cérebro faz isso para..."). Descreva o mecanismo de pressão seletiva e química.
- Destrua neuromitos logo de cara, separando neurociência dura de autoajuda baseada no cérebro.`,
      fases: [
        {
          nome: 'Fase 1: Bases Celulares (A Máquina e as Peças)',
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
          nome: 'Fase 2: Neuroanatomia Macroscópica (O Mapa do Cérebro)',
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
          nome: 'Fase 3: Sistemas Sensoriais e Percepção (Como Sentimos)',
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
          nome: 'Fase 4: Neuroplasticidade e Aprendizado (Como Mudamos)',
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
          nome: 'Fase 5: Ritmos Cerebrais e Consciência (O Tempo do Cérebro)',
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
      ],
    },
    {
      slug: 'neuro-saude-clinica',
      nome: 'Neurociência na Saúde e Clínica',
      emoji: '🏥',
      parent: 'neurociencia-profissional',
      whyStart: 'Comece pela raiz. A saúde e a clínica é onde a neurociência nasceu. Entender o cérebro doente te ensina o que é o cérebro saudável.',
      descricao: 'Neurologia, neuropsicologia e pesquisa clínica — o cérebro como objeto de cuidado.',
      contexto: `Foco: mecanismos neurobiológicos de doenças e condições neurológicas. Explique sempre o substrato neural antes de falar em diagnóstico ou terapia.

Abordagem obrigatória:
- Diferencie neurocientista de neurologista e neuropsicólogo. São carreiras distintas.
- Para cada doença, explique o mecanismo molecular/celular antes do quadro clínico.
- Desmistifique diagnósticos com base na fisiopatologia real.`,
      fases: [
        {
          nome: 'Fundamentos da Carreira',
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
            'Plasticidade Sináptica: LTP, LTD e a Biologia da Memória',
          ]
        },
        {
          nome: 'Doenças Neurológicas: Fundamentos e Mecanismos',
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
            'Tumores Cerebrais: Gliomas, Meningiomas e Classificação OMS',
          ]
        },
        {
          nome: 'Neuropsicologia Clínica',
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
            'Demências Frontotemporais: Personalidade, Linguagem e Comportamento Social',
          ]
        },
        {
          nome: 'Avaliação e Ferramentas Clínicas',
          topicos: [
            'Neuroimagem Clínica: Como Ler um Laudo de RM e TC',
            'PET Scan em Neurologia: Metabolismo, Amiloide e Tau Marcados',
            'EEG Clínico: Ritmos Cerebrais, Epilepsia e Encefalopatias',
            'Polissonografia: Lendo o Cérebro Durante o Sono',
            'Avaliação Neuropsicológica: Testes Cognitivos e o Que Eles Medem',
            'Líquido Cefalorraquidiano: Análise e Biomarcadores',
          ]
        },
        {
          nome: 'Terapias e Intervenções',
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
            'O Futuro da Neurologia: Genômica, iPSCs e Medicina de Precisão Neural',
          ]
        }
      ],
    },
    {
      slug: 'neuro-farmaceutica',
      nome: 'Neurociência na Farmacêutica e Biotech',
      emoji: '💊',
      parent: 'neurociencia-profissional',
      whyStart: 'Antes de criar um remédio para o cérebro, você precisa entender o que esse remédio vai alterar — e por que isso é tão difícil.',
      descricao: 'Psicofarmacologia, desenvolvimento de drogas e pesquisa translacional.',
      contexto: `Foco: mecanismos de ação de psicofármacos e como se desenvolve um medicamento para o SNC.

Abordagem obrigatória:
- Explique sempre o receptor ou via que o fármaco atua antes de falar em efeito clínico.
- Seja transparente sobre o que é aprovado vs o que está em pesquisa.
- Diferencie evidência de fase 1, 2 e 3.`,
      fases: [
        {
          nome: 'Farmacologia Fundamental',
          topicos: [
            'Farmacodinâmica: Como Drogas Interagem com Receptores Neurais',
            'Farmacocinética no SNC: Absorção, Distribuição, Metabolismo e Excreção',
            'A Barreira Hematoencefálica: O Maior Obstáculo da Neurofarmacologia',
            'Tipos de Receptores: Ionotrópicos, Metabotrópicos, Nucleares',
            'Agonistas, Antagonistas, Agonistas Parciais e Moduladores Alostéricos',
            'Janela Terapêutica: A Linha Tênue Entre Cura e Toxicidade Neural',
            'Tolerância, Dependência e Abstinência: A Biologia do Vício',
            'Polimorfismos Genéticos e Variabilidade de Resposta a Psicofármacos',
          ]
        },
        {
          nome: 'Psicofarmacologia por Classe',
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
            'Moduladores de Sono: Zolpidem, Suvorexant e a Biologia da Sedação',
          ]
        },
        {
          nome: 'Psicodélicos e Terapias Emergentes',
          topicos: [
            'Psilocibina para Depressão Resistente: Receptores 5-HT2A e Neuroplasticidade',
            'MDMA para TEPT: Janela Terapêutica e Mecanismo Oxitocinérgico',
            'LSD e Estado Alterado: O Que o Receptor Serotonérgico Faz ao Default Mode Network',
            'Canabidiol (CBD): Mecanismo Real vs Hype de Mercado',
            'Ibogaína para Dependência de Opioides: Risco Cardíaco e Mecanismo Neural',
          ]
        },
        {
          nome: 'Desenvolvimento e Pipeline Clínico',
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
            'CRISPR em Neurologia: Corrigindo Mutações Causadoras de Doenças',
          ]
        },
        {
          nome: 'Regulatório e Mercado',
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
            'O Futuro da Psicofarmacologia: IA no Design de Moléculas e Alvos',
          ]
        }
      ],
    },
    {
      slug: 'neuro-tecnologia',
      nome: 'Neurociência na Tecnologia e IA',
      emoji: '🤖',
      parent: 'neurociencia-profissional',
      whyStart: 'Redes neurais artificiais foram inspiradas pelo cérebro. Mas o cérebro real é muito mais estranho e fascinante do que qualquer rede que construímos.',
      descricao: 'Brain-computer interfaces, IA inspirada no cérebro e neurotecnologia.',
      contexto: `Foco: a interseção real entre neurociência e engenharia de sistemas inteligentes.

Abordagem obrigatória:
- Compare sempre os mecanismos reais do cérebro com as arquiteturas artificiais (onde são similares, onde divergem radicalmente).
- Seja cético sobre promessas de neurotecnologia: diferencie o que existe hoje do que é projeção.`,
      fases: [
        {
          nome: 'Fundamentos da Comparação Cérebro-IA',
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
            'Computação Neural Energeticamente Eficiente: O que a IA pode aprender do Cérebro',
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
            'BCIs para Comunicação Aumentativa em ELA e Paralisia',
          ]
        },
        {
          nome: 'Inteligência Artificial e Cognição',
          topicos: [
            'Aprendizado por Reforço e Núcleo Accumbens: Dopamina como Sinal de Erro',
            'Arquiteturas de Memória em IA vs Hipocampo e Neocórtex',
            'Curiosidade, Exploração e a Neurociência da Novidade Aplicada à IA',
            'Generative Models e o Cérebro Preditivo (Predictive Coding)',
            'Incerteza e Modulação Bayesiana: Como o Cérebro Calcula Probabilidades',
            'Morte Catastrófica em Redes Artificiais vs Plasticidade Contínua Biológica',
            'Modelos de Linguagem e Processamento de Linguagem Natural no Cérebro',
          ]
        },
        {
          nome: 'Estimulação e Neurotecnologia',
          topicos: [
            'tDCS: Como Corrente Elétrica Modula a Excitabilidade Cortical',
            'TMS: Estimulação Magnética e Mapeamento Cortical',
            'Estimulação Cerebral Profunda (DBS): Circuitos, Alvos e Algoritmos',
            'Optogenética: Controlando Neurônios com Luz (e Suas Implicações Futuras)',
            'Ultrassom Focado Transcraniano: Estimulação Sem Eletrodos',
            'Neurofeedback em Tempo Real: Algoritmos e Validação Científica',
            'Realidade Virtual e Neuroreabilitação: Ilusão como Terapia',
          ]
        },
        {
          nome: 'Ética e o Futuro',
          topicos: [
            'Privacidade Neural: Seus Dados Cerebrais São Seus?',
            'Neurodireitos: Legislação Emergente para Proteger o Cérebro',
            'Enhancement Cognitivo via Tecnologia: O Debate Bioético',
            'Consciência e IA: O Que a Neurociência Diz Sobre Sentir',
            'O Problema Difícil da Consciência: Qualia e Experiência Subjetiva',
            'Singularidade Tecnológica pela Lente da Neurociência: Realista?',
            'O Papel do Neurocientista em Empresas de IA e Deeptech',
            'Neuromorphic Computing: Chips que Pensam Como o Cérebro (Intel Loihi, IBM TrueNorth)',
            'O Futuro das BCIs em 10 Anos: O Que é Provável vs o Que é Ficção',
          ]
        }
      ],
    },
    {
      slug: 'neuromarketing',
      nome: 'Neuromarketing e Comportamento do Consumidor',
      emoji: '🎯',
      parent: 'neurociencia-profissional',
      whyStart: 'Toda decisão de compra é uma decisão cerebral. Neuromarketing é entender o hardware que gera o desejo antes da pessoa saber que o tem.',
      descricao: 'A neurociência do desejo, da atenção e da tomada de decisão aplicada ao mercado.',
      contexto: `Foco: mecanismos neurais de atenção, emoção e decisão aplicados a comportamento de consumo.

Abordagem obrigatória:
- Apresente o mecanismo neural antes de falar na técnica de marketing.
- Seja cético: muito do "neuromarketing" comercial exagera conclusões de estudos pequenos. Diga isso abertamente.
- Diferencie o que tem replicação robusta do que é hype.`,
      fases: [
        {
          nome: 'A Neurociência da Decisão',
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
            'Paradoxo da Escolha: Por Que Mais Opções Paralisam o Consumidor',
          ]
        },
        {
          nome: 'Atenção e Percepção',
          topicos: [
            'Atenção Visual: Hierarquia do Saliency e Pré-atenção',
            'Eye-Tracking: O Que o Olho Vê vs o Que a Pessoa Acha que Vê',
            'Memória de Reconhecimento vs Recordação em Publicidade',
            'Neuroestética: Por Que Certos Designs São Esteticamente Convincentes',
            'Processamento Subliminar: Existe? O Que a Neurociência Diz de Verdade',
            'A Janela de Atenção: Quanto Tempo o Cérebro Dá para um Anúncio',
            'Mudança de Saliência: Por Que Contraste e Novidade Capturam Recursos Neurais',
            'Codificação Dupla: Texto + Imagem Simultâneos e a Memória',
          ]
        },
        {
          nome: 'Emoção e Construção de Marca',
          topicos: [
            'Neurônios-Espelho e Empatia no Consumo: Storytelling Neural',
            'Emoções Básicas de Ekman e Reconhecimento Facial em Pesquisa',
            'Emoção como Atalho de Julgamento: O Heurístico do Afeto',
            'Memória Episódica e Branding: O que o Consumidor Realmente Lembra',
            'Lealdade de Marca e Identidade Social: O Self-Concept Neural',
            'Música e Resposta Emocional: Dopamina, Chills e Memória',
            'Cor e Percepção Neural: O que a Neurociência de Fato Confirma',
            'Cheiro e Memória: O Sistema Olfativo como Canal Publicitário Subestimado',
            'Toque e Propriocepção: Neurociência do Varejo Físico',
          ]
        },
        {
          nome: 'Ferramentas e Metodologia',
          topicos: [
            'EEG em Pesquisa de Marketing: O que Mede e Suas Limitações',
            'fMRI em Estudos de Consumo: Custo, Escala e Validade Ecológica',
            'GSR (Resposta Galvânica da Pele) e Excitação Emocional',
            'Codificação Facial (FACS) em Testes de Conceito',
            'Métricas Neurais vs Métricas Declarativas: O Gap entre Falar e Sentir',
            'Design Experimental para Pesquisa de Neuromarketing Válida',
            'Como Não Fazer Neuromarketing: Os Erros Mais Comuns',
            'Neuromitos no Marketing: O que os Estudos Nunca Disseram',
          ]
        },
        {
          nome: 'Aplicações Práticas e Ética',
          topicos: [
            'Neuromarketing Digital: Predição de Clique e UX Baseada em Cognição',
            'Gamificação e o Circuito Dopaminérgico: Recompensa, Variabilidade e Vício',
            'Personalização por Dados Comportamentais: Linha entre Relevância e Manipulação',
            'Persuasão Ética vs Manipulação: Onde Está o Limite Neural',
            'Neurociência do Preço: Como o Cérebro Processa e Compara Valores',
            'Neuromarketing em Saúde Pública: Antismoking, Vacinas e Comportamento',
            'O Futuro do Neuromarketing: IA, Wearables e Predição de Comportamento em Tempo Real',
          ]
        }
      ],
    },
    {
      slug: 'neuroeducacao',
      nome: 'Neuroeducação',
      emoji: '📚',
      parent: 'neurociencia-profissional',
      whyStart: 'Se o cérebro é a máquina de aprender, a educação é a interface. Neuroeducação é hackear essa interface com base no que sabemos de neuroplasticidade.',
      descricao: 'Neurociência aplicada ao aprendizado, à memória e ao desenvolvimento.',
      contexto: `Foco: mecanismos neurais de aprendizagem e como traduzi-los para prática educacional real.

Abordagem obrigatória:
- Desmistifique neuromitos educacionais explicando o que o mecanismo real diz.
- Explique o substrato neural antes da técnica pedagógica.
- Seja honesto sobre o gap entre laboratório e sala de aula.`,
      fases: [
        {
          nome: 'O Que é Neuroeducação de Verdade',
          topicos: [
            'O Que Neuroeducação É (e o Que Definitivamente Não É)',
            'A Crise dos Neuromitos: Estilos de Aprendizagem, Cérebro Esquerdo/Direito, 10%',
            'O Gap Translacional: Por Que Conhecimento Neural Não Vira Prática Fácil',
            'Neurociência como Lente Crítica para Avaliar Metodologias Educacionais',
          ]
        },
        {
          nome: 'Mecanismos de Aprendizagem',
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
            'Descanso e Aprendizagem: O Papel da Rede de Modo Padrão na Consolidação',
          ]
        },
        {
          nome: 'Sono e Aprendizado',
          topicos: [
            'Sono e Consolidação de Memória: As Etapas Críticas de NREM e REM',
            'Sistema Glinfático: A Lavagem Cerebral que Ocorre Durante o Sono',
            'Privação de Sono e Cognição: O Impacto no Aprendizado Escolar',
            'Higiene do Sono para Estudantes: Mecanismo e Protocolo Baseado em Evidências',
          ]
        },
        {
          nome: 'Emoção, Motivação e Estresse',
          topicos: [
            'Emoção como Âncora de Memória: Por Que Lembramos do que Sentimos',
            'A Amígdala e o Aprendizado: Medo, Recompensa e Atenção',
            'Cortisol e Aprendizado: Estresse Agudo Pode Ajudar, Crônico Destrói',
            'Dopamina e Motivação Intrínseca: O Circuito que Ama Aprender por Aprender',
            'Autoeficácia e Neuroplasticidade: A Crença no Crescimento Ativa o Cérebro',
            'Mindset de Crescimento de Dweck: O Suporte Neurobiológico',
            'Feedback e o Cérebro: Como o Erro Ativa o Aprendizado quando Processado',
            'Recompensa vs Punição como Ferramentas Pedagógicas: O Que a Neurociência Diz',
          ]
        },
        {
          nome: 'Populações e Desenvolvimento',
          topicos: [
            'Plasticidade Cerebral na Infância: Períodos Sensíveis e Janelas de Oportunidade',
            'Adolescência e Córtex Pré-Frontal Imaturo: O Cérebro em Construção',
            'Envelhecimento Cognitivo: Como o Cérebro do Adulto Aprende Diferente',
            'TDAH em Contexto Educacional: Estratégias Baseadas no Mecanismo Neural',
            'Dislexia: Processamento Fonológico, Córtex Temporal e Intervenção',
            'Discalculia: O Processamento Numérico e o Córtex Parietal',
            'Superdotação: Alta Performance Cognitiva e suas Bases Neurais',
            'Leitura e o Cérebro: O Triângulo da Leitura (Fonologia, Ortografia, Semântica)',
          ]
        },
        {
          nome: 'Tecnologia e o Futuro da Educação',
          topicos: [
            'Gamificação e Dopamina: Por Que Pode Funcionar (e Como Pode Falhar)',
            'Realidade Virtual e Aprendizagem Imersiva: Mecanismo Neural',
            'Tutores de IA e Aprendizado Adaptativo: Neurociência do Feedback Personalizado',
            'Carga Cognitiva na Educação Digital: Design de Interface e Memória de Trabalho',
            'Neuroeducação em Escala: O Abismo entre Laboratório e Política Pública',
            'O Papel do Neurocientista em Startups de Edtech',
            'O Futuro: Neurofeedback Educacional e Personalização Neural',
          ]
        }
      ],
    },
    {
      slug: 'neurociencia-pesquisa-academica',
      nome: 'Pesquisa Acadêmica em Neurociência',
      emoji: '🔬',
      parent: 'neurociencia-profissional',
      whyStart: 'A academia é onde o conhecimento é gerado — não consumido. Entender como a ciência do cérebro é feita te torna um leitor crítico do que o mundo chama de "estudo mostra".',
      descricao: 'Como a neurociência é produzida: metodologia, publicação e interpretação crítica.',
      contexto: `Foco: epistemologia da neurociência — como geramos, validamos e publicamos conhecimento sobre o cérebro.

Abordagem obrigatória:
- Ensine a ler um paper científico, não a consumir a manchete dele.
- Apresente a crise de replicação na neurociência sem drama, mas sem minimizar.
- Explique o que uma evidência forte significa vs evidência fraca.`,
      fases: [
        {
          nome: 'Fundamentos da Pesquisa',
          topicos: [
            'Como Funciona a Pesquisa Científica em Neurociência: Do Lab ao Paper',
            'O Método Científico Aplicado à Neurociência: Hipótese, Experimento, Refutação',
            'Tipos de Estudos: Correlacional, Experimental, Longitudinal, Caso-Controle',
            'Níveis de Análise: Molecular, Celular, Circuito, Sistema, Comportamento',
          ]
        },
        {
          nome: 'Ferramentas de Pesquisa',
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
            'iPSCs Derivadas de Pacientes: Modelando Doenças Humanas em Laboratório',
          ]
        },
        {
          nome: 'Estatística e Metodologia',
          topicos: [
            'Poder Estatístico: Por Que Estudos com n Pequeno São Perigosos',
            'P-valor, Alpha e o Que Significância Estatística Não Significa',
            'Correção para Múltiplas Comparações: FDR, Bonferroni em Neuroimagem',
            'Tamanho de Efeito: Por Que é Mais Importante que o P-valor',
            'Intervalos de Confiança em Neurociência: Como Interpretar',
            'Meta-Análise e Revisão Sistemática: Agregando Evidências Corretamente',
            'Desequilíbrio de Publicação: Por Que Resultados Negativos Desaparecem',
          ]
        },
        {
          nome: 'A Crise de Replicação',
          topicos: [
            'A Crise de Replicação em Psicologia e Neurociência: O Que Deu Errado',
            'P-Hacking: Torturar Dados até Confessarem',
            'HARKing (Hypothesizing After Results are Known): Fraude Não-Intencional',
            'Falso-Positivos em fMRI: O Estudo do Salmão Morto',
            'Flutuações do Crânio em Estudos de Resting-State: Um Bug Persistente',
            'Open Science: Pre-Registration como Solução',
            'Dados Abertos, Código Aberto e Reprodutibilidade em Neurociência',
          ]
        },
        {
          nome: 'Grandes Projetos e o Futuro',
          topicos: [
            'Human Connectome Project: Mapeando Todas as Conexões do Cérebro',
            'BRAIN Initiative (EUA) e European Human Brain Project: Escopo e Resultados',
            'Allen Brain Atlas: O Mapa Genético do Cérebro',
            'Neurociência Computacional: Modelos Matemáticos e Simulações',
            'IA Acelerando a Descoberta em Neurociência: AlphaFold e Além',
          ]
        },
        {
          nome: 'Carreira e Ética na Academia',
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
            'O Futuro: Neurociência de Precisão, Big Data e Consortiums Globais',
          ]
        }
      ],
    },
    {
      slug: 'neuro-performance-esporte',
      nome: 'Neurociência no Esporte e Performance',
      emoji: '⚡',
      parent: 'neurociencia-profissional',
      whyStart: 'Performance não é só músculo — é o sistema nervoso que comanda o músculo. O cérebro cansa antes do corpo. Esse é o jogo real.',
      descricao: 'Fadiga central, foco, neurofeedback e a ciência da performance cognitivo-física.',
      contexto: `Foco: neurobiologia da performance humana — motor, cognitivo e emocional.

Abordagem obrigatória:
- Explique a diferença entre fadiga periférica (muscular) e fadiga central (neural) antes de qualquer protocolo.
- Seja crítico sobre técnicas sem evidência robusta.
- Conecte o mecanismo neural à aplicação prática no treino ou competição.`,
      fases: [
        {
          nome: 'Controle Motor e Aprendizado',
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
            'Neuroplasticidade Motora em Atletas de Elite: O Cérebro do Expert',
          ]
        },
        {
          nome: 'Fadiga e Performance Máxima',
          topicos: [
            'Fadiga Central vs Fadiga Periférica: O Que Realmente Limita o Esforço',
            'O Governador Central de Tim Noakes: O Cérebro como Árbitro da Performance',
            'Teoria Psicoreguladora: RPE (Esforço Percebido) como Regulador Neural',
            'Neuroquímica do Esforço Máximo: Dopamina, Serotonina e Fadiga de Decisão',
            'Amônia Cerebral e Fadiga durante Exercício Prolongado',
            'Hipoglicemia e Função Cognitiva durante o Exercício: O Limite do Combustível',
            'Calor e Performance Cognitiva: Hipotálamo, Temperatura e Tomada de Decisão',
            'Altitude e Hipóxia: Impacto no Desempenho Neural e Motor',
          ]
        },
        {
          nome: 'Cognição em Esportes',
          topicos: [
            'Tomada de Decisão em Fração de Segundo: O Córtex Pré-Motor em Esportes de Reação',
            'Tempo de Reação: Neurologia, Treino e Variação Individual',
            'Atenção Seletiva em Esportes: Quiet Eye e Foco Neural no Alvo',
            'Antecipação de Movimento do Oponente: Leitura de Pistas e Neurônios-Espelho',
            'Tomada de Decisão sob Pressão: O Papel do Córtex Pré-Frontal e da Amígdala',
            'Memória de Trabalho em Esportes Coletivos: Manter o Mapa Cognitivo do Jogo',
            'Criatividade Tática: Insight Neural no Contexto Esportivo',
          ]
        },
        {
          nome: 'Emoção, Estresse e Performance',
          topicos: [
            'Ansiedade de Competição: Cortisol, Amígdala e Underperformance',
            'A Curva de Yerkes-Dodson: Performance Ótima vs Sobre-Ativação',
            'Zona de Performance Ótima: A Neurociência por Trás do "Entrar em Modo"',
            'Flow State: O Estado Neural do Desempenho Máximo Sem Esforço',
            'Choking Under Pressure: Quando a Consciência Sabota o Automático',
            'Regulação Emocional em Atletas: Estratégias Baseadas no Córtex Pré-Frontal',
            'Mindfulness em Esportes: Atenção Presente e Resposta Autônoma',
            'Psicologia Positiva e Neuroquímica da Confiança: Testosterona e Cortisol',
            'Rituais Pré-Performance: Redes Neurais de Preparação e Ativação',
          ]
        },
        {
          nome: 'Recuperação, Patologias e Defesa',
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
            'O Papel do Neurocientista em Centros de Alto Rendimento e Defesa',
          ]
        }
      ],
    },
  ],
};
