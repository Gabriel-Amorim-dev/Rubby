const wrap = document.getElementById("duckWrap");
const duck = document.getElementById("duck");

const sprites = {

    walking: duck.dataset.walk,
    happy: duck.dataset.happy,
    scared: duck.dataset.scared,
    sad: duck.dataset.sad,
    sleeping: duck.dataset.sleepy,
    cool: duck.dataset.cool,
    laughing: duck.dataset.laughing
};

const DuckState = Object.freeze({
    WALKING: "walking",
    HAPPY: "happy",
    SCARED: "scared",
    SAD: "sad",
    SLEEPING: "sleeping",
    COOL: "cool"
});

let currentState = DuckState.WALKING;

let x = 20;
let direction = 1;
const speed = 40;

let lastTime = null;
let currentErrorCount = 0;
let isStopped = false;
let stopTimeout = null;
let idleChatInterval = null;

function startIdleChat() {
    stopIdleChat();
    // 60 to 120 seconds
    const delay = 60000 + Math.random() * 30000;
    idleChatInterval = setTimeout(triggerIdleChat, delay);
}

function stopIdleChat() {
    if (idleChatInterval) {
        clearTimeout(idleChatInterval);
        idleChatInterval = null;
    }
}

function triggerIdleChat() {
    if (currentState === DuckState.WALKING && !isStopped) {
        isStopped = true;
        duck.src = sprites.laughing;
        const speech = RubbyPhrases.jokes[Math.floor(Math.random() * RubbyPhrases.jokes.length)];
        
        speechBubble.innerText = speech;
        speechBubble.style.display = "block";
        
        clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
            isStopped = false;
            speechBubble.style.display = "none";
            if (currentState === DuckState.WALKING) {
                duck.src = sprites.walking;
            }
            startIdleChat();
        }, 2500);
    } else {
        startIdleChat();
    }
}

const speechBubble = document.createElement("div");
speechBubble.id = "speechBubble";
speechBubble.style.display = "none";
speechBubble.style.position = "absolute";
speechBubble.style.bottom = "100%";
speechBubble.style.left = "50%";
speechBubble.style.transform = "translateX(-50%)";
speechBubble.style.backgroundColor = "white";
speechBubble.style.padding = "10px";
speechBubble.style.borderRadius = "10px";
speechBubble.style.border = "2px solid #333";
speechBubble.style.fontFamily = "sans-serif";
speechBubble.style.fontSize = "12px";
speechBubble.style.textAlign = "center";
speechBubble.style.minWidth = "120px";
speechBubble.style.zIndex = "10";
speechBubble.style.color = "#000";
speechBubble.innerText = "Quack!";
wrap.appendChild(speechBubble);

duck.style.cursor = "pointer";
duck.addEventListener("click", () => {
    if (isStopped || currentState === DuckState.SLEEPING) return;

    isStopped = true;

    const speech = pickPhrase(currentErrorCount);

    speechBubble.innerText = speech;
    speechBubble.style.display = "block";

    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => {
        isStopped = false;
        speechBubble.style.display = "none";
    }, 3000);
});

function speakNow() {
    if (isStopped || currentState === DuckState.SLEEPING) return;

    isStopped = true;

    const speech = pickPhrase(currentErrorCount);

    speechBubble.innerText = speech;
    speechBubble.style.display = "block";

    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(() => {
        isStopped = false;
        speechBubble.style.display = "none";
    }, 3000);
}
duck.addEventListener("click", speakNow);

// Listen for messages from the extension
window.addEventListener("message", event => {

    const message = event.data;

      if (message.type === "talk") {
        speakNow();
        return;
    }

    if (message.type !== "state") return;

    if (message.errorCount !== undefined) {
        currentErrorCount = message.errorCount;
    }

    setState(message.state);

});

// -----------------------------
// Main Animation Loop
// -----------------------------
function step(timestamp) {

    if (lastTime === null) {
        lastTime = timestamp;
    }

    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Duck only walks in WALKING state
    if (currentState === DuckState.WALKING && !isStopped) {

        const maxX = window.innerWidth - wrap.offsetWidth - 20;

        x += speed * direction * dt;

        if (x >= maxX) {
            x = maxX;
            direction = -1;
        }

        if (x <= 0) {
            x = 0;
            direction = 1;
        }

    }

    wrap.style.transform = `translateX(${x}px)`;

    duck.style.transform =
        direction === -1
            ? "scaleX(-1)"
            : "scaleX(1)";

    requestAnimationFrame(step);

}

// -----------------------------
// State Machine
// -----------------------------
let previousStateBeforeCool = DuckState.WALKING;
let coolTimeout = null;

function setState(state) {

    if (state === currentState && state !== DuckState.COOL) return;

    let stateToSave = currentState;

    if (currentState === DuckState.WALKING) {
        stopIdleChat();
    }

    currentState = state;

    if (currentState === DuckState.WALKING) {
        startIdleChat();
    }

    switch (state) {

        case DuckState.WALKING:
            duck.src = sprites.walking;
            break;

        case DuckState.HAPPY:
            duck.src = sprites.happy;
            celebrate();
            break;

        case DuckState.SCARED:
            duck.src = sprites.scared;
            panic();
            break;

        case DuckState.SAD:
            duck.src = sprites.sad;
            cry();
            break;
            
        case DuckState.SLEEPING:
            duck.src = sprites.sleeping;
            break;

        case DuckState.COOL:
            duck.src = sprites.cool;
            if (stateToSave !== DuckState.COOL) {
                previousStateBeforeCool = stateToSave;
            }
            celebrateCool();
            break;

    }

}

// -----------------------------
// Animations
// -----------------------------
function celebrate() {

    jump();

    setTimeout(() => {

        setState(DuckState.WALKING);

    }, 3000);

}

function celebrateCool() {
    jump();
    
    const speech = RubbyPhrases.cool[Math.floor(Math.random() * RubbyPhrases.cool.length)];
    speechBubble.innerText = speech;
    speechBubble.style.display = "block";
    
    if (coolTimeout) clearTimeout(coolTimeout);

    coolTimeout = setTimeout(() => {
        speechBubble.style.display = "none";
        if (currentState === DuckState.COOL) {
            setState(previousStateBeforeCool);
        }
    }, 3000);
}

function panic() {

    shake();

    setTimeout(() => {

        setState(DuckState.WALKING);

    }, 4000);
}


function cry() {

    setTimeout(() => {
        setState(DuckState.WALKING);
    }, 4000);
}

// -----------------------------
// Effects
// -----------------------------
function jump() {

    wrap.animate(
        [
            {
                transform: `translate(${x}px,0px)`
            },
            {
                transform: `translate(${x}px,-18px)`
            },
            {
                transform: `translate(${x}px,0px)`
            }
        ],
        {
            duration: 300,
            iterations: 2
        }
    );

}

function shake() {

    wrap.animate(
        [
            {
                transform: `translate(${x}px,0px)`
            },
            {
                transform: `translate(${x + 4}px,0px)`
            },
            {
                transform: `translate(${x - 4}px,0px)`
            },
            {
                transform: `translate(${x}px,0px)`
            }
        ],
        {
            duration: 120,
            iterations: 8
        }
    );
}
function droop() {

    wrap.animate(
        [
            { transform: `translate(${x}px,0px) rotate(0deg)` },
            { transform: `translate(${x}px,4px) rotate(-4deg)` }
        ],
        {
            duration: 400,
            easing: "ease-out",
            iterations: 2
        }
    );

}

requestAnimationFrame(step);

