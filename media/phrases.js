const RubbyPhrases = Object.freeze({
    worried: [
        "So many errors..",
        "So many errors, I'm scared!",
        "Are you sure you know what you're doing?",
        "I can't even look at it anymore!",
        "Quack... that's a lot of red.",
        "I think we broke something...",
        "This code needs a rescue mission!",
        "The bugs are multiplying!",
        "Even my feathers are ruffled!",
        "Houston, we have compilation errors.",
        "I've seen cleaner ponds than this code.",
        "This is getting dangerously buggy.",
        "Time to call the bug exterminator!",
        "The compiler is crying.",
        "Let's fix one error at a time.",
        "This might take a few coffee refills.",
        "The error counter is working overtime.",
        "I believe in you... mostly.",
        "Quack! We have entered bug territory.",
        "Don't panic... yet."
    ],

    motivational: [
        "You can do it! Fix those bugs!",
        "Don't give up, it's just code!",
        "Every bug fixed is a step forward!",
        "Take a deep breath, you got this!",
        "Progress is progress, no matter how small.",
        "One error less than before!",
        "Keep going, you're getting there!",
        "Debugging is just detective work.",
        "Trust the process.",
        "Every great developer debugs.",
        "You're closer than you think.",
        "One more fix!",
        "Stay calm and keep coding.",
        "Quack! Victory is near.",
        "Mistakes are proof you're building something.",
        "Small fixes lead to big wins.",
        "The compiler will smile eventually.",
        "Your future self will thank you.",
        "Keep squashing those bugs!",
        "Don't let the bugs win."
    ],

    standard: [
        "Quack! Almost there!",
        "Just a few more bugs to squash.",
        "Looking good, keep it up!",
        "Quack quack!",
        "Nice work so far.",
        "Your code is coming together.",
        "Just polishing the final details.",
        "Looking cleaner already.",
        "A few tweaks and it'll shine.",
        "Steady progress!",
        "Keep the momentum going.",
        "Almost production-ready!",
        "Good job, developer.",
        "Not bad at all.",
        "The pond is getting cleaner.",
        "One step closer to perfection.",
        "Everything looks under control.",
        "Keep those commits coming.",
        "Quack! Looking sharp.",
        "You're on the right track."
    ],

    happy: [
        "Zero errors! You are a genius!",
        "Quack! Perfection!",
        "My work here is done.",
        "Flawless victory!",
        "Quack quack! No bugs in sight!",
        "We are perfect together!",
        "The compiler approves!",
        "Mission accomplished!",
        "Beautiful code!",
        "Nothing to complain about!",
        "You've mastered the bugs.",
        "Everything compiled perfectly!",
        "This duck is proud of you!",
        "No bugs. Just vibes.",
        "Absolutely spotless.",
        "Ship it!",
        "Ready for production!",
        "The pond has never been cleaner.",
        "You're coding like a pro!",
        "Outstanding work!",
        "Green checks everywhere!",
        "Perfect! Time for a coffee break.",
        "I couldn't find a single bug!",
        "Quack! That's impressive."
    ],

    jokes: [
        "Why do ducks make good developers? We never duck a challenge!",
        "What's a duck's favorite language? Quack-end JavaScript!",
        "I'm not debugging, I'm just duck-typing.",
        "Why did the duck cross the codebase? To fix the bugs on the other side!",
        "You’ve got 99 problems, but a duck ain’t one… unless it’s stealing your sandwich.",
        "To err is human. To forgive, duck.",
        "I'm fluent in Quackery, HTML, and CSS.",
        "My code compiles on the first try... in my dreams."
    ],

    cool: [
        "Nailed it.",
        "Debugging champion.",
        "Clean run!",
        "Smooth operator.",
        "Bugs? What bugs?",
        "Like a boss."
    ]
});

function pickPhrase(errorCount) {
    let pool;

    if (errorCount > 50) {
        pool = RubbyPhrases.worried;
    } else if (errorCount > 10) {
        pool = RubbyPhrases.motivational;
    } else if (errorCount > 0) {
        pool = RubbyPhrases.standard;
    } else {
        pool = RubbyPhrases.happy;
    }

    return pool[Math.floor(Math.random() * pool.length)];
}