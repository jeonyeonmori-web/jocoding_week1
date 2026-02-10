document.addEventListener('DOMContentLoaded', () => {
    // D-Day Calculator Logic (Original)
    const targetDateInput = document.getElementById('target-date');
    const ddayDisplay = document.getElementById('dday-display');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

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

        if (daysDiff === 0) {
            return "D-Day!";
        } else if (daysDiff > 0) {
            return `D-${daysDiff}`;
        } else {
            return `D+${Math.abs(daysDiff)}`;
        }
    };

    const updateDDayDisplay = () => {
        const selectedDateValue = targetDateInput.value;
        ddayDisplay.textContent = calculateDDay(selectedDateValue);
    };

    if (targetDateInput) {
        targetDateInput.addEventListener('change', updateDDayDisplay);
        // Set a default date for initial display
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        targetDateInput.valueAsDate = oneWeekFromNow;
        updateDDayDisplay();
    }


    // Theme Toggle Logic (Original)
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (themeToggle) {
            themeToggle.textContent = currentTheme === 'dark-mode' ? '☀️' : '🌙';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }

    if (themeToggle) {
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

    // Form Submission Logic (New)
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const action = form.action;

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '문의가 성공적으로 제출되었습니다. 감사합니다!';
                    formStatus.className = 'form-status success';
                    form.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = '문의 제출 중 오류가 발생했습니다. 다시 시도해 주세요.';
                    }
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