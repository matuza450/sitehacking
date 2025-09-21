// ===================================================================
// CONFIGURAÇÕES E CONSTANTES
// ===================================================================

/**
 * Comandos disponíveis para o terminal interativo.
 * Facilita a adição ou remoção de novos comandos.
 */
const TERMINAL_COMMANDS = {
  help: 'Comandos disponíveis:<br>- whoami: Exibe o usuário atual<br>- nmap: Simula uma varredura de portas<br>- clear: Limpa o terminal<br>- sudo: ...<br>- ls: Lista diretórios fictícios',
  whoami: 'root (superusuário)',
  nmap: 'Iniciando varredura NMAP...<br><br>22/tcp  open  ssh<br>80/tcp  open  http<br>443/tcp open  https<br><br>Varredura concluída!',
  clear: (outputElement) => {
    outputElement.innerHTML = '';
  },
  sudo: 'Bela tentativa! 😈 (Mas não execute comandos `sudo` sem saber o que está fazendo!)',
  ls: 'Pentest_Reports/<br>Scripts/<br>Tools/<br>passwords.txt (brincadeira 😜)',
};

// ===================================================================
// FUNÇÕES DE INICIALIZAÇÃO (MÓDULOS)
// ===================================================================

/**
 * Inicializa a animação de scroll, adicionando a classe 'animate'
 * aos elementos quando eles entram na tela.
 */
function initScrollAnimation() {
  const elements = document.querySelectorAll('[data-anime]');
  if (elements.length === 0) return;

  const animateOnScroll = () => {
    const windowTop = window.scrollY + window.innerHeight * 0.85;
    elements.forEach((element) => {
      if (windowTop > element.offsetTop) {
        element.classList.add('animate');
      }
    });
  };

  // Otimiza a performance evitando execuções excessivas do scroll
  let debounceTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(animateOnScroll, 20);
  });

  animateOnScroll(); // Executa uma vez ao carregar a página
}

/**
 * Inicializa o observador para o efeito de digitação no subtítulo,
 * reiniciando a animação sempre que o elemento se torna visível.
 */
function initTypingEffectObserver() {
  const subtitle = document.querySelector('.hacker-subtitle');
  if (!subtitle) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const typingElement = entry.target.querySelector('.typing-effect');
          if (!typingElement) return;

          // Força o reinício da animação CSS
          typingElement.style.animation = 'none';
          void typingElement.offsetWidth; // Trigger reflow
          typingElement.style.animation = null;
        }
      });
    }, {
      threshold: 0.5
    }
  );

  observer.observe(subtitle);
}

/**
 * Inicializa o terminal interativo.
 */
function initTerminal() {
  const terminalOutput = document.getElementById('terminal-output');
  const terminalCommand = document.getElementById('terminal-command');

  if (!terminalOutput || !terminalCommand) {
    console.error('Elementos do terminal não encontrados!');
    return;
  }

  // Função para simular o efeito de digitação no terminal
  const typeWriter = (text, speed = 15) => {
    terminalOutput.innerHTML += '<span class="typing"></span>';
    const typingSpan = terminalOutput.querySelector('.typing:last-child');
    if (!typingSpan) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        typingSpan.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        i++;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      } else {
        clearInterval(timer);
        typingSpan.classList.remove('typing');
      }
    }, speed);
  };

  // Captura de comandos do usuário
  terminalCommand.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const command = terminalCommand.value.trim().toLowerCase();
    terminalCommand.value = '';
    terminalOutput.innerHTML += `<div><span class="prompt">$</span> ${command}</div>`;

    if (command) {
      const response = TERMINAL_COMMANDS[command];
      if (response) {
        if (typeof response === 'function') {
          response(terminalOutput); // Passa o elemento de saída para a função 'clear'
        } else {
          typeWriter(response + '\n\n');
        }
      } else {
        typeWriter(`Comando não encontrado: ${command}\nDigite 'help' para ajuda.\n\n`);
      }
    }
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });

  // Mensagem inicial do terminal
  typeWriter(
    "Bem-vindo ao terminal simulador de hacker ético.\nDigite 'help' para ver os comandos.\n\n"
  );
}

/**
 * Inicializa a lógica de envio assíncrono do formulário de contato.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (!form || !statusDiv) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('.btn-submit');
    const formData = new FormData(form);

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Transmitindo...';
    statusDiv.style.display = 'none'; // Esconde a mensagem anterior

    try {
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        statusDiv.innerHTML = '[SUCCESS] Transmissão recebida. Aguarde o retorno.';
        statusDiv.className = 'success';
        form.reset();
      } else {
        statusDiv.innerHTML = '[ERROR] Falha na transmissão. Verifique os dados e tente novamente.';
        statusDiv.className = 'error';
      }
    } catch (error) {
      console.error('Erro no envio do formulário:', error);
      statusDiv.innerHTML = '[FATAL_ERROR] Conexão com o servidor perdida. Tente mais tarde.';
      statusDiv.className = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Transmitir Mensagem';
      statusDiv.style.display = 'block'; // Mostra a mensagem de status
    }
  });
}

// ===================================================================
// FUNÇÕES UTILITÁRIAS
// ===================================================================

/**
 * Aplica o tema (claro/escuro) salvo no localStorage.
 */
function applySavedTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
}

/**
 * Define um cookie de segurança (apenas para demonstração).
 */
function setSecurityCookie() {
  document.cookie =
    'session_token=demo123; Secure; HttpOnly; SameSite=Strict; max-age=3600; path=/';
}

// ===================================================================
// PONTO DE ENTRADA PRINCIPAL DA APLICAÇÃO
// ===================================================================

/**
 * Aguarda o carregamento completo do DOM para iniciar os scripts.
 */
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  setSecurityCookie(); // Apenas para demonstração de boas práticas

  // Inicializa todos os módulos interativos
  initScrollAnimation();
  initTypingEffectObserver();
  initTerminal();
  initContactForm();

  console.log('Sistema inicializado. Pronto para operar.');
});