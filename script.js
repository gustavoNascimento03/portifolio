// --- DICIONÁRIO DE TRADUÇÕES ---
const translations = {
    pt: { 
        greetings: ["Não é sobre o quanto você sabe.", "É sobre o quanto você pode aprender."],
        scrollPrompt: "Role para explorar →", 
        aboutTitle: "Sobre Mim", 
        aboutP1: "Olá! Sou estudante de Fullstack apaixonado por criar, desenvolver e aprimorar soluções digitais, que sejam tanto funcionais quanto visualmente atrativas. Minha jornada na programação começou com a vontade de desenvolver meu proprio jogo para navegadores, entender como fazia para um jogo funcionar em plataformas de redes sociais, aquela parte por debaixo dos panos, e hoje essa curiosidade me move para aprender mais tecnologias.", 
        aboutP2: "Tenho foco em front-end, buscando trazer a parte bonita e atrativa do site, junto com sua funcionalidade e otimização de conteudo, mas isso não impede de sair do design de interface até a arquitetura do banco de dados no back-end e conexões com APIs REST. Estou atras de me consolidar na area e aprimorar meus conhecimentos.", 
        projectsTitle: "Projetos", 
        project1Title: "Blog Back-end", 
        project1Desc: "Back-end do Blog-Fiap, com Node.js, MongoDB, Docker.", 
        project2Title: "Clone do Termo", 
        project2Desc: "Jogo de palavras feito com JavaScript puro e um dicionário dinâmico.", 
        project3Title: "Dashboard Analítico", 
        project3Desc: "Visualização de dados em tempo real com D3.js e WebSocket.", 
        stackTitle: "Minha Stack", 
        contactTitle: "Vamos Conversar?", 
        contactP1: "Estou sempre aberto a novas oportunidades e colaborações. Se você tem um projeto em mente ou apenas quer trocar uma ideia, não hesite em me contatar.", 
        modalLive: "Ver ao Vivo", 
        modalCode: "Código no GitHub", 
        stackProjectTitle: "Tecnologias Utilizadas" 
    },
    en: { 
        greetings: ["It's not about how much you know.", "It's about how much you can learn."],
        scrollPrompt: "Scroll to explore →", 
        aboutTitle: "About Me", 
        aboutP1: "Hello! I'm a Fullstack student passionate about creating, developing, and improving digital solutions that are both functional and visually appealing. My programming journey began with the desire to develop my own browser game, understanding how to make a game work on social media platforms—the under-the-hood stuff. Today, this curiosity drives me to learn more technologies.", 
        aboutP2: "I focus on the front-end, striving to bring out the beautiful and attractive aspects of a website, along with its functionality and content optimization. But that doesn't stop me from expanding beyond interface design to back-end database architecture and REST API connections. I'm looking to establish myself in this field and enhance my knowledge.", 
        projectsTitle: "Projects", 
        project1Title: "Back-end Blog ", 
        project1Desc: "Back-end of Blog-Fiap, with Node.js, MongoDB, Docker.", 
        project2Title: "Wordle Clone", 
        project2Desc: "Word game made with pure JavaScript and a dynamic dictionary.", 
        project3Title: "Analytics Dashboard", 
        project3Desc: "Real-time data visualization with D3.js and WebSocket.", 
        stackTitle: "My Stack", 
        contactTitle: "Let's Talk?", 
        contactP1: "I'm always open to new opportunities and collaborations. If you have a project in mind or just want to exchange ideas, don't hesitate to contact me.", 
        modalLive: "View Live", 
        modalCode: "Code on GitHub", 
        stackProjectTitle: "Technologies Used" 
    }
};


// --- LÓGICA DO DARK MODE E IDIOMA ---
const htmlEl = document.documentElement;
const darkModeToggle = document.getElementById('dark-mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const langPtBtn = document.getElementById('lang-pt');
const langEnBtn = document.getElementById('lang-en');
let currentLang = 'pt';

const applyTheme = (theme) => { if (theme === 'dark') { htmlEl.classList.add('dark'); sunIcon.classList.remove('hidden'); moonIcon.classList.add('hidden'); } else { htmlEl.classList.remove('dark'); sunIcon.classList.add('hidden'); moonIcon.classList.remove('hidden'); } };
const switchLanguage = (lang) => { 
    currentLang = lang; 
    document.querySelectorAll('[data-lang]').forEach(el => { 
        const key = el.dataset.lang; 
        if (translations[lang] && translations[lang][key]) { 
            el.textContent = translations[lang][key]; 
        } 
    }); 
    if (lang === 'pt') { 
        langPtBtn.classList.add('text-[var(--dark-text)]', 'bg-[var(--primary-yellow)]'); 
        langPtBtn.classList.remove('text-gray-500', 'dark:text-gray-400'); 
        langEnBtn.classList.remove('text-[var(--dark-text)]', 'bg-[var(--primary-yellow)]'); 
        langEnBtn.classList.add('text-gray-500', 'dark:text-gray-400'); 
    } else { 
        langEnBtn.classList.add('text-[var(--dark-text)]', 'bg-[var(--primary-yellow)]'); 
        langEnBtn.classList.remove('text-gray-500', 'dark:text-gray-400'); 
        langPtBtn.classList.remove('text-[var(--dark-text)]', 'bg-[var(--primary-yellow)]'); 
        langPtBtn.classList.add('text-gray-500', 'dark:text-gray-400'); 
    } 
    initTypewriter(); 
};
darkModeToggle.addEventListener('click', () => { const isDark = htmlEl.classList.toggle('dark'); localStorage.setItem('theme', isDark ? 'dark' : 'light'); applyTheme(isDark ? 'dark' : 'light'); });
langPtBtn.addEventListener('click', () => switchLanguage('pt'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);


// --- LÓGICA DO MODAL ---
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalStackContainer = document.getElementById('modal-stack');
const projectCards = document.querySelectorAll('.project-card');

const openModal = (card) => {
    const title = card.dataset[`title-${currentLang}`];
    const desc = card.dataset[`desc-full-${currentLang}`];
    const image = card.dataset.image;
    const stack = card.dataset.stack;
    
    modalImage.src = image;
    modalTitle.textContent = title;
    modalDescription.textContent = desc;
    
    modalStackContainer.innerHTML = '';
    if (stack) {
        const technologies = stack.split(',');
        technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'font-mono bg-gray-200 dark:bg-[var(--dark-bg)] text-[var(--dark-text)] dark:text-[var(--light-text)] rounded-full px-3 py-1 text-sm font-semibold';
            tag.textContent = tech.trim();
            modalStackContainer.appendChild(tag);
        });
    }
    
    modal.classList.remove('hidden');
    modalContent.classList.remove('modal-leave');
    modalContent.classList.add('modal-enter');
};

const closeModal = () => {
    modalContent.classList.remove('modal-enter');
    modalContent.classList.add('modal-leave');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

projectCards.forEach(card => card.addEventListener('click', () => openModal(card)));
modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });


// --- ANIMAÇÃO DE DIGITAÇÃO ---
const textElement = document.getElementById('typewriter-text');
const cursorElement = document.getElementById('typewriter-cursor');

const typingSpeed = 75;
const deletingSpeed = 40;
const pauseDuration = 1500;
let textColors = []; // Será preenchido quando o DOM carregar

let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let animationTimeout;

function typeAnimationLoop() {
    clearTimeout(animationTimeout);
    const currentTextArray = translations[currentLang].greetings;
    const currentText = currentTextArray[textArrayIndex];
    
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % currentTextArray.length;
            textElement.style.color = textColors[textArrayIndex];
        }
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            animationTimeout = setTimeout(typeAnimationLoop, pauseDuration);
            return;
        }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    animationTimeout = setTimeout(typeAnimationLoop, speed);
}

function initTypewriter() {
    clearTimeout(animationTimeout);
    textArrayIndex = 0;
    charIndex = 0;
    isDeleting = false;
    textElement.textContent = '';
    if (textColors.length > 0) {
        textElement.style.color = textColors[0];
    }
    typeAnimationLoop();
}

gsap.to(cursorElement, {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
});


// --- LÓGICA DO SCROLL HORIZONTAL E NAVBAR ---
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            
const sections = gsap.utils.toArray(".panel");
const navLinks = gsap.utils.toArray(".nav-link");
const updateActiveNav = (index) => { navLinks.forEach((link, i) => { if (i === index) { link.classList.add('active'); } else { link.classList.remove('active'); } }); };

let scrollTween = gsap.to(sections, { 
    xPercent: -100 * (sections.length - 1), 
    ease: "none", 
    scrollTrigger: { 
        trigger: "#pin-container", 
        pin: true, 
        scrub: 1,
        end: "+=4000", 
        onUpdate: self => { 
            const activeIndex = Math.round(self.progress * (sections.length - 1)); 
            updateActiveNav(activeIndex); 
        } 
    } 
});

navLinks.forEach((link, i) => { link.addEventListener("click", () => { const scrollAmount = i * (scrollTween.scrollTrigger.end - scrollTween.scrollTrigger.start) / (sections.length - 1) + scrollTween.scrollTrigger.start; gsap.to(window, { scrollTo: scrollAmount, duration: 1, ease: "power2.inOut" }); }); });
updateActiveNav(0);

sections.forEach((section) => { gsap.from(section.querySelectorAll(".grid, h1:not(#typewriter-container), p, a, .project-card, .scroller, .pc-card-wrapper"), { y: 100, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.2, scrollTrigger: { trigger: section, containerAnimation: scrollTween, start: "left center", toggleActions: "play none none none" } }); });

// Pausar animação do carrossel no hover
const scroller = document.querySelector('.scroller-inner');
if (scroller) {
    scroller.addEventListener('mouseenter', () => { scroller.style.animationPlayState = 'paused'; });
    scroller.addEventListener('mouseleave', () => { scroller.style.animationPlayState = 'running'; });
}

// --- LÓGICA DO CARD DE PERFIL ---
const profileCardWrapper = document.getElementById('profile-card-wrapper');
if (profileCardWrapper) {
    profileCardWrapper.addEventListener('pointermove', (event) => {
        const card = profileCardWrapper.querySelector('.pc-card');
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const width = card.clientWidth;
        const height = card.clientHeight;

        const percentX = (100 / width) * offsetX;
        const percentY = (100 / height) * offsetY;
        const centerX = percentX - 50;
        const centerY = percentY - 50;

        profileCardWrapper.style.setProperty('--pointer-x', `${percentX}%`);
        profileCardWrapper.style.setProperty('--pointer-y', `${percentY}%`);
        profileCardWrapper.style.setProperty('--rotate-x', `${(centerY / 4)}deg`);
        profileCardWrapper.style.setProperty('--rotate-y', `${-(centerX / 5)}deg`);
    });
}


// Inicia tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Pega as cores das variáveis CSS para usar no JS
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryYellow = rootStyles.getPropertyValue('--primary-yellow').trim();
    const secondaryYellow = rootStyles.getPropertyValue('--secondary-yellow').trim();
    textColors = [primaryYellow, secondaryYellow];

    switchLanguage(currentLang);
    initTypewriter();
});
