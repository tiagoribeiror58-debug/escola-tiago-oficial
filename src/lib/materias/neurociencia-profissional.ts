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
            'History of Neuroscience: From Cajal and Golgi to Optogenetics',
            'The Anatomical Neuron: Dendrites, Soma, Axon, Myelin Sheath',
            'Action Potential: The All-or-None Principle and Ion Channels',
            'Glial Cells: The Silent Support System (Astrocytes, Oligodendrocytes, Microglia)',
            'The Synapse: Synaptic Cleft, Vesicles, and Receptors',
            'Fundamental Neurotransmitters: Glutamate (Accelerates) and GABA (Brakes)',
            'Neural Modulators: Dopamine, Serotonin, Noradrenaline, Acetylcholine',
            'Neural Integration: Spatial and Temporal Summation in Dendrites',
            'Short-Term Synaptic Plasticity (Facilitation and Depression)',
            'The Electrochemical Axis: How Chemistry Turns Into Electricity and Vice-Versa'
          ]
        },
        {
          nome: 'Phase 2: Macroscopic Neuroanatomy (The Brain Map)',
          topicos: [
            'The Cerebral Cortex: The 6 Layers and Processing Hierarchy',
            'Basic Cerebral Lobes: Frontal, Parietal, Temporal, Occipital',
            'The Limbic System: Amygdala, Hippocampus, and the Emotional Brain',
            'Basal Ganglia: The Accelerator and Brake of Movement and Thought',
            'The Brainstem: Pons, Medulla, Midbrain, and Basic Survival',
            'The Cerebellum: Far Beyond Balance and Coordination',
            'Thalamus: The Sensory Routing Station',
            'Hypothalamus: The Hormonal Controller and the HPA Axis',
            'Peripheral Nervous System: Somatic vs Autonomous (Sympathetic and Parasympathetic)',
            'The Ventricular System and Cerebrospinal Fluid (CSF)',
            'The Blood-Brain Barrier: How the Brain Protects Itself from Its Own Blood'
          ]
        },
        {
          nome: 'Phase 3: Sensory Systems and Perception (How We Feel)',
          topicos: [
            'The Principle of Sensory Transduction: How Physics Becomes Biology',
            'Visual System: From the Retina to the Occipital Cortex (V1, V2, V3...)',
            'Visual Pathways: The "What" Pathway (Ventral) and the "Where" Pathway (Dorsal)',
            'Auditory System: Cochlea, Hair Cells, and Auditory Cortex',
            'Somatosensory: The Penfield Homunculus and Touch Perception',
            'Pain (Nociception): Insular Cortex and Endogenous Pain Modulation',
            'Smell and Taste: The Chemical Senses and the Direct Path to the Limbic System',
            'Proprioception and Interoception: How the Brain Senses Itself',
            'Multisensory Integration: How the Brain Puts the Pieces Together (e.g., McGurk Effect)',
            'The Predictive Brain: How Perception Is a Controlled Hallucination (Predictive Coding)'
          ]
        },
        {
          nome: 'Phase 4: Neuroplasticity and Learning (How We Change)',
          topicos: [
            'Hebbian Neuroplasticity: The Fundamental Principle',
            'LTP (Long-Term Potentiation): The Molecular Basis of Memory',
            'LTD (Long-Term Depression): Forgetting as a Biological Tool',
            'Adult Neurogenesis: The Debate and Evidence in the Hippocampus',
            'Critical Periods and Plasticity Windows in Development',
            'Myelination and Processing Speed in Childhood and Adolescence',
            'Neural Epigenetics: How Experience Changes Gene Expression in the Brain',
            'Cortical Reorganization After Injury (Structural Neuroplasticity)',
            'The Role of Sleep in Plasticity and Consolidation (Hippocampal Replay)',
            'Trophic Factors: BDNF and the Brain\'s "Fertilizer"'
          ]
        },
        {
          nome: 'Phase 5: Brain Ritms and Consciousness (Brain Time)',
          topicos: [
            'Basic Electroencephalography (EEG): Alpha, Beta, Theta, Delta, and Gamma Waves',
            'The Circadian Cycle: The Suprachiasmatic Nucleus and Melatonin',
            'Sleep Architecture: NREM Stages (1, 2, 3/4) and REM Sleep',
            'Dreams and REM Sleep: Muscle Paralysis and Emotional Consolidation',
            'The Ascending Reticular Activating System (ARAS) and the Waking State',
            'The Default Mode Network (DMN): The Brain at Rest',
            'Attention and the Frontoparietal Network: Top-Down vs Bottom-Up Focus',
            'Neural Correlates of Consciousness: The Hard Problem',
            'Altered States of Consciousness: Meditation, Flow, and Psychedelics'
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
            'What Is a Clinical Neuroscientist (vs Neurologist vs Neuropsychologist)',
            'The Training Curriculum in Neuroscience: From Bachelor\'s to Post-Doc',
            'How a Multidisciplinary Team Works in Hospital Neurology',
            'The Central and Peripheral Nervous System: Essential Functional Anatomy',
            'Clinical Neuroanatomy: Lobes, Sulci, Gyri, and Their Functions',
            'Glial Cells: Astrocytes, Oligodendrocytes, Microglia — The Ignored Support System',
            'The Blood-Brain Barrier: Protection and Therapeutic Limitation',
            'Essential Neurotransmitters: Glutamate, GABA, Dopamine, Serotonin, Acetylcholine',
            'Electrical Signaling: Action Potential and Synaptic Transmission',
            'Synaptic Plasticity: LTP, LTD, and the Biology of Memory'
          ]
        },
        {
          nome: 'Neurological Diseases: Foundations and Mechanisms',
          topicos: [
            'Alzheimer\'s Pathophysiology: Amyloid Hypothesis, Tau, and Beyond',
            'Parkinson\'s Disease: Substantia Nigra, Lewy Bodies, and Dopaminergic Pathways',
            'Amyotrophic Lateral Sclerosis (ALS): Motor Neuron Death and Progression',
            'Multiple Sclerosis: Autoimmunity, Demyelination, and Flares',
            'Epilepsy: Neural Hyperexcitability, Seizure Types, and Anticonvulsant Mechanisms',
            'Ischemic vs Hemorrhagic Stroke: Penumbra, Reperfusion, and Therapeutic Window',
            'Huntington\'s: Mutant Huntingtin Protein and Striatal Death',
            'Cerebellar Ataxias: Coordination, Balance, and Degeneration',
            'Multiple Sclerosis: Immunology and Disease-Modifying Therapies',
            'Brain Tumors: Gliomas, Meningiomas, and WHO Classification'
          ]
        },
        {
          nome: 'Clinical Neuropsychology',
          topicos: [
            'ADHD: Prefrontal Circuit, Dopamine, and Noradrenaline — Beyond the Stereotype',
            'Autism Spectrum Disorder: Neural Connectivity and Heterogeneity',
            'Anxiety Disorders: Amygdala, HPA, and the Fear Loop',
            'Major Depression: Neurobiology Beyond Serotonin (BDNF, Glutamate, Inflammation)',
            'Psychosis and Schizophrenia: Dopaminergic and Glutamatergic Hypotheses',
            'Bipolar Disorder: Mood Dysregulation and Limbic Circuits',
            'Obsessive-Compulsive Disorder: Corticostriatal-Thalamocortical Loop',
            'PTSD: Fear Memory, Failed Extinction, and Hippocampus',
            'Personality Disorders: Neural Substrates and Neuroimaging',
            'Frontotemporal Dementias: Personality, Language, and Social Behavior'
          ]
        },
        {
          nome: 'Clinical Assessment and Tools',
          topicos: [
            'Clinical Neuroimaging: How to Read MRI and CT Reports',
            'PET Scan in Neurology: Labeled Metabolism, Amyloid, and Tau',
            'Clinical EEG: Brain Rhythms, Epilepsy, and Encephalopathies',
            'Polysomnography: Reading the Brain During Sleep',
            'Neuropsychological Assessment: Cognitive Tests and What They Measure',
            'Cerebrospinal Fluid: Analysis and Biomarkers'
          ]
        },
        {
          nome: 'Therapies and Interventions',
          topicos: [
            'Neurological Rehabilitation: Neuroplasticity as the Engine of Recovery',
            'Neuromodulation: TMS, tDCS, DBS, and RTMS in the Clinic',
            'Cognitive-Behavioral Therapy with a Neuroscience Base',
            'Clinical Psychopharmacology: When to Medicate, When Not To',
            'Chronic Pain: Central Sensitization and the Brain That Won\'t Stop Screaming',
            'Sleep and Neurology: Narcolepsy, Apnea, REM Behavior Disorder',
            'Pediatric Neurology: Neural Development and Vulnerabilities',
            'Bioethics in Clinical Neuroscience: Capacity, Consent, and Neuroenhancement',
            'Communicating Neurological Diagnoses: The Human Dimension',
            'The Future of Neurology: Genomics, iPSCs, and Precision Neural Medicine'
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
            'The Structure of the Psyche (Conscious vs Unconscious)',
            'Fundamental Cognitive Biases (Confirmation, Anchoring)',
            'Attachment Theory and Relationships',
            'Emotional Intelligence and Affect Regulation',
            'Cognitive-Behavioral Therapy (Practices)',
            'Archetypes and the Collective Unconscious',
            'Kahneman\'s Systems 1 and 2: The Fast and Slow Brain',
            'Heuristics and Mental Shortcuts',
            'Motivation: Self-Determination Theory (Deci & Ryan)',
            'Classical and Operant Conditioning (Pavlov and Skinner)',
            'Trauma Psychology and Defensive Responses',
            'Self-Efficacy and Growth Mindset (Dweck)',
            'Personality: Big Five and MBTI Types',
            'Social Influence: Conformity and Obedience (Milgram)',
            'Positive Psychology and Well-Being (Seligman)',
            'Narcissism, Machiavellianism, and Psychopathy (Dark Triad)',
            'Defense Mechanisms and Self-Deception',
            'Cognitive Flexibility: Unlearning and Relearning in the AI Era',
            'Psychology of Human-AI Collaboration: Identity and Self-Worth',
            'Emotional Antifragility: Transforming Stress into Growth',
            'Dopamine Detox: Restoring the Reward Circuit',
            'Psychology of Procrastination: Roots and Solutions',
            'Flow States: Psychology of Optimal Performance',
            'Imposter Syndrome: Mechanism and Overcoming'
          ]
        },
        {
          nome: 'Mental Health and Resilience',
          topicos: [
            'The Biology of Stress (Cortisol and Amygdala)',
            'Burnout vs Fatigue (Structural Differences)',
            'Antifragility (Growing Under Pressure)',
            'Cognitive Restructuring (Applied CBT)',
            'Managing Anxiety and Triggers',
            'Autonomic Nervous System Regulation (Breathing)',
            'Mindfulness and the Practice of Plenary Attention',
            'Acceptance and Commitment Therapy (ACT)',
            'Sleep Hygiene for Mental Health',
            'Social Isolation and Psychological Health',
            'Procrastination: Emotional Roots and Solutions',
            'Adaptive vs Maladaptive Perfectionism',
            'Building a Recovery Routine (Recovery Stack)',
            'Therapeutic Journaling and Experience Processing',
            'Finding Purpose: Ikigai and Meaning in Life',
            'Resilience in Environments of Exponential Change',
            'Managing Technostress and Information Overload',
            'Digital Stoicism: Balance in Volatile Markets',
            'Eco-Anxiety and Existential Uncertainty in the AI Era',
            'Healthy Boundaries with Technology and Social Media',
            'Productive Solitude: The Power of Being Alone',
            'Evidence-Based Therapy: When to Seek Help'
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
            'Pharmacodynamics: How Drugs Interact with Neural Receptors',
            'Pharmacokinetics in the CNS: Absorption, Distribution, Metabolism, and Excretion',
            'The Blood-Brain Barrier: The Greatest Obstacle in Neuropharmacology',
            'Receptor Types: Ionotropic, Metabotropic, Nuclear',
            'Agonists, Antagonists, Partial Agonists, and Allosteric Modulators',
            'Therapeutic Window: The Fine Line Between Cure and Neural Toxicity',
            'Tolerance, Dependence, and Withdrawal: The Biology of Addiction',
            'Genetic Polymorphisms and Response Variability to Psychotropic Drugs'
          ]
        },
        {
          nome: 'Psychopharmacology by Class',
          topicos: [
            'SSRI Antidepressants: Real Mechanism, Limitations, and Why They Take Weeks',
            'SNRI, Tricyclics, and MAOIs: When Serotonin Is Not Enough',
            'Ketamine and Esketamine for Depression: The Glutamatergic Mechanism (AMPA)',
            'Lithium: The Mood Stabilization Mechanism We Still Don\'t Fully Understand',
            'Typical and Atypical Antipsychotics: D2 Blockade and Extrapyramidal Effects',
            'Benzodiazepines: GABA-A, Tolerance, and the Dependence Epidemic',
            'Psychostimulants (Methylphenidate, Amphetamine): Dopamine and Noradrenaline in ADHD',
            'Anticonvulsants: Multi-Target Mechanisms (Channels, GABA, Glutamate)',
            'Acetylcholinesterase Inhibitors (Donepezil): What They Do and Don\'t Do in Alzheimer\'s',
            'Sleep Modulators: Zolpidem, Suvorexant, and the Biology of Sedation'
          ]
        },
        {
          nome: 'Psychedelics and Emerging Therapies',
          topicos: [
            'Psilocybin for Treatment-Resistant Depression: 5-HT2A Receptors and Neuroplasticity',
            'MDMA for PTSD: Therapeutic Window and Oxytocinergic Mechanism',
            'LSD and Altered States: What the Serotonergic Receptor Does to the Default Mode Network',
            'Cannabidiol (CBD): Real Mechanism vs Market Hype',
            'Ibogaine for Opioid Dependence: Cardiac Risk and Neural Mechanism'
          ]
        },
        {
          nome: 'Development and Clinical Pipeline',
          topicos: [
            'The CNS Drug Development Pipeline: Discovery to Market',
            'Animal Models of Neurological Diseases: Validity and Limitations',
            'Biomarkers in CNS Drug Development: How to Measure What Cannot Be Seen',
            'Phases 1, 2, and 3: What Each Phase Tests and Why So Many Fail',
            'Why 90% of CNS Drugs Fail in Phase 2: The Translational Problem',
            'Precision Medicine in Neurology: Genomic Targets and iPSCs',
            'Gene Therapy for Neurological Diseases: AAV and Delivery to the CNS',
            'Monoclonal Antibodies in Neurology: Anti-amyloid and Anti-tau',
            'Brain Organoids: Modeling Neurological Diseases in Vitro',
            'CRISPR in Neurology: Correcting Disease-Causing Mutations'
          ]
        },
        {
          nome: 'Regulatory and Market',
          topicos: [
            'FDA and ANVISA Regulation for Neurological Drugs',
            'Orphan Drug Designation: Incentives for Rare Neurological Diseases',
            'Adaptive Trials: Innovation in Clinical Study Design',
            'Intellectual Property in Neuropharmacology: Patents and Generics',
            'The Neuroscientist\'s Role in Pharmaceutical Companies (Discovery, Medical Affairs, HEOR)',
            'Pharmacovigilance: Monitoring Adverse Effects Post-Approval',
            'GLP-1 and Neurology: The Unexpected Impact of Semaglutide on the Brain',
            'Nootropics: What Science Says vs What the Market Promises',
            'Drug Repurposing: Using What Already Exists for New Neurological Indications',
            'The Future of Psychopharmacology: AI in Molecule and Target Design'
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
            'The Real Neuron: Spike, Dendritic Integration, and Firing Threshold',
            'Perceptrons and Artificial Neurons: Where the Analogy Works and Where It Collapses',
            'Deep Neural Networks vs Visual Cortex: Hierarchy and Representation',
            'Backpropagation and Biological Learning: Does Something Similar Exist in the Brain?',
            'Hebbian Plasticity vs Gradient Descent: Two Learning Worlds',
            'Attention in Transformers vs Biological Neural Attention: A Critical Comparison',
            'Working Memory in the Brain vs Context in LLMs',
            'The Temporal Credit Assignment Problem: Shared Challenge Between Brain and AI',
            'Sparse Coding and Sparse Neural Networks in the Cortex',
            'Energy-Efficient Neural Computing: What AI Can Learn from the Brain'
          ]
        },
        {
          nome: 'Brain-Computer Interfaces (BCI)',
          topicos: [
            'History of BCIs: From the First EEG to Neuralink',
            'BCI Types: Invasive, Semi-invasive, and Non-invasive',
            'EEG for BCI: Signal, Noise, and Artifact Processing',
            'ECoG (Electrocorticography): High Resolution with Lower Invasiveness',
            'Utah Array: The Reference Electrode in Invasive BCIs',
            'Spiking Neural Networks and Real-time Neural Decoding',
            'Neuralink: Real Technology, Published Results, and Current Limitations',
            'BrainGate: History of Results in Motor Paralysis',
            'Speech Decoding from Cortical Signals',
            'BCIs for Rehabilitation: Prosthetic Limbs and Functional Stimulation',
            'Sensory Feedback in Prostheses: Closing the Neural Loop',
            'BCIs for Augmentative Communication in ALS and Paralysis'
          ]
        },
        {
          nome: 'Artificial Intelligence and Cognition',
          topicos: [
            'Reinforcement Learning and Nucleus Accumbens: Dopamine as an Error Signal',
            'Memory Architectures in AI vs Hippocampus and Neocortex',
            'Curiosity, Exploration, and the Neuroscience of Novelty Applied to AI',
            'Generative Models and the Predictive Brain (Predictive Coding)',
            'Uncertainty and Bayesian Modulation: How the Brain Calculates Probabilities',
            'Catastrophic Forgetting in Artificial Networks vs Biological Continuous Plasticity',
            'Language Models and Natural Language Processing in the Brain'
          ]
        },
        {
          nome: 'Stimulation and Neurotechnology',
          topicos: [
            'tDCS: How Electrical Current Modulates Cortical Excitability',
            'TMS: Magnetic Stimulation and Cortical Mapping',
            'Deep Brain Stimulation (DBS): Circuits, Targets, and Algorithms',
            'Optogenetics: Controlling Neurons with Light (and Its Future Implications)',
            'Transcranial Focused Ultrasound: Stimulation Without Electrodes',
            'Real-Time Neurofeedback: Algorithms and Scientific Validation',
            'Virtual Reality and Neurorehabilitation: Illusion as Therapy'
          ]
        },
        {
          nome: 'Ethics and the Future',
          topicos: [
            'Neural Privacy: Are Your Brain Data Yours?',
            'Neurorights: Emerging Legislation to Protect the Brain',
            'Cognitive Enhancement via Technology: The Bioethical Debate',
            'Consciousness and AI: What Neuroscience Says About Feeling',
            'The Hard Problem of Consciousness: Qualia and Subjective Experience',
            'Technological Singularity Through the Lens of Neuroscience: Realistic?',
            'The Neuroscientist\'s Role in AI and Deeptech Companies',
            'Neuromorphic Computing: Chips That Think Like the Brain (Intel Loihi, IBM TrueNorth)',
            'The Future of BCIs in 10 Years: What Is Probable vs What Is Fiction'
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
            'The Purchase Decision: The Unconscious Decides Before Consciousness Realizes',
            'Kahneman\'s System 1 and System 2: Intuition vs Reason in Consumption',
            'Damasio\'s Somatic Marker: Emotion as a Value Signal',
            'Orbitofrontal Cortex and Subjective Value Coding',
            'Nucleus Accumbens and the Anticipation of Purchase Pleasure',
            'The Pain of Paying: Insular Cortex and Reluctance to Spend',
            'Hyperbolic Discounting: Why We Prefer the Now to the Better Later',
            'Loss Aversion: Kahneman, Tversky, and Neural Asymmetry',
            'Endowment Effect: Why We Value What We Own',
            'Neural Priming: How the Environment Changes Decisions Without Warning',
            'Cognitive Anchoring: The First Number Hijacks the Brain',
            'Framing Effect: Same Information, Different Decision',
            'Decoy Effect: The Third Item That Sells the Second',
            'Paradox of Choice: Why More Options Paralyze the Consumer'
          ]
        },
        {
          nome: 'Attention and Perception',
          topicos: [
            'Visual Attention: Saliency Hierarchy and Pre-attention',
            'Eye-Tracking: What the Eye Sees vs What the Person Thinks It Sees',
            'Recognition vs Recall Memory in Advertising',
            'Neuroaesthetics: Why Certain Designs Are Aesthetically Convincing',
            'Subliminal Processing: Does It Exist? What Neuroscience Actually Says',
            'The Attention Window: How Much Time the Brain Gives to an Ad',
            'Saliency Shift: Why Contrast and Novelty Capture Neural Resources',
            'Dual Coding: Simultaneous Text + Image and Memory'
          ]
        },
        {
          nome: 'Emotion and Brand Building',
          topicos: [
            'Mirror Neurons and Empathy in Consumption: Neural Storytelling',
            'Ekman\'s Basic Emotions and Facial Recognition in Research',
            'Emotion as a Judgment Shortcut: The Affect Heuristic',
            'Episodic Memory and Branding: What the Consumer Actually Remembers',
            'Brand Loyalty and Social Identity: The Neural Self-Concept',
            'Music and Emotional Response: Dopamine, Chills, and Memory',
            'Color and Neural Perception: What Neuroscience Actually Confirms',
            'Smell and Memory: The Olfactory System as an Underestimated Advertising Channel',
            'Touch and Proprioception: Neuroscience of Physical Retail'
          ]
        },
        {
          nome: 'Tools and Methodology',
          topicos: [
            'EEG in Marketing Research: What It Measures and Its Limitations',
            'fMRI in Consumer Studies: Cost, Scale, and Ecological Validity',
            'GSR (Galvanic Skin Response) and Emotional Arousal',
            'Facial Coding (FACS) in Concept Tests',
            'Neural vs Declarative Metrics: The Gap Between Talking and Feeling',
            'Experimental Design for Valid Neuromarketing Research',
            'How Not to Do Neuromarketing: The Most Common Mistakes',
            'Neuromyths in Marketing: What Studies Never Said'
          ]
        },
        {
          nome: 'Practical Applications and Ethics',
          topicos: [
            'Digital Neuromarketing: Click Prediction and Cognition-Based UX',
            'Gamification and the Dopaminergic Circuit: Reward, Variability, and Addiction',
            'Personalization by Behavioral Data: The Line Between Relevance and Manipulation',
            'Ethical Persuasion vs Manipulation: Where the Neural Limit Lies',
            'Neuroscience of Pricing: How the Brain Processes and Compares Values',
            'Neuromarketing in Public Health: Antismoking, Vaccines, and Behavior',
            'The Future of Neuromarketing: AI, Wearables, and Real-Time Behavior Prediction'
          ]
        }
      ]
    },
    {
      slug: 'neuroeducacao',
      nome: 'Neuroeducation',
      emoji: '📚',
      parent: 'neurociencia-profissional',
      whyStart: 'If the brain is the learning machine, education is the interface. Neuroeducation is hacking this interface based on what we know about neuroplasticidade.',
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
            'What Neuroeducation Is (and What It Definitely Is Not)',
            'The Neuromyth Crisis: Learning Styles, Left/Right Brain, 10%',
            'The Translational Gap: Why Neural Knowledge Does Not Turn Into Easy Practice',
            'Neuroscience as a Critical Lens to Evaluate Educational Methodologies'
          ]
        },
        {
          nome: 'Learning Mechanisms',
          topicos: [
            'LTP (Long-Term Potentiation): The Molecular Mechanism of Learning',
            'LTD (Long-Term Depression): Forgetting as a Neural Resource',
            'Hebb\'s Rule: "Neurons That Fire Together Wire Together"',
            'Memory Consolidation: From Hippocampus to Nighttime Cortex',
            'Declarative vs Procedural Memory: Hippocampus vs Striatum vs Cerebellum',
            'Working Memory: Capacity, Limits, and Implications for Teaching',
            'Executive Attention: Prefrontal Cortex, Dopamine, and Sustained Focus',
            'Deep vs Shallow Processing: The Neuroscience of Real Understanding',
            'The Spacing Effect: Why Cramming Doesn\'t Work',
            'The Interleaving Effect: Why Mixing Topics Works',
            'Active Retrieval as a Neural Tool: The Testing Effect and Memory',
            'The Elaboration Technique: Connecting New Concepts to Old Ones in the Cortex',
            'Generation Learning: Writing in Your Own Words Strengthens Engrams',
            'The Illusion of Fluency: Why Rereading Seems Like and Is Not Learning',
            'Rest and Learning: The Role of the Default Mode Network in Consolidation'
          ]
        },
        {
          nome: 'Sleep and Learning',
          topicos: [
            'Sleep and Memory Consolidation: The Critical Stages of NREM and REM',
            'Glymphatic System: The Nightly Brainwash That Occurs During Sleep',
            'Sleep Deprivation and Cognition: The Impact on School Learning',
            'Sleep Hygiene for Students: Evidence-Based Mechanism and Protocol'
          ]
        },
        {
          nome: 'Emotion, Motivation, and Stress',
          topicos: [
            'Emotion as a Memory Anchor: Why We Remember What We Feel',
            'The Amygdala and Learning: Fear, Reward, and Attention',
            'Cortisol and Learning: Acute Stress Can Help, Chronic Destroys',
            'Dopamine and Intrinsic Motivation: The Circuit That Loves to Learn for Learning\'s Sake',
            'Self-Efficacy and Neuroplasticity: Belief in Growth Activates the Brain',
            'Dweck\'s Growth Mindset: The Neurobiological Support',
            'Feedback and the Brain: How Error Activates Learning When Processed',
            'Reward vs Punishment as Pedagogical Tools: What Neuroscience Says'
          ]
        },
        {
          nome: 'Populations and Development',
          topicos: [
            'Brain Plasticity in Childhood: Sensitive Periods and Opportunity Windows',
            'Adolescence and the Immature Prefrontal Cortex: The Brain Under Construction',
            'Cognitive Aging: How the Adult Brain Learns Differently',
            'ADHD in Educational Context: Strategies Based on the Neural Mechanism',
            'Dyslexia: Phonological Processing, Temporal Cortex, and Intervention',
            'Dyscalculia: Numerical Processing and Parietal Cortex',
            'Giftedness: High Cognitive Performance and Its Neural Bases',
            'Reading and the Brain: The Reading Triangle (Phonology, Orthography, Semantics)'
          ]
        },
        {
          nome: 'Technology and the Future of Education',
          topicos: [
            'Gamification and Dopamine: Why It Can Work (and How It Can Fail)',
            'Virtual Reality and Immersive Learning: Neural Mechanism',
            'AI Tutors and Adaptive Learning: Neuroscience of Personalized Feedback',
            'Cognitive Load in Digital Education: Interface Design and Working Memory',
            'Neuroeducation at Scale: The Abyss Between Laboratory and Public Policy',
            'The Neuroscientist\'s Role in Edtech Startups',
            'The Future: Educational Neurofeedback and Neural Personalization'
          ]
        },
        {
          nome: 'Metacognition and Practical Systems',
          topicos: [
            'Inspectional Reading and Analytical Reading',
            'The Illusion of Fluency (Why rereading doesn\'t work)',
            'Smart Note-Taking Systems (Zettelkasten)',
            'Cognitive Load Management and Focus (Deep Work)',
            'Feynman Technique: Explaining to understand',
            'First-Principles Mental Models',
            'Spaced Repetition (Spaced Repetition and Anki)',
            'Active Retrieval: Testing as a Study Tool',
            'The Generation Effect and Active Elaboration',
            'Interleaving: Alternating Topics to Retain More',
            'How to Create a Permanent Note System',
            'Chunking: Grouping Information for Long-Term Memory',
            'Sleep Learning: The Role of Sleep in Consolidation',
            'Knowledge Calibration: Knowing What You Don\'t Know',
            'Building a Second Brain (PKM System)',
            'Deep Productivity: Cal Newport in Practice',
            'Estratégias para Estudar Matérias Difíceis',
            'AI as a Study Partner: Using LLMs to Learn Better',
            'Pomodoro Technique vs Time Blocking: When to Use Each',
            'Digital Detox: Reclaiming Attention in the Age of Notifications',
            'Ebbinghaus Forgetting Curve: The Mathematics of Memory',
            'Mind Maps and Visual Thinking for Retention'
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
            'How Scientific Research in Neuroscience Works: From Lab to Paper',
            'The Scientific Method Applied to Neuroscience: Hypothesis, Experiment, Refutation',
            'Study Types: Correlational, Experimental, Longitudinal, Case-Control',
            'Levels of Analysis: Molecular, Cellular, Circuit, System, Behavior'
          ]
        },
        {
          nome: 'Research Tools',
          topicos: [
            'fMRI: BOLD Signal, What It Really Measures and Its Critical Limitations',
            'Resting-State fMRI: Functional Networks and Connectivity',
            'EEG/MEG: High Temporal Resolution, Low Spatial Resolution — Trade-offs',
            'Single-Cell Electrophysiology: Patch-Clamp and Unitary Recording',
            'Optogenetics: Manipulating Circuits with Cell Specificity',
            'Chemogenetics (DREADDs): Pharmacological Control of Neural Circuits',
            'Two-Photon Microscopy: Seeing Neurons in Action in Vivo',
            'Brain Clearing (CLARITY, iDISCO): The Transparent Brain',
            'Single-Cell RNA Sequencing (scRNA-seq) in Neuroscience',
            'Spatial Sequencing: Where Each Gene Is Expressed in the Brain',
            'Animal Models: Rats, Mice, Primates — Validity and Limits',
            'Brain Organoids: Potential and Limitations of 3D Models',
            'Patient-Derived iPSCs: Modeling Human Diseases in the Laboratory'
          ]
        },
        {
          nome: 'Statistics and Methodology',
          topicos: [
            'Statistical Power: Why Small-n Studies Are Dangerous',
            'P-value, Alpha, and What Statistical Significance Does Not Mean',
            'Correction for Multiple Comparisons: FDR, Bonferroni in Neuroimaging',
            'Effect Size: Why It Is More Important Than the P-value',
            'Confidence Intervals in Neuroscience: How to Interpret Them',
            'Meta-Analysis and Systematic Review: Aggregating Evidence Correctly',
            'Publication Bias: Why Negative Results Disappear'
          ]
        },
        {
          nome: 'The Replication Crisis',
          topicos: [
            'The Replication Crisis in Psychology and Neuroscience: What Went Wrong',
            'P-Hacking: Torturing Data Until They Confess',
            'HARKing (Hypothesizing After Results are Known): Unintentional Fraud',
            'False-Positives in fMRI: The Dead Salmon Study',
            'Skull Fluctuations in Resting-State Studies: A Persistent Bug',
            'Open Science: Pre-Registration as a Solution',
            'Open Data, Open Source, and Reproducibility in Neuroscience'
          ]
        },
        {
          nome: 'Grand Projects and the Future',
          topicos: [
            'Human Connectome Project: Mapping All Brain Connections',
            'BRAIN Initiative (USA) and European Human Brain Project: Scope and Results',
            'Allen Brain Atlas: The Genetic Map of the Brain',
            'Computational Neuroscience: Mathematical Models and Simulations',
            'AI Accelerating Discovery in Neuroscience: AlphaFold and Beyond'
          ]
        },
        {
          nome: 'Career and Ethics in Academia',
          topicos: [
            'Academic Career: Bachelor\'s, Master\'s, Doctorate, Post-Doc — The Real Path',
            'Research Funding: Bids, Grants, and the Politics of Scientific Money',
            'How to Write a Neuroscience Paper to Be Published',
            'Peer Review: The Peer Review System and Its Flaws',
            'Publish or Perish: The Perverse Incentive of Academia',
            'Science Communication: How to Talk About Neuroscience Without Sensationalism',
            'Research Ethics with Humans: Ethics Committee, Informed Consent (TCLE), and Anonymization',
            'Research Ethics with Animals: The Three Rs (Replace, Reduce, Refine)',
            'Diversity in Neuroscience: Why WEIRD Samples Distort Science',
            'The Future: Precision Neuroscience, Big Data, and Global Consortiums'
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
            'The Motor System: Primary Motor Cortex, Basal Ganglia, and Cerebellum',
            'Voluntary Movement Control: From Intention to Muscle Contraction',
            'The Motor Unit: Motor Neuron + Muscle Fibers and Neural Recruitment',
            'Motor Learning: Procedural Memory, Automation, and the Cerebellum',
            'Stages of Motor Learning: Cognitive, Associative, Autonomous (Fitts and Posner)',
            'Motor Variability: Why Training Under Varied Conditions Works',
            'Mental Practice and Visualization: Motor Cortex Activates Even Without Movement',
            'Motor Learning Transfer: When Learning A Helps Learning B',
            'Contextual Interference vs Random Practice: The Neuroscience of Varied Training',
            'Motor Neuroplasticity in Elite Athletes: The Expert\'s Brain'
          ]
        },
        {
          nome: 'Fatigue and Peak Performance',
          topicos: [
            'Central vs Peripheral Fatigue: What Really Limits Effort',
            'Tim Noakes\' Central Governor: The Brain as the Arbiter of Performance',
            'Psychoregulatory Theory: RPE (Rating of Perceived Exertion) as a Neural Regulator',
            'Neurochemistry of Maximum Effort: Dopamine, Serotonin, and Decision Fatigue',
            'Cerebral Ammonia and Fatigue During Prolonged Exercise',
            'Hypoglycemia and Cognitive Function During Exercise: The Fuel Limit',
            'Heat and Cognitive Performance: Hypothalamus, Temperature, and Decision-Making',
            'Altitude and Hypoxia: Impact on Neural and Motor Performance'
          ]
        },
        {
          nome: 'Cognition in Sports',
          topicos: [
            'Split-Second Decision Making: The Premotor Cortex in Reaction Sports',
            'Reaction Time: Neurology, Training, and Individual Variation',
            'Selective Attention in Sports: Quiet Eye and Neural Focus on the Target',
            'Opponent\'s Movement Anticipation: Clue Reading and Mirror Neurons',
            'Decision Making Under Pressure: The Role of the Prefrontal Cortex and Amygdala',
            'Working Memory in Team Sports: Keeping the Cognitive Map of the Game',
            'Tactical Creativity: Neural Insight in the Sports Context'
          ]
        },
        {
          nome: 'Emotion, Stress, and Performance',
          topicos: [
            'Competition Anxiety: Cortisol, Amygdala, and Underperformance',
            'The Yerkes-Dodson Curve: Optimal Performance vs Over-activation',
            'Optimal Performance Zone: The Neuroscience Behind "Getting into the Zone"',
            'Flow State: The Neural State of Effortless Peak Performance',
            'Choking Under Pressure: When Consciousness Sabotages the Automatic',
            'Emotional Regulation in Athletes: Strategies Based on the Prefrontal Cortex',
            'Mindfulness in Sports: Present Attention and Autonomic Response',
            'Positive Psychology and Neurochemistry of Confidence: Testosterone and Cortisol',
            'Pre-performance Rituals: Neural Networks of Preparation and Activation'
          ]
        },
        {
          nome: 'Optimized Nutrition and Metabolism',
          topicos: [
            'The Insulin and Glycemia Mechanism',
            'Macronutrients: Proteins, Carbohydrates, and Fats',
            'Intermittent Fasting and Autophagy',
            'Gut Microbiome and the Gut-Brain Axis',
            'Evidence-Based Supplementation',
            'Protein: Optimal Quantity and Timing',
            'Saturated vs Unsaturated Fats: The Correct Debate',
            'Carbohydrates and Performance: When They Are Allies',
            'Critical Micronutrients: Zinc, Iron, B12, and Folate',
            'Ketogenic Diet: Mechanism, Benefits, and Risks',
            'Chronic Inflammation and Anti-inflammatory Food',
            'Hydration and Electrolytes in Performance',
            'Label Reading: What Actually Matters',
            'Nutrition for Cognition: The Brain at the Table',
            'Eating for Longevity: Blue Zones Lessons',
            'GLP-1 and Semaglutide: The Science Behind the Revolution',
            'Nutrigenomics: Personalized Diet by DNA',
            'Ultra-Processed Foods: The Neurological Impact of Industrial Food',
            'Strategic Supplementation: The Evidence-Based Stack'
          ]
        },
        {
          nome: 'Physiology, Training, and Hypertrophy',
          topicos: [
            'Signaling Pathways (mTOR) and Hypertrophy',
            'Energy Systems (ATP-CP, Glycolytic, Oxidative)',
            'Progressive Overload (The Growth Engine)',
            'VO2 Max and Mitochondrial Health',
            'Muscle Recovery and Injury Prevention',
            'Muscle Fibers: Type I vs Type II',
            'Periodization: Undulation and Training Cycles',
            'Frequency, Volume, and Intensity: The Training Triangle',
            'Deload: The Importance of Scheduled Rest',
            'Cardio for Longevity vs Cardio for Performance',
            'Zone 2: The Aerobic Training That Everyone Ignores',
            'Hormones and Training: Testosterone, GH, and Cortisol',
            'Mobility and Flexibility for Longevity',
            'Peri-workout Nutrition: What to Eat and When',
            'Performance Monitoring: RPE, HRV, and Metrics',
            'Isometric and Eccentric Exercises for Tendons',
            'Functional Training vs Bodybuilding: Trade-offs',
            'Physical Longevity: Peter Attia\'s Protocol',
            'Rucking and Zone 2: The Most Efficient Cardio There Is'
          ]
        },
        {
          nome: 'Recovery, Pathologies, and Defense',
          topicos: [
            'Sleep and Motor Memory Consolidation: What Happens During the Night',
            'Sleep Deprivation and Performance: The Catastrophic Impact on Reaction Time',
            'HRV (Heart Rate Variability): Window to the Autonomic Nervous System',
            'Brain Nutrition in Performance: Glucose, Creatine, and Caffeine',
            'Caffeine and the Central Nervous System: Adenosine, Attention, and Performance',
            'tDCS and TMS in Sports Performance: What Studies Actually Show',
            'Neurofeedback for Athletes: Evidence, Protocols, and Skepticism',
            'Portable EEG in Athlete Monitoring: State of the Art',
            'Virtual Reality in Cognitive Training for Sports',
            'Concussion and Mild Traumatic Brain Injury: Mechanism, Symptoms, and Return',
            'CTE (Chronic Traumatic Encephalopathy): The Neural Cost of Contact Sports',
            'Overtraining Syndrome: When the CNS Collapses',
            'Burnout in Athletes: The Neural Exhaustion of High Performance',
            'Military Neuroscience: Decision-Making in Life-or-Death Situations',
            'SERE Training and Neural Resilience: How Extreme Stress Is Processed',
            'Cognitive Performance Under Sleep Deprivation and Acute Stress',
            'Pain as Neural Perception: Why Athletes Tolerate More',
            'The Neuroscientist\'s Role in High-Performance and Defense Centers'
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
      ementa: [
        'The Glymphatic System and Nightly Brainwashing',
        'Sleep Architecture: N1, N2, N3, and REM Transitions',
        'Homeostatic Adenosine Pressure',
        'The Pineal Gland and Endogenous Melatonin Secretion',
        'The Effect of Blue Light Suppressing Melatonin',
        'Genetic Chronotypes (Bears, Wolves, Lions, Dolphins)',
        'Social Jet Lag and Circadian Desynchronization',
        'Micro-arousals and Hidden Apnea',
        'Polysomnography Metrics (HRV during sleep)',
        'The Role of Magnesium (Threonate/Bisglycinate) and Apigenin',
        'What Is the mTOR Pathway and the Cellular Growth Paradox',
        'AMPK: The Energy and Survival Switch',
        'Autophagy and Cellular Senescence (Zombie Cells)',
        'Insulin Sensitivity vs Peripheral Resistance',
        'Metabolic Flexibility: Burning Glucose vs Ketones',
        'Mitochondrial Biogenesis: Increasing the Cell\'s Engine',
        'NAD+ and Sirtuins (The longevity gene)',
        'The Mathematics of Zone 2 Cardio (Baseline Lactic Acid)',
        'VO2 Max as the Single Greatest Predictor of Life Expectancy',
        'Telomeres and the Telomerase Enzyme',
        'Bioavailability vs Nutritional Density',
        'The Gut-Brain Axis and the Vagus Nerve',
        'The Microbiome and Intestinal Serotonin Production',
        'Sodium-Potassium Balance in the Cell Pump',
        'Omega-3 (EPA/DHA) and Neural Membrane Fluidity',
        'Strategic Carb Cycling for Glycogen Peaks',
        'Ketogenic Diet and Beta-Hydroxybutyrate Production',
        'Antinutritional Factors (Phytates, Oxalates, Lectins)',
        'The Physiology of Prolonged Intermittent Fasting (48h+)',
        'Hormesis: The Right Dose of Biological Stress',
        'Active Cold Exposure (Cryotherapy) and Vasoconstriction',
        'Activation of Brown Adipose Tissue (Brown Fat)',
        'Cold-Induced Norepinephrine Release',
        'Heat Shock Therapy (Sauna) and Heat Shock Proteins (HSP)',
        'The Lymphatic System and Metabolite Elimination',
        'Red Light Therapy (Photobiomodulation) on ATP',
        'Earthing (Grounding) and Electron Transfer',
        'Isometric Super-compensation Exercises',
        'Longevity Engineering: Biological Reversal Protocols',
        'Real-Time Biomarker-Based Nutrition',
        'Third-Generation Biohacking: Senolytics and Cellular Reprogramming',
        'Circadian Rhythm and Morning Sunlight',
        'Sleep Architecture (REM and Deep Sleep)',
        'Thermogenesis and Cold Exposure',
        'Eating Window and Metabolic Optimization',
        'Neurotransmitters and Nutrition (Dopamine Base)',
        'Light Protocols: Morning, Afternoon, and Night',
        'Sauna and Heat Shock Proteins',
        'Evidence-Based Supplements: Creatine, Magnesium, Vitamin D',
        'HRV (Heart Rate Variability) as a Recovery Marker',
        'Aerobic Training Zones for Longevity',
        'Cortisol Modulation Throughout the Day',
        'Prolonged Fasting: Benefits and Structural Risks',
        'Breathing Techniques (Wim Hof, Box Breathing)',
        'Monitoring Wearables: What Is Worth Measuring',
        'Longevidade: Bryan Johnson\'s Protocol',
        'Red Light Therapy (Photobiomodulation)',
        'Grounding (Earthing): Evidence and Limitations',
        'CGM (Continuous Glucose Monitor): Monitoring Glucose in Real-Time',
        'Peptides and Hormesis: Optimization Frontiers'
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
        'Reward Prediction Error (Dopamine Mechanics)',
        'Serotonin vs Dopamine: Satiety vs Pursuit',
        'Receptor Reset: Dopamine "Fasting"',
        'The Autonomic Nervous System (Sympathetic vs Parasympathetic)',
        'Acute Stress Control via Breathing (Physiological Sigh)',
        'Directed Neuroplasticity: How to Force the Brain to Learn',
        'Caffeine and Adenosine Blockade (Strategic Use)',
        'L-Theanine, Creatine, and Cognitive Supplementation',
        'Microdosing and the Emerging Science of Psychedelics',
        'The Mathematics of Flow: Challenge vs Skill Equation',
        'Reduction of Prefrontal Cortex Activity (Transient Hypofrontality)',
        'Environmental Triggers for Rapid Induction'
      ]
    }
  ]
};
