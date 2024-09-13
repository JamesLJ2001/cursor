document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarWrapper = document.querySelector('.calendar-wrapper');

    function updateCalendar(direction) {
        const oldCalendar = calendarWrapper.querySelector('.calendar-container');
        const newCalendar = oldCalendar.cloneNode(true);
        
        newCalendar.style.position = 'absolute';
        newCalendar.style.top = '0';
        newCalendar.style.left = direction === 'right' ? '100%' : '-100%';
        newCalendar.style.width = '100%';
        calendarWrapper.appendChild(newCalendar);

        fetch(`/get_calendar?year=${yearSelect.value}&month=${monthSelect.value}`)
            .then(response => response.json())
            .then(data => {
                updateCalendarContent(newCalendar, data);
                
                // 强制重排
                newCalendar.offsetHeight;

                oldCalendar.style.transition = 'transform 0.5s ease-in-out';
                newCalendar.style.transition = 'transform 0.5s ease-in-out';

                oldCalendar.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
                newCalendar.style.transform = 'translateX(0)';

                setTimeout(() => {
                    oldCalendar.remove();
                    newCalendar.style.position = 'static';
                    newCalendar.style.left = '0';
                    newCalendar.style.width = '100%';
                }, 500);
            });
    }

    function updateCalendarContent(container, data) {
        const table = container.querySelector('table');
        table.innerHTML = `
            <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
            </tr>
            ${data.calendar.map(week => `
                <tr>
                    ${week.map(day => `
                        <td class="${day === 0 ? 'other-month' : ''} ${day === currentDay && data.month === currentMonth && data.year === currentYear ? 'today' : ''}">${day !== 0 ? day : ''}</td>
                    `).join('')}
                </tr>
            `).join('')}
        `;
        document.querySelector('h1').textContent = `${data.month_name} ${data.year}`;
    }

    yearSelect.addEventListener('change', () => updateCalendar('right'));
    monthSelect.addEventListener('change', () => updateCalendar('right'));

    prevMonthBtn.addEventListener('click', function() {
        let year = parseInt(yearSelect.value);
        let month = parseInt(monthSelect.value) - 1;
        if (month < 1) {
            month = 12;
            year--;
        }
        yearSelect.value = year;
        monthSelect.value = month;
        updateCalendar('left');
    });

    nextMonthBtn.addEventListener('click', function() {
        let year = parseInt(yearSelect.value);
        let month = parseInt(monthSelect.value) + 1;
        if (month > 12) {
            month = 1;
            year++;
        }
        yearSelect.value = year;
        monthSelect.value = month;
        updateCalendar('right');
    });

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'TD' && !e.target.classList.contains('other-month')) {
            document.querySelectorAll('td').forEach(td => td.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });
});