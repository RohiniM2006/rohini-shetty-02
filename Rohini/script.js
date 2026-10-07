/**
 * =========================================================
 * ROHINI M — PERSONAL PORTFOLIO INTERACTIVE SCRIPT
 * =========================================================
 * Features:
 * 1. Color Theme Toggle (Default Editorial Light & Dark Mode)
 * 2. Mobile Responsive Navigation Drawer & Backdrop
 * 3. ScrollSpy & Smooth Section Scrolling
 * 4. IntersectionObserver Scroll Reveal Animations
 * 5. Interactive Project Modal with Detailed Technical Breakdown
 * 6. "Ask Rohini" AI Chatbot (Simulated Engine with API Plug-in Hook)
 * 7. Contact Form Client Validation & One-Click Email Copying
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. COLOR THEME CONTROLLER (Light / Dark)
  // =========================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Check saved theme in localStorage; default to 'light' (clean editorial off-white)
  const savedTheme = localStorage.getItem('rohini_portfolio_theme') || 'light';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = rootElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rohini_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // =========================================================
  // 2. MOBILE NAVIGATION DRAWER & BACKDROP
  // =========================================================
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  const closeMobileMenu = () => {
    if (navMenu && mobileNavToggle && mobileOverlay) {
      navMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
  };

  const openMobileMenu = () => {
    if (navMenu && mobileNavToggle && mobileOverlay) {
      navMenu.classList.add('active');
      mobileOverlay.classList.add('active');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
    }
  };

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer when any link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // =========================================================
  // 3. SCROLLSPY (ACTIVE NAV HIGHLIGHT)
  // =========================================================
  const trackedSections = document.querySelectorAll('section[id]');
  
  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 140;

    trackedSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // =========================================================
  // 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // =========================================================
  const revealElements = document.querySelectorAll('.reveal-element');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if browser lacks IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // =========================================================
  // 5. PROJECT DETAILS MODAL & DATA STORE
  // =========================================================
  const projectModal = document.getElementById('project-modal');
  const modalProjectTag = document.getElementById('modal-project-tag');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectContent = document.getElementById('modal-project-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalGithubLink = document.getElementById('modal-github-link');

  // Detailed project data repository as requested
  const projectDatabase = {
    quiz: {
      tag: "PROJECT 01 / SOFTWARE APPLICATION",
      title: "Online Quiz System",
      github: "https://github.com/RohiniM2006",
      htmlContent: `
        <div class="modal-section-block">
          <h4 class="modal-section-title">Project Overview</h4>
          <p>
            An interactive online quiz system developed as a software engineering project. It provides a structured, responsive examination and assessment experience, helping evaluate subject mastery through dynamic questions and real-time computation.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Problem Statement</h4>
          <p>
            Traditional evaluation approaches and non-interactive systems often lack instant feedback, flexible time controls, and immediate scoring summaries. Students need a structured platform to test their programming concepts with quick diagnostic evaluation.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Objective</h4>
          <p>
            To design and implement an accessible, efficient quiz application that delivers randomized or structured questions, maintains countdown timers, processes choices securely, and generates an instantaneous performance report.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Technologies Used</h4>
          <ul class="modal-list">
            <li><strong>Python / C:</strong> Core logic, question evaluation routines, state processing, and data handling.</li>
            <li><strong>HTML:</strong> Accessible web layout, interactive form inputs, and structured layout architecture.</li>
          </ul>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Key Features</h4>
          <ul class="modal-list">
            <li>Structured question navigation (Next, Previous, and direct question navigation).</li>
            <li>Real-time countdown timer with automated session wrap-up upon expiry.</li>
            <li>Instant scoring algorithm calculating percentage scores and accuracy.</li>
            <li>Clean, distraction-free user interface focused on cognitive clarity.</li>
            <li>Modular question bank design allowing smooth addition of question categories.</li>
          </ul>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Working Mechanism</h4>
          <p>
            The user begins an assessment session which initializes the question bank and timer. As options are selected, responses are recorded in memory. Upon submission or timer expiration, the scoring module computes total marks, compares answers, and renders an itemized summary.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">My Contribution</h4>
          <p>
            Designed the procedural evaluation algorithms, structured question datasets, designed user interface mockups using semantic HTML, and conducted testing across edge test cases to ensure robust error handling.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Repository &amp; Milestone</h4>
          <p>
            Source repository and documentation accessible via GitHub: 
            <a href="https://github.com/RohiniM2006" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 600;">github.com/RohiniM2006</a>.
          </p>
        </div>
      `
    },
    greenhouse: {
      tag: "PROJECT 02 / SMART AUTOMATION SYSTEM",
      title: "Greenhouse Monitoring and Control System",
      github: "https://github.com/RohiniM2006",
      htmlContent: `
        <div class="modal-section-block">
          <h4 class="modal-section-title">Project Overview</h4>
          <p>
            A smart greenhouse engineering project engineered to monitor environmental parameters—including ambient temperature, relative humidity, soil moisture content, and lighting levels—while automatically controlling physical devices such as water pumps, ventilation fans, and lights.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Problem Statement</h4>
          <p>
            Manual greenhouse management demands labor-intensive monitoring and frequently leads to delayed interventions when critical thresholds (such as excessive heat or dry soil) occur, endangering plant health and wasting precious water resources.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Objective</h4>
          <p>
            Develop an autonomous system that continuously observes greenhouse micro-climatic parameters and initiates automated actuator actions to maintain conditions within optimal horticultural bounds without requiring constant human oversight.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Technologies Used</h4>
          <ul class="modal-list">
            <li><strong>C / Python:</strong> System control algorithms, sensor telemetry polling routines, and decision logic.</li>
            <li><strong>Hardware &amp; IoT Interfacing:</strong> Soil moisture probes, DHT temperature/humidity sensors, LDR light sensors, and relay modules for water pump and fan actuation.</li>
          </ul>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Features</h4>
          <ul class="modal-list">
            <li><strong>Temperature monitoring:</strong> Continuously measures ambient greenhouse heat levels.</li>
            <li><strong>Humidity monitoring:</strong> Tracks relative humidity to prevent fungal conditions.</li>
            <li><strong>Soil moisture monitoring:</strong> Assesses root zone water saturation.</li>
            <li><strong>Light monitoring:</strong> Observes natural luminosity levels.</li>
            <li><strong>Automatic water pump control:</strong> Triggers irrigation relays precisely when soil moisture drops below required thresholds.</li>
            <li><strong>Fan control:</strong> Activates cooling ventilation when temperature exceeds safety limits.</li>
            <li><strong>Smart greenhouse management:</strong> Centralized decision logic that coordinates all actuators seamlessly.</li>
          </ul>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Working Mechanism</h4>
          <p>
            Analog and digital sensors continuously sample physical parameters and feed data to the microcontroller logic. If soil moisture falls below threshold levels, the irrigation pump is automatically engaged until equilibrium is restored. Similarly, when temperature rises, exhaust fans spin up for thermal regulation.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">My Contribution</h4>
          <p>
            Programmed the decision logic and threshold trigger conditionals in C/Python, defined actuator response rules, assisted with sensor calibration testing, and documented system flowcharts.
          </p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-title">Repository &amp; Milestone</h4>
          <p>
            Project files and updates available at: 
            <a href="https://github.com/RohiniM2006" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: 600;">github.com/RohiniM2006</a>.
          </p>
        </div>
      `
    }
  };

  const openProjectModal = (projectId) => {
    const project = projectDatabase[projectId];
    if (!project || !projectModal) return;

    modalProjectTag.textContent = project.tag;
    modalProjectTitle.textContent = project.title;
    modalProjectContent.innerHTML = project.htmlContent;
    modalGithubLink.setAttribute('href', project.github);

    projectModal.hidden = false;
    // Allow DOM reflow then add active class for transition
    setTimeout(() => {
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 10);
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    setTimeout(() => {
      projectModal.hidden = true;
      document.body.style.overflow = '';
    }, 300);
  };

  // Attach triggers
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');
  modalTriggers.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.hidden) {
      closeProjectModal();
    }
  });

  // =========================================================
  // 6. AI CHAT INTERFACE: "ASK ROHINI"
  // Simulated responses strictly based on verified profile data.
  // =========================================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-user-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatResetBtn = document.getElementById('chat-reset-btn');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  // Simulated Knowledge Base for Rohini M
  const getSimulatedResponse = (query) => {
    const q = query.toLowerCase().trim();

    if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('create')) {
      return `I have developed two featured technical projects:<br><br>
      1. <strong>Online Quiz System:</strong> An interactive software assessment system built using Python, C, and HTML that provides timed tests and instant scoring.<br><br>
      2. <strong>Greenhouse Monitoring and Control System:</strong> A smart automation system that monitors temperature, humidity, soil moisture, and light, and automatically triggers water pumps and ventilation fans.`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('program') || q.includes('c ') || q.includes('python')) {
      return `My core programming and technical competencies include:<br><br>
      • <strong>Languages:</strong> C Programming &amp; Python<br>
      • <strong>Web Development:</strong> HTML5<br>
      • <strong>Engineering Competencies:</strong> Problem Solving, Software Development, and Practical Project Implementation.`;
    }

    if (q.includes('college') || q.includes('education') || q.includes('semester') || q.includes('study') || q.includes('school') || q.includes('degree')) {
      return `I am currently pursuing my <strong>Bachelor of Engineering in Computer Science &amp; Engineering</strong> at <strong>Adichunchanagiri Institute of Technology</strong>, presently in my <strong>3rd Semester</strong>.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github')) {
      return `You can get in touch with me directly through:<br><br>
      • <strong>Email:</strong> <a href="mailto:rohinim02082006@gmail.com" style="text-decoration: underline;">rohinim02082006@gmail.com</a><br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rohini-m-847885397" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">linkedin.com/in/rohini-m-847885397</a><br>
      • <strong>GitHub:</strong> <a href="https://github.com/RohiniM2006" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">github.com/RohiniM2006</a>`;
    }

    if (q.includes('who are you') || q.includes('about') || q.includes('rohini') || q.includes('yourself')) {
      return `I'm <strong>Rohini M</strong>, a Computer Science and Engineering student at Adichunchanagiri Institute of Technology (3rd Semester). I am passionate about programming in C and Python, software development, and building practical systems that solve real problems.`;
    }

    if (q.includes('learn') || q.includes('currently learning')) {
      return `I am currently deepening my knowledge in C Programming, Python, Web Development, Software Engineering practices, and algorithmic problem solving with the philosophy: <em>"Always learning. Always building."</em>`;
    }

    if (q.includes('quiz')) {
      return `The <strong>Online Quiz System</strong> is an interactive software application developed with Python, C, and HTML. It features question progression, countdown timers, and immediate score evaluations. You can click "View Project" in the Selected Projects section for in-depth details!`;
    }

    if (q.includes('greenhouse') || q.includes('iot') || q.includes('sensor')) {
      return `The <strong>Greenhouse Monitoring and Control System</strong> tracks temperature, humidity, soil moisture, and light, automatically controlling water pumps and exhaust fans to maintain optimal plant growth conditions.`;
    }

    // Default response
    return `Thank you for your question! As a Computer Science & Engineering student at Adichunchanagiri Institute of Technology (3rd Semester), I focus on C, Python, and practical software projects like my Online Quiz System and Smart Greenhouse. Feel free to ask about my education, projects, skills, or contact info!`;
  };

  /**
   * =========================================================================
   * NOTE FOR DEVELOPER / AI INTEGRATION:
   * To connect a live AI API (e.g., Google Gemini API, OpenAI, or backend server):
   * 
   * async function callRealAiApi(userPrompt) {
   *   const response = await fetch('/api/chat', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ message: userPrompt })
   *   });
   *   const data = await response.json();
   *   return data.reply;
   * }
   * =========================================================================
   */

  const appendChatMessage = (sender, content, isBot = false) => {
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isBot ? 'bot-message' : 'user-message'}`;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
      <div class="message-meta">
        <span class="sender-name">${sender}</span>
        <span class="message-time">${timeString}</span>
      </div>
      <div class="message-bubble">${content}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleUserMessage = (userText) => {
    if (!userText.trim()) return;

    // 1. Post User message
    appendChatMessage('You', escapeHTML(userText), false);

    // 2. Render typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message';
    typingIndicator.id = 'chat-typing-indicator';
    typingIndicator.innerHTML = `
      <div class="message-meta">
        <span class="sender-name">Rohini M (Assistant)</span>
        <span class="message-time">Typing...</span>
      </div>
      <div class="message-bubble">
        <div class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Simulate processing delay
    setTimeout(() => {
      const activeIndicator = document.getElementById('chat-typing-indicator');
      if (activeIndicator) activeIndicator.remove();

      const botReply = getSimulatedResponse(userText);
      appendChatMessage('Rohini M (Assistant)', botReply, true);
    }, 450);
  };

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value;
      if (text) {
        handleUserMessage(text);
        chatInput.value = '';
      }
    });
  }

  suggestionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prompt = pill.getAttribute('data-prompt');
      if (prompt) {
        handleUserMessage(prompt);
      }
    });
  });

  if (chatResetBtn) {
    chatResetBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message bot-message">
          <div class="message-meta">
            <span class="sender-name">Rohini M (Assistant)</span>
            <span class="message-time">Just now</span>
          </div>
          <div class="message-bubble">
            Conversation reset. You can ask me any question about Rohini's studies, C/Python programming, or projects!
          </div>
        </div>
      `;
    });
  }

  // =========================================================
  // 7. CONTACT FORM VALIDATION & INTERACTIVE FEEDBACK
  // =========================================================
  const contactForm = document.getElementById('contact-form');
  const formSuccessBanner = document.getElementById('form-success-banner');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.closest('.form-group');
      if (!validateEmail(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.closest('.form-group');
      if (!messageInput.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        // Success state
        contactForm.reset();
        if (formSuccessBanner) {
          formSuccessBanner.hidden = false;
          formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showToast('Message sent successfully! Thank you.');
      }
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  // =========================================================
  // 8. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
  // =========================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailTextEl.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('Email address copied to clipboard!');
          const btnSpan = copyEmailBtn.querySelector('span');
          if (btnSpan) {
            btnSpan.textContent = 'Copied!';
            setTimeout(() => {
              btnSpan.textContent = 'Copy';
            }, 2000);
          }
        })
        .catch(() => {
          // Fallback if clipboard API restricted
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('Email copied to clipboard!');
        });
    });
  }

  // Toast Functionality
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Helper function to sanitize user text input in chat
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
