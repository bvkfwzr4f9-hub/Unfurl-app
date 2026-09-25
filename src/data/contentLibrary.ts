/**
 * The 11-section content library, rebuilt from the "Unfurl Content Library"
 * package (Sept 2026) — real, research-grounded content replacing the
 * earlier placeholder copy. Each section is now a set of short pieces
 * (previously a fixed 3-step article/video/practice course) matching the
 * package's own architecture; step count varies by section (4-7) rather
 * than a fixed 3.
 *
 * Per the package's own completion tracking, roughly half of all pieces
 * are full, fact-checked drafts (grounded in 2025-2026 research, citations
 * kept in the source package rather than in-app copy) and the rest are
 * outlines flagged for a dedicated drafting/fact-checking pass — those
 * ship as short, honest placeholders (using whatever partial material the
 * package already has) rather than fabricated "finished" content. A
 * placeholder step is still a real, completable step — same pattern
 * previously used for "video coming soon" — so it never blocks progress
 * through the rest of a section.
 *
 * The package drops video entirely in favor of Article + Audio narration
 * (cheaper to produce, and some readers prefer listening) — no audio
 * files exist yet, so every step currently ships as text-only; audio is a
 * later addition once real narration exists. A future, separate video
 * section can be added once real video content exists.
 *
 * `teaser` is always visible, even for premium sections and signed-out
 * visitors, on the section overview. The step list itself (and therefore
 * all step content) is gated behind membership when `isPremium` is true —
 * see ContentDetailScreen.
 *
 * `tags` are `${intakeQuestionId}:${answerId}` pairs (see
 * src/data/intakeQuestions.ts) used to recommend sections based on a
 * member's intake answers — see src/services/recommendations.ts.
 */

export type ContentStepType = 'article' | 'video' | 'practice';

export interface ContentStep {
  id: string;
  type: ContentStepType;
  title: string;
  body: string[];
  videoId?: string;
}

export interface ContentSection {
  slug: string;
  title: string;
  emoji: string;
  summary: string;
  isPremium: boolean;
  teaser: string;
  steps: ContentStep[];
  tags: string[];
}

export const contentLibrary: ContentSection[] = [
  {
    slug: 'recognition-validation',
    emoji: '💚',
    title: 'Recognition & Validation',
    summary: "You're not imagining this — and you're not alone in it.",
    isPremium: false,
    teaser:
      "Every woman arriving here has already been somewhere else first — a doctor's office, a search engine, a friend who said \"sounds like stress.\" This section's only job is to make you feel believed, before you're asked to learn anything, do anything, or pay anything.",
    steps: [
      {
        id: '1-1',
        type: 'article',
        title: "You're Not Losing Your Mind",
        body: [
          "If you've sat across from a doctor and been told it's \"just stress\" — if you've searched your own symptoms alone at midnight because no one else seemed to take them seriously — if you've quietly wondered whether you're losing your memory, your body, or your grip on things entirely — we want to say something before anything else: you're not.",
          'What you\'re feeling is real. It has a name. And you are far from the first woman to sit exactly where you are right now, wondering why nobody warned her.',
          "Here is what almost nobody tells you up front: nearly 40% of women feel dismissed or misdiagnosed when they bring these symptoms to a doctor. Fewer than 1 in 5 primary care physicians have any formal training in menopause. If you've felt unheard, it isn't because you explained it wrong — it's because the healthcare system, as it currently exists, wasn't built to catch this.",
          "This isn't a medical platform, and we won't diagnose you or replace your doctor. What we can do is different: help you understand what's actually happening in your body, give you real language for it, show you how women in other cultures have understood this exact transition for generations — not as decline, but as passage — and, when you're ready, connect you with other women going through it at the same time you are.",
          "You don't have to figure this out by yourself. You don't have to perform \"I'm fine\" through one more appointment.",
          "We're going to start with the simplest possible step: naming what's real. That's it. That's all this first part asks of you.",
        ],
      },
      {
        id: '1-2',
        type: 'article',
        title: "Why Doctors Dismiss This — And Why It's Not You",
        body: [
          "If you've left a doctor's appointment feeling brushed off, rushed, or quietly convinced you'd made too big a deal of it — you deserve to know why that happened, because it almost certainly wasn't about you.",
          "The training gap is real, and it's large. Fewer than 1 in 5 primary care physicians — the doctors most women see first — have any formal training in menopause. Medical schools have historically spent little to no dedicated time on it. A doctor isn't withholding help because they've decided your symptoms don't matter; in a lot of cases, they genuinely were never taught how to recognize what you're describing.",
          'The symptoms rarely arrive as a clean list. Hot flashes get discussed. But brain fog, joint pain, heart palpitations, mood swings, and sleep that falls apart for no obvious reason? Those often get treated as separate, unrelated complaints — sent to different specialists, or waved off as "just stress," "just aging," or "just anxiety." When symptoms don\'t arrive as a tidy package, they\'re harder for an undertrained system to connect.',
          "The cost of this gap is enormous — and it's not just personal. In the US alone, untreated menopause symptoms are estimated to cost $26 billion a year in medical expenses and lost productivity combined. This isn't a handful of women having a hard time. It's a structural, economywide blind spot.",
          'And the data on how it feels is just as stark. Nearly 40% of women report feeling misdiagnosed or dismissed specifically when seeking care for this. If that\'s been you, you are not an outlier — you are, statistically, the majority experience.',
          'So what does this mean for you, right now? It means the confusion you\'ve felt — being told it\'s "just stress" and prescribed something for anxiety instead of getting an actual explanation — is a known, common, documented pattern. It has been studied. It has a name in medical literature. It is not a reflection of how clearly you communicated, how much pain tolerance you have, or how "together" you seem on the outside.',
          "It also means you're allowed to advocate differently. Later in this app, in our Doctor-Talk Toolkit, we'll give you specific language and questions to bring into your next appointment — because knowing why this gap exists is the first step toward navigating around it, not just enduring it.",
          'For now, the only thing we want you to take from this is simple: the gap was in the system, not in you.',
        ],
      },
      {
        id: '1-3',
        type: 'practice',
        title: 'The Symptoms No One Warned You About',
        body: [
          'This isn\'t a diagnostic checklist — just a chance to see if any of this sounds familiar. We\'re building this out into a full list of 20-25 symptoms, grouped so it reads as "these go together" rather than an overwhelming wall. Here\'s a sample from each cluster.',
          'Hot flashes and night sweats. The most talked-about symptom — and still, over half of women say even this one was minimized by a provider.',
          "Brain fog. Walking into a room and forgetting why. Losing a word mid-sentence. This is a real, documented symptom — not a sign anything is wrong with your mind long-term.",
          'A racing or fluttering heart. Often frightening, often dismissed as "just anxiety" without any actual cardiac check. Worth naming, worth asking about.',
          "Irritability that feels unlike you. Snapping at people you love, then wondering who that was. This is one of the most common and least discussed symptoms of all.",
          "We're expanding this into the complete list soon — check back for more.",
        ],
      },
      {
        id: '1-4',
        type: 'article',
        title: 'Stories From Women Like You',
        body: [
          "This section is meant to hold real stories from women going through this exact transition — not invented ones. We're building it out as our first members share their own experiences, always with consent, always anonymized if they choose.",
          "If you'd be open to sharing yours once you've spent some time with Unfurl, we'd love to hear it — real voices here will always mean more than anything we could write on your behalf.",
        ],
      },
      {
        id: '1-5',
        type: 'article',
        title: 'A Different Story: How Other Cultures See This',
        body: [
          "In the West, menopause is often framed almost entirely as loss — loss of fertility, loss of youth, a list of symptoms to manage or suppress. But that framing isn't universal. In many parts of the world, this same biological transition is understood completely differently — and the difference isn't just philosophical. It may be part of why some women, in some cultures, report far fewer and far less severe symptoms.",
          'In China, traditional medicine calls this transition "Second Spring" — not an ending, but a second flowering. The framework there isn\'t about failing hormones; it\'s about a shift in the body\'s deeper energy, one that calls for warmth, nourishment, and rest rather than resistance.',
          'In Japan, researchers documented something striking: in one landmark study, only about 1 in 10 Japanese women reported a hot flash in the prior two weeks — compared to roughly 1 in 3 women in Canada. Japanese women more often described stiff shoulders or fatigue instead. Researchers believe diet plays a role, but so, likely, does the absence of a heavily negative cultural story wrapped around this stage of life.',
          "Among the Maya of the Yucatán, anthropologists studying rural communities found women who didn't report hot flashes at all — and who described this stage as one of increased freedom, not loss. It's not that biology worked differently for them; researchers point to diet and lifelong physical activity as likely contributors — but culture and expectation appear to matter too.",
          'In many Native American traditions, this stage is sometimes described through the idea of "wise blood" — the belief that a woman who no longer menstruates retains that energy within her, stepping into a role as a Grandmother or wisdom-keeper, someone whose voice carries more weight, not less.',
          'Among Māori communities in New Zealand, the concept of mana wahine — the inherent dignity and power of women — frames this transition as a "return of life-giving energy to oneself." Not depletion. Return.',
          "None of this means your symptoms aren't real, or that a different mindset alone will make hot flashes disappear. What it does mean is this: the story that this stage of life is simply decline is a choice, not a biological fact. Other cultures have told a different story for a very long time. You're allowed to write your own version of it too.",
        ],
      },
      {
        id: '1-6',
        type: 'practice',
        title: 'Your Menopause Vocabulary',
        body: [
          "A living glossary, in plain language — we're adding new terms regularly. Here's where it starts.",
          'Perimenopause — The transitional years leading up to your final period, when hormones fluctuate rather than steadily decline. This is often when symptoms start — sometimes years before periods actually stop.',
          'Menopause — Technically, a single point in time: the day marking 12 full months since your last period. Everything after that is "postmenopause," though most people use "menopause" loosely to mean the whole transition.',
          "Vasomotor symptoms — The clinical term for hot flashes and night sweats. If a doctor uses this phrase, now you'll know exactly what they mean.",
          'Brain fog — Not a formal medical diagnosis, but a widely recognized, real experience: difficulty concentrating, word-finding trouble, forgetfulness tied to hormonal fluctuation.',
          "HRT (Hormone Replacement Therapy) — Medical treatment using hormones to ease symptoms. We don't prescribe or deliver HRT here — but we'll help you understand it well enough to have an informed conversation with your doctor.",
        ],
      },
      {
        id: '1-7',
        type: 'article',
        title: 'You Are Not Broken',
        body: [
          "By now, you've read that this is real. That it isn't your fault. That other cultures have told an entirely different story about this exact stage of life for generations. That's a lot to take in — so let's bring it back to something simple.",
          'You are not broken. You are in transition.',
          "Nothing about what you've felt — the fog, the heat, the mood swings, the sense of not quite recognizing yourself some days — means something is wrong with who you are. It means your body is moving through one of the most significant, universal transitions a woman goes through, largely without a map, because almost nobody handed you one.",
          "We're going to hand you one now.",
          "From here, you can explore the parts of your body and mind this transition touches — sleep, movement, nutrition, intimacy, your emotional world — at whatever pace feels right. Nothing here is designed to rush you or diagnose you. It's designed to walk beside you.",
          "Take the next step whenever you're ready. There's no clock running. You already did the hardest part — showing up and staying open to a different story than the one you were told.",
        ],
      },
    ],
    tags: ['general'],
  },
  {
    slug: 'mishandled-symptom-cluster',
    emoji: '🔥',
    title: 'The Mishandled Symptom Cluster',
    summary: 'Hot flashes, palpitations, joint pain — often treated separately, but frequently connected.',
    isPremium: true,
    teaser:
      "Section 1 named the symptoms and said you're not alone. This section goes one layer deeper: for each commonly mishandled symptom, what's actually happening in the body, why it typically gets mishandled, and what genuinely helps — without ever prescribing or diagnosing.",
    steps: [
      {
        id: '2-1',
        type: 'article',
        title: "Brain Fog: What's Actually Happening",
        body: [
          "You walk into a room and forget why. You lose a word mid-sentence, mid-meeting, mid-conversation with your own kid. And somewhere underneath the frustration, a quieter fear starts creeping in: is this the beginning of something serious?",
          "Here's what's actually going on — and the current research on this is more reassuring than most women are ever told. Estrogen isn't just a reproductive hormone — it plays a direct role in synaptic plasticity, neurotransmitter regulation, and cerebral blood flow, which is why its decline during the menopause transition genuinely affects memory, word-finding, and concentration for a while. More than two-thirds of women report exactly this kind of difficulty during the transition — so if this is happening to you, you are the clear majority, not an outlier.",
          "Here's the reassuring part, directly from the current research: a major 2026 review concluded that while cognitive symptoms are common during this transition, overall cognitive performance typically stays within normal expected ranges — and importantly, these symptoms are not linked to an increased risk of dementia. Researchers now describe menopause-related brain fog with a specific, distinct definition: self-reported difficulty that can fluctuate and cause real distress, without the sustained, progressive interference with daily life that characterizes dementia or mild cognitive impairment.",
          "Why it gets mishandled: because brain fog doesn't show up on a standard blood panel, and because a woman describing memory lapses is sometimes met with dementia screening rather than a conversation about hormones — even though current research says that leap usually isn't warranted.",
          "One area still genuinely being studied, worth knowing honestly: researchers are actively investigating whether hormone therapy offers any long-term cognitive protection. The evidence here is mixed rather than settled — worth raising directly with your doctor if it matters to you, rather than something to assume either direction on.",
          "What helps, based on current evidence: consistent sleep (fog is measurably worse on poor sleep nights), stable blood sugar, stress reduction, and regular aerobic exercise are all specifically named in recent reviews as easing cognitive symptoms. There's also genuinely hopeful news on the physical side: emerging brain-imaging research suggests some structural brain changes seen during the transition show partial recovery afterward — your brain isn't just absorbing damage, it's adapting.",
          "The most important thing to take from all of this: brain fog during this transition is common, well-documented, typically temporary, and — per the most current research available — not evidence that something is wrong with your long-term cognitive health.",
        ],
      },
      {
        id: '2-2',
        type: 'article',
        title: "Joint Pain: The Estrogen Connection No One Explains",
        body: [
          'Aching joints, stiffness that wasn\'t there a few years ago, pain that shows up with no clear injury behind it — if a doctor has waved this off as "just getting older," you deserve a more complete answer, because there\'s real, current research connecting this directly to this life transition.',
          'Researchers now have a name for this cluster: the "musculoskeletal syndrome of menopause." A meta-analysis estimated that roughly 7 in 10 women experience musculoskeletal pain during perimenopause — a rate meaningfully higher than before the transition begins. Estrogen plays a genuine role in regulating inflammation and connective tissue, which is the leading explanation for why joints and muscles are affected.',
          "What's genuinely new in the research: a 2026 study following women through the transition found joint pain wasn't simply linked to low estrogen — it was most strongly linked to how quickly hormone levels were shifting. Women whose FSH (a hormone that rises as estrogen declines) rose more rapidly were substantially more likely to develop joint pain, and it frequently showed up alongside hot flashes and night sweats — suggesting these symptoms share a common hormonal driver, arriving as a cluster rather than isolated complaints.",
          'What this means for you: this is a real, physiologically explainable symptom, not simply "wear and tear." That said, if you notice joint swelling, prolonged morning stiffness, or redness — not just soreness — that\'s worth raising with a doctor specifically, since menopause is also a time when rheumatoid arthritis becomes somewhat more common, and it\'s worth ruling out rather than assuming.',
          "For everyday aches without those red flags, this app's approach to joint-friendly movement (in the Movement section) is a genuinely evidence-informed starting point — gentle, consistent movement, not pushing through pain.",
        ],
      },
      {
        id: '2-3',
        type: 'article',
        title: 'Mood Swings & New Anxiety: It\'s Not "Just" Anxiety',
        body: [
          "Snapping at people you love. Crying without knowing exactly why. A background hum of anxiety about things that never used to worry you. If a doctor's response to this was a prescription for a generic anti-anxiety medication with no further conversation, you're not imagining that something got skipped.",
          "Estrogen and progesterone both interact directly with neurotransmitters — including serotonin and GABA, the same systems targeted by anti-anxiety and antidepressant medications. Current research points to fluctuation, not simply low levels, as the key driver: the more hormones swing during this transition, the higher the associated risk of mood symptoms. Importantly, this isn't a simple equation where less hormone always equals more anxiety — some women's brains appear genuinely more sensitive to these hormonal swings than others, similar to how some women experience significant PMS and others barely notice their cycle.",
          'Why it gets mishandled: because "anxious, irritable woman in her 40s" is an easy pattern to slot into a purely psychiatric framework, without asking whether a hormonal transition might be the underlying driver. That\'s not to say therapy or medication for anxiety isn\'t sometimes genuinely the right support — it can be. But it should be an informed choice, not the only option offered.',
          "What this means for you: if your mood has shifted in ways that feel unlike you, that's worth naming clearly to a provider — including the hormonal context, not just \"I feel anxious.\" The Doctor-Talk Toolkit will help you put this into words. And it means giving yourself permission to know: this isn't a flaw in your character. It's chemistry in transition, and brains vary in how they respond to it.",
        ],
      },
      {
        id: '2-4',
        type: 'article',
        title: 'Sleep Falling Apart: Why "Take Melatonin" Misses the Point',
        body: [
          "Sleep advice tends to stop at generic tips — a cool room, no screens, maybe melatonin. For this transition, that usually misses the real drivers: hormonal shifts, night sweats, and new anxiety, often arriving together rather than one at a time.",
          "We're building out the full piece on this — for the complete picture (including what the current research actually supports), see the Sleep section, which covers this in depth.",
        ],
      },
      {
        id: '2-5',
        type: 'article',
        title: "Heart Palpitations: When It's Hormonal vs. When to Get Checked",
        body: [
          "A racing, pounding, or fluttering heart can be genuinely frightening — especially when it arrives with no clear trigger. Here's what current research says, and, just as importantly, exactly when this symptom deserves prompt medical attention rather than self-reassurance.",
          'The reassuring data first: a large US study following women through this transition found that about half of women are moderately to highly likely to experience palpitations during this time — and importantly, palpitations were not linked to early, silent signs of heart disease in that research. Women who experienced more palpitations also tended to report more hot flashes, disrupted sleep, and stress — supporting a genuine hormonal and nervous-system connection rather than a hidden cardiac problem, in most cases.',
          'Now, the part that matters most for your safety. Please seek prompt medical evaluation — not something to wait out — if palpitations come with any of the following: fainting or feeling like you\'re about to faint; chest pain or pressure; shortness of breath; palpitations that happen during physical exertion, not just at rest; an irregular heartbeat (not just fast, but uneven); palpitations frequent or severe enough to disrupt your sleep; or a family history of sudden cardiac problems before age 50.',
          'One honest correction to common advice: some wellness content suggests nighttime palpitations are the "safe, hormonal" kind. Current primary-care guidance actually treats palpitations that disrupt sleep as a feature that raises, not lowers, the case for getting checked. Please don\'t use timing alone to reassure yourself.',
          "Also worth knowing: this transition is genuinely a meaningful time for heart health more broadly — current cardiology guidelines now formally recognize early menopause as a factor that raises cardiovascular risk. That's not meant to alarm you; it's meant to make this symptom, and your overall heart health, something you bring to a doctor as a real conversation, not something to quietly monitor alone.",
          'The bottom line: common, usually hormonal, genuinely worth naming to a doctor either way — and always worth an actual evaluation if any of the red-flag signs above are present.',
        ],
      },
    ],
    tags: [
      'hotFlashes:weekly',
      'hotFlashes:daily',
      'hotFlashes:multiple-daily',
      'jointAches:frequently',
      'jointAches:daily',
      'palpitations:sometimes',
      'palpitations:often',
      'headaches:occasionally',
      'headaches:frequently',
      'skinHairChanges:noticeably',
      'skinHairChanges:significantly',
      'priorityFix:hot-flashes',
      'breastTenderness:yes-noticeably',
      'hotFlashesExercise:yes-significantly',
      'hotFlashesExercise:somewhat',
    ],
  },
  {
    slug: 'body-literacy',
    emoji: '🧭',
    title: 'Body Literacy',
    summary: "What's actually happening hormonally, in plain language.",
    isPremium: true,
    teaser:
      'The second trust-building pillar, alongside Recognition & Validation. Where that section validated feelings, this one builds genuine understanding — plain-language, non-clinical body literacy. No jargon, no medical degree required.',
    steps: [
      {
        id: '3-1',
        type: 'article',
        title: 'What Your Hormones Actually Do',
        body: [
          'Most explanations of menopause start and end with "your hormones are dropping." True, but not very useful — it doesn\'t tell you why that produces the specific things you\'re feeling. Here\'s the plain-language version.',
          "Estrogen does far more than regulate your period. It affects your brain (memory, mood, temperature regulation), your bones (density and strength), your skin and hair, your heart and blood vessels, and your vaginal and bladder tissue. When estrogen fluctuates and eventually declines, it genuinely touches nearly every system in your body — which is exactly why symptoms show up in so many seemingly unrelated places at once.",
          'Progesterone is often called the "calming" hormone — it has a relationship with GABA, the same calming neurotransmitter system targeted by anti-anxiety medications. As progesterone drops, often earlier and faster than estrogen, sleep and anxiety are frequently the first things affected.',
          "Testosterone — yes, women produce it too — plays a role in energy, muscle mass, and libido. It declines gradually with age as well, and is rarely discussed in mainstream menopause conversations despite its real effects.",
          "Why this matters: once you can connect a specific symptom to a specific hormonal role — brain fog to estrogen's role in cognition, sleep trouble to progesterone's role in calming the nervous system, low energy to testosterone — the whole experience stops feeling like random chaos and starts feeling like a body doing something explainable, even when it's uncomfortable.",
          "You don't need to memorize any of this. You just need to know: there is a real, physiological reason for what you're feeling, in nearly every case.",
        ],
      },
      {
        id: '3-2',
        type: 'article',
        title: 'Why Nothing Feels Predictable Right Now',
        body: [
          "One of the most disorienting parts of this transition is that it doesn't decline smoothly — hormones swing, sometimes sharply, day to day and week to week. A good day doesn't mean you've turned a corner; a hard day doesn't mean you're going backward.",
          "We're expanding this piece with the full explanation soon — for now, the short version: knowing that unpredictability itself is normal, not a sign anything is wrong, is often a real source of relief on its own.",
        ],
      },
      {
        id: '3-3',
        type: 'practice',
        title: 'The Perimenopause Timeline',
        body: [
          "A rough map, so you know what's typical: perimenopause can last anywhere from 4 to 10 years, and total symptom duration averages around 7.4 years across research. That's a wide, genuinely normal range — there's no single \"right\" timeline.",
          "We're building out the full stage-by-stage reference soon. For now: if this is taking longer than you expected, that's common, not a sign something is unusual about your experience.",
        ],
      },
      {
        id: '3-4',
        type: 'article',
        title: "Your Body Isn't Failing",
        body: [
          "It's easy, especially on a hard day, to feel like your body has turned against you — like something is going wrong. Here's a reframe worth sitting with: your body isn't malfunctioning. It's completing a transition it was always going to make.",
          "Every system that feels disrupted right now — temperature regulation, sleep, mood, memory — was built with estrogen as part of its normal operation. As estrogen changes, those systems are recalibrating, not breaking. That recalibration is uncomfortable, sometimes deeply so, but it is not evidence of illness or failure.",
          "This is also, biologically, a universal transition — every woman who lives long enough will go through some version of it. It is not something unusual happening to you specifically; it's something ordinary happening to you specifically, which is a different and gentler thing to sit with.",
          "As Recognition & Validation explored, plenty of cultures never framed this as failure at all — some framed it as arrival. You don't have to force that reframe if it doesn't feel true for you today. But it's worth knowing it's available: this is a body completing something, not a body breaking down.",
        ],
      },
      {
        id: '3-5',
        type: 'practice',
        title: 'What Your Labs Actually Mean',
        body: [
          "If you've had bloodwork done — FSH, estradiol, and similar hormone tests — the results can be genuinely confusing to interpret alone.",
          "The honest, useful context: hormone levels fluctuate enough day to day during this transition that a single test is rarely definitive on its own. We're building out the full plain-language walkthrough of what each common lab actually measures and its real limits — coming soon.",
        ],
      },
    ],
    tags: [
      'goal:understand',
      'stage:unsure',
      'symptomDuration:unsure',
      'cycleRegularity:somewhat-irregular',
      'cycleRegularity:very-irregular',
      'priorityFix:energy-focus',
      'familyHistory:no-idea',
      'familyHistory:never-asked',
      'boneDensity:no-idea',
      'boneDensity:never-checked',
      'recentBloodwork:yes-but-confused',
      'chronicConditions:possibly-undiagnosed',
      'confidentDistinguishing:not-really',
      'confidentDistinguishing:no-idea',
    ],
  },
  {
    slug: 'movement',
    emoji: '🏃',
    title: 'Movement',
    summary: 'Why strength training matters more now, and how to build a routine that sticks.',
    isPremium: true,
    teaser:
      "Not generic fitness content — specifically why movement needs and priorities shift during this transition, and how to avoid both giving up on exercise entirely and pushing through with a routine that no longer serves your body well.",
    steps: [
      {
        id: '4-1',
        type: 'article',
        title: 'Why Strength Training Matters More Now Than Ever',
        body: [
          "If there's one piece of movement advice worth prioritizing above all others right now, it's this: strength training is one of the most protective things you can do for your body through this transition — more than cardio alone, and it works alongside, not instead of, good nutrition.",
          "Here's why. Declining estrogen accelerates both bone density loss and muscle mass loss. Left unaddressed, this combination raises the risk of osteoporosis and the kind of frailty that makes daily life harder later on. Strength training directly counters both: resistance on bones stimulates density maintenance, and building muscle protects your metabolism, your joints, and your ability to do the physical things you want to keep doing for decades.",
          "What the current evidence actually supports: a 2025 review of clinical trials found that higher-intensity resistance training — generally around 70% or more of the heaviest weight you could lift once, done about three times a week and sustained over many months — showed the clearest bone-density benefits at the spine and hip. To be honest about the numbers: these bone-density gains tend to be modest, often around 1% or less. The bigger, more consistent payoff is in muscle strength and balance, which meaningfully lower your risk of falls and fractures — arguably the more important protection day to day.",
          "This doesn't mean you need a gym membership or heavy barbells starting tomorrow. It means shifting your movement priorities: if you have limited time or energy, strength work earns a place before pure cardio. Bodyweight exercises, resistance bands, or light dumbbells at home all count as real strength training, and building up gradually with guidance is both safer and more sustainable than jumping straight to heavy lifting.",
          "What this isn't: a mandate to push through pain, or a message that you're failing if you can't do what you used to. It's simply information — strength training is disproportionately protective right now, more than at almost any other life stage, and worth prioritizing even in small amounts.",
        ],
      },
      {
        id: '4-2',
        type: 'article',
        title: 'Movement Without Punishment',
        body: [
          'A lot of exercise culture is built on punishment — burning off what you ate, earning rest, "no pain no gain." That framing rarely serves anyone well, and it serves this life stage even less.',
          "Your body right now may respond differently to hard exercise than it used to — recovery can take longer, joint stress can be higher, and pushing through exhaustion can sometimes worsen fatigue rather than build resilience. This isn't a sign of weakness. It's a sign your body's needs have genuinely shifted.",
          "A more useful question than \"how hard can I push?\" is: does this movement leave me feeling more energized or more depleted? Some days that answer points toward a walk instead of a workout, and that's a legitimate, valuable choice — not a failure to show up.",
          "Movement at this stage can mean strength training, yes, but also walking, dancing, stretching, swimming, or anything that keeps you connected to your body without treating it as an adversary to defeat. The goal isn't punishment. It's partnership.",
        ],
      },
      {
        id: '4-3',
        type: 'article',
        title: 'Joint-Friendly Movement When Everything Aches',
        body: [
          "On days when joints ache, movement can still help — it just needs to look different: chair-based strength work, water-based movement (swimming or water aerobics genuinely reduce joint load), and gentle resistance-band routines are all real, effective options.",
          "We're building out the full practical guide soon — the short version for now: gentle and consistent beats intense and occasional, especially on harder days.",
        ],
      },
      {
        id: '4-4',
        type: 'article',
        title: 'Why Your Old Routine Might Not Work Anymore',
        body: [
          "If a workout routine that used to work now leaves you wiped out instead of energized, that's not you losing fitness — recovery time genuinely increases during this transition, and old high-intensity routines can create more fatigue and joint stress than benefit.",
          "We're expanding this into a full piece soon. For now: if your usual routine feels harder to bounce back from, that's a real physiological shift worth adjusting for, not a personal failing.",
        ],
      },
      {
        id: '4-5',
        type: 'practice',
        title: 'Building a Realistic Weekly Routine',
        body: [
          "A simple starting structure, designed to feel achievable, not prescriptive: two strength sessions, one mobility or stretching session, and movement as your energy allows the rest of the week.",
          "We're building out the full template with modifications soon — for now, use this as a loose starting shape rather than a strict plan.",
        ],
      },
    ],
    tags: [
      'activity:rarely',
      'activity:not-active',
      'activity:sometimes',
      'bodyComposition:noticeable-change',
      'bodyComposition:significant-change',
      'movementPreference:walking-cardio',
      'movementPreference:strength',
      'movementPreference:yoga-stretching',
      'movementPreference:none-right-now',
      'energyForActivity:a-bit-lower',
      'energyForActivity:significantly-lower',
      'strengthTrainingBarrier:no-but-want-to',
      'gymConfidence:not-very',
      'gymConfidence:avoid-it-entirely',
      'hotFlashesExercise:yes-significantly',
      'restRelationship:guilty-resting',
      'modifiedActivities:yes-several',
      'modifiedActivities:one-or-two',
      'pelvicFloor:yes-noticeably',
      'pelvicFloor:a-little',
    ],
  },
  {
    slug: 'nutrition',
    emoji: '🥗',
    title: 'Nutrition',
    summary: "Eating for this stage of life, not the last one.",
    isPremium: true,
    teaser:
      "Diet and metabolic guidance specific to this life stage — not generic diet content, not weight-loss focused, grounded in both biomedical research and the traditional-food-wisdom already covered in Recognition & Validation.",
    steps: [
      {
        id: '5-1',
        type: 'article',
        title: 'Eating for This Stage of Life, Not the Last One',
        body: [
          "Most nutrition advice women encounter was built for a different body, at a different hormonal stage. What worked at 25 — or what you were told worked — doesn't automatically apply now, and that's not a personal failing, it's biology changing.",
          "As estrogen shifts, so does how your body processes blood sugar, stores fat, and maintains muscle and bone. This isn't a reason to restrict harder or chase a smaller body. It's a reason to eat somewhat differently: more protein to protect muscle mass, more calcium- and vitamin-D-rich foods to protect bone, more fiber and whole foods to support stable blood sugar and digestion, and enough — genuinely enough — food overall, since under-eating accelerates muscle and bone loss rather than protecting against it.",
          "Traditions across the world converge here too: Traditional Chinese Medicine and Ayurveda both emphasize warm, nourishing, whole foods at this life stage — not restriction, not raw or cold extremes, but steady nourishment. That's not a coincidence; it lines up with what's understood about supporting a body through hormonal transition.",
          "The simplest shift to hold onto: this is a moment to eat for your body's new needs, not against them. Nourishment, not restriction, is the more protective choice right now.",
        ],
      },
      {
        id: '5-2',
        type: 'article',
        title: 'The Phytoestrogen Question',
        body: [
          "Soy, flaxseed, chickpeas — you've probably heard conflicting things about whether these help or should be avoided. Here's the current, honest picture, and it's more mixed than a lot of wellness content suggests.",
          "Phytoestrogens are plant compounds that weakly interact with estrogen receptors in the body. For years, older research suggested soy isoflavones could meaningfully reduce hot flash frequency. More recent, updated evidence has walked that back: current professional guidance on non-hormone therapies now lists soy foods, soy extracts, and the soy metabolite equol as not recommended specifically for hot flashes, citing mixed evidence of benefit. A 2025 meta-analysis found soy isoflavones had a small effect on overall menopausal symptoms broadly, but no significant effect on hot flashes specifically.",
          'Why the picture changed: individual response to soy may depend on gut bacteria — so-called "equol producers" convert soy compounds into a more active form, and only roughly a quarter to a third of people in Western populations are estimated to be equol producers, compared to a majority in some Asian populations. This may help explain why some studies show an effect and others don\'t, and why this connects to the cross-cultural research in Recognition & Validation on Japanese women\'s symptom reporting.',
          'What this means practically: soy foods — tofu, edamame, soy milk — are nutritious and a reasonable part of a healthy diet on their own merits. That\'s a different, more modest claim than "soy treats hot flashes," which current professional guidance does not support strongly enough to recommend. If hot flashes are significantly disrupting your life, the honest next step is the HRT Education section and a conversation with your doctor, rather than a soy supplement as a substitute.',
        ],
      },
      {
        id: '5-3',
        type: 'article',
        title: 'Bone Health Starts on Your Plate',
        body: [
          "Bone density protection genuinely starts well before any diagnosis — calcium, vitamin D, and protein all play a direct, practical role, and food sources are the most sustainable starting point.",
          "We're building out the full plain-terms guide (specific targets and food sources) soon — the short version for now: prioritizing these three nutrients consistently matters more than any single \"bone-healthy\" superfood.",
        ],
      },
      {
        id: '5-4',
        type: 'article',
        title: 'The Blood Sugar Connection',
        body: [
          "This transition genuinely shifts fat storage toward the abdomen and reduces insulin sensitivity, independent of aging alone — one study found roughly 42% lower insulin sensitivity in perimenopause compared to premenopause.",
          'No menopause-specific diet is proven to reverse this. The best current evidence supports general Mediterranean-style eating with adequate protein and fiber, paired with the strength training already covered in the Movement section, rather than a specialized "menopause diet." We\'re building out the full practical eating-rhythm guide soon.',
        ],
      },
      {
        id: '5-5',
        type: 'article',
        title: 'What Actually Triggers Symptoms',
        body: [
          "Alcohol, caffeine, and spicy food are commonly named as hot-flash triggers — worth noticing in your own patterns, rather than treating as a universal banned-foods list, since triggers genuinely vary person to person.",
          "We're building out the full practical guide soon. For now: paying attention to your own patterns (what you ate or drank before a flare-up) is a reasonable, low-cost starting point.",
        ],
      },
    ],
    tags: [
      'goal:feel-better',
      'hotFlashes:daily',
      'hotFlashes:multiple-daily',
      'bodyComposition:noticeable-change',
      'bodyComposition:significant-change',
      'symptomTriggers:yes-definitely',
      'appetiteChanges:yes-noticeably',
      'foodRelationship:yes-significantly',
      'emotionalEating:yes-definitely',
      'emotionalEating:sometimes',
      'alcoholRelationship:drinking-more',
      'cookingIntention:mostly-afterthought',
      'cookingIntention:rarely-cook',
      'nourishConfidence:mostly-guessing',
    ],
  },
  {
    slug: 'sleep',
    emoji: '🌙',
    title: 'Sleep',
    summary: 'The hormonal, night-sweat, and anxiety triad — and what genuinely helps.',
    isPremium: true,
    teaser:
      'Sleep disruption is one of the most commonly reported and most under-addressed symptoms of this transition. This section goes deeper than "practice good sleep hygiene" — the specific triad driving sleep loss, and real, layered, evidence-backed support.',
    steps: [
      {
        id: '6-1',
        type: 'article',
        title: "Why You Can't Sleep Anymore (And What Helps)",
        body: [
          "Sleep that used to come easily now feels like a nightly negotiation — and it's rarely just one thing causing it. For a long time, night sweats got most of the blame. Newer research suggests that's only part of the story: one 2026 analysis pooling data from over 1,300 women found that hot flashes account for only about a third of menopausal night waking.",
          "First, hormones directly affect sleep architecture. Progesterone has a calming, sleep-supporting effect, and as it declines — often before estrogen does — sleep quality genuinely changes at a chemical level, not just a \"stress\" level.",
          "Second, night sweats physically interrupt sleep — real, but now understood to be a smaller piece of the puzzle than previously assumed.",
          "Third, new anxiety makes falling back asleep after any disruption harder than it used to be. A racing mind at 3 a.m. is a different problem than not falling asleep at 10 p.m., and it often needs different support.",
          "What helps, based on current evidence: the best-supported non-drug option isn't generic \"sleep hygiene\" — it's Cognitive Behavioral Therapy for Insomnia (CBT-I), a structured program that goes well beyond tips like avoiding screens. A 2025 meta-analysis of 11 clinical trials found CBT-I substantially improved sleep quality in menopausal women, outperforming several other approaches tested, including some medications. In October 2025, the FDA also approved a new non-hormonal medication for hot flashes, which in trials also showed some improvement in patient-reported sleep — an option worth discussing with a doctor if sleep disruption is severe, alongside HRT as another established option.",
          "This is one of the most treatable symptom clusters of the entire transition — genuinely more treatable than it may feel some nights, with real, evidence-backed options beyond \"just try to relax.\"",
        ],
      },
      {
        id: '6-2',
        type: 'article',
        title: 'Building a Wind-Down Practice That Actually Works',
        body: [
          "Generic sleep advice — \"put your phone away,\" \"keep your room cool\" — isn't wrong, but it rarely accounts for a nervous system that's genuinely more activated than it used to be. A real wind-down practice does more than remove screens; it actively signals safety to your body. If sleep disruption is significant and persistent, this practice works best alongside — not instead of — more structured, clinically proven approaches like CBT-I.",
          "Ayurvedic tradition offers a useful, simple structure here: a consistent bedtime (ideally before 10 p.m., since traditional frameworks and modern circadian research both point to earlier sleep supporting deeper rest), a brief calming ritual before bed rather than an abrupt stop to the day, and warmth — a warm (not hot) shower, warm feet, or a few minutes of gentle self-massage — as a genuine nervous-system signal that the day is ending.",
          "A simple starting practice: 20 minutes before you intend to sleep, dim the lights, put screens away, and do one calming thing — a few slow breaths, a few pages of a book, a brief stretch. Go to bed at a consistent time, even on nights sleep feels unlikely to come easily. Consistency itself, more than any single technique, is what retrains a disrupted sleep-wake rhythm over time.",
          "This won't fix every night. But most women find that a genuine wind-down practice — not just \"turning the phone off\" — meaningfully shifts how sleep feels over a few consistent weeks.",
        ],
      },
      {
        id: '6-3',
        type: 'practice',
        title: 'Night Sweats: Practical Management',
        body: [
          "A few concrete, low-cost tactics: moisture-wicking sleepwear, layered bedding you can shed quickly, and cooling the room proactively before bed rather than reacting once you're already overheated.",
          "We're expanding this into a full practical guide soon.",
        ],
      },
      {
        id: '6-4',
        type: 'article',
        title: 'When It\'s More Than "Normal" Disruption',
        body: [
          'Most sleep disruption during this transition is manageable with the approaches already covered here. But some signs — like loud snoring with pauses in breathing, or prolonged, severe insomnia that isn\'t responding to a consistent wind-down practice — are worth raising with a doctor specifically, since they can point to something like sleep apnea that benefits from direct treatment.',
          "We're building out the full guidance on this soon. The Doctor-Talk Toolkit section can help you bring this up clearly if you get to that point.",
        ],
      },
    ],
    tags: ['sleep:occasional', 'sleep:frequent', 'sleep:rare-good-night', 'priorityFix:sleep'],
  },
  {
    slug: 'sexual-health',
    emoji: '💗',
    title: 'Sexual Health',
    summary: 'The most under-discussed symptom cluster — named directly and warmly.',
    isPremium: true,
    teaser:
      "Vaginal and sexual health symptoms are among the most under-discussed of the entire transition — often more embarrassing to raise than hot flashes. This section exists specifically to say the unsaid things plainly and warmly.",
    steps: [
      {
        id: '7-1',
        type: 'article',
        title: 'The Symptom Nobody Talks About',
        body: [
          "Hot flashes get talked about, joked about, referenced in movies. Vaginal dryness, discomfort during sex, and related bladder changes almost never come up in the same casual way — even though they affect a very large share of women during this transition. If this is something you've experienced and never said out loud to anyone, you are far from alone; you've just been navigating one of the most silenced symptoms of the entire transition.",
          "As estrogen declines, vaginal and vulvar tissue genuinely changes — becoming thinner, less elastic, and less naturally lubricated. This is now formally recognized in medical guidance as Genitourinary Syndrome of Menopause (GSM). This isn't a hygiene issue, an attraction issue, or something \"wrong\" with you. It's a direct, physiological effect of hormonal change, exactly like hot flashes are. One honest difference worth knowing: unlike hot flashes, GSM typically doesn't improve on its own over time, which is exactly why it's worth actively addressing rather than waiting out.",
          "This is also one of the most treatable symptoms of the entire transition — and the most current guidance is more reassuring than it used to be. Over-the-counter vaginal moisturizers and lubricants (different products, both useful) help with comfort, though they don't address the underlying tissue changes. Local (vaginal) estrogen therapy works differently and much more locally than systemic HRT, and current clinical guidance — endorsed by The Menopause Society — now states clearly that it does not raise the risk of uterine cancer, and specifically recommends it as an effective option for preventing recurrent urinary tract infections, not just for comfort.",
          "The only thing this piece asks of you is permission: permission to name this discomfort to a doctor, a partner, or simply to yourself, instead of carrying it in silence because it feels too private to mention.",
        ],
      },
      {
        id: '7-2',
        type: 'article',
        title: 'Libido Changes: Hormonal, Emotional, or Both',
        body: [
          "Changes in desire during this transition rarely come from just one cause — hormonal shifts, fatigue, stress, body image, and relationship dynamics can all play a part, often at the same time.",
          "We're building out the full piece on untangling these threads soon — most women experience some mix of causes, rarely purely one or the other, which is worth knowing so you don't assume it's \"just\" one thing.",
        ],
      },
      {
        id: '7-3',
        type: 'article',
        title: "Talking to Your Partner About What's Changing",
        body: [
          'Physical changes are hard enough to navigate alone. Navigating them inside a relationship — where a partner may misread reduced desire as rejection, or not understand why intimacy suddenly feels different — adds a second layer that often goes completely unaddressed.',
          'A useful starting point: your partner likely can\'t tell the difference between "not interested in you" and "my body is going through something I\'m still figuring out" — unless you tell them. Silence often gets filled with the wrong story.',
          'A simple, honest framing that tends to open real conversation rather than defensiveness: "My body is going through real hormonal changes right now — it\'s not about you, and I want us to figure out together what intimacy looks like while I\'m navigating this." This names the cause clearly, removes blame from either side, and explicitly invites partnership rather than distance.',
          "This conversation doesn't need to happen perfectly or all at once. Even a short, honest opening line can shift a relationship dynamic that's been quietly straining under an unspoken misunderstanding.",
        ],
      },
      {
        id: '7-4',
        type: 'article',
        title: 'Redefining Intimacy',
        body: [
          "Intimacy is often defined narrowly, around one specific act — but this stage of life can be a genuine opening to a broader, less performance-based definition, useful for couples navigating physical changes together.",
          "We're building out the full reframe piece soon.",
        ],
      },
    ],
    tags: [
      'bodyRelationship:frustrated',
      'bodyRelationship:grieving',
      'goal:understand',
      'bladderChanges:occasional',
      'bladderChanges:frequent',
      'pelvicFloor:yes-noticeably',
      'pelvicFloor:a-little',
    ],
  },
  {
    slug: 'mental-emotional-health',
    emoji: '🧠',
    title: 'Mental & Emotional Health',
    summary: 'Real mental health risk, rage, and grief — named directly.',
    isPremium: true,
    teaser:
      "Goes beyond mood swings into deeper emotional territory: real, documented mental health risk during this transition, and the less-discussed emotions — rage, grief — that rarely get named directly anywhere else.",
    steps: [
      {
        id: '8-1',
        type: 'article',
        title: 'The Mental Health Piece Nobody Prepares You For',
        body: [
          "Perimenopause carries a real, documented increased risk of depression — not a vague possibility, a well-established, specifically-timed pattern. This isn't meant to alarm you; it's meant to make sure you're not blindsided by something that, if it happens, is a known and namable part of this transition rather than a personal failing arriving out of nowhere.",
          "The research is specific about the timing, which is genuinely useful to know. A large meta-analysis found women in perimenopause have about 40% higher odds of depressive symptoms compared to before the transition began — but critically, that elevated risk did not persist into postmenopause. A separate, very large study similarly found about 30% higher odds of new-onset major depression specifically in the years immediately around the final period. In other words: this is a window, not a permanent shift — the years of transition carry real, elevated risk, and that risk eases once you're through it.",
          "It's also worth being honest that most women do not develop depression during this time. Research points to certain factors that raise individual risk more than others: a history of depression, prolonged or severe hot flashes, chronic sleep disruption, and significant life stress during the same period. The hormonal fluctuations already discussed in earlier sections directly affect mood-regulating neurotransmitters — and this transition often coincides with major life stressors arriving at the exact moment your emotional resilience may already be more taxed than usual.",
          "If you notice persistent low mood, loss of interest in things you normally enjoy, or anxiety that feels beyond what you can manage day to day, that is worth naming to a professional — a doctor or therapist — not something to simply wait out. This section isn't a substitute for that kind of support; it exists to help you recognize when reaching for it makes sense, and to remove any shame from doing so.",
          "The goal here is simple: knowing this risk exists, and roughly when it's highest, so if it shows up, you recognize it for what it is — a known, time-limited part of this transition, not evidence something is uniquely or permanently wrong with you.",
        ],
      },
      {
        id: '8-2',
        type: 'article',
        title: 'Rage, Grief, and Everything In Between',
        body: [
          'Some emotions during this transition rarely make it into even the more open conversations about menopause. Rage is one of them — a sudden, disproportionate anger that can feel frightening in its intensity. Grief is another — for a body that feels unfamiliar, for a chapter of fertility or youth quietly closing, sometimes for a version of yourself you\'re not sure how to find again.',
          'Both are real, both are common, and neither means something is wrong with you.',
          'Rage often has a real hormonal component — the same neurochemical shifts driving anxiety and mood swings can also produce a sharper, faster-triggered anger response than you\'re used to. Naming it as "this is a real physiological pattern, not just me losing control" often reduces both the intensity and the shame that follows it.',
          'Grief during this transition is legitimate even when nothing "bad" has technically happened. You\'re allowed to grieve fertility ending, even if you don\'t want more children. You\'re allowed to grieve a body that functioned differently, even while accepting the one you have now. Grief and acceptance aren\'t opposites — they can exist in the same season, sometimes the same day.',
          "There's no fixed timeline for moving through either of these. The only thing worth holding onto: you don't have to perform calm or gratitude through every part of this. The harder emotions are allowed to be here too.",
          "If what you're feeling ever goes beyond difficult into thoughts of harming yourself, please reach out right away — in the US, you can call or text 988 (the Suicide & Crisis Lifeline), free and confidential, any time of day.",
        ],
      },
      {
        id: '8-3',
        type: 'practice',
        title: 'When to Seek Therapy vs. When This Is Passing',
        body: [
          "A rough, non-alarmist way to think about it: if difficult emotions come and go, and you still find moments of relief, connection, or enjoyment, that's often within a typical range for this transition. If low mood, anxiety, or numbness are constant, or getting in the way of daily life, that's a signal professional support is worth exploring — not a sign of failure to cope on your own.",
          "We're building out the full decision guide soon. In the meantime: if you're having thoughts of harming yourself, please don't wait — in the US, call or text 988 (Suicide & Crisis Lifeline) any time, free and confidential.",
        ],
      },
      {
        id: '8-4',
        type: 'practice',
        title: 'Building Emotional Resilience Through Transition',
        body: [
          "A few concrete starting practices: naming what you're feeling out loud or in writing (naming genuinely reduces its intensity), brief grounding techniques when emotions feel overwhelming, and staying connected to community — the cross-cultural research earlier in this app suggests social support may genuinely ease symptom severity, not just mood.",
          "We're building out the full set of resilience practices soon.",
        ],
      },
    ],
    tags: [
      'mood:some-ups-downs',
      'mood:noticeable-swings',
      'mood:significant',
      'stressLevel:high',
      'stressLevel:overwhelming',
      'workImpact:moderately',
      'workImpact:significantly',
      'priorityFix:mood',
      'selfTalk:pretty-critical',
      'emotionalEating:yes-definitely',
    ],
  },
  {
    slug: 'doctor-talk-toolkit',
    emoji: '🩺',
    title: 'Doctor-Talk Toolkit',
    summary: 'Actionable — usable at your very next appointment.',
    isPremium: false,
    teaser:
      'Directly answers "the gap is in the system, not in you" with practical tools to navigate around that gap. Free, because it\'s the most immediately actionable trust-builder in the whole app — content you can use at your very next appointment.',
    steps: [
      {
        id: '9-1',
        type: 'article',
        title: 'How to Be Taken Seriously',
        body: [
          "The way you describe symptoms can genuinely change how seriously they're received — not because you're doing anything wrong currently, but because a few small shifts in language can help an undertrained system connect the dots faster.",
          'Be specific, not general. "I don\'t feel like myself" is true, but "I\'ve had 3–4 hot flashes a day for the past two months, along with sleep that\'s fallen apart and word-finding trouble at work" gives a doctor something concrete to work with.',
          'Name the pattern, not just one symptom. Because these symptoms often get treated as unrelated, explicitly connecting them helps: "I think these might be connected to perimenopause — can we talk about that?" opens a different kind of conversation than listing complaints one at a time.',
          "Bring a written summary. Memory under stress in an appointment is unreliable for everyone. A short written list — what you're experiencing, how long, how disruptive — keeps you from forgetting something important once you're in the room. This is exactly what the Symptom Log (in your membership) is built to generate for you automatically.",
          'If you\'re not heard, say so directly. "I don\'t feel like this is being fully addressed — can we discuss other options, or should I see a specialist?" is a reasonable, assertive thing to say, and it often shifts the conversation.',
          "None of this guarantees a perfect appointment. But it meaningfully improves your odds of being heard — and that's worth walking in prepared for.",
        ],
      },
      {
        id: '9-2',
        type: 'practice',
        title: 'Finding a Menopause-Informed Doctor',
        body: [
          "A practical starting point: organizations like The Menopause Society maintain provider directories of clinicians with specific certification in menopause care — a meaningfully different starting point than a general practitioner. Telehealth menopause-focused clinics are another category worth knowing exists, if in-person options are limited near you.",
          "We're building out the full search guide soon.",
        ],
      },
      {
        id: '9-3',
        type: 'practice',
        title: 'Questions to Ask About HRT',
        body: [
          "A starting list to bring to an appointment: What form and dose would you recommend for me, and why? What are the realistic benefits and risks given my specific health history? How soon might I notice a difference, and how will we know if it's working? What would make us reconsider or adjust it?",
          "The HRT Education section covers the fuller picture behind these questions — we're building out this checklist further soon.",
        ],
      },
      {
        id: '9-4',
        type: 'article',
        title: 'What to Do If You Feel Dismissed',
        body: [
          "If you've left an appointment feeling unheard, you have real options beyond simply accepting it and waiting for the next one.",
          'You can ask for specifics. "What would you want to see to consider this perimenopause-related?" puts the burden of explanation back where it belongs, and often reveals whether the dismissal was really about your symptoms, or about a knowledge gap.',
          "You can seek a second opinion — and you don't need permission to do so. Given that fewer than 1 in 5 primary care physicians have formal menopause training, a second doctor, or a menopause-specialized provider, may simply know more, not because your first doctor was uncaring.",
          "You can look for menopause-certified providers specifically. Organizations like The Menopause Society maintain provider directories of clinicians with specific certification in this area.",
          "You can bring someone with you. Sometimes having another person in the room changes how seriously concerns are addressed — not because it should have to, but because it sometimes does.",
          "You are allowed to keep advocating for yourself until you find care that actually listens. That's not being difficult. That's getting the care you're entitled to.",
        ],
      },
      {
        id: '9-5',
        type: 'article',
        title: 'Preparing for Your Appointment',
        body: [
          "The single most useful thing you can do before an appointment: track what you're experiencing beforehand, rather than trying to recall it all under time pressure in the room.",
          "This is exactly what the Symptom Log is built for — log symptoms as they happen, then export a clean summary to bring with you. It's part of membership, alongside the full content library. We're building out the rest of this piece's guidance soon.",
        ],
      },
    ],
    tags: [
      'doctorConversation:not-yet',
      'doctorConversation:planning',
      'doctorDismissed:yes-more-than-once',
      'doctorDismissed:once',
      'chronicConditions:yes',
      'chronicConditions:possibly-undiagnosed',
    ],
  },
  {
    slug: 'hrt-education',
    emoji: '💊',
    title: 'HRT Education',
    summary: 'Corrects outdated fear with current guidance.',
    isPremium: false,
    teaser:
      "HRT has a fraught, confusing public history. This section gives clear, non-alarmist, non-prescriptive education — enough for a genuinely informed conversation with a doctor, without this app ever prescribing or delivering treatment itself.",
    steps: [
      {
        id: '10-1',
        type: 'article',
        title: 'What HRT Actually Is',
        body: [
          "Hormone Replacement Therapy — more precisely called Menopausal Hormone Therapy (MHT) today — replaces the estrogen (and often progesterone) your body produces less of during this transition, to ease symptoms and, for some women, provide longer-term protective benefits like bone density support.",
          "It comes in several forms: pills, patches, gels, sprays, and vaginal preparations (which work locally rather than throughout the body — relevant if vaginal symptoms specifically are your main concern). The right form and dose is genuinely individual, which is exactly why this section educates rather than prescribes — that decision belongs with you and a qualified doctor.",
          "A brief, important piece of history — and a very recent, significant update. A large 2002 study (the Women's Health Initiative) initially suggested serious risks that led to a sharp, lasting drop in HRT use: estimated use among postmenopausal women fell from about 27% to roughly 5% between 1999 and 2020. Years of further research showed the original study had real limitations — participants were, on average, older than most women who actually start HRT, and the hormone formulations used were different from many options available today.",
          "On November 10, 2025, the FDA announced it would remove the black-box warning from all menopausal hormone therapy products — systemic and vaginal formulations both — citing outdated interpretations of the original WHI data. Labels are being rewritten with age-specific guidance. This is genuinely recent and significant: if your understanding of HRT risk was shaped by older information, it's worth actively updating.",
          "This section, and the next piece, exist specifically to help you approach this topic with current, clear information — not the decades-old fear that still shapes a lot of public perception.",
        ],
      },
      {
        id: '10-2',
        type: 'article',
        title: 'Understanding the Risk Conversation',
        body: [
          "If your mental image of HRT risk was formed in the early 2000s, it's genuinely out of date — and you deserve to know that plainly, without this turning into either reassurance-without-nuance or fear without context.",
          'What the current, extended research shows: for women who start MHT before age 60 or within about 10 years of menopause onset (the "timing hypothesis"), extended follow-up of the original WHI data found no significant increase in coronary heart disease risk, and for estrogen-only therapy specifically, a measurably lower risk of breast cancer compared to non-users — alongside significant reductions in all-cause mortality and osteoporotic fractures in this group. This is a meaningfully different picture than the original 2002 headlines conveyed, and it\'s the exact evidence base the FDA cited when removing the black-box warning in November 2025.',
          "Newer, more targeted evidence is also emerging on specific concerns. For example, a large 2025-2026 analysis of nearly 57,000 postmenopausal women found that those using vaginal estrogen after a prior stroke were not at higher risk of a second stroke than non-users — the kind of specific, updated safety data that simply didn't exist when the original blanket warning was written.",
          "What hasn't changed: HRT isn't automatically right for everyone. Personal and family health history — including certain cancers, blood clot history, and cardiovascular risk factors — genuinely matter to this decision, and a doctor needs your full picture to guide it responsibly. Risk profiles also differ by the type of HRT, the delivery method, and how soon after menopause onset it's started.",
          "The goal of this piece isn't to tell you whether HRT is right for you — that's not something a non-medical app can or should determine. The goal is simpler: to make sure outdated fear isn't the only thing standing between you and a real, current, informed conversation with your doctor about whether it's worth exploring.",
        ],
      },
      {
        id: '10-3',
        type: 'article',
        title: 'Bioidentical vs. Synthetic: Cutting Through the Confusion',
        body: [
          '"Bioidentical" is a term you\'ve likely seen marketed heavily — the honest context is that it\'s often more of a marketing term than a strict clinical category. Real, FDA-approved bioidentical options do exist (and are held to the same safety and manufacturing standards as any approved medication); compounded versions sold outside that regulatory process are a genuinely different, less standardized thing.',
          "We're building out the full explainer soon — worth asking your doctor directly which category any specific product you're considering falls into.",
        ],
      },
      {
        id: '10-4',
        type: 'article',
        title: 'Non-Hormonal Options',
        body: [
          "HRT isn't the only path — for those who can't use it for medical reasons, or who choose not to, real non-hormonal prescription and lifestyle options exist and are worth discussing with a doctor.",
          "We're building out the full guide to these options soon.",
        ],
      },
      {
        id: '10-5',
        type: 'practice',
        title: 'Questions to Ask Before Starting or Stopping',
        body: [
          "A starting checklist: Why this specific form and dose for me? What benefits and risks apply to my personal and family history? How will we track whether it's working? What would a plan to adjust or stop it look like, if needed?",
          "We're building out the full appointment-ready checklist soon.",
        ],
      },
    ],
    tags: [
      'currentSupport:unsure',
      'hrtInterest:considering',
      'hrtInterest:unfamiliar',
      'recentBloodwork:yes-but-confused',
      'recentBloodwork:never-had-it-done',
    ],
  },
  {
    slug: 'identity-life-stage-exploration',
    emoji: '✨',
    title: 'Identity & Life-Stage Exploration',
    summary: 'Bridges to the live cohort course.',
    isPremium: true,
    teaser:
      "The emotional and philosophical culmination of the library — identity, not just symptoms. The natural on-ramp to the paid 3-Month Cohort Course, using what you've shared to route the most relevant pieces to you.",
    steps: [
      {
        id: '11-1',
        type: 'article',
        title: 'Who Am I Becoming?',
        body: [
          "Somewhere underneath the symptoms — the hot flashes, the fog, the mood shifts — a quieter question often sits: who am I now? Not who you were at 25, not who you were before children or a career took shape, not even entirely who you were five years ago. This transition changes the body, but it often changes something in identity too, and that part rarely gets named directly anywhere else in menopause content.",
          "If a lot of your sense of self has been tied to roles — mother, caregiver, professional, partner — and those roles are shifting as life stage changes, it's genuinely disorienting to feel that foundation move. That disorientation isn't a sign something is wrong with you. It's what happens when identity, built over decades, gets an honest invitation to be reconsidered.",
          "This isn't a loss to simply grieve and move past quickly, and it isn't a problem to solve with a five-step plan. It's closer to a genuine question, one worth actually sitting with: if the roles that defined you are shifting, what do you want to define you next?",
          "You don't need an answer today. This section — and eventually, if you choose it, the live cohort course — exists to give you space to explore that question alongside other women asking it at the exact same time, rather than working through it alone in the margins of an already full life.",
        ],
      },
      {
        id: '11-2',
        type: 'article',
        title: 'Holding Grief and Possibility Together',
        body: [
          "Grieving who you were doesn't cancel out being curious about who you're becoming — both can be true in the same season, sometimes the same day, without needing to rush toward resolving the tension between them.",
          "We're expanding this into a full piece soon, building directly on the Mental & Emotional Health section's piece on rage and grief.",
        ],
      },
      {
        id: '11-3',
        type: 'article',
        title: 'Redefining Purpose at This Stage',
        body: [
          "Not therapy, not a prescriptive five-year plan — just honest reflection prompts for considering what purpose or focus might look like in this next chapter, informed by what you've shared in your intake.",
          "We're building out the full set of reflection prompts soon.",
        ],
      },
      {
        id: '11-4',
        type: 'article',
        title: "You Don't Have to Do This Alone",
        body: [
          "Everything in this app so far has been something you could read and reflect on by yourself. That's intentional — you shouldn't need anyone else's permission to start understanding your own body and your own transition.",
          "But identity work, in particular, tends to deepen in the presence of other people doing it alongside you — not instead of you, but with you. That's the thinking behind the 3-Month Cohort Course: a small group of women, at a similar life stage, meeting together with real discussion, real media to reflect on together, and real space to explore the \"who am I becoming\" question out loud instead of only in your own head.",
          "This isn't group therapy, and it isn't a class you complete and forget. It's structured, held space — the kind that's genuinely hard to find elsewhere for this specific transition.",
          "If any part of what you've read in this library has resonated — the identity questions, the grief and possibility sitting side by side, the sense that you're not the only one navigating this — the cohort course is where that gets to become a conversation instead of a solitary reflection.",
          "There's no pressure to join before you're ready. This door stays open whenever you are.",
        ],
      },
    ],
    tags: [
      'bodyRelationship:grieving',
      'bodyRelationship:figuring-out',
      'bodyRelationship:curious',
      'socialSupport:not-really',
      'feelDifferentPerson:completely-different',
      'feelDifferentPerson:somewhat-different',
      'senseOfPurpose:not-very-connected',
      'senseOfPurpose:havent-thought-about-it',
      'identityRoles:yes-significantly',
      'identityRoles:somewhat',
      'fertilityGrief:yes-strongly',
      'fertilityGrief:a-little',
      'permissionToPrioritize:not-really',
      'permissionToPrioritize:working-on-it',
      'mourningOrCurious:mostly-mourning',
      'mourningOrCurious:mostly-curious',
      'mourningOrCurious:both-equally',
    ],
  },
];

export function getContentSection(slug: string): ContentSection | undefined {
  return contentLibrary.find((section) => section.slug === slug);
}

export function getContentStep(slug: string, stepId: string): ContentStep | undefined {
  return getContentSection(slug)?.steps.find((step) => step.id === stepId);
}

/** Composite id used to track a step's completion on the user's profile. */
export function stepCompletionId(sectionSlug: string, stepId: string): string {
  return `${sectionSlug}:${stepId}`;
}

export function isStepCompleted(
  completedSteps: string[],
  sectionSlug: string,
  stepId: string
): boolean {
  return completedSteps.includes(stepCompletionId(sectionSlug, stepId));
}

/** A step unlocks once every step before it in the section is completed; the first step is always unlocked. */
export function isStepUnlocked(
  section: ContentSection,
  stepIndex: number,
  completedSteps: string[]
): boolean {
  if (stepIndex === 0) return true;
  const previousStep = section.steps[stepIndex - 1];
  return isStepCompleted(completedSteps, section.slug, previousStep.id);
}

export function isSectionComplete(section: ContentSection, completedSteps: string[]): boolean {
  return section.steps.every((step) => isStepCompleted(completedSteps, section.slug, step.id));
}

export function countCompletedSections(completedSteps: string[]): number {
  return contentLibrary.filter((section) => isSectionComplete(section, completedSteps)).length;
}
