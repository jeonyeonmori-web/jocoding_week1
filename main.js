class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

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
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;
        padding: 2rem;
        background-color: #f0f0f0;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        max-width: 400px;
        margin: 2rem auto;
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
        background-color: #fff;
        margin: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: #0056b3;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(numberDisplay);
    wrapper.appendChild(generateButton);
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
