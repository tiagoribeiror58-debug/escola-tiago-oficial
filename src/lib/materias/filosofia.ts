import { MateriaConfig } from '@/types';

export const filosofiaHub: MateriaConfig = {
  slug: 'filosofia-hub',
  nome: 'Philosophy & Applied Epistemology',
  emoji: '🦉',
  isCategory: true,
  descricao: 'How do you know what you know? Tools to think rigorously, detect fallacies, and avoid being fooled by pretty arguments.',
  children: [
    {
      slug: 'epistemologia-aplicada',
      nome: 'Epistemology & Theory of Knowledge',
      emoji: '🔍',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Before learning anything, you need to understand how knowledge works. Otherwise you just accumulate beliefs disguised as facts.',
      descricao: 'How to distinguish real knowledge from opinion, belief, and illusion.',
      contexto: `Focus: practical epistemology — how to evaluate whether something is true before acting on it.

Mandatory approach:
- Always anchor in everyday examples, not pure philosophical abstractions.
- Connect each concept to a real decision someone would make better by knowing this.
- No unnecessary academic jargon. Philosophy is a tool, not decoration.`,
      fases: [
        {
          nome: 'LEVEL 1 — FUNDAMENTALS',
          topicos: [
            'What is Epistemology',
            'The difference between belief, opinion, and knowledge',
            'Sources of knowledge: senses, reason, intuition, authority',
            'The problem of skepticism (can I be wrong about everything?)',
            'Pyrrhonian Skepticism: Suspending Judgment When Evidence is Weak',
            'Truth: what it means for something to be true',
            'The Problem of Tacit Knowledge (Michael Polanyi)',
            'The Map is Not the Territory (Korzybski and General Semantics)'
          ]
        },
        {
          nome: 'LEVEL 2 — CLASSICAL CURRENTS',
          topicos: [
            'Rationalism — Descartes, Leibniz, Spinoza',
            'Empiricism — Locke, Hume, Berkeley',
            'Empiricism vs Rationalism: Where Does What You Know Come From?',
            'Kant — the synthesis between reason and experience',
            'The problem of induction (Hume) - Why the Past Does Not Guarantee the Future',
            'Classical skepticism vs. modern skepticism'
          ]
        },
        {
          nome: 'LEVEL 3 — CONTEMPORARY EPISTEMOLOGY',
          topicos: [
            'What is Knowledge? (Justified True Belief and the Gettier Problem)',
            'Foundationalism vs. Coherentism vs. Reliabilism',
            'Social epistemology — collective knowledge and testimony',
            'Epistemology of Testimony: When to Believe Others',
            'Reformed Epistemology (Plantinga)',
            'Epistemological naturalism (Quine)'
          ]
        },
        {
          nome: 'LEVEL 4 — PHILOSOPHY OF SCIENCE',
          topicos: [
            'The scientific method and its limits',
            'The Demarcation Problem: Science vs Pseudoscience',
            'Falsificationism (Popper): What Makes an Idea Scientific',
            'Paradigms and Scientific Revolutions (Thomas Kuhn)',
            'Research programme — Lakatos',
            'Epistemological anarchism — Feyerabend',
            'Scientific Realism vs. Anti-Realism',
            "Ockham's Razor: The Simplest Explanation is Probably the Right One",
            'The Difference Between Correlation and Causation (in Practice)'
          ]
        },
        {
          nome: 'LEVEL 5 — ADVANCED AND PRACTICAL APPLICATIONS',
          topicos: [
            'Virtue Epistemology (Sosa, Zagzebski)',
            'A priori vs. a posteriori knowledge — current debates',
            'Feminist epistemology and standpoint theory',
            'Fake news, disinformation, and applied epistemology',
            'Argument from Authority: When to Trust and When to Doubt',
            'Epistemic Confirmation Bias: You Only See What You Already Believe',
            'The Dunning-Kruger Effect and Expert Blindness',
            'Epistemic Metacognition: Knowing What You Do Not Know',
            'Judgment Heuristics (Kahneman): Shortcuts That Deceive',
            'Bayesianism: Updating Beliefs with New Evidence',
            'AI and knowledge — can machines know?',
            'Meta-epistemology — can we know the limits of knowledge?'
          ]
        }
      ]
    },
    {
      slug: 'falacias-argumentacao',
      nome: 'Fallacy & Bias Catalogue',
      emoji: '🎭',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'You are being manipulated every day by arguments that seem logical but are not. Learn to defend yourself.',
      descricao: 'Detection of fallacies and argumentation biases in the real world.',
      contexto: `Focus: detecting fallacies in practice.
      
Mandatory approach:
- Present a real example (politics, sales, internet debates) where the fallacy is used.
- Teach the person how to respond to or dismantle that fallacy in an elegant and logical way.`,
      fases: [
        {
          nome: 'LEVEL 1 — THE MOST COMMON (ATTACKS AND EMOTIONS)',
          topicos: [
            'What are Formal and Informal Fallacies',
            'Straw Man Fallacy: Attacking a Distorted Version of the Argument',
            'Ad Hominem Fallacy: Attacking the Person Instead of the Idea',
            'Appeal to Authority Fallacy',
            'Appeal to Emotion: When Feeling Replaces Evidence',
            'Tu Quoque: "You Do It Too" Is Not a Defense'
          ]
        },
        {
          nome: 'LEVEL 2 — LOGICAL AND PROBABILISTIC DISTORTIONS',
          topicos: [
            'False Dilemma: Creating Two Options When More Exist',
            'Slippery Slope: Predicting Catastrophe Without Justification',
            'Fallacy of Composition and Division: Part ≠ Whole',
            'Begging the Question (Circular Reasoning): Concluding What Was Presupposed',
            "Gambler's Fallacy: Probabilities Have No Memory",
            "Argument from Personal Incredulity: \"I Can't Imagine It, Therefore It's False\""
          ]
        },
        {
          nome: 'LEVEL 3 — BIASES AND DATA SELECTION',
          topicos: [
            'Sunk Cost Fallacy: Persisting Because You Already Invested',
            "Appeal to Nature: \"If It's Natural, It's Good\" (It's Not)",
            'Cherry Picking: Selecting Only the Data That Confirms',
            'Survivorship Bias and Causation vs Correlation',
            'Narrative Bias: When Stories Deceive Logic'
          ]
        }
      ]
    },
    {
      slug: 'logica-argumentacao',
      nome: 'Logic & Structured Reasoning',
      emoji: '⚖️',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'If you do not understand the rules of reasoning, you cannot model reality correctly. Logic is the foundation of mathematics, programming, and valid argumentation.',
      descricao: 'Classical logic, predicates, and mathematical-structural reasoning.',
      contexto: `Focus: logical structure of arguments and reasoning.
      
Mandatory approach:
- Explain the formal structure of the concept.
- Do not teach logic only as abstract mathematics. Teach it as problem modelling.`,
      fases: [
        {
          nome: 'LEVEL 1 — FUNDAMENTALS',
          topicos: [
            'What is Logic and what it is for',
            'Anatomy of an Argument: Premises, Conclusion, and Validity vs Truth',
            'Deduction vs Induction vs Abduction: Three Ways of Reasoning',
            'Basic Critical Thinking'
          ]
        },
        {
          nome: 'LEVEL 2 — CLASSICAL LOGIC',
          topicos: [
            'Aristotelian Logic — syllogisms',
            'Modus Ponens, Modus Tollens, and Basic Syllogisms',
            'Syllogisms: Validity vs Soundness',
            'Propositional Logic — connectives (and, or, not, if...then)',
            'Propositions and Truth Values',
            'Logical Operators (AND, OR, NOT, IF)',
            'Truth Tables: The Skeleton of Propositional Logic',
            'Logical equivalences',
            'Formally valid and invalid arguments'
          ]
        },
        {
          nome: 'LEVEL 3 — PREDICATE LOGIC',
          topicos: [
            'Predicate Logic: Quantifiers (All, Some, None)',
            'Predicates and variables',
            'Formalising everyday arguments',
            'Introduction to formal proofs'
          ]
        },
        {
          nome: 'LEVEL 4 — NON-CLASSICAL LOGICS',
          topicos: [
            'Basic Modal Logic: Necessity vs Possibility',
            'Deontic Logic — obligation and permission',
            'Paraconsistent Logic — contradictions without explosion',
            'Fuzzy Logic — gradual truths (neither 0 nor 1)',
            'Temporal Logic'
          ]
        },
        {
          nome: 'LEVEL 5 — MATHEMATICAL LOGIC AND METAMATHEMATICS',
          topicos: [
            'Basic Set Theory',
            'Mathematical induction',
            'Limits of Formal Reasoning: Completeness and Incompleteness Theorems (Gödel)',
            'Decidability and computability — Turing',
            'Logic and formal language'
          ]
        },
        {
          nome: 'LEVEL 6 — ADVANCED APPLICATIONS',
          topicos: [
            'Logic and Artificial Intelligence',
            'Legal Logic and argumentation',
            'Logic and Linguistics — formal semantics',
            'Epistemic Logic — reasoning about knowledge',
            'Classical Paradoxes (Liar, Sorites, Russell) and What They Teach',
            'Modelling Complex Problems',
            'Systems Thinking and Feedback Loops',
            'Game Theory: Interdependent Decisions',
            'Cost-Benefit Analysis and Rational Decision-Making',
            'Counterfactual Reasoning (What If?)',
            'Bayesian Logic: Updating Beliefs with Evidence',
            'Probabilistic vs Deterministic Argumentation'
          ]
        }
      ]
    },
    {
      slug: 'etica-dilemas',
      nome: 'Ethics & Moral Decision-Making',
      emoji: '🧭',
      isCategory: false,
      parent: 'filosofia-hub',
      whyStart: 'Every important decision is a disguised ethical decision. If you have no framework, you will decide by impulse and regret it.',
      descricao: 'Practical ethical frameworks for difficult decisions in the real world.',
      contexto: `Focus: applied ethics to real decisions — business, technology, relationships.

Mandatory approach:
- Each ethical framework must be presented with a real dilemma where it would be applied.
- Never say which answer is the "right" one. Show the trade-offs of each framework.`,
      ementa: [
        "Bentham's Utilitarianism: The Greatest Good for the Greatest Number",
        'The Trolley Problem and Its Variations',
        "Kant's Deontological Ethics: Absolute Rules vs Consequences",
        'The Categorical Imperative: "What If Everyone Did This?"',
        "Aristotle's Virtue Ethics: Being Good vs Doing Good",
        "Contractualism (Rawls): The Veil of Ignorance When Making Decisions",
        "Nietzsche's Ethics: Master Morality vs Slave Morality",
        'Ethical Dilemmas in AI: Algorithmic Bias and Responsibility',
        'Business Ethics: Profit vs Social Responsibility (Friedman vs Stakeholder)',
        'The Paradox of Tolerance (Karl Popper): When to Tolerate Intolerance?',
        'Information Ethics: Privacy, Surveillance, and the Right to be Forgotten',
        'The Naturalistic Fallacy in Morality: "It Has Always Been This Way" Justifies Nothing',
        'Second and Third-Order Consequences: Unintended Effects',
        'The Free Rider Problem and the Tragedy of the Commons',
        'Applied Stoic Ethics: What Is Under Your Control?'
      ]
    }
  ]
};
