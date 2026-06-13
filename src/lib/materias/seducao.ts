import { MateriaConfig } from '@/types';

export const seducaoHub: MateriaConfig = {
  slug: 'seducao-hub',
  nome: 'Social Dynamics & Seduction',
  emoji: '🥂',
  descricao: 'The definitive hub for social mastery. From the opening line to relationship management, learn the deep mechanics of human attraction, emotional engineering, and building a magnetic lifestyle.',
  isCategory: true,
  children: [
    {
      slug: 'seducao-inner-game',
      nome: 'Inner Game & Confidence',
      emoji: '🧠',
      descricao: 'The foundation of all social success. Build an unshakeable self-image, destroy approach anxiety, and develop true emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'Start here or you will waste every technique. Without the correct internal state, every approach will feel forced and will be perceived as such.',
      contexto: 'Focus on behavioral psychology, practical stoicism, and cognitive restructuring. Teach that true confidence is not "knowing it will work out", but "knowing you will be fine regardless of the outcome".',
      fases: [
        {
          nome: 'LEVEL 1 — COGNITIVE FOUNDATION (What is breaking you from within)',
          topicos: [
            'Deconstructing Limiting Beliefs about Attraction',
            'Approach Anxiety (AA): Understanding the Fight/Flight Response',
            'Internal vs. External Validation (The End of Neediness)',
            'Overcoming the Nice Guy: Why people-pleasing does not work',
            'The Social Judgment Mechanism: Why the Brain Anticipates Rejection',
            'Self-Compassion without Self-Sabotage: The Difference between Kindness and Weakness'
          ]
        },
        {
          nome: 'LEVEL 2 — IDENTITY AND PURPOSE (Who you are)',
          topicos: [
            'Identity and Self-Concept: Who you are when no one is watching',
            'Masculinity and Purpose: The Mission as an Anchor',
            'Congruence: Aligning what you Think, Say, and Do',
            'High Status: What Really Projects Social Dominance',
            'The 3 Levels of Identity: Behaviors, Habits, and Core Beliefs',
            'Building a System of Inviolable Personal Values',
            'The Social Persona vs. The True Self: Mask or Armor?'
          ]
        },
        {
          nome: 'LEVEL 3 — STATE AND PRESENCE (How you show up)',
          topicos: [
            'Presence and Grounding (Physical Anchoring)',
            'Emotional State: How to Calibrate Your Energy',
            'Frame Control: Who dictates the reality of the interaction?',
            'Meditation and Mindfulness for Social Presence',
            'Autonomic Nervous System Regulation (Sympathetic vs. Parasympathetic)',
            'Voice, Rhythm, and Tonality: The Physical Impact of Presence',
            'Eye Contact as a Tool of Dominance and Connection'
          ]
        },
        {
          nome: 'LEVEL 4 — ANTIFRAGILITY AND ACTION (How you behave under pressure)',
          topicos: [
            'Outcome Independence: The Paradox of Attraction',
            'Handling Rejection as Direct Feedback',
            'Abundance vs. Scarcity in Practice',
            'Detachment from Outcome in Real Time',
            'Leaving the Comfort Zone: The Exposure Protocol',
            'Community and Accountability for Inner Game',
            'Building a Personal Development Routine',
            'Social Antifragility: Growing with Pressure Instead of Breaking',
            'Social Inertia: Why Starting Is Always the Hardest Step',
            'Post-Rejection: The Protocol for Not Letting a Failure Define the Pattern'
          ]
        }
      ]
    },
    {
      slug: 'seducao-cold-approach',
      nome: 'Cold Approach & Opening',
      emoji: '🚶‍♂️',
      descricao: 'The art of initiating interactions from absolute zero. Master body language, opening lines, and rapid transitions in any environment.',
      parent: 'seducao-hub',
      whyStart: 'With your internal state calibrated, it is time to act. This stage dismantles the fear of approaching by deconstructing the mechanics of the cold approach.',
      contexto: 'Focus on pure mechanics: approach angles, voice tonality, social calibration, and transitions.',
      ementa: [
        'High-Status Body Language (Posture, Eye Contact)',
        'The 3-Second Rule',
        'Direct vs. Indirect Openers: When to use each',
        'The False Time Constraint',
        'Voice Tonality: Ascending vs. Descending',
        'Where to Approach: Day vs. Night, Environments and Contexts',
        'The Stack: Chaining Observations to Keep the Conversation Going',
        'Assuming Familiarity (Assume Rapport)',
        'Natural Transitions: Moving from the Opener to the Conversation',
        'Social Calibration: Reading Indicators of Interest (IOIs)',
        'How to Get the Contact in a Fluid Way',
        'The Art of the Interrupt and Return (False Exit)',
        'Group Dynamics: Approaching When She Is Not Alone',
        'Handling Obstacles (Cockblockers and Friends)',
        'Developing a Weekly Approach Routine',
        'Field Reports: How to Analyze Your Sessions',
        'The 5 Stages of Learning Cold Approach',
        'Day Game vs. Night Game Environments: Tactical Differences'
      ]
    },
    {
      slug: 'seducao-emocao',
      nome: 'Emotional Engineering',
      emoji: '🔥',
      descricao: 'Attraction is not logical, it is emotional. Learn to generate tension, break predictability, and create emotional peaks that anchor genuine interest.',
      parent: 'seducao-hub',
      whyStart: 'You already know how to open. Now you need to sustain. Logical conversations kill interest — this stage teaches you to create emotional variation, tension, and mystery.',
      contexto: 'Focus on advanced conversational dynamics: Push/Pull, qualification, sexual tension, and storytelling.',
      ementa: [
        'Escaping the Logical Interview: How to Evoke Emotions',
        'The Mechanics of Push and Pull',
        'Breaking Rapport vs. Seeking Rapport',
        'Calibrated Teasing and Playful Provocations',
        'Misogyny vs. Playfulness: The Critical Difference',
        'The Gaze and Non-Verbal Communication',
        'Creating Open Loops: The Interest of Anticipation',
        'Qualification: The Game of Making the Person Invest',
        'Magnetic Storytelling: The Structure of Good Stories',
        'Powerful Vulnerability: Connecting at Deeper Levels',
        'Sexual Tension: Verbal Escalation and Subtext',
        'Humor as a Tool of Attraction',
        'Deep Rapport: Finding Common Values',
        'The Transition from Flirting to Real Connection',
        'Flow State: Conversing Effortlessly',
        'Emotional Improvisation: Reacting, not Planning',
        'Advanced Calibration: Reading Microexpressions'
      ]
    },
    {
      slug: 'seducao-text-game',
      nome: 'Text Game & Digital',
      emoji: '📱',
      descricao: 'The game has moved to screens. Master escalation via WhatsApp/Instagram, how to keep interest high, and close dates quickly and efficiently.',
      parent: 'seducao-hub',
      whyStart: 'After the approach, the game moves to the phone. The only objective is: set the date.',
      contexto: 'Focus on the utility of text: the goal of texting is to set up the date, not to become a chat buddy.',
      ementa: [
        'The First Message (The Humorous Callback)',
        'The Golden Rule of Texting: The Goal is the Date',
        'Investment Ratio (Who texts more?)',
        'Strategic Response Timing (Pacing)',
        'Tone and Calibration in Text vs. In Person',
        'Emojis and Informal Language: When to use them',
        'How to Stand Out from 100 Other Guys on Her Phone',
        'Shit Tests via Message: How to Defuse and Flip',
        'Using Voice Notes and Photos to Create Closeness',
        'Re-engagement: Reviving Cold Contacts (Ping Texts)',
        'Solid Close: Extracting the Yes for the Date',
        'Instagram as a Warm-Up Channel',
        'When and How to Call (Phone Game)',
        'Managing Multiple Conversations without Losing the Thread'
      ]
    },
    {
      slug: 'seducao-lifestyle',
      nome: 'Lifestyle & Social Engineering',
      emoji: '🌍',
      descricao: 'Attractive people have attractive lives. Learn to structure your social circles, social media, and lifestyle so that interactions happen on autopilot.',
      parent: 'seducao-hub',
      whyStart: 'Up to this point you have learned to play the game. Now you change the board.',
      contexto: 'Focus on social value, pre-selection, and creating events/communities where the student is the center (Hub).',
      ementa: [
        'The Organizer Paradigm (Be the Connector)',
        'Pre-Communicated Social Value (Pre-Selection)',
        'The Halo Effect: Grooming, Style, and First Impression',
        'How to Enter High-Value Circles',
        'Strategic Networking: Meeting the Right People',
        'Style as Non-Verbal Communication',
        'Fitness as the Foundation of Attraction and Confidence',
        'Digital Showcase: Quick Instagram Optimization',
        'Wingman Dynamics: How to Act as a Duo at Night',
        'Hosting Events: The Game of Living Alone',
        'Status Transition: From Acquaintance to VIP Guest',
        'Building a Life That Attracts without Conscious Effort',
        'Mission and Purpose as the Greatest Aphrodisiac',
        'Travel and Experiences as Social Capital'
      ]
    },
    {
      slug: 'seducao-relacionamentos',
      nome: 'Relationship Management',
      emoji: '👑',
      descricao: 'Attracting is just the first part. Learn to lead the date, maintain interest, and establish leadership boundaries in long-term relationships.',
      parent: 'seducao-hub',
      whyStart: 'The final module. Everything you learned before was to get here. Long-term relationships require polarity, leadership, and tension maintenance.',
      contexto: 'Focus on pragmatic masculine leadership, date dynamics, and boundary setting.',
      ementa: [
        'The Architecture of the Perfect Date (Multiple Venues)',
        'Decisive Leadership: "We\'re Going There" vs. "What Do You Want?"',
        'Physical Escalation (Kino): Fluidity and Consent',
        'The Transition to Final Logistics (The Place)',
        'The First Date: Objectives, Duration, and Dynamics',
        'How to Recover a Date That Is Going Cold',
        'Paying the Bill: The Strategic Approach',
        'Establishing Boundaries Early On',
        'Sexual Polarity: The Role of Masculine Energy',
        'Handling Congruence Tests in Relationships',
        'Preventing the Friend Zone Effect: How to Keep Tension Active',
        'Open vs. Exclusive Relationship: The Conversation',
        'Jealousy and Possessiveness: Structural Management',
        'Leaving a Relationship without Drama',
        'Integrating Everything: Inner Game + Social Skills + Lifestyle',
        'Mental Health in Intense Relationships',
        'When to Stop and Evaluate Your Love Life'
      ]
    },
    {
      slug: 'comportamento-masculino-alita',
      nome: 'Masculine Behavior & Realism',
      emoji: '👁️',
      descricao: 'The study of feminine nature and masculine behavior without romantic illusions. Deconstruction of idealism and strengthening of inner strength and emotional independence.',
      parent: 'seducao-hub',
      whyStart: 'This stage acts as an antidote to romantic illusions. It is essential for men to understand the power dynamics and not be held hostage by their own emotions in interactions.',
      contexto: 'Focus on the concepts discussed by Nessahan Alita and theorists of masculine praxeology. Explain the logic behind passion as weakness, emotional traps (tests and manipulations), and the pursuit of authenticity and inner strength, always maintaining technical rigor and avoiding cheap misogyny.',
      ementa: [
        'Deconstructing the Myth of Romantic Love',
        'The Illusion of the Soulmate and Specialism ("She is Different")',
        'The Magnetism of Coldness: Why indifference attracts',
        'The Paradox of Passion: Passion as masculine weakness',
        'The Dynamics of Contempt: Inverting the polarity of power',
        'Congruence Tests: How and why women test men',
        'The Fidelity Test and the Provocation of Jealousy',
        'Emotional Blackmail and Subtle Manipulation',
        'The Blame Game: How to avoid taking on responsibilities that are not yours',
        'The Male Ego as a Blind Spot and Easy Target',
        'The White Knight Syndrome: The danger of trying to "save" women',
        'How Anxiety and Neediness Destroy Real Attraction',
        'Feminine Logic vs. Masculine Logic',
        'Dealing with Mood Fluctuations and Emotional Instability',
        'Strategic Silence: The weapon against provocations and drama',
        'True Detachment vs. Faked Detachment (Performance)',
        'Masculine Suffering and Growth through Rupture',
        'The Fortress Posture: Dealing with rejection and indifference',
        'Emotional Self-Control: The Art of Non-Reaction',
        'The Danger of Excessive Validation and Flattery',
        'Praxeological Understanding: Hypergamous Nature and Security',
        'The Complaint Dynamic: Why trying to solve her problem usually fails',
        'The Power of "No": Setting limits without aggression',
        'Dealing with Feminine "Rebellion" without Losing Leadership',
        'How to Handle Female Competition and Her "Friends"',
        'The Illusion of Friendship between Men and Women (The Pragmatic View)',
        'Regaining Control After Having Been Emotionally Subdued',
        'The Need for a Purpose Greater than the Relationship',
        'Demystifying the "War of the Sexes": Surviving with intelligence'
      ],
      layout: 'narrative'
    }
  ]
};
