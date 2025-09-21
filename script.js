
function hireMe() {
  alert("Você será redirecionado para o WhatsApp do Matheus...");
  window.open("https://wa.me/5561992630637", "_blank");
}

function setSecurityCookie() {
  document.cookie =
    "token=seu_token_aqui; Secure; HttpOnly; SameSite=Strict; max-age=3600; path=/";
}

// Toggle de tema claro/escuro
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
}

// Terminal Interativo
function initTerminal() {
  const terminalOutput = document.getElementById("terminal-output");
  const terminalCommand = document.getElementById("terminal-command");

  if (!terminalOutput || !terminalCommand) {
    console.error("Elementos do terminal não encontrados!");
    return;
  }

  // Efeito de digitação
  const typeWriter = (text, speed = 20) => {
    let i = 0;
    terminalOutput.innerHTML += '<span class="typing"></span>';
    const typingSpan = terminalOutput.querySelector(".typing:last-child");

    const timer = setInterval(() => {
      if (i < text.length) {
        typingSpan.innerHTML += text.charAt(i);
        i++;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      } else {
        clearInterval(timer);
        typingSpan.classList.remove("typing");
      }
    }, speed);
  };

  // Comandos disponíveis
  const commands = {
    help: "Comandos disponíveis:\n- help: Lista de comandos\n- whoami: Mostra seu usuário\n- nmap: Simula varredura de portas\n- clear: Limpa o terminal",
    whoami: "root (superusuário)",
    nmap: "Iniciando varredura NMAP...\n\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n\nVarredura concluída!",
    clear: () => {
      terminalOutput.innerHTML = "";
    },
    sudo: "Nice try! 😈 (Mas não execute comandos sudo sem saber o que está fazendo!)",
    ls: "Pentest_Reports\nScripts\nTools\npasswords.txt (just kidding 😜)",
  };

  // Mensagem inicial
  typeWriter(
    "Bem-vindo ao terminal simulador de hacker ético.\nDigite 'help' para ver os comandos disponíveis.\n\n"
  );

  // Captura de comandos
  terminalCommand.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = terminalCommand.value.trim();
      terminalCommand.value = "";

      terminalOutput.innerHTML += `<div><span class="prompt">$</span> ${command}</div>`;

      if (commands[command]) {
        if (typeof commands[command] === "function") {
          commands[command]();
        } else {
          typeWriter(commands[command] + "\n\n");
        }
      } else if (command) {
        typeWriter(
          `Comando não encontrado: ${command}\nDigite 'help' para ajuda.\n\n`
        );
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

// Carrega tudo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Aplica tema salvo
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  // Inicializa o terminal
  initTerminal();

  // Configura cookie (apenas para demonstração)
  setSecurityCookie();
});

// Scroll Animation
function initScrollAnimation() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll("[data-anime]");
    const windowTop = window.scrollY + window.innerHeight * 0.75;

    elements.forEach((element) => {
      if (windowTop > element.offsetTop) {
        element.classList.add("animate");
      }
    });
  };

  // Debounce para performance
  let debounceTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(animateOnScroll, 16);
  });

  // Executa uma vez ao carregar
  animateOnScroll();
}

// Adicione esta linha no seu DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimation();
  // ... outros inits
});

function typeWriterEffect() {
  const elements = document.querySelectorAll("[data-typewriter]");

  elements.forEach((el) => {
    const text = el.getAttribute("data-typewriter");
    let i = 0;
    el.textContent = "";

    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
  });
}

// Exemplo de debug
elements.forEach((el) => {
  console.log(`Elemento: ${el.tagName}, Posição: ${el.offsetTop}`);
});

// Controle de efeitos de digitação
document.addEventListener("DOMContentLoaded", function () {
  const subtitles = document.querySelectorAll(".hacker-subtitle");

  subtitles.forEach((subtitle) => {
    // Garante que o efeito reinicie quando o elemento estiver visível
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const typingElement = entry.target.querySelector(".typing-effect");
            typingElement.style.animation = "none";
            void typingElement.offsetWidth; // Trigger reflow
            typingElement.style.animation =
              "typing 3.5s steps(50) 1s 1 normal both";
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(subtitle);
  });
});
