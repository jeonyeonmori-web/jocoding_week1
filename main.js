class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const themeToggle = document.createElement('button');
    themeToggle.setAttribute('class', 'theme-toggle');
    themeToggle.textContent = 'Toggle Dark Mode';
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    const title = document.createElement('h2');
    title.textContent = 'Lotto Number Generator';

    const numberDisplay = document.createElement('div');
    numberDisplay.setAttribute('class', 'number-display');

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Numbers';

    generateButton.addEventListener('click', () => {
      this.generateNumbers(numberDisplay);
    });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        --bg-color: #f0f0f0;
        --text-color: #333;
        --button-bg: #007bff;
        --button-hover-bg: #0056b3;
        --ball-bg: #fff;
        --shadow-color: rgba(0,0,0,0.1);
      }
      :host(.dark-mode) {
        --bg-color: #333;
        --text-color: #f0f0f0;
        --button-bg: #663399;
        --button-hover-bg: #552288;
        --ball-bg: #555;
        --shadow-color: rgba(255,255,255,0.1);
      }
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;
        padding: 2rem;
        background-color: var(--bg-color);
        border-radius: 10px;
        box-shadow: 0 4px 8px var(--shadow-color);
        max-width: 400px;
        margin: 2rem auto;
        color: var(--text-color);
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
      }
      h2 {
        margin-top: 0;
      }
      .number-display {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 1rem 0;
      }
      .number-ball {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--ball-bg);
        margin: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--text-color);
        box-shadow: 0 2px 4px var(--shadow-color);
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
      }
      button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: #fff;
        background-color: var(--button-bg);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: var(--button-hover-bg);
      }
      .theme-toggle {
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background-color: var(--button-bg);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .theme-toggle:hover {
        background-color: var(--button-hover-bg);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(themeToggle); // Append themeToggle here
    wrapper.appendChild(title);
    wrapper.appendChild(numberDisplay);
    wrapper.appendChild(generateButton);

    // Apply saved theme on load
    this.applyTheme(localStorage.getItem('theme') === 'dark');
  }

  toggleTheme() {
    const isDarkMode = this.shadowRoot.host.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    this.shadowRoot.querySelector('.theme-toggle').textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  }

  applyTheme(isDark) {
    if (isDark) {
      this.shadowRoot.host.classList.add('dark-mode');
      this.shadowRoot.querySelector('.theme-toggle').textContent = 'Toggle Light Mode';
    } else {
      this.shadowRoot.host.classList.remove('dark-mode');
      this.shadowRoot.querySelector('.theme-toggle').textContent = 'Toggle Dark Mode';
    }
  }

  generateNumbers(displayElement) {
    displayElement.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    for (const number of sortedNumbers) {
      const numberBall = document.createElement('div');
      numberBall.setAttribute('class', 'number-ball');
      numberBall.textContent = number;
      displayElement.appendChild(numberBall);
    }
  }
}

customElements.define('lotto-generator', LottoGenerator);