/* =============================
   HANDWRITING TYPE EFFECT
============================= */

const text = "Welcome :] ";
let index = 0;

const typingSpeedMin = 70;
const typingSpeedMax = 160;

const handwriting = document.getElementById("handwriting");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

/* TYPE LETTER BY LETTER */
function typeEffect() {
    if (index < text.length) {
        handwriting.textContent += text.charAt(index);
        index++;

        const randomSpeed =
            Math.floor(Math.random() * (typingSpeedMax - typingSpeedMin + 1)) +
            typingSpeedMin;

        setTimeout(typeEffect, randomSpeed);
    } else {
        setTimeout(hideLoader, 1000);
    }
}

/* HIDE LOADER */
function hideLoader() {
    loader.style.transition = "opacity 1s";
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
    }, 1000);
}

const questions = [
    {
        question: "What's your superpower as a designer?",
        answer: "Turning chaos into a system and making it look effortless. I see patterns where others see mess."
    },
    {
        question: "How do you build responsive components?",
        answer: "I start mobile-first, use flexible units like rem and %, leverage CSS Grid and Flexbox, and test across breakpoints obsessively."
    },
    {
        question: "How do you approach design systems?",
        answer: "Start with atoms, build molecules, create organisms. Document everything. Make it flexible enough to scale but strict enough to stay consistent."
    },
    
    {
        question: "How do you handle design feedback?",
        answer: "Listen first, defend second. Good feedback makes work better. Bad feedback teaches you to communicate your decisions clearly."
    },
    {
        question: "What's your design philosophy?",
        answer: "Less, but better. Every element should earn its place. If it doesn't serve a purpose, it doesn't belong."
    },
    {
        question: "How do you stay creative?",
        answer: "I collect inspiration obsessively, take walks, sketch on paper, and remember that creativity is a muscle - use it or lose it."
    },
    {
        question: "What makes a good portfolio?",
        answer: "Show process, not just pixels. Tell the story of why, not just what. Make it easy to navigate and impossible to forget."
    },
    {
        question: "What's your superpower as a developer?",
        answer: "Solving complex problems with clean, scalable code and building features that work end-to-end."
    },
    {
        question: "How do you build responsive web apps?",
        answer: "I use mobile-first CSS, Flexbox/Grid, and test across devices. I also leverage frameworks like React for dynamic UIs."
    },
    {
        question: "How do you approach API design?",
        answer: "I focus on RESTful principles, clear documentation, versioning, and robust error handling. Security and scalability are always priorities."
    },
    {
        question: "What tools do you use daily?",
        answer: "VS Code, Git, Postman, Docker, and browser dev tools. For backend: Node.js, MongoDB, and cloud platforms like AWS."
    },
    {
        question: "How do you handle code reviews and feedback?",
        answer: "I welcome feedback, review PRs for clarity and maintainability, and believe every review is a chance to learn or teach."
    },
    {
        question: "What's your approach to security?",
        answer: "I use environment variables, validate inputs, sanitize outputs, and follow best practices for authentication and authorization."
    },
    {
        question: "How do you stay up-to-date with tech?",
        answer: "I follow blogs, contribute to open source, and experiment with new frameworks and tools in side projects."
    },
    {
        question: "What makes a good full stack project?",
        answer: "Clear separation of concerns, robust API, secure authentication, responsive UI, and automated tests."
    },
    {
        question: "How do you collaborate with designers?",
        answer: "I communicate early, clarify requirements, and turn Figma/mockups into pixel-perfect, accessible interfaces."
    },
    
];

let usedQuestions = [];
let isProcessing = false;

// Shuffle array
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Get available questions (not used yet)
function getAvailableQuestions() {
    return questions.filter(qa => !usedQuestions.includes(qa.question));
}

// Refresh command lists
function refreshCommands() {
    const available = getAvailableQuestions();
    const shuffled = shuffle(available);

    // Available commands list (show 3)
    const listContainer = document.getElementById('commandsList');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    if (shuffled.length === 0) {
        listContainer.innerHTML = '<div class="no-questions">ALL QUESTIONS ANSWERED. CLICK REFRESH TO RESTART.</div>';
        usedQuestions = []; // Reset for next refresh
        return;
    }

    const listCommands = shuffled.slice(0, 3);
    listCommands.forEach(qa => {
        const item = document.createElement('button');
        item.className = 'command-item';
        item.textContent = qa.question;
        item.onclick = () => sendCommand(qa);
        item.disabled = isProcessing;
        listContainer.appendChild(item);
    });
}

// Send command
async function sendCommand(qa) {
    if (isProcessing) return;
    isProcessing = true;

    const chatArea = document.getElementById('chatArea');
    if (!chatArea) return;

    // Add user question (RIGHT side, darker box)
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `
        <div class="message-box">
            <div class="message-label">YOU ></div>
            <div class="message-content">${qa.question}</div>
        </div>
    `;
    chatArea.appendChild(userMsg);

    // Add system thinking (LEFT side)
    const systemMsg = document.createElement('div');
    systemMsg.className = 'chat-message system';
    systemMsg.innerHTML = `
        <div class="message-box">
            <div class="message-label">SYSTEM ></div>
            <div class="message-content typing"></div>
        </div>
    `;
    chatArea.appendChild(systemMsg);

    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;

    // Disable all buttons
    document.querySelectorAll('.command-item').forEach(btn => btn.disabled = true);

    // Wait 1 second (thinking)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show answer
    systemMsg.querySelector('.message-content').classList.remove('typing');
    systemMsg.querySelector('.message-content').textContent = qa.answer;

    // Mark question as used
    usedQuestions.push(qa.question);

    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;

    isProcessing = false;

    // Refresh available commands
    refreshCommands();
}

// Theme toggle function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load saved theme preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

const card = document.querySelector(".card-wrapper");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    const rotate = Math.sin(scrollY * 0.008) * 1.2;
    const translateY = Math.sin(scrollY * 0.01) * 8;

    card.style.transform = `
        translateY(-50%)
        translateY(${translateY}px)
        rotate(${rotate}deg)
    `;
});

/* =========================
   SERVICES ACCORDION
========================= */
document.addEventListener('DOMContentLoaded', function() {
    const serviceHeaders = document.querySelectorAll('.service-header');
    
    serviceHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            const toggle = this.querySelector('.toggle');
            const wasActive = parent.classList.contains('active');
            
            // Close all services
            document.querySelectorAll('.service').forEach(service => {
                service.classList.remove('active');
                service.querySelector('.toggle').textContent = '+';
            });
            
            // Open clicked one if it wasn't active
            if (!wasActive) {
                parent.classList.add('active');
                toggle.textContent = '−';
            }
        });
    });

    // Initialize chat system
    refreshCommands();
    
    // Refresh button event listener
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            if (!isProcessing) {
                refreshCommands();
            }
        });
    }
    
    // Set active nav item on click
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't change active state for external links
            if (this.getAttribute('target') === '_blank') return;
            
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

/* START */
window.onload = typeEffect;
