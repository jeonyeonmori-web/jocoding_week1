document.addEventListener('DOMContentLoaded', () => {
    const targetDateInput = document.getElementById('target-date');
    const ddayDisplay = document.getElementById('dday-display');

    const calculateDDay = (targetDate) => {
        if (!targetDate) {
            return "날짜를 선택해 주세요";
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to start of day

        const selectedDate = new Date(targetDate);
        selectedDate.setHours(0, 0, 0, 0); // Normalize selected date to start of day

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

    // Set initial date to today for convenience or leave empty
    // targetDateInput.valueAsDate = new Date();
    // updateDDayDisplay(); // Update display on load if initial date is set

    targetDateInput.addEventListener('change', updateDDayDisplay);

    // Optional: Set a default date for initial display if desired
    // Example: Set to one week from now
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    targetDateInput.valueAsDate = oneWeekFromNow;
    updateDDayDisplay();
});