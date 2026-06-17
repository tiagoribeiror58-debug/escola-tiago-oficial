import { MateriaConfig } from '@/types';

export const administrativoHub: MateriaConfig = {
  slug: 'administrativo-hub',
  nome: 'Profissionais Administrativos',
  emoji: '🏢',
  isCategory: true,
  descricao: 'A jornada de carreira corporativa do nível Júnior (execução) ao Sênior (processos e gestão estratégica).',
  children: [
    {
      slug: 'admin-fundamentos',
      nome: 'Fundamentos Operacionais',
      emoji: '🟢',
      parent: 'administrativo-hub',
      whyStart: 'O nível Júnior exige precisão. Você não avança para gestão se não consegue organizar documentos e operar sistemas básicos sem erros.',
      descricao: 'Controle, arquivamento, atendimento e introdução a sistemas (Nível Júnior: 0-2 anos).',
      contexto: 'Foco: Execução perfeita, rotina de escritório e habilidades fundamentais para não depender de supervisão constante em tarefas básicas.',
      fases: [
        {
          nome: 'Fase 1: Controle, Documentos e Protocolos',
          topicos: [
            'Arquivamento Físico e Digital: Métodos de Organização que Funcionam',
            'Gestão de Documentos: Temporalidade, Validade e Descarte Seguro',
            'O Ciclo de Vida de um Protocolo: Como Rastrear e Evitar Perdas',
            'Redação Empresarial Básica: E-mails Claros e Atas de Reunião'
          ]
        },
        {
          nome: 'Fase 2: Atendimento e Suporte Front-line',
          topicos: [
            'Postura e Etiqueta Corporativa no Atendimento Telefônico e Presencial',
            'Gestão de Agendas: Priorização e Filtro para Gestores',
            'Suporte ao Time Interno: Como Coletar Demandas Sem Virar "Garçom" do Escritório',
            'Resolução de Problemas Básicos de Escritório e Facilities'
          ]
        },
        {
          nome: 'Fase 3: Sistemas e Lançamento de Dados',
          topicos: [
            'Introdução a ERPs (SAP, Totvs, Omie): O Que São e Como Funcionam',
            'Lançamento de Dados com Precisão: Evitando o "Garbage In, Garbage Out"',
            'Excel Básico para Administrativos: Tabelas, Filtros e Fórmulas de Busca (VLOOKUP)',
            'Emissão de Relatórios Básicos e Conferência de Informações'
          ]
        }
      ]
    },
    {
      slug: 'admin-financas-compras',
      nome: 'Finanças, Fiscal e Compras',
      emoji: '🟡',
      parent: 'administrativo-hub',
      whyStart: 'Dinheiro e obrigações são as áreas mais críticas da empresa. Dominar essas rotinas garante a transição para o nível Pleno.',
      descricao: 'Rotinas financeiras, suprimentos e noções tributárias (Nível Pleno: 2-5 anos).',
      contexto: 'Foco: Autonomia em processos que lidam diretamente com dinheiro, fornecedores e conformidade legal.',
      fases: [
        {
          nome: 'Fase 1: Assistente Financeiro (Rotinas de Caixa)',
          topicos: [
            'Contas a Pagar: Prazos, DDA, Boletos e Aprovações',
            'Contas a Receber: Faturamento, Cobrança e Inadimplência',
            'Conciliação Bancária: O Cruzamento do Extrato com o Sistema',
            'Fluxo de Caixa Diário: Onde o Dinheiro Entra e Onde Sai'
          ]
        },
        {
          nome: 'Fase 2: Analista de Suprimentos (Compras)',
          topicos: [
            'O Processo de Compras: Da Requisição Interna à Ordem de Compra',
            'Técnicas de Cotação: O Paradoxo dos Três Orçamentos e Preço vs Qualidade',
            'Negociação com Fornecedores: Prazos, Descontos e Parcerias',
            'Gestão de Estoque e Almoxarifado: Curva ABC e Ponto de Pedido'
          ]
        },
        {
          nome: 'Fase 3: Assistente Fiscal e Tributário',
          topicos: [
            'Tipos de Notas Fiscais (NFe, NFSe, NFCe) e Seus Elementos',
            'Impostos Básicos (Simples, Presumido, Real): Uma Visão Geral para Não-Contadores',
            'Retenções na Fonte (IRRF, INSS, ISS): Quando a Empresa Precisa Reter',
            'Obrigações Acessórias: Entendendo a Rotina do Departamento Fiscal'
          ]
        }
      ]
    },
    {
      slug: 'admin-rh-contratos',
      nome: 'RH e Gestão de Contratos',
      emoji: '🟡',
      parent: 'administrativo-hub',
      whyStart: 'A gestão do capital humano e dos riscos legais diferencia o profissional puramente operacional daquele com visão de negócio.',
      descricao: 'Departamento Pessoal, contratos e compras públicas (Nível Pleno/Sênior).',
      contexto: 'Foco: Interface entre setores. A capacidade de interligar as necessidades dos colaboradores com a segurança contratual da empresa.',
      fases: [
        {
          nome: 'Fase 1: Departamento Pessoal (Analista de RH)',
          topicos: [
            'O Ciclo do Colaborador: Admissão, Integração, Férias e Demissão',
            'Fechamento de Ponto e Preparação da Folha de Pagamento',
            'Gestão de Benefícios (VT, VR, Planos de Saúde) e Afastamentos',
            'Clima Organizacional e Comunicação Interna'
          ]
        },
        {
          nome: 'Fase 2: Gestão e Análise de Contratos',
          topicos: [
            'Anatomia de um Contrato Corporativo: Objeto, Prazos e Multas',
            'Controle de Vigência e Aditivos: Como Não Perder Prazos Críticos',
            'Gestão de SLAs (Service Level Agreements) com Terceirizados',
            'Arquivamento Jurídico e Assinaturas Digitais (LGPD no Dia a Dia)'
          ]
        },
        {
          nome: 'Fase 3: Licitações e Compras Públicas',
          topicos: [
            'Introdução ao Sistema de Compras do Governo e Nova Lei de Licitações',
            'Leitura de Editais: Encontrando "Pegadinhas" e Requisitos',
            'Organização da Documentação de Habilitação (SICAF e Certidões)',
            'Pregão Eletrônico: A Dinâmica da Disputa e a Fase de Recursos'
          ]
        }
      ]
    },
    {
      slug: 'admin-estrategia-processos',
      nome: 'Gestão Estratégica e Processos',
      emoji: '🔴',
      parent: 'administrativo-hub',
      whyStart: 'O nível Sênior não apaga incêndios, ele cria sistemas para evitar que eles comecem. Pensa além da tarefa, focando em processos estruturais.',
      descricao: 'Mapeamento de processos, BPO, liderança e suporte executivo (Nível Sênior: 5+ anos).',
      contexto: 'Foco: Arquitetura de processos, melhoria contínua, auditoria e visão macro do negócio corporativo.',
      fases: [
        {
          nome: 'Fase 1: Mapeamento de Fluxos e BPO',
          topicos: [
            'BPO (Business Process Outsourcing): Entendendo a Terceirização Estratégica',
            'Como Desenhar um Fluxograma Funcional (BPMN Básico)',
            'Identificação de Gargalos e Desperdícios (Lean Administrativo)',
            'KPIs Administrativos: Como Medir a Eficiência do Backoffice'
          ]
        },
        {
          nome: 'Fase 2: Padronização e Auditoria',
          topicos: [
            'Como Escrever um POP (Procedimento Operacional Padrão) que as Pessoas Leiam',
            'Gestão do Conhecimento: Criando uma "Wiki" Interna para a Empresa',
            'Controles Internos e Preparação para Auditorias',
            'Implementação de Políticas de Compliance de Forma Prática'
          ]
        },
        {
          nome: 'Fase 3: Secretariado Executivo Avançado',
          topicos: [
            'O "Gatekeeper": Protegendo o Tempo e o Foco da Diretoria',
            'Organização de Eventos Corporativos e Viagens Internacionais',
            'Preparação de Reuniões de Conselho (Board Meetings) e Relatórios Executivos',
            'Comunicação de Alta Pressão: Lidando com Stakeholders Críticos'
          ]
        },
        {
          nome: 'Fase 4: Liderança Administrativa',
          topicos: [
            'De Colega a Líder: Os Desafios da Transição para Coordenador',
            'Treinamento e Mentoria de Analistas e Assistentes (Nível Júnior)',
            'Gestão de Projetos Internos Administrativos (Ex: Implantação de Novo ERP)',
            'Orçamento Matricial e Gestão de Custos do Departamento (Opex)'
          ]
        }
      ]
    }
  ]
};
