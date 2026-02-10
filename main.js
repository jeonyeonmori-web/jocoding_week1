document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic (runs on all pages) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        // Apply saved theme on load
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            body.classList.add(currentTheme);
            themeToggle.textContent = currentTheme === 'dark-mode' ? '☀️' : '🌙';
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Check system preference if no theme is saved
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggle.textContent = '☀️';
        }

        // Add click event listener
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
                themeToggle.textContent = '🌙';
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                themeToggle.textContent = '☀️';
            }
        });
    }


    // --- D-Day Calculator Logic (only runs if D-Day elements are present) ---
    const targetDateInput = document.getElementById('target-date');
    if (targetDateInput) {
        const ddayDisplay = document.getElementById('dday-display');

        const calculateDDay = (targetDate) => {
            if (!targetDate) {
                return "날짜를 선택해 주세요";
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(targetDate);
            selectedDate.setHours(0, 0, 0, 0);
            const timeDiff = selectedDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff === 0) return "D-Day!";
            return daysDiff > 0 ? `D-${daysDiff}` : `D+${Math.abs(daysDiff)}`;
        };

        const updateDDayDisplay = () => {
            ddayDisplay.textContent = calculateDDay(targetDateInput.value);
        };

        targetDateInput.addEventListener('change', updateDDayDisplay);

        // Set a default date for initial display
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        targetDateInput.valueAsDate = oneWeekFromNow;
        updateDDayDisplay();
    }


    // --- Formspree Contact Form Logic (only runs if form is present) ---
    const form = document.getElementById('contact-form');
    if (form) {
        const formStatus = document.getElementById('form-status');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const action = form.action;

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = '문의가 성공적으로 제출되었습니다. 감사합니다!';
                    formStatus.className = 'form-status success';
                    form.reset();
                } else {
                    const data = await response.json();
                    formStatus.textContent = data.errors ? data.errors.map(e => e.message).join(", ") : '문의 제출 중 오류가 발생했습니다.';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.textContent = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.';
                formStatus.className = 'form-status error';
            } finally {
                formStatus.classList.remove('hidden');
            }
        });
    }
});