
# Lotto Number Generator

## Overview

This project is a simple web application that generates random lottery numbers. It is built using HTML, CSS, and JavaScript, and it uses a Web Component to create a reusable lottery number generator.

## Implemented Features

*   **Lotto Number Generation:** The application generates 6 unique random numbers between 1 and 45.
*   **Web Component:** The lottery number generator is implemented as a Web Component, making it reusable and easy to integrate into other applications.
*   **Modern Design:** The application has a clean and modern design, with a responsive layout that works on both desktop and mobile devices.

## Current Plan

*   **`index.html`:**
    *   Change the title to "Lotto Number Generator".
    *   Add a `<lotto-generator>` custom element to the body.
*   **`main.js`:**
    *   Create a `LottoGenerator` class that extends `HTMLElement`.
    *   The component will have a button to generate numbers and a display area for the numbers.
    *   The number generation logic will be encapsulated within the component.
    *   Register the custom element using `customElements.define`.
*   **`style.css`:**
    *   The styles will be encapsulated within the web component's shadow DOM. This will prevent style conflicts with the main document.
