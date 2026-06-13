import { MateriaConfig } from '@/types';

export const produtoHub: MateriaConfig = {
  slug: 'produto-inovacao',
  nome: 'Product & Digital Innovation',
  emoji: '📦',
  isCategory: true,
  descricao: 'Code running and AI predicting the future are useless if they do not solve real human pain. Here you unite engineering and people.',
  children: [
    {
      slug: 'web3-cripto',
      nome: 'Crypto & Web3',
      emoji: '⛓️',
      parent: 'produto-inovacao',
      whyStart: 'The frontier of decentralization. Focus on the mechanism — not on speculation.',
      descricao: 'Cryptography, Blockchain, DeFi, and smart contracts.',
      contexto: `Focus: the technical fundamentals of decentralization. Avoid investment and speculation bias.`,
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
