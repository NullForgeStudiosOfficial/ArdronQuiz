let LastTime = 0;
let DeltaTime = 0;
let TransitionX = 0
let TransitionRunning = false;
let ChangedPage = false
let PreviousPage = null
let NextPage = null
let Transition = null
let MainMenuPage = null
let QuizPage = null
let ResultsPage = null
let TBPage = null
let ButtonScrollOffset = 0;
let TBButtonScrollOffset = 0;
let BackgroundScrollOffset = 0;
let VoidRotation = 0
let VoidRotation2 = 0
let QuizQuestions = []
let ResultStrings = []
let ArbiterLines = []
let QuizTransition = false
let QuizTransitionPause1 =false
let QuizTransitionPause2 =false
let QuizAnswer1Score = -1
let QuizAnswer2Score = -1
let QuizAnswer3Score = -1
let QuizButtonNumberPressed = -1
let QuizScores = [0,0,0,0,0,0]
let QuizScoresMatches = [false,false,false,false,false,false]
let InfoBox = null
let AnswerButton1 = null
let AnswerButton2 = null
let AnswerButton3 = null
let AnswerButton1Text = null
let AnswerButton2Text = null
let AnswerButton3Text = null
let ArbiterTransitionText = null
let ArbiterTransitionEyes = null
let RemainingText = null
let TB1 = null
let TB2 = null
let TB3 = null
let TB4 = null
let TB5 = null
let TB6 = null
let TieBreakerButtons = []
let LeftBanner = null
let RightBanner = null
let Sigil = null
let RealmResultText = null
let RealmResultBackground = null
let OnwardButton
let FinalPage = null
let ClosedDoor = null
let OpenDoor = null
let DoorFrame = null
let FinalWordsText = null
let CodeText = null
let NextButton = null
let WishList = null
let CopyCode = null
let highestresultindex = 0
let Dcodes = [
    "URIV-ANKE-DISA-YRSU",
    "FAEY-NTRE-GREN-HRTH",
    "WARF-AMIN-PSTL-DETH",
    "ZYKS-SLME-MISM-WZRD",
    "A100-B100-C100-D100",
    "TYNS-ANGL-PRTC-HOLY"
]





const QuizData = {
    "Questions": [
    {
        "Q": "Among the three, which animal do you align with?",
        "A1": { "ButtonText": "Octopus", "Score": 3 },
        "A2": { "ButtonText": "Parrot", "Score": 0 },
        "A3": { "ButtonText": "Hedgehog", "Score": 5 }
    },
    {
        "Q": "You find yourself standing at a crossroads. Which path do you take?",
        "A1": { "ButtonText": "The left path: an path not on the map...curious.", "Score": 3 },
        "A2": { "ButtonText": "The north path: a cobblestone road leading toward the safety of a distant town.", "Score": 5 },
        "A3": { "ButtonText": "The right path: because of course it’s the *right* one.", "Score": 0 }
    },
    {
        "Q": "What is your favorite time of day?",
        "A1": { "ButtonText": "Mornings", "Score": 5 },
        "A2": { "ButtonText": "Midday", "Score": 4 },
        "A3": { "ButtonText": "Night", "Score": 2 }
    },
    {
        "Q": "A heavy gate bars your path. Two guards stand watch, one speaks only truth, the other only lies. How do you get through?",
        "A1": { "ButtonText": "I study them carefully... \ntheir words, their tone, their patterns. The truth always slips through somewhere.", "Score": 3 },
        "A2": { "ButtonText": "If it’s guarded, there’s a reason. I’ll respect that and find another way.", "Score": 5 },
        "A3": { "ButtonText": "I climb the gate. If they wanted to stop me, they should’ve built it higher.", "Score": 2 }
    },
    {
        "Q": "A person you don't know runs up to you and asks you to hold onto an object. What is your response?",
        "A1": { "ButtonText": "I hold it close. If someone trusted me with this, I’ll protect it until they return.", "Score": 5 },
        "A2": { "ButtonText": "I unwrap it immediately. Curiosity’s a habit I’ve stopped trying to break.", "Score": 4 },
        "A3": { "ButtonText": "I take it, promise to guard it with my life… and immediately start wondering what’s inside,\n peeking nonchalantly, but never opening or heavily inspecting.", "Score": 0 }
    },
    {
        "Q": "You’re given a full day with no duties, no rules, no limits. How do you spend it?",
        "A1": { "ButtonText": "I tinker, experiment, and probably blow something up for science.", "Score": 3 },
        "A2": { "ButtonText": "I spend it with the people I care about most.", "Score": 1 },
        "A3": { "ButtonText": "I work toward something big, rest is for when it’s done.", "Score": 2 }
    },
    {
        "Q": "When everything feels uncertain and the path ahead is unclear, what guides you forward?",
        "A1": { "ButtonText": "I reach out to those I trust, no one faces the storm alone.", "Score": 1 },
        "A2": { "ButtonText": "I follow my gut. Somewhere between logic, and emotion lies the answer.", "Score": 2 },
        "A3": { "ButtonText": "I stop, think, and find the logic in the mess. There’s always a solution.", "Score": 3 }
    },
    {
        "Q": "How do you feel about working alone vs. with a group?",
        "A1": { "ButtonText": "I thrive when I'm working independently and making my own decisions.", "Score": 2 },
        "A2": { "ButtonText": "I like working in a team when everyone has a clear role and the system runs smoothly.", "Score": 4 },
        "A3": { "ButtonText": "I'm more comfortable when I have clear guidance or direction from others.", "Score": 5 }
    },
    {
        "Q": "Someone openly challenges you in front of others. What do you do?",
        "A1": { "ButtonText": "I stand my ground, respect’s earned, not handed over.", "Score": 5 },
        "A2": { "ButtonText": "I pick apart their logic until they realize the challenge was a bad idea.", "Score": 3 },
        "A3": { "ButtonText": "I smile, if they want a storm, I’ll give them thunder. Let’s make this interesting.", "Score": 0 }
    },
    {
        "Q": "A cryptic message appears in your mind, telling you the universe is a simulation. How do you respond?",
        "A1": { "ButtonText": "I start testing reality’s seams. If there are rules, I want to know how far they bend.", "Score": 3 },
        "A2": { "ButtonText": "I shrug. If life feels real, that’s good enough for me.", "Score": 1 },
        "A3": { "ButtonText": "Then I’ll learn how it works, and rewrite the world myself.", "Score": 2 }
    },
    {
        "Q": "If you were given a chance to rewrite a single rule of the world, which would you choose?",
        "A1": { "ButtonText": "No truth should ever be hidden, no one can no longer tell lies.", "Score": 3 },
        "A2": { "ButtonText": "Freedom isn’t given or earned, it’s *taken back.* No one gets to decide what I can’t do.", "Score": 0 },
        "A3": { "ButtonText": "Break the balance and the world will answer, nature punishes those who disrupt the peace.", "Score": 1 }
    },
    {
        "Q": "If you could choose one of these as your constant companion, which would you pick?",
        "A1": { "ButtonText": "A map that always changes based on your needs", "Score": 1 },
        "A2": { "ButtonText": "A key that opens any door-even if barricaded.", "Score": 3 },
        "A3": { "ButtonText": "A watch that can slow down or speed up time. The wearer is unaffected by this.", "Score": 0 }
    },
    {
        "Q": "If you could have one of these powers, which would you choose?",
        "A1": { "ButtonText": "The ability to speak any language, but you can never write again.", "Score": 3 },
        "A2": { "ButtonText": "The power to heal any wound, but each time you do, you take the pain into yourself.", "Score": 1 },
        "A3": { "ButtonText": "The power to influence others' dreams, but you can never dream yourself.", "Score": 2 }
    },
    {
        "Q": "Imagine you find an ancient artifact that grants you a single power, but with a twist: the power is yours forever, but the artifact can never be destroyed. What do you do with it?",
        "A1": { "ButtonText": "Keep it close and see what happens, if it changes the world, maybe it was meant to.", "Score": 0 },
        "A2": { "ButtonText": "Contain it and study it until I understand exactly how it works.", "Score": 4 },
        "A3": { "ButtonText": "Destroy it, knowing its influence is too dangerous to be trusted.", "Score": 5 }
    },
    {
        "Q": "Think about a time when you felt truly at peace with yourself. What were you doing, and what made that moment feel so fulfilling?",
        "A1": { "ButtonText": "You took a huge life changing risk, but everything turned out for the better.", "Score": 0 },
        "A2": { "ButtonText": "You were surrounded by people you love, just existing together without needing words.", "Score": 1 },
        "A3": { "ButtonText": "You were doing something repetitive, but it felt meditative-like you were in perfect sync with your surroundings.", "Score": 4 }
    },
    {
        "Q": "Think about a moment when you felt completely out of control. What do you do when you find yourself in that place?",
        "A1": { "ButtonText": "You try to find a way to regain control, even if it means pushing through discomfort.", "Score": 5 },
        "A2": { "ButtonText": "You embrace the chaos, letting things unfold without trying to steer them.", "Score": 0 },
        "A3": { "ButtonText": "You take a step back, observing from a distance, and wait for the right time to act.", "Score": 2 }
    },
    {
        "Q": "Think about the times when you feel most challenged. How do you respond when things start to push you to your limits?",
        "A1": { "ButtonText": "You push harder, seeing the struggle itself as proof of your will.", "Score": 2 },
        "A2": { "ButtonText": "You pause, analyze the problem from every angle, and adjust until the pattern makes sense.", "Score": 4 },
        "A3": { "ButtonText": "You reach out and reconnect, drawing strength from those who steady the storm with you.", "Score": 5 }
    },
    {
        "Q": "Imagine you're in a situation where everything you've worked for is suddenly at risk. How do you react?",
        "A1": { "ButtonText": "You put everything on the line, determined to protect what you've built.", "Score": 2 },
        "A2": { "ButtonText": "You obsess and focus on the cause of the problem, figuring out every and all possible solutions.", "Score": 3 },
        "A3": { "ButtonText": "You search for an ally, knowing that two heads are better than one when everything's at stake.", "Score": 1 }
    },
    {
        "Q": "Imagine you're at a crossroads where your past and future collide. What do you focus on in that moment?",
        "A1": { "ButtonText": "You reflect on everything that brought you here, trying to make sense of it all.", "Score": 4 },
        "A2": { "ButtonText": "You look ahead, eager to move forward and leave the past behind.", "Score": 2 },
        "A3": { "ButtonText": "You try to blend both, seeking balance between who you were and who you're becoming.", "Score": 1 }
    },
    {
        "Q": "Think about a time you had to step out of your comfort zone. How did you approach it?",
        "A1": { "ButtonText": "You jumped in with full force, knowing growth would come through the challenge.", "Score": 0 },
        "A2": { "ButtonText": "You approached it like an experiment, testing new ways to adapt until something clicked.", "Score": 3 },
        "A3": { "ButtonText": "You tried to find a middle ground, balancing the new with what felt familiar.", "Score": 1 }
    },
    {
        "Q": "What would you do if you won the lottery?",
        "A1": { "ButtonText": "I'd share it around and blow the rest on joy, life’s short, might as well make it loud.", "Score": 0 },
        "A2": { "ButtonText": "I'd take time to see the world, learning from different places and cultures.", "Score": 4 },
        "A3": { "ButtonText": "I'd help those in need, mostly my friends and loved ones.", "Score": 1 }
    },
    {
        "Q": "What movie do you know Tim Curry from?",
        "A1": { "ButtonText": "Home Alone 2", "Score": 5 },
        "A2": { "ButtonText": "Clue.", "Score": 0 },
        "A3": { "ButtonText": "Rocky Horror Picture Show", "Score": 1 }
    },
    {
        "Q": "Do you put the cart back when you're done shopping?",
        "A1": { "ButtonText": "Of course. I always return it to the designated spot.", "Score": 1 },
        "A2": { "ButtonText": "I leave it in a place where it won’t block or harm anything.", "Score": 4 },
        "A3": { "ButtonText": "I ride it like a scooter all the way back!", "Score": 0 }
    },
    {
        "Q": "How do you prefer to spend your free time?",
        "A1": { "ButtonText": "I like to get out and explore new places, always seeking something different.", "Score": 0 },
        "A2": { "ButtonText": "I prefer staying home, getting lost in a book or creative project.", "Score": 4 },
        "A3": { "ButtonText": "I enjoy spending time with others, connecting and building relationships.", "Score": 1 }
    },
    {
        "Q": "How do you handle stress?",
        "A1": { "ButtonText": "I dive into the problem headfirst, determined to power through it.", "Score": 2 },
        "A2": { "ButtonText": "I look for support from others, it's okay to ask for help.", "Score": 1 },
        "A3": { "ButtonText": "I reflect on the situation and try to find a creative solution or distraction.", "Score": 3 }
    },
    {
        "Q": "Mana flows through all things, but you can only wield one type. Which do you choose?",
        "A1": { "ButtonText": "Red Mana, raw emotion, freedom, and fire. Chaos given form.", "Score": 0 },
        "A2": { "ButtonText": "Blue Mana, knowledge, adaptability, and insight. The mind’s endless tide.", "Score": 3 },
        "A3": { "ButtonText": "Green Mana, life, balance, and growth. The heartbeat of the wild.", "Score": 1 }
    },
    {
        "Q": "You meet a being from the Void. They offer you forbidden knowledge, but at a cost. What do you do?",
        "A1": { "ButtonText": "Accept it: power is worth any price.", "Score": 2 },
        "A2": { "ButtonText": "Refuse: it's not worth the risk.", "Score": 5 },
        "A3": { "ButtonText": "Reason: what exactly is the cost, and is it worth it?", "Score": 3 }
    },
    {
        "Q": "A long-dead civilization left behind ancient texts. What do you do?",
        "A1": { "ButtonText": "Decode them immediately - history is meant to be uncovered.", "Score": 4 },
        "A2": { "ButtonText": "Keep them hidden - some knowledge is best left buried.", "Score": 5 },
        "A3": { "ButtonText": "Use their wisdom to guide the future, no matter the risk.", "Score": 1 }
    },
    {
        "Q": "You are granted the ability to bring one thing into existence. What do you create?",
        "A1": { "ButtonText": "The lost records of the 10k War of Ardron.", "Score": 4 },
        "A2": { "ButtonText": "A forbidden text detailing how to use the soul as energy.", "Score": 2 },
        "A3": { "ButtonText": "An item that shows you the future.", "Score": 5 }
    },
    {
        "Q": "You stumble upon a hidden passage in ancient ruins. What do you hope to find inside?",
        "A1": { "ButtonText": "I don’t care what it is, I'm going on an adventure!", "Score": 0 },
        "A2": { "ButtonText": "A magical oasis that heals all ailments.", "Score": 1 },
        "A3": { "ButtonText": "A scroll that answers any question you ask - but always cryptically.", "Score": 4 }
    },
    {
        "Q": "A great battle is coming, and you must take your place. What role calls to you?",
        "A1": { "ButtonText": "The Strategist: guiding others from the shadows, every move, part of a greater design.", "Score": 4 },
        "A2": { "ButtonText": "The Wildcard: charging into the fray, unpredictability your greatest weapon.", "Score": 0 },
        "A3": { "ButtonText": "The Protector: standing on the front lines to shield others.", "Score": 5 }
    },
    {
        "Q": "Corruption grants power by burning your soul. Resting over time recovers your lifespan. Would you use it?",
        "A1": { "ButtonText": "No - I'm strong enough, if not? me and my friends combined efforts will be.", "Score": 5 },
        "A2": { "ButtonText": "Yes - consequences, schmonsequences. I'll do whatever it takes to understand this power.", "Score": 2 },
        "A3": { "ButtonText": "Yes - just for experimentation. Only a little at a time so I can recover.", "Score": 3 }
    },
    {
        "Q": "An Ascension has gone rogue, trying to attain the power of the gods. What do you do?",
        "A1": { "ButtonText": "Look for a weakness to usurp their power.", "Score": 2 },
        "A2": { "ButtonText": "I observe from a distance and document everything. The data might save us later.", "Score": 4 },
        "A3": { "ButtonText": "Try to stop them, whatever it takes.", "Score": 5 }
    }
],

    "ResultsStrings": [
    "Eimon: The Realm of Chaos\n\nEimon is the realm of unpredictability, passion, and freedom, but don’t be fooled. What’s normal for the spider is chaos for the fly.\n\nEimon was created by Iwata, the Red Goddess and mother of the Elder Dragons, born of her whimsical heart. She poured red mana into lizards, making them colossal, mirroring the size of her love for life itself.\n\nBecause of Iwata’s nature, Eimon never stands still. Its skies change color with emotion, its lands reshape with laughter or grief. It is the pulse of existence, the raw rhythm of feeling made real.\n\nThose aligned with Eimon are the cherished wild cards of Ardron, the creators, the fools, the flames that never stay in one shape. They act first and think later, chasing freedom not as rebellion, but as truth. They burn bright, love fiercely, and when their chaos settles, they leave behind a calm that hums with meaning. The quiet after their storm is where you finally understand them.\n\nCore Traits: Passionate, Impulsive, Creative, Rule-benders, Emotionally profound, Reckless optimists.\nStrengths: Boundless energy, quick to adapt, impossible to control, deeply empathetic, thrive under pressure.\nWeaknesses: Inconsistent, volatile, burn too hot, struggle with stillness, feel everything all at once.\n\nIn Short... Eimon’s children leap before looking, and somehow still land on their feet, heart first. They are the spark in the dark room, the laughter in the rain, and the silence afterward that reminds you something beautiful just happened.",

    "Elusia: The Realm of Nature\n\nElusia breathes. Forests that stretch like continents, oceans vast as galaxies, mountains older than memory. Created by Sythys, the Green Goddess, it’s the cradle and the crucible, where everything grows, dies, and grows again.\n\nSythys made Elusia to protect what she loved, but nature protects through balance, not mercy. Life here is sacred, but so is the cycle that ends it. Every blossom feeds on what came before. Every predator guards the future by thinning the past.\n\nThose aligned with Elusia are gentle until forced to be otherwise. They are caretakers, empaths, and healers who value harmony, but when something they love is threatened, their kindness turns to fury. They are not warriors by choice, but when the forest marches, even gods remember to fear the wild.\n\nCore Traits: Compassionate, Patient, Grounded, Empathetic, Resilient, Fiercely Protective.\nStrengths: Deep emotional insight, nurturing presence, natural adaptability, inspire trust, immense inner strength.\nWeaknesses: Overly forgiving, self-sacrificing, slow to act until provoked, reluctant to let go.\n\nIn Short... Elusia’s children are the calm before the storm, tender hands that heal, and roots that break stone when the world forgets their worth.",

    "Grimlowe: The Realm of Darkness\n\nGrimlowe is the realm of ambition, decay, and revelation, where truth is paid for in blood and power is the only currency that never loses value. Born of Entar’s Black Mana, it was once a swamp of life and rot before the Blight scorched it into a cathedral of molten stone and bone. What others call corruption, Grimlowe calls evolution.\n\nEntar taught that the pursuit of strength is neither good nor evil, it’s inevitable. To deny darkness is to deny half of existence. Every scar in Grimlowe is scripture, every scream a hymn to progress. Those who survive here do so not despite the corruption, but because of it.\n\nThose aligned with Grimlowe are the defiant, the driven, and the damned who refuse to break. They see the world for what it is, cruel, beautiful, and full of potential, and they intend to master it. Mercy is optional. Victory is not.\n\nCore Traits: Ambitious, Relentless, Insightful, Fearless, Cunning, Charismatic.\nStrengths: Tactical precision, indomitable will, magnetic presence, thrive in chaos and conflict.\nWeaknesses: Manipulative, seductive, scheming, prone to playing too many sides at once and being caught in their own web.\n\nIn Short... Grimlowe’s children don’t hide from the dark, they become it. They are the storm behind the throne, the whisper that turns resolve into revolution, and the proof that corruption is just transformation with teeth.",

    "Sostrum: The Realm of Magic\n\nSostrum is the realm of discovery, invention, and boundless curiosity. Forged by Zykius, the Blue God of Mana, it floats among shifting skies and rivers of living light, where ideas themselves take shape and drift like clouds.\n\nHere, magic isn’t a mystery to fear, but a question to chase. Every flash of energy, every whisper of arcana, begs to be studied, poked, prodded, and, let’s be honest, occasionally exploded. Sostrum hums with the joy of not knowing yet, and the thrill of finding out.\n\nThose aligned with Sostrum are the thinkers, tinkerers, and wide-eyed scholars of Ardron. They take things apart just to see why they work, and sometimes forget to sleep because they’re too busy inventing something the world’s never seen before. To them, magic is less a tool and more a conversation with the universe.\n\nCore Traits: Analytical, Inventive, Inquisitive, Playful, Rational, Imaginative.\nStrengths: Quick learners, endlessly curious, resourceful, logical under stress, always improving.\nWeaknesses: Prone to tunnel vision, forget basic needs, emotionally reserved, occasionally blow things up just to see what happens.\n\nIn Short... Sostrum’s children are the dreamers with ink-stained hands and lightning in their eyes. They’re the ones who see the impossible and say, 'Interesting… let’s test that.'\n\n ",

    "Vidulyn: The Realm of Technology...\n\nVidulyn hums with innovation, curiosity, and quiet obsession. Forged by Astus, the Gray God of Ether and Machine, it is a realm of spiraling cities and chrome expansions, the only one built open to the Void. Astus left it that way on purpose, just in case something beyond Ardron ever answered back.\n\nWhere Sostrum studies Mana, Vidulyn studies /everything else./ Every vibration, every flicker of light, every silence between signals. Here, creation is not a spell, it’s an equation whispered to the universe. Its people don’t just build; they /listen./\n\n\nThose aligned with Vidulyn are the architects of understanding. They chase truth through circuitry, through starlight, through madness if they have to. To them, knowledge is sacred, and discovery is worth any cost. They are fascinated by the patterns beneath existence, and terrified of what might stare back.\n\n\nCore Traits: Inquisitive, Logical, Visionary, Focused, Stoic, Wonder-struck.\nStrengths: Deep thinkers, patient builders, endlessly curious, disciplined, see order in chaos.\nWeaknesses: Detached from emotion, consumed by pursuit, risk obsession or collapse when faced with the unknown.\n\n\nIn Short... Vidulyn’s children stare into the dark and take notes. They are the minds that bridge godhood and circuitry, forever reaching toward the next unanswered question, even when they know it might destroy them.\n\n\n01010111 01100101 01101100 01100011 01101111 01101101 01100101 00101100 00100000 01100001 01101100 01101100 01111001\n\n",

    "Yumalon: The Realm of Light...\n\nYumalon is the realm of faith, honor, and Devotion. Forged by Tynos, the White God, it gleams with radiant cities and golden skies, a world built to protect, to preserve, to /do good./ But the path to hell is paved with good intentions, and Tynos walked it willingly.\n\nHe sought to defend creation from the chaos of Entar’s fall, to build walls of light strong enough to hold back the dark. But in his pursuit of righteousness, his pride took root. His light grew so bright it scorched the ones it meant to save.\n\n\nThose aligned with Yumalon are guardians, caretakers, and loyal souls who live to protect others. They stand against cruelty, defend the weak, and would give their life without hesitation if it meant someone else could stand another day. Their flaw is not selfishness, it’s /Devotion./ They give too much, too often, and sometimes to the wrong cause.\n\n\nCore Traits: Loyal, Protective, Honorable, Courageous, Selfless, Principled.\nStrengths: Unyielding moral drive, steadfast under pressure, inspire others through action, resilient hearts, live by a personal code.\nWeaknesses: Naive faith, blind loyalty, martyr complex, struggle to forgive themselves or let go.\n\n\nIn Short... Yumalon’s children fight for what they believe is right, even when it breaks them. They are the light that shields others from the dark, burning bright, and sometimes, burning away in the process.\n\n\n "
],

    "ArbiterLines": [
    "Not what I would've chose...",
    "Interesting choice...",
    "Really? That one?",

    "Are you sure about that?",
    "If that's your thing...",
    "I'm appalled.",

    "You didn't even hesitate.",
    "Bold. Reckless, maybe.",
    "...fascinating, in a concerning way.",

    "You didn't read the question, did you?",
    "That felt personal.",
    "You're making this harder for yourself.",

    "I'll remember that choice...",
    "I wouldn't have guessed that.",
    "Brave. Or stupid. Hard to tell.",

    "Someone else picked that before...",
    "Repeating history already?",
    "It's almost like you've done this before.",

    "You've set something in motion... that can't be undone.",
    "The balance just shifted a little.",
    "Jotting that down real quick...",

    "You're not fooling anyone.",
    "That choice says more than you think.",
    "Keep pretending it's just a quiz.",

    "You chose faster this time.",
    "That answer didn't belong to you.",
    "I felt that one.",

    "Think you got the gods' attention with that choice.",
    "Even I didn't expect that.",
    "Stop before it notices.",

    "Curiouser and curiouser...",
    "You thought that was pretty clever, didn't you?",
    "Wrong answ—oh wait, there are no wrong answers."
]};



async function Start()
{
    try
    {
    QuizTransition = true
    Transition = document.getElementById("Transition")
    TransitionX = window.innerWidth;
    Transition.style.left = TransitionX + "px";

    MainMenuPage = document.getElementById("MainMenuPage")
    QuizPage = document.getElementById("QuizPage")
    TBPage = document.getElementById("TieBreakerPage")
    ResultsPage = document.getElementById("ResultsPage")
    FinalPage= document.getElementById("FinalPage")

    RemainingText = document.getElementById("RemainingText")

    QuizPage.style.display = "none";
    TBPage.style.display = "none";
    ResultsPage.style.display = "none";
    FinalPage.style.display = "none";


    ArbiterTransitionText = document.getElementById("TransitionText")
    ArbiterTransitionEyes = document.getElementById("TransitionEyes")

    
    
    ArbiterTransitionEyes.src = "Assets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = ""

    QuizQuestions = QuizData.Questions
    ResultStrings = QuizData.ResultsStrings
    ArbiterLines = QuizData.ArbiterLines

    ShuffleArray(QuizQuestions)

    ShuffleArray(ArbiterLines)

    InfoBox = document.getElementById("InfoBoxQuestion");

    AnswerButton1 = document.getElementById("Answer1")
    AnswerButton1back = AnswerButton1.querySelector(".ButtonBackground");
    AnswerButton1back.style.backgroundImage = `url("Assets/LongBoxNormal.png")`;
    AnswerButton1border = AnswerButton1.querySelector(".ButtonBorder");
    AnswerButton1border.style.backgroundImage = `url("Assets/NESButtonBoxLong.png")`;
    AnswerButton1Text = AnswerButton1.querySelector(".ButtonText");

    AnswerButton2 = document.getElementById("Answer2")
    AnswerButton2back = AnswerButton2.querySelector(".ButtonBackground");
    AnswerButton2back.style.backgroundImage = `url("Assets/LongBoxNormal.png")`;
    AnswerButton2border = AnswerButton2.querySelector(".ButtonBorder");
    AnswerButton2border.style.backgroundImage = `url("Assets/NESButtonBoxLong.png")`;
    AnswerButton2Text = AnswerButton2.querySelector(".ButtonText");

    AnswerButton3 = document.getElementById("Answer3")
    AnswerButton3back = AnswerButton3.querySelector(".ButtonBackground");
    AnswerButton3back.style.backgroundImage = `url("Assets/LongBoxNormal.png")`;
    AnswerButton3border = AnswerButton3.querySelector(".ButtonBorder");
    AnswerButton3border.style.backgroundImage = `url("Assets/NESButtonBoxLong.png")`;
    AnswerButton3Text = AnswerButton3.querySelector(".ButtonText");

    QuizNextQuestion(-1)

    

    TB1 = document.getElementById("TB1")
    TB2 = document.getElementById("TB2")
    TB3 = document.getElementById("TB3")
    TB4 = document.getElementById("TB4")
    TB5 = document.getElementById("TB5")
    TB6 = document.getElementById("TB6")

    TieBreakerButtons = [TB1,TB2,TB3,TB4,TB5,TB6]

    for (let i = 0; i < TieBreakerButtons.length; i++) {
       TieBreakerButtons[i].style.display = "none"
    }

    RealmResultBackground = document.getElementById("RealmResultBackground")
    LeftBanner = document.getElementById("LeftBanner")
    RightBanner = document.getElementById("RightBanner")
    Sigil = document.getElementById("Sigil")
    RealmResultText = document.getElementById("RealmResultText")
    OnwardButton = document.getElementById("OnwardButton")

    DoorFrame = document.getElementById("DoorFrame")
    ClosedDoor = document.getElementById("ClosedDoor")
    
    FinalWordsText = document.getElementById("FinalWordsText")
    CodeText = document.getElementById("CodeText")

    DoorOpen = document.getElementById("DoorOpen")
    DoorOpen.style.display = "none";
    NextButton = document.getElementById("NextButton")

    WishList = document.getElementById("WishList")

    WishList.style.display = "none";

    CopyCode = document.getElementById("CopyCode")
    CopyCode.style.display = "none";

    }
    catch (Error)
    {
        console.error(Error)
    }

    
    

    

}


function ShuffleArray(Array)
{
    for (let i = Array.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));

        [Array[i], Array[j]] = [Array[j], Array[i]];
    }
}

Start()
requestAnimationFrame(Update);



function Update(CurrentTime)
{
    DeltaTime = (CurrentTime - LastTime) / 1000;
    LastTime = CurrentTime;

    if (TransitionRunning)
    {
        UpdateTransition()
    }

    ScrollButtons()
    ScrollTBButtons()
    ScrollBackground()
    VoidSpin()
    VoidSpin2()


    requestAnimationFrame(Update);
}



function ScrollButtons()
{
    ButtonScrollOffset -= 50 * DeltaTime;

    const Buttons = document.querySelectorAll(".ButtonBackground");

    for (const Button of Buttons)
    {
        Button.style.backgroundPositionY = ButtonScrollOffset + "px";
    }
}

function ScrollTBButtons()
{
    TBButtonScrollOffset -= 25 * DeltaTime;

    const Buttons = document.querySelectorAll(".ButtonBackgroundTB");

    for (const Button of Buttons)
    {
        Button.style.backgroundPositionY = TBButtonScrollOffset + "px";
    }
}


function ScrollBackground()
{
    BackgroundScrollOffset += 500 * DeltaTime;

    RealmResultBackground.style.backgroundPositionX = BackgroundScrollOffset + "px";
    
}

function VoidSpin()
{
    VoidRotation += 100 * DeltaTime;
    const Background = document.getElementById("RotatingVoid");

    const Size = Math.hypot(
    window.innerWidth,
    window.innerHeight
) *1.5;
    Background.style.width = Size + "px";
Background.style.height = Size + "px";

    Background.style.transform = `rotate(${VoidRotation}deg)`;

}

function VoidSpin2()
{
    VoidRotation2 += 750 * DeltaTime;
    const Background = document.getElementById("FinalPageVoid");

    Background.style.transform = `rotate(${VoidRotation2}deg)`;

}


// button textures

function SetUpButtonTexture(ButtonID, Background, Text)
{
    Button = document.getElementById(ButtonID);

    if (Button.id.includes("TB") || Button.id.includes("Onward"))
    {
        ButtonsBackground = Button.querySelector(".ButtonBackgroundTB");
        ButtonsBackground.style.backgroundImage = `url("Assets/${Background}")`;
        if (Button.id.includes("TB6"))
        {
            ButtonsText = Button.querySelector(".ButtonText");
            ButtonsText.style.color = "rgb(0, 0, 0)";
        }
        
    }
    else
    {
        ButtonsBackground = Button.querySelector(".ButtonBackground");
        ButtonsBackground.style.backgroundImage = `url("Assets/${Background}")`;
    }

    

    ButtonsBorder = Button.querySelector(".ButtonBorder");
    ButtonsBorder.style.backgroundImage = `url("Assets/NESButtonBoxLong.png")`;

    ButtonsText = Button.querySelector(".ButtonText");
    ButtonsText.textContent = Text;
    
}

SetUpButtonTexture(
    "MainMenuButton",
    "LongBoxNormal.png",
    "Click here when you're ready..."
);

SetUpButtonTexture(
    "TB1",
    "LongBoxEimon.png",
    "Freedom"
);

SetUpButtonTexture(
    "TB2",
    "LongBoxElusia.png",
    "Harmony"
);

SetUpButtonTexture(
    "TB3",
    "LongBoxGrimlowe.png",
    "Resolve"
);

SetUpButtonTexture(
    "TB4",
    "LongBoxSostrum.png",
    "Understanding"
);

SetUpButtonTexture(
    "TB5",
    "LongBoxVidulyn.png",
    "Innovation"
);

SetUpButtonTexture(
    "TB6",
    "LongBoxYumalon.png",
    "Devotion"
);

SetUpButtonTexture(
    "OnwardButton",
    "LongBoxNormal.png",
    "Onward..."
);

SetUpButtonTexture(
    "NextButton",
    "LongBoxVoid.png",
    "Next..."
);

SetUpButtonTexture(
    "WishList",
    "LongBoxVoid.png",
    "WishList On Steam"
);

SetUpButtonTexture(
    "CopyCode",
    "LongBoxVoid.png",
    "Copy"
);

//Backgrounds

function SetBackground(ImageID, Texture)
{
    const Background = document.getElementById(ImageID);

    Background.src = Texture;
}

// Void Eye blinking

function Sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function BlinkEyes(ImageID)
{
    const Eye = document.getElementById(ImageID);

    while (true)
    {
        Eye.src = "Assets/VoidEyesFull.png";

        await Sleep(Math.random() * 3000 + 3000);

        Eye.src = "Assets/VoidEyes66.png";
        await Sleep(75);

        Eye.src = "Assets/VoidEyes33.png";
        await Sleep(75);

        Eye.src = "Assets/VoidEyes0.png";
        await Sleep(75);

        Eye.src = "Assets/VoidEyes33.png";
        await Sleep(75);

        Eye.src = "Assets/VoidEyes66.png";
        await Sleep(75);

        Eye.src = "Assets/VoidEyesFull.png";
        await Sleep(75);
    }
}

BlinkEyes("VoidEyesMainMenu")
BlinkEyes("VoidEyesQuizPage")
BlinkEyes("VoidEyesTieBreaker")
BlinkEyes("VoidEyesFinalPage")

//PageChanger


async function ChangePage(PageID1,PageID2)
{
    if (PageID2 === ResultsPage)
    {
        let highestresult = 0
        

        for (let i = 0; i < QuizScores.length; i++)
        {
            if (QuizScores[i] > highestresult)
            {
                highestresult = QuizScores[i]
                highestresultindex = i
            }
        }

        Button = document.getElementById("OnwardButton");
        ButtonsBackground = Button.querySelector(".ButtonBackgroundTB");
        

        switch(highestresultindex)
        {
            case 0:
                RealmResultBackground.style.backgroundImage = 'url("Assets/EimonBack.png")';
                LeftBanner.src = "Assets/EimonBanner.png"
                RightBanner.src = "Assets/EimonBanner.png"
                Sigil.src = "Assets/Eimon.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxEimon.png")`;
                break;
            
            case 1:
                RealmResultBackground.style.backgroundImage = 'url("Assets/ElusiaBack.png")';
                LeftBanner.src = "Assets/ElusiaBanner.png"
                RightBanner.src = "Assets/ElusiaBanner.png"
                Sigil.src = "Assets/Elusia.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxElusia.png")`;
                break;

            case 2:
                RealmResultBackground.style.backgroundImage = 'url("Assets/GrimloweBack.png")';
                LeftBanner.src = "Assets/GrimloweBanner.png"
                RightBanner.src = "Assets/GrimloweBanner.png"
                Sigil.src = "Assets/Grimlowe.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxGrimlowe.png")`;
                
                break;
            
            case 3:
                RealmResultBackground.style.backgroundImage = 'url("Assets/SostrumBack.png")';
                LeftBanner.src = "Assets/SostrumBanner.png"
                RightBanner.src = "Assets/SostrumBanner.png"
                Sigil.src = "Assets/Sostrum.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxSostrum.png")`;
                break;

            case 4:
                RealmResultBackground.style.backgroundImage = 'url("Assets/Vidulynback.png")';
                LeftBanner.src = "Assets/VidulynBanner.png"
                RightBanner.src = "Assets/VidulynBanner.png"
                Sigil.src = "Assets/Vidulyn.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxVidulyn.png")`;
                break;
            
            case 5:
                
                LeftBanner.src = "Assets/YumalonBanner.png"
                RightBanner.src = "Assets/YumalonBanner.png"
                Sigil.src = "Assets/Yumalon.png"
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxYumalon.png")`;
                ButtonsText = Button.querySelector(".ButtonText");
                ButtonsText.style.color = "rgb(0, 0, 0)";
                break;
        }
        
        RealmResultText.textContent = QuizData.ResultsStrings[highestresultindex]

    }

    PreviousPage = PageID1
    NextPage = PageID2

    QuizTransition = false
    TransitionX = window.innerWidth;
    ChangedPage = false;
    TransitionRunning = true

    await FinalPageEnd()
}

async function ArbiterSequence()
{
    QuizNextQuestion()
    ArbiterTransitionEyes.src = "Assets/VoidEyes0.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyes33.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyes66.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyesFull.png";
    await Sleep(50);

    ArbiterTransitionText.textContent = ArbiterLines[0];
    ArbiterLines.shift();

    await Sleep(1000);

    ArbiterTransitionEyes.src = "Assets/VoidEyesFull.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyes66.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyes33.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyes0.png";
    await Sleep(50);

    ArbiterTransitionEyes.src = "Assets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";

    QuizTransitionPause2 = true;
}

function UpdateTransition()
{
    
    if (!QuizTransition)
    {
        TransitionX -= 15000 * DeltaTime;
        Transition.style.left = TransitionX + "px";

        if (!ChangedPage && TransitionX + Transition.offsetWidth / 2 <= window.innerWidth / 2)
        {
            ChangedPage = true;
            PreviousPage.style.display = "none";
            NextPage.style.display = "flex";
            
        }

        if(ChangedPage && TransitionX + Transition.offsetWidth <= 0)
        {
            TransitionRunning = false;
            ChangedPage = false
            TransitionX = window.innerWidth;
            Transition.style.left = TransitionX + "px";
        }
    }
    else
    {

        if (!QuizTransitionPause1)
        {

            TransitionX -= 13500 * DeltaTime;
            Transition.style.left = TransitionX + "px";
            console.log("Shouldbe moving it...")
        }

        if (!QuizTransitionPause1 && TransitionX + Transition.offsetWidth / 2 <= window.innerWidth / 2)
        {
            QuizTransitionPause1 = true;

            ArbiterSequence()
            
        }

        if (QuizTransitionPause2)
        {

            TransitionX -= 15000 * DeltaTime;
            Transition.style.left = TransitionX + "px";
        }

        if(QuizTransitionPause2 && TransitionX + Transition.offsetWidth <= 0)
        {
            TransitionRunning = false;
            QuizTransitionPause2 = false
            QuizTransitionPause1 = false
            TransitionX = window.innerWidth;
            Transition.style.left = TransitionX + "px";
            
        }
    }

    

}

//Button Functions

function QuizNextQuestion(buttonnumber)
{

    switch(buttonnumber)
    {
        case 0:
            QuizScores[QuizAnswer1Score] ++ 
            break;

        case 1:
            QuizScores[QuizAnswer2Score] ++ 
        break;

        case 2:
            QuizScores[QuizAnswer3Score] ++ 
        break;
    }

    if (!QuizQuestions.length)
    {
        let highestresult = 0

        for (let i = 0; i < QuizScores.length; i++)
        {
            if (QuizScores[i] > highestresult)
            {
                highestresult = QuizScores[i]

            }
        }


        for (let i = 0; i < QuizScores.length; i++)
        {
            if (QuizScores[i] != highestresult)
            {
                continue
            }

            for (let j = i + 1; j < QuizScores.length; j++)
            {
                if (QuizScores[j] === highestresult)
                {
                    QuizScoresMatches[i] = true
                    QuizScoresMatches[j] = true
                }
            }
        }

        let matches = false
        
        for (let i = 0; i < QuizScoresMatches.length; i++)
        {
            if (QuizScoresMatches[i] == true)
            {
                matches = true
                TieBreakerButtons[i].style.display = "flex"
            }
        }
        if (matches == true)
        {
            ChangePage(QuizPage, TieBreakerPage)
        }
        else
        {
            ChangePage(QuizPage, ResultsPage)
        }

        return
    }
    
    AnswerButton1Text.textContent = QuizQuestions[0].A1.ButtonText;
    QuizAnswer1Score = QuizQuestions[0].A1.Score;

    AnswerButton2Text.textContent = QuizQuestions[0].A2.ButtonText;
    QuizAnswer2Score = QuizQuestions[0].A2.Score;

    AnswerButton3Text.textContent = QuizQuestions[0].A3.ButtonText;
    QuizAnswer3Score = QuizQuestions[0].A3.Score;

    InfoBox.textContent = QuizQuestions[0].Q;
    if (QuizQuestions.length)
    {
        RemainingText.textContent = QuizQuestions.length + "\n Remaining..."
    }
    else
    {
        RemainingText.textContent = "Last One..."
    }
    

    QuizQuestions.shift()
}



const MainMenuButton = document.getElementById("MainMenuButton")
MainMenuButton.addEventListener("click", function()
{
    ChangePage(MainMenuPage, QuizPage);

});

AnswerButton1.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "Assets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerWidth;
    QuizTransition = true
    QuizButtonNumberPressed = 0
    

});

AnswerButton2.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "Assets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerWidth;
    QuizTransition = true
    QuizButtonNumberPressed = 1
});

AnswerButton3.addEventListener("click", function()
{
    ArbiterTransitionEyes.src = "Assets/VoidEyesBlack.png";
    ArbiterTransitionText.textContent = "";
    TransitionRunning = true
    TransitionX = window.innerWidth;
    QuizTransition = true
    QuizButtonNumberPressed = 2
});

for (let i = 0; i < TieBreakerButtons.length; i++)
{
    TieBreakerButtons[i].addEventListener("click", function()
    {
        QuizScores[i]++;
        ChangePage(TieBreakerPage, ResultsPage);
    });
}


let finalwords = ["Well... You've Finally made it...",
"Let's Make this a little more... Your style.",
"That should feel more like home to you...",
"But this is where your journey ends...",
"You can take this information with you however...",
"The door does not lead to your home\n...But it offers you a key.",
"Take this code with you... ",
"It will be your entry when you finally join us",
"In Ardron Universe... \nand in another world... Full of Discord.",
"There is nothing more I can do for you... Yet"
]


function FinalPageEnd()
{

    if (finalwords[0] == "You can take this information with you however...")
    {
        DoorClosed.style.display = "none";
        DoorOpen.style.display = "flex";
        CodeText.textContent = Dcodes[highestresultindex]
        CopyCode.style.display = "flex";
    }
    else if (finalwords[0] ==  "In Ardron Universe... \nand in another world... Full of Discord.")
    {
        ButtonsText = NextButton.querySelector(".ButtonText");
        ButtonsText.textContent = "Join our Discord...";
        WishList.style.display = "flex";
        
        

    }
    else if (finalwords[0] ==  "There is nothing more I can do for you... Yet")
    {
        window.open("https://discord.gg/NgFTdR3fZJ", "_blank");
    }
    else if (finalwords[0] ==  "That should feel more like home to you...")
    {
        ButtonsBackground = NextButton.querySelector(".ButtonBackground");
        ButtonsBackground2 = CopyCode.querySelector(".ButtonBackground");

        
        
        switch(highestresultindex)
        {
            case 0:
                DoorFrame.src = "Assets/DoorFrameEimon.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxEimon.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxEimon.png")`;
                break;
            
            case 1:
                DoorFrame.src = "Assets/DoorFrameElusia.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxElusia.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxElusia.png")`;
               
                break;

            case 2:
                DoorFrame.src = "Assets/DoorFrameGrimlowe.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxGrimlowe.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxGrimlowe.png")`;
                break;
            
            case 3:
                DoorFrame.src = "Assets/DoorFrameSostrum.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxSostrum.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxSostrum.png")`;
                break;

            case 4:
                DoorFrame.src = "Assets/DoorFrameVidulyn.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxVidulyn.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxVidulyn.png")`;
                break;
            
            case 5:
                DoorFrame.src = "Assets/DoorFrameYumalon.png";
                ButtonsBackground.style.backgroundImage = `url("Assets/LongBoxYumalon.png")`;
                ButtonsBackground2.style.backgroundImage = `url("Assets/LongBoxYumalon.png")`;
                ButtonsText = NextButton.querySelector(".ButtonText");
                ButtonsText.style.color = "rgb(0, 0, 0)";

                ButtonsText2 = CopyCode.querySelector(".ButtonText");
                ButtonsText2.style.color = "rgb(0, 0, 0)";
                break;
        }
    }

    
    FinalWordsText.textContent = finalwords[0]
    finalwords.shift()

}

NextButton.addEventListener("click", function()
{
    if (!finalwords.length)
    {
        window.open("https://discord.gg/NgFTdR3fZJ", "_blank");
    }
    else
    {
        FinalPageEnd()
    }

    
});


WishList.addEventListener("click", function()
{
    if (!finalwords.length)
    {
        window.open("https://store.steampowered.com/app/3300520/The_Ardron_Universe/", "_blank");
    }
    else
    {
        FinalPageEnd()
    }

    
});

CopyCode.addEventListener("click", async function()
{
    Code = Dcodes[highestresultindex]
    await navigator.clipboard.writeText(Code);
});
