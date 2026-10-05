/**
 * The 11-section content library, rebuilt from the "Unfurl Content Library"
 * package (Sept 2026), then substantially rewritten and expanded (Oct 2026)
 * with full, fact-checked drafts for nearly every piece. Each section is a
 * set of short pieces (not a fixed 3-step article/video/practice course);
 * step count varies by section (4-8) rather than a fixed 3.
 *
 * Only Section 1's "Stories From Women Like You" (1-4) remains an honest
 * placeholder — it's meant to hold real member stories, so it can't be
 * pre-written. Every other piece below is a complete draft. A placeholder
 * step is still a real, completable step — same pattern previously used
 * for "video coming soon" — so it never blocks progress through a section.
 *
 * The package drops video entirely in favor of Article + Audio narration
 * (cheaper to produce, and some readers prefer listening) — no audio files
 * exist yet, so every step currently ships as text-only; audio is a later
 * addition once real narration exists. A handful of Movement pieces (4.1,
 * 4.3, 4.6, 4.7) are flagged internally as good future video candidates —
 * no action needed until real video content exists.
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

import type { UnfurlIconName } from '@/components/icons/UnfurlIcon';

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
  icon: UnfurlIconName;
  summary: string;
  isPremium: boolean;
  teaser: string;
  steps: ContentStep[];
  tags: string[];
}

export const contentLibrary: ContentSection[] = [
  {
    slug: 'recognition-validation',
    icon: 'recognition',
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
          "There is a particular kind of loneliness that comes from being told, again and again, that what you feel isn't real. The doctor who nodded without hearing. The friend who changed the subject. The quiet, creeping fear — at two in the morning, searching symptoms no one else seemed to take seriously — that maybe it really is just you.",
          "It isn't.",
          "What you are feeling has a name, a cause, and a history far longer than your own. Nearly four in ten women say they have been dismissed or misdiagnosed when they brought these exact symptoms to a doctor. Fewer than one in five primary care physicians have ever been formally trained to recognize them. So if you have felt unheard, understand this clearly: it was never because you explained it poorly. It was because the system listening to you was never built to hear it.",
          "We are not a clinic, and we will not pretend to be one. What we offer instead is something quieter, and we think more enduring — a way to understand what is actually happening inside your body; language precise enough to replace the vague, apologetic words you may have been reaching for; a window onto how women in other parts of the world have met this same transition, for centuries, not as an ending but as a passage; and, when you are ready, the company of other women living through exactly this, at exactly this moment.",
          "You do not have to solve this alone. You do not have to walk into one more appointment and perform the word fine.",
          "Let's begin, simply, with the truth: this is real. That is the whole of the first step.",
        ],
      },
      {
        id: '1-2',
        type: 'article',
        title: "Why Doctors Dismiss This — And Why It's Not You",
        body: [
          'If you have left an appointment feeling rushed, brushed aside, or quietly convinced that you had made too much of very little — you are owed an explanation, because in all likelihood, none of that was about you.',
          'Start with the plainest fact: most doctors were never taught to see this. Fewer than one in five primary care physicians — the very people most women turn to first — have received any formal training in menopause. Medical schools, for decades, treated it as a footnote, if they treated it at all. A doctor who cannot name what you are describing is not withholding care out of indifference. More often, he or she was simply never given the vocabulary.',
          'Then there is the shape the symptoms take, which rarely does them any favors. Hot flashes get discussed, almost reflexively — they have become the one symptom everyone recognizes. But brain fog, joint pain that arrives with no clear injury, a heart that suddenly races for no reason, sleep that unravels without explanation — these tend to be heard as separate complaints, scattered across different specialists, or folded into the easiest available diagnosis: stress, aging, anxiety. A body telling one coherent story is too often received as several unrelated ones.',
          'The scale of what this costs is not small, and it is not only personal. In the United States alone, untreated menopause symptoms are estimated to drain twenty-six billion dollars a year, in medical spending and in work simply not done. This is not a handful of women quietly struggling. It is a structural blind spot, wide enough to be measured in the billions.',
          'And the numbers on how this feels, from the inside, are just as stark: nearly four in ten women report feeling dismissed or misdiagnosed at the exact moment they went looking for help. If that has been your experience, you were never the exception. Statistically, you were the rule.',
          'So consider what this means for you, specifically, right now. The confusion of being told it was just stress, handed a prescription for anxiety instead of an actual explanation — that is not a failure of how clearly you spoke. It is a documented, well-studied pattern, with a name in the medical literature, repeating itself in appointment after appointment, year after year, largely unexamined.',
          'It also means you are entitled to advocate differently. Later in this library, our Doctor-Talk Toolkit will hand you the language and the questions to bring into your next appointment — because understanding why this gap exists is the first real step toward working around it, rather than simply absorbing it, visit after visit.',
          'For now, let one sentence be enough: the gap was in the system. It was never in you.',
        ],
      },
      {
        id: '1-3',
        type: 'practice',
        title: 'The Symptoms No One Warned You About',
        body: [
          "Before we go any further, a question worth sitting with: how many of these have you quietly lived with, maybe even explained away yourself, without ever once lining them up next to each other? Read slowly. You don't have to do anything with what you notice yet. Just notice.",
          'The physical symptoms nobody connects',
          "Hot flashes and night sweats. Maybe it's the one that sent you hunting through pharmacy aisles at midnight, or the one you've learned to wave off in a meeting with whatever's nearest — a folder, a hand, a straight face. It's the most talked-about symptom on this list, and still, over half of women say even this one got minimized by a doctor.",
          "Joint pain and stiffness. Reaching for a jar lid you've opened a thousand times, and your wrist simply declining the job.",
          'A heart that races or flutters for no reason. Often in a quiet moment. Often mistaken, at first — by you, by a doctor — for anxiety and nothing else.',
          'The mental symptoms nobody names',
          'Brain fog. Walking into a room and losing the reason why. Reaching for an ordinary word — mid-sentence, mid-meeting — and finding the space where it should be simply empty.',
          "Trouble concentrating. Reading the same paragraph three times. Not because it's hard. Because something in the machinery is working a little differently this year.",
          'The emotional symptoms nobody validates',
          'Irritability that surprises even you. Snapping at someone you love, then sitting in the specific, uncomfortable quiet of not quite recognizing your own voice.',
          'A new kind of anxiety, about things that never used to touch you at all.',
          'The quiet symptoms nobody mentions',
          'Vaginal dryness, bladder changes, shifts in desire — the ones that feel too private even to type into a search bar, let alone say out loud in a waiting room.',
          'Changes in skin, hair, the texture of things. Small, and easy to file under "getting older" instead of what they usually are: this.',
          "If three or four of these landed closer to home than you expected, here is one small thing worth doing tonight — not to fix anything, not yet. Just write down the single one that's been hardest to explain to anyone else. Not for us. For you. Having it in your own words, sitting somewhere outside your head, changes something. We'll build on it from there.",
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
          "Here's a question worth asking yourself honestly: when you picture menopause, what's the first image that comes to mind? For most women raised on Western medicine's version of the story, it isn't a particularly kind one — a slow unraveling, a list of things going wrong, a body in retreat. But that picture was never the only one available. It was simply the one we happened to inherit.",
          "In China, traditional medicine has a different name entirely for this passage: Second Spring. Not an ending, in that telling, but a second flowering — a shift in the body's deeper energy that calls for warmth and rest, the way a garden is tended differently in autumn than in July. Imagine, for a moment, being handed that phrase instead of the word deficiency at your very first conversation about this.",
          "In Japan, something measurable backs this up. Researchers comparing women there to women in Canada found that only about one in ten Japanese women said they had recently experienced a hot flash — against roughly one in three in Canada. Japanese women were more likely to describe stiff shoulders or plain tiredness instead. Diet almost certainly plays some part. But researchers increasingly suspect something else is at work too: the absence of a story that insists this stage of life is something to dread.",
          "Among Maya communities in the Yucatán, anthropologists documented women who didn't report hot flashes at all, and who spoke of this passage as one of greater freedom, not less. Diet and a lifetime of physical activity likely shape this. So, very possibly, does simply never having been told to expect decline.",
          "And in more than a few Native American traditions, there's a phrase worth sitting with on its own: wise blood — the belief that a woman who no longer menstruates keeps that energy inside her, stepping forward rather than back, often into a role the community treats as one of real authority. A grandmother, not a cautionary tale.",
          "None of this means your hot flashes are imaginary, or that a change of mindset alone will cool a room at 3 a.m. That isn't the point. The point is smaller, and in its own way larger: the idea that this stage of life is simply loss is a story, not a biological fact — one version among several the world has told, and far from the kindest one.",
          "So here's a small thing to try, the next time you catch yourself thinking here we go again about a symptom: pause, just for a breath, and ask what it might sound like to call this a passage instead of a decline. You don't have to believe it yet. Just try the word on, the way you'd try on a coat that isn't quite yours — and see how it sits on your shoulders.",
        ],
      },
      {
        id: '1-6',
        type: 'practice',
        title: 'Your Menopause Vocabulary',
        body: [
          "Have you ever sat across from a doctor, groping for the right word, and landed on something vague instead — it's just been off lately — because the precise word simply wasn't in your pocket when you needed it? That's the entire purpose of this page. Not to make you fluent in medical Latin. Just to hand you a few words precise enough to be taken seriously, and plain enough that you'll actually use them.",
          'The stages',
          'Perimenopause is the long run-up — sometimes years — before your periods stop for good, when hormones don\'t decline smoothly so much as lurch. This is usually when symptoms start, often well before anyone mentions the word "menopause" at all.',
          "Menopause, strictly speaking, is a single day: the one that marks twelve full months since your last period. Most people use the word loosely to mean the whole transition, but technically, it's one specific point you pass through, not a place you stay.",
          'Postmenopause is everything after that day — the rest of the map.',
          "The words for what you're feeling",
          "Vasomotor symptoms is the clinical umbrella for hot flashes and night sweats. If a doctor uses this phrase, you'll know exactly what's being discussed, instead of nodding along.",
          "Brain fog isn't an official diagnosis — you won't find it typed neatly into a chart — but it's a real, widely recognized experience: trouble concentrating, losing a word mid-sentence, forgetfulness that tracks with your hormones, not your character.",
          'The word that carries the most history',
          "HRT, or hormone replacement therapy — now often called MHT, menopausal hormone therapy — is medical treatment using hormones to ease symptoms. We don't prescribe it here, and we won't pretend to. What we will do is make sure you understand it clearly enough to ask your own doctor a real, specific question instead of a nervous, general one.",
          "Here's something worth trying at your very next appointment: instead of reaching for the usual soft, apologetic phrasing, pick just one word from this page and use it on purpose. Say vasomotor symptoms instead of the hot flash thing. Say perimenopause instead of whatever's going on with me lately. Watch, just once, what a precise word does to how closely someone listens.",
        ],
      },
      {
        id: '1-7',
        type: 'article',
        title: 'You Are Not Broken',
        body: [
          "By now you've read that this is real. That it was never your fault. That on the other side of the world, someone has been calling this exact passage a second spring instead of a slow decline. That's a great deal to carry in one sitting — so let's set almost all of it down, and keep just one sentence.",
          'You are not broken. You are in transition.',
          "Think of the last time something in your life genuinely changed shape — a move, a new job, a child leaving home, a relationship ending or beginning. Somewhere in the middle of it, before the new shape had fully arrived, it probably felt less like progress and more like chaos. That's what the middle of a transition always feels like, from the inside. Not like becoming. Like falling apart. It rarely announces which one it actually is until it's nearly finished.",
          "This is no different. The fog, the heat, the mood that turns on a dime, the sense of not quite recognizing the woman in the mirror some mornings — none of it means something has gone wrong with who you are. It means your body is moving through one of the more significant transitions a woman passes through, largely without a map, because almost nobody thought to hand you one.",
          "We're handing you one now.",
          "From here, explore whatever part of this feels most pressing today — sleep, movement, the food question, your own racing heart, the people you love and how to talk to them about this. Go at whatever pace actually fits your week. Nothing in this library is built to rush you toward a finish line, because there isn't one to rush toward.",
          "Here's the only action this page will ask of you: close it, for now, and do one ordinary thing today with a little more patience for yourself than you'd normally allow. That's it. That's the whole practice. There's no clock running, and no test at the end. You already did the hardest part — you showed up, and you stayed open to a different story than the one you were handed.",
        ],
      },
      {
        id: '1-8',
        type: 'article',
        title: "The Gap Isn't Even",
        body: [
          "Has your experience lasted longer than your friends' seemed to? Hit harder? Felt, somehow, even less believed than what you've heard from other women comparing notes? If so, there's something important this library owes you directly, rather than leaving you to wonder if you're remembering it wrong.",
          'The healthcare gap described in 1.2 isn\'t distributed evenly. Large, long-running research following thousands of women found that Black women report hot flashes and night sweats more often, more intensely, and for meaningfully longer than most other groups studied — a median of around a decade, roughly double the duration reported by some other groups in the same research. Hispanic and Black women are also more likely to reach menopause earlier than average.',
          'This isn\'t about one group\'s biology being "weaker" or more fragile. Researchers point to a tangle of likely contributors — unequal access to informed care, the physical toll of chronic stress, and, plainly, bias in which symptoms get believed and acted on quickly versus dismissed. Untangling exactly how much each factor contributes is still ongoing work. What\'s already clear is the pattern itself, measured and repeated across study after study.',
          'If your version of this has run longer or harder than the "typical" picture this library sometimes describes, you were never exaggerating, and you were never imagining it. The gap this whole library exists to name is simply wider for some women than others — and this page exists so you don\'t have to discover that alone, through years of being told your experience doesn\'t match the chart.',
          'At your next appointment, if this has been your experience, say so directly: "Research shows women in my situation often have longer, more intense symptoms — I\'d like that taken into account, not treated as an average case." You\'re not asking for special treatment. You\'re asking for accurate treatment.',
        ],
      },
    ],
    tags: ['general'],
  },
  {
    slug: 'mishandled-symptom-cluster',
    icon: 'flame',
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
          "You walk into the kitchen for something — you were sure, a second ago, exactly what — and now you're just standing there, hand on the counter, reaching for a thought that's slipped out of reach. Or you're mid-sentence, in a meeting, and the word you need simply isn't where it usually lives. Does this sound familiar? If it does, you've just described what two out of every three women experience during this transition — which makes you, once again, not the exception, but close to the rule.",
          "Here's what's actually happening, without the jargon: estrogen does real, measurable work in the brain — it helps regulate memory, word-finding, and how quickly your mind processes things. As estrogen rises and falls unevenly through this transition, rather than declining in one smooth line, the brain genuinely runs a little differently for a while. That unevenness is the mechanism. It isn't a character flaw, and it isn't the opening chapter of something worse.",
          "That last part is worth saying plainly, because it's the fear sitting underneath this symptom for a lot of women, even when nobody says it out loud: is this the beginning of dementia? Here is the most current, and the most reassuring, answer available. A major 2026 review of the research found that while these lapses are common, overall thinking ability stays within a normal range for the large majority of women — and these symptoms are not linked to a higher risk of dementia. Researchers have even given this experience its own name now, specifically to separate it from anything more serious: real, sometimes distressing, genuinely temporary — not a slow slide into something permanent.",
          "One honest caveat, because this page would rather tell you the truth than a tidier story: scientists are still genuinely divided on whether hormone therapy offers any extra protection for the brain over the long run. Some research finds no difference either way; other research hints at a possible benefit. Nobody knows for certain yet. If this question matters to you, it's a real one worth bringing to your own doctor — not something we can answer for you here.",
          "What helps, in the meantime, is less mysterious than it might seem: steadier sleep, steadier blood sugar, lower stress, and regular movement all show up, again and again, as things that ease this particular fog. None of them are a cure. All of them measurably help.",
          "Try this the next time it happens — the lost word, the blank middle of a sentence. Instead of apologizing, or spiraling, say silently to yourself: this is fog, not failure. Then keep talking. Most of the time, the word comes back on its own, usually faster than the worry did.",
        ],
      },
      {
        id: '2-2',
        type: 'article',
        title: "Joint Pain: The Estrogen Connection No One Explains",
        body: [
          "Here's a small test: the first ten steps out of bed in the morning — do they feel like the rest of your day, or like a different, creakier version of you that needs a few minutes to warm up into the real one? Or think about the last time you reached for a stubborn jar lid, the kind you've opened a thousand times without a thought, and your wrist simply declined the job. If either of those rang a bell, you're in very large company.",
          'Researchers now have an actual name for this cluster of aches: the musculoskeletal syndrome of menopause. It isn\'t a stretch to call it that — studies estimate that roughly seven in ten women experience joint or muscle pain somewhere in this transition, a rate meaningfully higher than before it begins. Estrogen plays a real, documented role in regulating inflammation and the health of connective tissue, which is the leading explanation for why joints and muscles, of all things, end up affected by a hormonal shift.',
          "Here's the part that's genuinely new, and worth knowing: it isn't simply low estrogen causing this. A 2026 study following women through the transition found that joint pain tracked most closely with how fast hormones were shifting — not just how low they'd dropped. Women whose levels moved quickly were considerably more likely to develop joint pain, and it tended to arrive packaged together with hot flashes and night sweats, as if all three were being driven by the same underlying wave rather than three separate complaints.",
          "So if your knees, hands, or hips have been part of this conversation too, you can let go of the story that it's simply age catching up with you. It's something more specific — and, importantly, something explainable.",
          'One thing worth watching for, in fairness: if you notice actual swelling, redness, or stiffness that lingers well past your first ten minutes awake — not just soreness, something closer to inflammation — mention it specifically to a doctor. Menopause does modestly raise the odds of rheumatoid arthritis too, and that\'s worth ruling out directly rather than filing under "probably hormones" by default.',
          "For the everyday ache without those signs, here's a small thing to try today: before you even get out of bed, give yourself ninety seconds of slow ankle circles and gentle knee bends, right there under the covers. It sounds almost too small to matter. Mostly, it is small — and it's also exactly the kind of low-stakes movement that tends to ease this specific kind of stiffness, long before you're ready for anything more.",
        ],
      },
      {
        id: '2-3',
        type: 'article',
        title: 'Mood Swings & New Anxiety: It\'s Not "Just" Anxiety',
        body: [
          "Has this happened to you: someone you love asks an ordinary question, and the answer that comes out of your mouth is sharper than you meant, sharper than the question deserved — and a second later you're standing there a little stunned by your own voice? Or a worry shows up about something that never used to touch you at all, and it won't quite leave once it's arrived? If a doctor's response to either of those was a prescription with no further conversation, you're not imagining that something got skipped.",
          "Here's the mechanism, in plain terms. Estrogen and progesterone both interact directly with the brain's mood chemistry — including serotonin, which helps stabilize mood, and GABA, the signal that essentially tells your nervous system it's safe, you can stand down now. The honest, current science points to fluctuation as the real driver here, more than simply \"lower hormones.\" The more these levels swing during this transition, the more unsettled mood tends to become.",
          "And here's the part worth sitting with: this isn't a simple equation where less hormone always means more anxious. Some women's brains are genuinely more sensitive to these swings than others — not unlike how one woman barely notices her cycle while another counts down to it. That difference in sensitivity is very likely why two women can move through the exact same hormonal transition and land in two completely different emotional places.",
          'It\'s easy to see why this gets mishandled. "Anxious, irritable woman in her forties" is a pattern that slots neatly into a purely psychiatric box, without anyone pausing to ask whether a hormonal transition might be the actual story underneath it. That isn\'t to say therapy or medication is never the right support — sometimes it genuinely is. It should simply be an informed choice, not the only option handed to you by default.',
          'So if your mood has shifted in ways that don\'t feel like you, here\'s what that\'s worth knowing: it isn\'t a flaw in your character, and it isn\'t proof you\'re "not handling this well" compared to some other woman who seems fine. It\'s chemistry in transition, and brains vary in how loudly they feel it.',
          "Try this the next time the sharpness rises before you can catch it: take one breath, and silently name it — this is a wave, not who I am — before you speak. You won't catch every one. You don't need to. Even catching one in five, over time, starts to change how these moments feel from the inside.",
        ],
      },
      {
        id: '2-4',
        type: 'article',
        title: 'Sleep Falling Apart: Why "Take Melatonin" Misses the Point',
        body: [
          "Three a.m., wide awake, staring at a ceiling you know a little too well lately — does this sound like a night you've had more than once? If your first guess is always it must be another hot flash, here's something worth knowing: you're probably only partly right.",
          "For years, night sweats got nearly all the blame for sleep falling apart during this transition. Newer research tells a more complete story: one large 2026 analysis, pooling data from well over a thousand women, found that hot flashes account for only about a third of menopausal night waking. The rest comes from something closer to a three-part tangle, all arriving at once.",
          "First, there's a real hormonal piece — progesterone has a naturally calming effect on sleep, and as it recedes, often earlier than estrogen does, sleep genuinely changes at a chemical level. Second, yes, night sweats — real, just a smaller slice of the picture than assumed. And third, a racing mind once you are awake, which is a different problem than not falling asleep in the first place, and usually needs different support.",
          "This is exactly why \"just take melatonin\" so often falls flat — it's aimed at one small piece of a three-part problem, and often not even the piece doing most of the damage. The best-supported approach, according to current research, isn't a supplement at all. It's something called CBT-I — cognitive behavioral therapy for insomnia — a structured program, not a single tip, that in trials has outperformed several other options, including some medications, at actually fixing broken sleep rather than just papering over one night of it. There's also a genuinely new option worth knowing about: in October 2025, the FDA approved a non-hormonal medication for hot flashes that showed real improvement in sleep in its trials too — worth raising with a doctor if this is hitting you hard, alongside hormone therapy as another established option covered later in this library.",
          "For tonight, here's one real technique borrowed directly from that structured approach, not a myth: if you've been lying there for roughly twenty minutes with no sleep in sight, don't keep fighting it in bed. Get up. Sit somewhere dim and quiet, do something genuinely boring — not your phone — for ten or fifteen minutes, then try again. It feels backwards. It consistently works better than willing yourself to sleep harder.",
        ],
      },
      {
        id: '2-5',
        type: 'article',
        title: "Heart Palpitations: When It's Hormonal vs. When to Get Checked",
        body: [
          "That lurch when your heart seems to trip over its own feet, then race — has it caught you off guard in a perfectly ordinary moment? Folding laundry. Sitting at a red light. Nothing happening at all, and suddenly your chest has other plans. It's frightening precisely because it arrives with no obvious cause.",
          "Here's the reassuring part first: a large study following women through this transition found that about half are moderately to highly likely to notice palpitations — and importantly, this wasn't linked to early, silent signs of heart disease. Women who felt them more often also tended to report more hot flashes, more stress, and worse sleep, which points toward a real hormonal and nervous-system connection, not a hidden cardiac problem, in most cases.",
          'Now, the part that matters more than reassurance: please treat the following as genuinely worth acting on, not something to wait out. Get it checked promptly if palpitations come with fainting or near-fainting, chest pain or pressure, shortness of breath, happen during exercise rather than at rest, feel irregular rather than simply fast, disrupt your sleep, or you have a family history of sudden cardiac problems before fifty.',
          'One correction worth making plainly: some wellness advice suggests nighttime palpitations are the "safe" kind. That isn\'t quite right — palpitations that disturb your sleep are actually treated as a reason to get checked, not a reason to relax. Timing alone isn\'t the reassurance it\'s sometimes made out to be.',
          "This is also, more broadly, a real moment for heart health — current cardiology guidance now formally counts early menopause as a factor that raises cardiovascular risk. Not to alarm you. To make sure this symptom, and your heart more generally, becomes a real conversation with a doctor, rather than something quietly monitored alone.",
          'Here\'s a small, useful action: the next few times it happens, jot down three things — the time of day, what you were doing, and roughly how long it lasted. Not because you need to self-diagnose. Because a doctor working from "it happens sometimes" can do far less than one working from an actual pattern.',
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
    icon: 'compass',
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
          'Most explanations of this transition start and end with "your hormones are dropping" — true, and almost useless on its own, because it never says why that produces the specific, scattered things you\'re actually feeling. So let\'s try the version with the explanation left in.',
          "Estrogen does far more than regulate a cycle. It touches your brain — memory, mood, temperature control — your bones, your skin, your heart, your bladder and vaginal tissue. When it fluctuates and eventually declines, it genuinely reaches nearly every system at once, which is exactly why symptoms show up in so many seemingly unrelated places.",
          "Progesterone is often called the calming hormone, for good reason — it has a real relationship with GABA, the same system targeted by anti-anxiety medication. It tends to drop earlier and faster than estrogen, which is often why sleep and anxiety are the very first things to shift.",
          "Testosterone — yes, your body makes this too — shapes energy, muscle, and desire. It declines gradually with age and is almost never mentioned in mainstream conversations about this transition, despite real effects.",
          "Here's why this is worth actually knowing, not just skimming: once you can trace a specific symptom back to a specific hormone's job — brain fog to estrogen's role in cognition, sleep trouble to progesterone's role in calm, low energy to testosterone — the whole experience stops feeling like random chaos and starts feeling like a body doing something explainable, even on the days it's uncomfortable.",
          "You don't need to memorize any of this. Try it once, though: next time a symptom shows up, see if you can name which of these three it most likely traces back to. You'll probably get it right more often than you'd expect.",
        ],
      },
      {
        id: '3-2',
        type: 'article',
        title: 'Why Nothing Feels Predictable Right Now',
        body: [
          "Have you noticed that a symptom can vanish for two good weeks, lulling you into thinking you're through it, and then return without warning on a random Tuesday? That unpredictability is not a sign you're imagining things, or that nothing is actually wrong — it's closer to the most accurate description of what's really happening.",
          "Here's the part almost nobody explains clearly: perimenopause hormones don't decline in a smooth, gentle slope. They swing — sometimes higher than usual, sometimes lower, often within the same week — more like a dimmer switch someone keeps bumping than a light fading slowly to black. Symptoms track that turbulence, which is exactly why a good stretch doesn't mean it's over, and a hard day doesn't mean it's getting worse.",
          "Knowing this alone tends to bring real relief. The unpredictability itself is the expected pattern, not evidence that something unusual is happening specifically to you.",
          "A small practice worth trying: instead of asking why is this happening again, try asking what's the weather like in my body today — and leave it at that, without needing it to mean anything bigger. Some days are stormy. Most pass.",
        ],
      },
      {
        id: '3-3',
        type: 'practice',
        title: 'The Perimenopause Timeline',
        body: [
          "If you've wondered how much longer is this, you're not alone, and the honest answer deserves more than a shrug. Most women move through perimenopause over four to ten years — with symptoms, on average, lasting around seven and a half years in total. That's a wide range on purpose: your timeline genuinely isn't a fixed countdown, and comparing yourself to a friend's experience will usually just add frustration to an already long week.",
          'Roughly, the shape looks like this: early perimenopause, when cycles start shifting but are still fairly regular; late perimenopause, when periods become more irregular and symptoms often intensify; menopause itself, technically a single day — the one marking twelve full months since your last period; and postmenopause, everything after.',
          "This isn't a personal countdown clock, and it was never meant to be read as one. It's closer to a map showing the general shape of the terrain, so the length of the road stops feeling quite so disorienting.",
          "One thing worth doing now, whatever stage you suspect you're in: note the date of your last period somewhere you won't lose it. It sounds almost too simple to matter, and it will make an enormous difference the day a doctor needs to place you accurately on this map.",
        ],
      },
      {
        id: '3-4',
        type: 'article',
        title: "Your Body Isn't Failing",
        body: [
          "On a hard day, it's easy to feel like your body has quietly turned against you — like something, somewhere, is going wrong. Here's a different way to hold it: your body isn't malfunctioning. It's completing a transition it was always going to make, on a schedule it chose long before you had any say in it.",
          "Every system that feels disrupted right now — temperature, sleep, mood, memory — was built with estrogen as part of how it normally ran. As estrogen shifts, those systems are recalibrating, not breaking down. Recalibration can be genuinely uncomfortable. It still isn't evidence of failure.",
          "There's a second thing worth sitting with: this is also, biologically, entirely ordinary. Every woman who lives long enough goes through some version of it. Not something unusual happening to you. Something universal happening to be you, right now.",
          "As Section 1 explored, plenty of cultures never called this failure at all — some called it arrival instead. You don't have to force that reframe if it doesn't feel true today. It's simply worth knowing it exists, the next time the \"my body is failing me\" thought shows up uninvited.",
          "Try this, just once: the next time that thought arrives, say back to it, even silently, completing, not failing — and notice whether the sentence in your head actually changes anything, even slightly.",
        ],
      },
      {
        id: '3-5',
        type: 'practice',
        title: 'What Your Labs Actually Mean',
        body: [
          "If you've had bloodwork done and walked away more confused than before — a page of numbers, no real explanation — you're far from alone, and it genuinely isn't your fault for not following it.",
          "Here's the honest, slightly frustrating truth: hormone levels fluctuate so much during this transition that a single blood test often can't give a clean, definitive answer. FSH (follicle-stimulating hormone) tends to rise as estrogen declines, so doctors sometimes use it as one data point — but because your levels can swing meaningfully even within the same week, one test is a snapshot, not a verdict. Estradiol, the main form of estrogen measured, behaves the same way. Thyroid labs are often checked too, since thyroid issues can mimic several of these same symptoms.",
          'What this means practically: if your labs came back "normal" despite how you feel, that doesn\'t mean nothing is happening. It likely means the test caught you on a steady day, in a process defined by being anything but steady.',
          "Next time you get labs drawn, ask one simple, specific question: what day of my symptoms was this test taken on? Note the answer alongside the result. It won't change the number — but it will give you and your doctor something far more useful than the number alone.",
        ],
      },
      {
        id: '3-6',
        type: 'article',
        title: 'When It Happens Overnight: Surgical & Medical Menopause',
        body: [
          'If you woke up from surgery, or finished a round of treatment, and within days found yourself living through everything this library describes — all at once, with no years-long ramp beforehand — the "4 to 10 years" timeline from 3.3 probably hasn\'t matched your experience at all. That\'s not you doing this wrong. It\'s a genuinely different starting point, and it deserves its own page.',
          "When both ovaries are surgically removed, or chemotherapy or certain medications stop them from functioning, estrogen doesn't taper gradually the way it does in natural perimenopause. It drops sharply, often within days. Because there's no years-long warning period for your body to adjust along the way, symptoms here are frequently more sudden and more intense than the gradual version described elsewhere in this library — not because something went wrong, but because the hormonal floor simply fell away faster than your body had any chance to adapt to.",
          'One practical difference worth knowing: because the cause here is immediate and unambiguous, conversations about hormone therapy often move faster and more directly than the more gradual, "let\'s monitor and see" approach that sometimes fits natural perimenopause. If this is your situation, don\'t be surprised if your doctor raises HRT proactively, early — that\'s often appropriate here, not an overreaction.',
          "The rest of this library still applies to you — the body literacy, the symptom explanations, the emotional weight of all of it. You simply arrived by a different, faster road, and you deserved to see that difference named plainly, rather than quietly wondering why your experience didn't match the timeline everyone else seemed to be describing.",
          'If surgery or treatment is already scheduled, or recently happened, ask your care team this directly, as early as possible: "Given how this menopause is starting, what\'s your recommendation on hormone therapy timing for someone in my specific situation?" Asking early, before symptoms fully hit, tends to open more options than asking after the fact.',
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
    icon: 'movement',
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
          "If there's one piece of movement advice worth genuinely prioritizing right now, over everything else, it's this: strength training is one of the most protective things you can do for your body through this transition — more than cardio alone, and it works alongside good nutrition, not instead of it.",
          "Here's why. Declining estrogen accelerates both bone density loss and muscle loss. Left alone, that combination raises your risk of fragility later — the kind that makes ordinary life harder, not just the gym. Strength training directly pushes back on both at once.",
          "What the current research actually supports: higher-intensity resistance training — roughly seventy percent or more of the heaviest weight you could lift once, about three times a week, sustained over months — shows the clearest bone benefits at the spine and hip. In honesty, those bone gains tend to be modest, often around one percent. The bigger, more reliable payoff is in muscle and balance — which meaningfully lowers your risk of falls and fractures, arguably the protection that matters most, day to day.",
          "This doesn't mean a gym membership by tomorrow. Bodyweight work, resistance bands, light dumbbells at home — all genuinely count, and building up gradually beats jumping straight to heavy weight.",
          "Pick one thing to try this week: ten minutes, twice, of anything that makes your muscles work against real resistance — not punishing, just real. That's a legitimate start, not a consolation prize.",
        ],
      },
      {
        id: '4-2',
        type: 'article',
        title: 'Movement Without Punishment',
        body: [
          'A lot of exercise culture runs on punishment — burn it off, earn your rest, no pain no gain. That framing rarely served anyone well, and it serves this chapter of your life even less.',
          "Have you noticed your body responding to hard workouts differently than it used to — recovery taking longer, joints protesting sooner, pushing through leaving you more wiped out than invigorated? That's not weakness. It's a genuine shift in what your body needs right now.",
          'A more useful question than how hard can I push is simply: does this leave me more energized, or more depleted? Some days that points toward a walk instead of a workout — and that\'s a real, valid choice, not a failure to show up.',
          'Movement here can mean strength training, dancing, swimming, stretching, or anything that keeps you connected to your body without treating it as an opponent to defeat.',
          'Try this today: before you move, ask the energized-or-depleted question once, honestly, and let the answer actually choose what you do next.',
        ],
      },
      {
        id: '4-3',
        type: 'article',
        title: 'Joint-Friendly Movement When Everything Aches',
        body: [
          'Some mornings, the idea of "exercise" feels almost laughable when getting off the couch already counts as effort. On those days, this page exists specifically for you.',
          "Joint-friendly doesn't mean doing nothing — it means choosing movement that works with inflamed, stiff joints instead of against them. Water-based movement is one of the best-kept secrets here: a pool takes weight off joints almost entirely while still giving muscles real work. Chair-based strength exercises — seated leg lifts, seated rows with a band — offer genuine resistance training without demanding your knees cooperate first. Gentle, full-range stretching, held without bouncing, keeps joints moving through the motion they still have.",
          "The goal on a hard-joint day isn't progress. It's simply staying in motion, gently, so the next good day doesn't feel like starting completely over.",
          'On your next difficult day, try just five minutes — water, chair, or slow stretching, whichever is available. Five real minutes beats zero, and it counts exactly as much as it should.',
        ],
      },
      {
        id: '4-4',
        type: 'article',
        title: 'Why Your Old Routine Might Not Work Anymore',
        body: [
          "If a workout that used to leave you pleasantly tired now leaves you flattened for two days, you haven't lost your fitness. Something real has changed in how your body processes effort, and it deserves more than frustration.",
          "Recovery genuinely takes longer during this transition — inflammation runs a little higher, joint stress lands harder, and the kind of high-intensity push that used to feel invigorating can sometimes tip into depleting instead. This isn't a verdict on your discipline. It's new information about a body that's genuinely different than it was five years ago.",
          "The useful response isn't to quit. It's to adjust — a touch less intensity, a bit more recovery time between hard sessions, more attention paid to how you actually feel afterward rather than how you used to feel.",
          "This week, try one small adjustment to your old routine — one extra rest day, or ten percent less intensity on your hardest session — and simply notice how you feel by Thursday compared to a normal week.",
        ],
      },
      {
        id: '4-5',
        type: 'practice',
        title: 'Building a Realistic Weekly Routine',
        body: [
          "Most fitness advice assumes a version of your week that doesn't actually exist — unlimited time, steady energy, nothing else competing for either. This page assumes the real one.",
          "A realistic weekly shape, based on everything covered so far: two sessions of real strength work, a little mobility or stretching, and movement whenever else it genuinely fits — a walk, a dance break in the kitchen, stairs taken on purpose instead of the elevator. That's a complete, legitimate week. It doesn't need to be more than that to count.",
          "The honest measure of a good routine isn't how closely it resembles someone else's. It's whether you're still doing some version of it a month from now.",
          "Sketch your week right now, in your head or on paper — just two strength sessions and one mobility moment, placed on days that actually exist in your real life, not an idealized one.",
        ],
      },
      {
        id: '4-6',
        type: 'practice',
        title: 'Qi Gong, Tai Chi, and the Breath Practices Behind Them',
        body: [
          'Have you ever noticed how slowing your breath down, deliberately, seems to lower the temperature of a moment — not just emotionally, but almost physically? Traditional Chinese Medicine and Ayurveda have treated breath and slow, deliberate movement as central tools for this transition for centuries, not as an afterthought to "real" exercise.',
          "Qi Gong and Tai Chi are slow, flowing movement practices paired directly with breath — gentle enough to do in a small space, specifically used in Chinese medicine alongside this life stage, intended to work with the body rather than push against it. You don't need special equipment or a studio. A quiet ten minutes and a video to follow along is a genuine starting point.",
          'A few specific breathing techniques worth actually trying, not just reading about:',
          "Cooling breath (Sheetali): curl your tongue lengthwise and inhale slowly through it, like drinking in cool air; if you can't curl your tongue, purse your lips slightly instead. Exhale through your nose. Traditionally used, as the name suggests, right when heat rises — worth trying the next time a hot flash starts.",
          'Alternate-nostril breathing (Nadi Shodhana): close one nostril gently with a thumb, inhale through the other, switch, and exhale. Slow, rhythmic, used traditionally for steadying an unsettled mind.',
          'Humming breath (Bhramari): inhale normally, then exhale while humming low in your throat, mouth closed. Often used before sleep — pairs naturally with the wind-down practice in Section 6.',
          "None of these require belief in anything beyond trying it honestly. Pick one, right now, and do five slow rounds before you finish reading this page. Notice, simply, whether anything in your body feels different afterward than it did a minute ago.",
        ],
      },
      {
        id: '4-7',
        type: 'article',
        title: 'Acupuncture, Massage, and Aromatherapy: What the Evidence Actually Shows',
        body: [
          "Have you considered trying acupuncture, a warm oil massage, or a diffuser of something calming by your bed — and wondered whether it's worth the time, or just a nice idea with no real substance behind it? Here's the honest answer, because this library would rather tell you the truth than a prettier story.",
          'Acupuncture is a real, widely practiced tradition, and many women find real value in it. In fairness, the most rigorous research available — a well-designed trial comparing real acupuncture to a convincing sham version — found no meaningful difference in hot-flash relief between the two. Both groups improved substantially, which suggests something genuinely helpful is happening, likely tied to the ritual, the attention, and dedicated self-care time itself, even if the specific needle placement may not be the active ingredient science once assumed. Worth trying if it appeals to you — just go in with honest expectations rather than assuming it\'s guaranteed to outperform a strong placebo.',
          "Self-massage, drawn from Ayurvedic practice (called Abhyanga), is genuinely simple and low-risk: warm a small amount of sesame or coconut oil slightly, and massage it into your skin with long strokes toward your heart for a few minutes before a shower. It hasn't been rigorously studied the way medications have, but it's a real, physical signal of safety to your nervous system, and it costs almost nothing to try.",
          "Aromatherapy and essential oils are pleasant, and scent genuinely does connect to mood and memory in real, measurable ways. Be honest with yourself, though: rigorous evidence that any specific oil meaningfully reduces hot flashes or other physical symptoms is thin. Think of this one as legitimate support for mood and ritual, not a treatment to rely on for the physical symptoms themselves.",
          "Pick exactly one of these three to try this week — not as a cure, but as a small act of care, approached with curiosity rather than high expectations. That framing alone tends to make it more likely you'll actually keep doing it.",
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
    icon: 'nutrition',
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
          "Most nutrition advice you've absorbed over the years was built for a different body, at a different hormonal stage. What worked at twenty-five — or what you were told worked — doesn't automatically apply now, and that's biology changing, not a personal failing.",
          "As estrogen shifts, so does how your body handles blood sugar, stores fat, and maintains muscle and bone. This isn't a reason to restrict harder or chase a smaller body. It's a reason to eat somewhat differently: more protein to protect muscle, more calcium and vitamin D for bone, more fiber and whole foods for steadier blood sugar — and genuinely enough food overall, since under-eating accelerates muscle and bone loss rather than protecting against it.",
          "Traditions across the world converge here, too. Traditional Chinese Medicine and Ayurveda both favor warm, nourishing, whole foods at this life stage — not restriction, not raw extremes, just steady nourishment.",
          "The simplest shift to hold onto: this is a moment to eat for your body's new needs, not against them.",
          "At your next meal, try adding one deliberate source of protein you wouldn't normally think to include — and notice, honestly, how the next few hours feel.",
        ],
      },
      {
        id: '5-2',
        type: 'article',
        title: 'The Phytoestrogen Question',
        body: [
          "You've probably heard soy praised as a near-miracle for hot flashes, or dismissed as useless — so which is it? Here's the honest, current answer, and it's more mixed than most wellness content lets on.",
          "For years, older research suggested soy isoflavones could meaningfully ease hot flashes. More recent, more rigorous evidence has walked that back. The leading professional guidance on managing symptoms now lists soy foods, soy extracts, and related compounds as not recommended specifically for hot flashes, citing mixed evidence. A 2025 analysis found soy had a small effect on general wellbeing — but no significant effect on hot flashes themselves, the very symptom most people take it for.",
          "Why the picture is murky: your gut bacteria may determine how your body processes soy compounds, and only a minority of people in Western populations convert them into their more active form — which may be part of why some studies show benefit and others don't.",
          'What this means practically: soy foods — tofu, edamame, soy milk — are nutritious and a reasonable part of a healthy diet on their own terms. That\'s a genuinely different, more modest claim than "soy treats hot flashes," which current evidence doesn\'t support strongly enough to promise.',
          "If hot flashes are seriously disrupting your life, that's worth a real conversation with your doctor — Section 10 covers your actual options — rather than relying on a supplement the evidence can't fully back.",
        ],
      },
      {
        id: '5-3',
        type: 'article',
        title: 'Bone Health Starts on Your Plate',
        body: [
          "Bone loss doesn't announce itself. There's no ache that says this is happening — which is exactly why it's worth addressing now, well before any diagnosis ever arrives.",
          "Three nutrients matter most here. Calcium — found in dairy, fortified plant milks, leafy greens, and canned fish with bones — gives bone its physical structure. Vitamin D helps your body actually absorb that calcium; sunlight helps produce it, and food sources include fatty fish and fortified products. Protein — often underrated in bone conversations — supports the structural matrix bone is built on, not just muscle.",
          "None of this requires supplements by default or a dramatically overhauled diet. It requires attention — making sure these three show up across your week, not left to chance.",
          "This week, add one genuinely calcium-rich food to a meal you already eat regularly — not a new dish, just an addition to something already in rotation.",
        ],
      },
      {
        id: '5-4',
        type: 'article',
        title: 'The Blood Sugar Connection',
        body: [
          'Have you noticed energy crashes that hit harder and faster than they used to, sometimes within an hour of eating? That\'s not just "getting older" — there\'s a specific, measurable shift happening underneath it.',
          "Research following women through this transition shows the body genuinely becomes less sensitive to insulin during this period — one study found insulin sensitivity roughly forty percent lower in perimenopause than before it. This isn't about willpower or portion sizes. It's a real metabolic shift, happening independent of anything you're doing wrong.",
          'The most evidence-backed response isn\'t a specialized "menopause diet" — no such diet is proven to reverse this. It\'s steadier basics: protein with meals rather than carbohydrates alone, fiber-rich whole foods, and the strength training covered in Section 4, which directly helps muscle use blood sugar more efficiently.',
          'Try this tomorrow: add a source of protein to your first meal of the day, even a small one, and notice whether the mid-morning crash shows up on schedule or arrives a little later than usual.',
        ],
      },
      {
        id: '5-5',
        type: 'article',
        title: 'What Actually Triggers Symptoms',
        body: [
          "Has a glass of wine, a spicy dinner, or a strong coffee ever seemed to summon a hot flash almost on command? You're not imagining the pattern — though it's genuinely your pattern, not a universal rule everyone shares.",
          "Commonly reported triggers include alcohol, caffeine, spicy food, warm rooms, stress, and sharp blood sugar swings. Not every trigger affects every woman, and the point of this page isn't a banned-foods list to follow out of fear. It's a nudge to actually notice your own patterns, which are more useful to you than anyone else's.",
          "For one week, try a simple, low-effort experiment: jot a quick note whenever a hot flash hits — what you'd eaten or drunk in the hour before. No analysis required yet. Just the raw pattern, collected honestly, which tends to reveal more in a week than months of vague suspicion ever will.",
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
    icon: 'moon',
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
          "Sleep that used to come easily now feels like a nightly negotiation you keep losing. As covered earlier, it's rarely just one cause — usually hormones, night sweats, and an overactive mind arriving together, each needing slightly different support.",
          "The single most effective non-drug approach, per current research, is CBT-I — cognitive behavioral therapy for insomnia. It's a structured program, not a one-off tip, and in trials it has outperformed several other options at rebuilding genuinely broken sleep rather than patching one bad night. A newer medication option, approved by the FDA in October 2025, also showed real sleep improvement in trials — worth a direct conversation with your doctor if this is hitting you hard.",
          "Start smaller tonight, though: pick one consistent bedtime for the next week, even on nights sleep feels unlikely, and hold it. Consistency does more for a disrupted sleep rhythm than almost anything else, over time.",
        ],
      },
      {
        id: '6-2',
        type: 'article',
        title: 'Building a Wind-Down Practice That Actually Works',
        body: [
          "Generic sleep advice — phone away, room cool — isn't wrong, but it rarely accounts for a nervous system running hotter than it used to. A real wind-down practice does more than remove screens. It actively signals safety to your body.",
          "Try this starting tonight: twenty minutes before you intend to sleep, dim the lights, set the phone aside, and do one calming thing — a few slow breaths, a page or two of a book, a gentle stretch. Go to bed at the same time regardless of how sleepy you feel. The consistency itself, more than any single technique, is what retrains a disrupted rhythm over a couple of weeks.",
          'This won\'t fix every night immediately. Most women find a real wind-down ritual — not just "phone off" — genuinely shifts how sleep feels within a few consistent weeks.',
        ],
      },
      {
        id: '6-3',
        type: 'practice',
        title: 'Night Sweats: Practical Management',
        body: [
          "Waking up overheated, sometimes needing to change clothes or sheets at 3 a.m., is one of the more disruptive — and more fixable — parts of this transition.",
          "A few practical, low-cost moves genuinely help: moisture-wicking sleepwear instead of cotton, which traps heat and damp; layered bedding you can push off mid-sleep rather than one heavy duvet; and cooling the room proactively before bed, not reactively once you're already overheated and wide awake.",
          "A small addition worth trying tonight: keep a glass of cool water and a light, breathable layer within arm's reach — close enough that a 3 a.m. wake-up doesn't require fully getting up, which makes falling back asleep considerably easier.",
        ],
      },
      {
        id: '6-4',
        type: 'article',
        title: 'When It\'s More Than "Normal" Disruption',
        body: [
          "Most sleep disruption here is genuinely explainable by what's already been covered. Occasionally, though, it's worth a more direct conversation with a doctor rather than continued self-management.",
          "That's especially true if you notice loud snoring or gasping during sleep — possible signs of sleep apnea, which becomes more common after menopause and deserves real evaluation, not a wellness fix. It's also worth raising if insomnia has been severe and unrelenting for months despite real effort, or if exhaustion is affecting your safety — driving, for instance — during the day.",
          "None of this is meant to alarm you. Most sleep trouble here is exactly what this section describes. This is simply the line worth knowing, so you recognize it if you ever cross it.",
          'If any of this sounds familiar, here\'s the action: name it specifically to your doctor at your next visit, using the word "evaluate" rather than "mention" — it changes how seriously the request tends to be taken.',
        ],
      },
    ],
    tags: ['sleep:occasional', 'sleep:frequent', 'sleep:rare-good-night', 'priorityFix:sleep'],
  },
  {
    slug: 'sexual-health',
    icon: 'intimacy',
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
          "Hot flashes get talked about, even joked about. Vaginal dryness, discomfort during sex, bladder changes — almost never, even though they affect a very large share of women here. If this is something you've carried without ever saying it out loud, you're far from alone. You've simply been navigating one of the most silenced symptoms of this entire transition.",
          "As estrogen declines, this tissue genuinely changes — thinner, less elastic, less naturally lubricated. It's a direct physical effect, exactly like a hot flash is, which happens to live in a part of the body our culture is far less comfortable discussing out loud.",
          "Here's the genuinely reassuring part: this is one of the most treatable symptoms in the entire transition, and recent guidance is more encouraging than it used to be. Moisturizers and lubricants help with comfort day to day. Local vaginal estrogen — which works differently and far more locally than systemic hormone therapy — is a real option, and current guidelines from major medical bodies now state clearly that it does not raise the risk of uterine cancer, and actively recommend it for preventing recurrent urinary tract infections, not just comfort.",
          "The only thing this page asks of you is permission — permission to say this plainly to a doctor, a partner, or simply yourself, instead of carrying it in silence because it felt too private to name.",
          "At your next appointment, try saying it in exactly these words: I've been having vaginal dryness and discomfort during sex — what are my options? Direct, unapologetic, and precise enough to actually get you an answer.",
        ],
      },
      {
        id: '7-2',
        type: 'article',
        title: 'Libido Changes: Hormonal, Emotional, or Both',
        body: [
          "If desire has quietly faded and you've been trying to untangle why, here's some relief up front: it's rarely just one thing, and it's almost never simply \"you.\"",
          "Hormonally, declining estrogen and testosterone both genuinely affect desire — this part is real, physiological, not a reflection of your feelings toward anyone. Layered on top, fatigue, stress, body-image shifts, and the sheer exhaustion of carrying everything else covered in this library all touch libido too. Most women experience some mix of both threads at once, rarely one cleanly separated from the other.",
          "This isn't a problem with a single tidy fix. It's worth naming honestly, though, rather than assuming it has quietly become permanent.",
          "Try a small experiment: the next time you notice low desire, pause and ask which thread feels louder right now — tired, stressed, physically different, or genuinely not interested — and just notice the answer, without needing to act on it yet.",
        ],
      },
      {
        id: '7-3',
        type: 'article',
        title: "Talking to Your Partner About What's Changing",
        body: [
          'Physical changes are hard enough to navigate alone. Navigating them inside a relationship, where a partner might misread reduced desire as rejection, adds a second layer that often goes entirely unaddressed.',
          "Here's a place to start: your partner likely can't tell the difference between not interested in you and my body is going through something I'm still figuring out — unless you tell them. Silence tends to get filled with the wrong story.",
          'A simple, honest line that tends to open real conversation rather than defensiveness: "My body is going through real hormonal changes right now — it\'s not about you, and I want us to figure out together what intimacy looks like while I navigate this." It names the cause, removes blame from either side, and invites partnership instead of distance.',
          "You could try saying some version of that this week — it doesn't need to be perfect or scripted word for word. Even a short, honest opening line can shift a dynamic that's been quietly straining under an unspoken misunderstanding.",
        ],
      },
      {
        id: '7-4',
        type: 'article',
        title: 'Redefining Intimacy',
        body: [
          'If physical changes have made certain kinds of intimacy harder, it\'s worth asking a bigger question underneath the immediate one: what does closeness actually mean to you right now, beyond any single act?',
          "Intimacy has always been larger than one definition — touch that isn't about sex, long conversation, shared laughter, simply being physically near someone you trust. This stage of life doesn't have to shrink your options. It can be an invitation to widen them.",
          "This isn't about settling for less. It's about noticing that connection was likely never as narrow as the culture around you implied.",
          "This week, try one small act of physical closeness that has nothing to do with sex — a long hug, holding hands through a whole movie, a hand on a shoulder held a beat longer than usual — and notice what it actually does to how connected you feel.",
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
    icon: 'mind',
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
          "Perimenopause carries a real, documented rise in depression risk — not a vague possibility, a specifically timed pattern worth knowing about in advance, so it never catches you by surprise.",
          "Research is specific here, and genuinely useful: during perimenopause, the odds of depressive symptoms run meaningfully higher than before it began — but that elevated risk does not persist into postmenopause. In other words, this is a window, not a permanent shift. The years of transition carry real risk; that risk eases again once you're through them.",
          "Most women do not develop depression during this time. Certain things raise individual risk more than others — a history of depression, severe or prolonged hot flashes, chronic sleep disruption, and major life stress arriving in the same stretch of years.",
          "If you notice persistent low mood, loss of interest in things you normally enjoy, or anxiety beyond what feels manageable day to day, that's worth naming to a professional — a doctor or therapist — not something to simply wait out.",
          "If any part of this resonated, here's the action: write down one honest sentence about how you've actually been feeling this month, and bring it, word for word, to whoever you next see about this — doctor, therapist, or trusted friend.",
          "If you're in crisis or thinking about suicide, you can call or text 988, the Suicide and Crisis Lifeline — free, confidential, available 24/7, or chat at 988lifeline.org.",
        ],
      },
      {
        id: '8-2',
        type: 'article',
        title: 'Rage, Grief, and Everything In Between',
        body: [
          "Some emotions here rarely make it into even the more open conversations about this transition. Rage is one. A sudden, disproportionate anger that can feel frightening in its own intensity. Grief is another — for a body that feels unfamiliar, for a chapter quietly closing, sometimes for a version of yourself you're not sure how to find again.",
          'Both are real. Both are common. Neither means something is wrong with you.',
          "Rage often has a genuine hormonal thread — the same shifts driving anxiety and mood swings can produce a faster-triggered anger than you're used to. Naming it as a real pattern, not a loss of control, tends to lower both its intensity and the shame that usually follows it.",
          'Grief here is legitimate even when nothing "bad" has technically happened. You\'re allowed to grieve fertility ending, even without wanting more children. You\'re allowed to grieve a body that worked differently, while still accepting the one you have now. Grief and acceptance aren\'t opposites. They can sit in the same week, even the same day.',
          "There's no fixed timeline for moving through either. The only thing worth holding onto: you don't have to perform calm through every part of this. The harder emotions are allowed to be here too.",
          'Next time rage or grief shows up uninvited, try simply naming it out loud, once — "this is rage" or "this is grief" — without immediately trying to fix or explain it. Naming it accurately, before anything else, tends to loosen its grip slightly.',
          "If you're in crisis or thinking about suicide, you can call or text 988, the Suicide and Crisis Lifeline — free, confidential, available 24/7, or chat at 988lifeline.org.",
        ],
      },
      {
        id: '8-3',
        type: 'practice',
        title: 'When to Seek Therapy vs. When This Is Passing',
        body: [
          "It isn't always obvious which kind of hard day you're having — the kind that passes on its own, or the kind asking for real support. Here's a practical way to tell the difference.",
          "Likely passing, and manageable on your own for now: a rough week tied to a clear trigger, irritability that fades within a day or two, low moments you can still interrupt with something you enjoy. Worth reaching for real support: low mood or anxiety most days for two weeks or more, loss of interest in things that used to matter, trouble functioning at work or in relationships, or any thought of harming yourself.",
          "Reaching out isn't an admission that you've failed to handle this. It's simply the right tool for a harder stretch — in the same way you'd see a doctor for a broken bone rather than willing it to heal.",
          'If anything in the "worth reaching for support" list sounded like your last two weeks, make one phone call this week — to a doctor, a therapist, or even a trusted friend who can help you find one. One call. That\'s the whole ask.',
          "If you're in crisis or thinking about suicide, you can call or text 988, the Suicide and Crisis Lifeline — free, confidential, available 24/7, or chat at 988lifeline.org.",
        ],
      },
      {
        id: '8-4',
        type: 'practice',
        title: 'Building Emotional Resilience Through Transition',
        body: [
          "Resilience here doesn't mean staying unaffected. It means having a few real tools for the moments when things genuinely are hard — which, across a years-long transition, will happen more than once.",
          "A few worth having ready: naming an emotion precisely, out loud or on paper, the moment you notice it — precision alone tends to shrink its intensity. A brief grounding technique for overwhelming moments — five things you can see, four you can touch, three you can hear. And real connection: as earlier sections explored, community and social support measurably ease how hard this transition feels, not just how it feels emotionally to talk about it.",
          "None of these fix the transition itself. They make the hard stretches more survivable while you're actually inside them.",
          "Pick just one of these three tools and use it today, even without an obvious crisis prompting it — naming an emotion, a round of five-four-three grounding, or one real conversation with someone who gets it. Practice it before you need it urgently, and it works better when you do.",
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
    icon: 'stethoscope',
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
          "The way you describe symptoms can genuinely change how seriously they're received — not because you've been doing anything wrong, but because a few small shifts in language help an undertrained system connect the dots faster.",
          'Be specific, not general. "I don\'t feel like myself" is true, but "I\'ve had three or four hot flashes a day for two months, along with disrupted sleep and trouble finding words at work" gives a doctor something concrete to work with.',
          'Name the pattern, not just one symptom. Because these symptoms often get treated as unrelated, saying directly — "I think these might be connected to perimenopause, can we talk about that?" — opens a different kind of conversation than listing complaints one at a time.',
          "Bring a written summary. Memory under the stress of an appointment is unreliable for everyone, not just you. A short list — what you're experiencing, how long, how disruptive — keeps you from losing something important once you're in the room.",
          "Before your next appointment, write that list now, while you have the time and the calm to do it properly — three lines is enough to change the whole conversation.",
        ],
      },
      {
        id: '9-2',
        type: 'practice',
        title: 'Finding a Menopause-Informed Doctor',
        body: [
          "If your current doctor hasn't been especially helpful, you have a real, legitimate option beyond simply accepting that and waiting for next year's appointment: finding someone who actually specializes in this.",
          "Organizations like The Menopause Society maintain directories of clinicians specifically certified in menopause care — a genuinely different starting point than a general practitioner working from limited training. Telehealth options focused specifically on menopause care have also grown considerably in recent years, which can widen your options meaningfully if specialists are scarce where you live.",
          "Switching doctors can feel disloyal, even when it shouldn't. It isn't. It's simply matching your care to where the expertise actually is.",
          "This week, spend ten minutes searching a menopause-certified provider directory for your area — even if you're not ready to book anything yet. Just see who's there.",
        ],
      },
      {
        id: '9-3',
        type: 'practice',
        title: 'Questions to Ask About HRT',
        body: [
          'Walking into a conversation about hormone therapy with real, specific questions changes how it goes — turning a vague "should I try this?" into an actual, informed discussion.',
          "Worth asking directly: Am I within the window where hormone therapy's benefits are thought to most clearly outweigh the risks? What form would you recommend for me specifically, and why that one? What are the actual risks for someone with my health history, not just the general statistics? How will we know if it's working, and what would make us stop?",
          "These aren't combative questions. They're the questions a thorough, current conversation should already include — asking them simply makes sure it does.",
          "Before your next relevant appointment, copy these four questions into your phone's notes app, in your own words if that feels more natural. Having them ready removes the pressure of trying to think clearly in the moment.",
        ],
      },
      {
        id: '9-4',
        type: 'article',
        title: 'What to Do If You Feel Dismissed',
        body: [
          "If you've left an appointment feeling unheard, you have real options beyond simply accepting it.",
          'You can ask for specifics: "What would you need to see to consider this perimenopause-related?" — which puts the burden of explanation back where it belongs, and often reveals whether the dismissal was really about your symptoms or about a genuine knowledge gap.',
          "You can seek a second opinion without needing anyone's permission to do so. Given how little formal menopause training most doctors receive, a second doctor may simply know more — not because the first one failed to care.",
          "You can bring someone with you. Sometimes having another person in the room changes how seriously concerns get addressed, not because it should have to, but because it sometimes genuinely does.",
          "If your last appointment left you feeling dismissed, decide right now on your next concrete step — booking a second opinion, or writing down exactly what you'll say differently next time — rather than letting the feeling fade into resignation.",
        ],
      },
      {
        id: '9-5',
        type: 'article',
        title: 'Preparing for Your Appointment',
        body: [
          "The best appointments start well before you're actually in the room — with a little preparation that costs almost nothing and changes almost everything about how the conversation goes.",
          "Before you go, write down: your top three symptoms and roughly how long you've had them, anything that makes them better or worse, and the one question you most want answered, so it doesn't get lost if time runs short.",
          "If you're a paid subscriber, our downloadable symptom log does exactly this for you — a few taps, and it generates a clean, doctor-ready summary you can bring in or send ahead of your visit.",
          "Whichever method you use, do this the night before your next appointment, not rushed in the waiting room beforehand. A few calm, unhurried minutes tonight is worth more than a frantic five in the chair.",
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
    icon: 'capsule',
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
          'Hormone therapy — often called HRT, or increasingly MHT, menopausal hormone therapy — replaces the estrogen your body makes less of during this transition, easing symptoms and, for some women, offering longer-term bone protection too.',
          'It comes in several forms: pills, patches, gels, sprays, and vaginal preparations that work locally rather than throughout the body. The right choice is genuinely individual, which is exactly why this page educates rather than prescribes — that decision belongs with you and a qualified doctor.',
          'Here\'s a brief, important piece of history, and a significant recent update. A large 2002 study led to a sharp, lasting drop in use — from about one in four postmenopausal women using it, down to roughly one in twenty, within two decades. Further research since has shown that original study had real limitations, including that most participants were considerably older than the women who typically start hormone therapy today.',
          'In November 2025, the FDA announced it would remove the long-standing black-box warning from hormone therapy products entirely, citing outdated interpretations of that original data. If your own understanding of HRT risk was shaped by the older story, this is genuinely worth updating.',
          'This page, and the one after it, exist to help you approach this with current, accurate information — not the decades-old fear still shaping a great deal of public conversation.',
          'Before your next relevant appointment, write down one honest question you\'ve been quietly carrying about HRT — even if it feels like a "silly" one. It almost certainly isn\'t.',
        ],
      },
      {
        id: '10-2',
        type: 'article',
        title: 'Understanding the Risk Conversation',
        body: [
          "If your mental picture of HRT risk formed in the early 2000s, it's genuinely out of date — and you deserve to know that plainly, without either false reassurance or leftover fear doing the talking.",
          "Current, extended research shows that for women who start hormone therapy before sixty, or within about ten years of their last period, there's no significant increase in heart disease risk — and for estrogen-only therapy specifically, a measurably lower risk of breast cancer compared to not using it, alongside real reductions in fracture risk. This is meaningfully different from what the original 2002 headlines suggested, and it's the evidence the FDA cited when removing the black-box warning.",
          "What hasn't changed: HRT isn't automatically right for everyone. Personal and family health history — certain cancers, blood clot history, cardiovascular risk factors — genuinely matter, and a doctor needs your full picture to guide this responsibly.",
          "This page can't tell you whether HRT is right for you. What it can do is make sure outdated fear isn't the only thing standing between you and a real, current conversation with your doctor about whether it's worth exploring.",
          'Try reframing one sentence in your head before your next appointment — swap "is HRT dangerous?" for "am I in the window where HRT\'s benefits are thought to outweigh its risks?" It\'s a more precise question, and it tends to get a more useful answer.',
        ],
      },
      {
        id: '10-3',
        type: 'article',
        title: 'Bioidentical vs. Synthetic: Cutting Through the Confusion',
        body: [
          'You\'ve likely heard "bioidentical" marketed as the safer, more natural alternative to "synthetic" hormones. Here\'s the clearer picture, because the marketing language and the medical reality aren\'t quite the same thing.',
          'Bioidentical simply means a hormone chemically identical to what your body makes — and importantly, several FDA-approved options, including estradiol and micronized progesterone, are genuinely bioidentical. These are reviewed, dose-checked, and carry standard safety labeling, exactly like any other approved medication.',
          'Compounded bioidentical hormones — custom-mixed at specialty pharmacies, often marketed as more natural or personalized — are a different matter. They aren\'t FDA-approved, which means dose consistency and safety labeling aren\'t required in the same way.',
          'This doesn\'t mean compounded options are automatically unsafe. It does mean "bioidentical" alone isn\'t the safety signal the marketing often implies — the FDA-approved versus compounded distinction matters more than the bioidentical-versus-synthetic one.',
          'At your next conversation about this, ask directly: "Is this FDA-approved, or compounded?" One clear question cuts through most of the marketing confusion at once.',
        ],
      },
      {
        id: '10-4',
        type: 'article',
        title: 'Non-Hormonal Options',
        body: [
          "Hormone therapy isn't the only path, and for women who can't use it for medical reasons, or who simply prefer not to, real alternatives exist — not consolation prizes, genuine options.",
          "Non-hormonal prescription medications can meaningfully ease hot flashes for some women, including options originally developed for other purposes that research has since shown help here too, alongside a newer medication approved specifically for this use in late 2025. On the lifestyle side, the lower-stress, better-sleep, steadier-movement foundations covered throughout this library do real, measurable work on their own, even without any medication involved.",
          "The right combination is individual, same as with HRT — which is exactly why this is worth a specific, direct conversation rather than assuming hormone therapy is the only door available.",
          'If HRT isn\'t right for you, or you\'d simply like to understand every option before deciding, ask your doctor directly: "What non-hormonal options would you recommend for someone with my symptoms?"',
        ],
      },
      {
        id: '10-5',
        type: 'practice',
        title: 'Questions to Ask Before Starting or Stopping',
        body: [
          'Whether you\'re considering starting hormone therapy or thinking about stopping it, a few direct questions make the conversation sharper and the decision more genuinely yours.',
          'Before starting: What results should I realistically expect, and on what timeline? What would make us reconsider or adjust the dose? How long is this typically continued?',
          'Before stopping: Is there a recommended way to taper, rather than stopping abruptly? What symptoms might return, and how will we tell the difference between that and something else entirely?',
          'Neither starting nor stopping needs to feel like a leap in the dark. The right questions, asked plainly, turn it into a decision made with real information instead of guesswork.',
          "Whichever conversation is ahead of you, write these questions down now, in your own words, before you're sitting in the appointment trying to remember them under pressure.",
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
    icon: 'sparkle',
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
          "Somewhere underneath the symptoms — the heat, the fog, the mood that shifts without warning — a quieter question often waits. Not who you were at twenty-five. Not even entirely who you were five years ago. Just: who am I, now?",
          "If a great deal of your identity has been built around roles — mother, caregiver, professional, partner — and those roles are shifting as this stage of life shifts, it's genuinely disorienting to feel that foundation move. That disorientation isn't a sign something's wrong with you. It's what happens when an identity built over decades gets an honest invitation to be reconsidered.",
          "This isn't a loss to simply grieve and move past quickly. It's closer to a real question, worth actually sitting with: if the roles that defined you are shifting, what do you want to define you next?",
          "You don't need an answer today. This library — and eventually, if you choose it, our live cohort course — exists to give you real space to explore that question alongside other women asking it at the exact same time, rather than working through it alone in the margins of an already full week.",
          'Tonight, try finishing this sentence once, honestly, even just in your head: the part of me that feels most like "me" right now is... There\'s no wrong answer. There may not even be a complete one yet. That\'s fine. It\'s a beginning, not a final draft.',
        ],
      },
      {
        id: '11-2',
        type: 'article',
        title: 'Holding Grief and Possibility Together',
        body: [
          "It's possible to grieve something and feel genuinely curious about what comes next, in the very same breath — even though almost nothing in how we talk about change prepares us for holding both at once.",
          "You might grieve a body that moved differently, a face that looked a little different in the mirror, a fertility you weren't necessarily using but still feel the ending of. None of that cancels out real curiosity about who you're becoming on the other side. They aren't opposites competing for the same space. They're more like weather happening in the same sky.",
          "The pressure to choose — to be either sad or hopeful, grieving or moving forward — is its own kind of unnecessary weight on top of an already heavy season.",
          'This week, let yourself say one sentence that holds both halves at once, out loud if you can manage it: "I\'m grieving something real, and I\'m also curious about what\'s next." Both things. No contradiction. Just true.',
        ],
      },
      {
        id: '11-3',
        type: 'article',
        title: 'Redefining Purpose at This Stage',
        body: [
          "If the things that used to anchor your sense of purpose — raising children, building a career, caretaking — are shifting shape, it's worth asking, without rushing to answer: what feels like purpose to you now, separate from what used to fill that role?",
          "This isn't about finding one grand new mission by next week. Purpose rarely arrives as a single epiphany. More often, it shows up as a handful of smaller, genuine threads — something you're newly curious about, a skill you've quietly wanted to build, a way you'd like to show up for people that doesn't look like what came before.",
          "There's no deadline on this. Plenty of women spend real time in the question itself before anything resembling an answer arrives, and that searching season has its own value, not just the destination.",
          "Try this: write down three things, however small, that have genuinely interested you in the last month — not things you think should interest you. Just what actually has. That short list is a far better starting point than any abstract \"what's my purpose\" question answered cold.",
        ],
      },
      {
        id: '11-4',
        type: 'article',
        title: "You Don't Have to Do This Alone",
        body: [
          "Everything in this library so far has been something you could read, listen to, and reflect on by yourself — deliberately, because you shouldn't need anyone's permission to start understanding your own body and your own transition.",
          'But identity work in particular tends to deepen in the presence of other people doing it alongside you — not instead of you, but with you. That\'s the thinking behind our live, three-month cohort course: a small group of women at a similar stage, meeting together with real discussion and real space to explore the "who am I becoming" question out loud, instead of only in the margins of your own head.',
          "This isn't group therapy, and it isn't a class you finish and forget. It's structured, held space of a kind that's genuinely hard to find elsewhere for this specific transition.",
          "If anything in this library has resonated — the identity questions, the grief and possibility sitting side by side, the sense that you're not the only one navigating this — the cohort course is where that becomes a real conversation instead of a solitary reflection.",
          "There's no pressure to join before you're ready. When you are, the door's open — and until then, simply know it's there.",
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
