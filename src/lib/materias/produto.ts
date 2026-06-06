import { MateriaConfig } from '@/types';

export const produtoHub: MateriaConfig = {
  slug: 'produto-inovacao',
  nome: 'Produto & Inovação Digital',
  emoji: '📦',
  isCategory: true,
  descricao: 'Código rodando e IA prevendo o futuro não servem de nada se não resolvem dores humanas reais. Aqui você une engenharia e pessoas.',
  children: [
    {
      slug: 'web3-cripto',
      nome: 'Cripto & Web3',
      emoji: '⛓️',
      parent: 'produto-inovacao',
      whyStart: 'A fronteira da descentralização. Foco no mecanismo — não na especulação.',
      descricao: 'Criptografia, Blockchain, DeFi e contratos inteligentes.',
      contexto: `Foco: os fundamentos técnicos da descentralização. Evite o viés de investimento e especulação.`,
      ementa: [
        // === EXISTENTES ===
        'O Problema do Gasto Duplo e o Bitcoin',
        'Algoritmos de Consenso (PoW vs PoS)',
        'Ethereum e Smart Contracts',
        'DeFi (Finanças Descentralizadas)',
        'Tokenomics e Governança',
        'Criptografia de Chave Pública: ECDSA e Hash Functions',
        'Merkle Trees e Integridade de Dados',
        'Solidity: Programando Smart Contracts',
        'NFTs: O Mecanismo Técnico (sem especulação)',
        'Layer 2: Rollups e Escalabilidade',
        'DAOs: Organizações Autônomas Descentralizadas',
        'Riscos: Rug Pulls, Hacks e Bugs em Contratos',
        'Regulamentação Cripto Global',
        'CBDCs: Moedas Digitais de Bancos Centrais',
        'ZK Proofs: Privacidade sem Revelar Informação',
        // === NOVOS ===
        'Account Abstraction: UX Simplificada em Wallets (ERC-4337)',
        'Bridges e Interoperabilidade Cross-Chain',
        'Real World Assets (RWA): Tokenização de Ativos Reais',
        'DePIN: Infraestrutura Física Descentralizada',
        'MEV (Maximal Extractable Value): O Lado Sombrio das Transações',
        'Auditorias de Smart Contracts: Ferramentas e Processo',
        'Stablecoins: Mecanismos e Riscos de Despegging',
        'Oráculos (Chainlink): Conectando Blockchain ao Mundo Real',
        'Ethereum Roadmap: Danksharding e Proto-Danksharding',
        'SocialFi e On-Chain Identity (Lens, Farcaster)',
        // === 2026 ===
        'AI Agents em DeFi: Agentes Autônomos Operando Protocolos',
        'Restaking (EigenLayer): Reutilização de Segurança Econômica',
        'Modular Blockchains: Celestia e a Separação de Consenso/Execução/DA',
        'Intent-Based Protocols: Transações Declarativas sem Gas Manual'
      ]
    }
  ]
};
