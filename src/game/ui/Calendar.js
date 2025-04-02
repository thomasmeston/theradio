export class Calendar {
    constructor(startDate = new Date(1945, 0, 12)) { // January 12, 1945
        this.container = document.createElement('div');
        this.container.className = 'calendar-container';
        
        this.currentDate = startDate;
        this.completedDays = new Set();
        
        this.render();
        document.body.appendChild(this.container);
    }

    render() {
        this.container.innerHTML = '';
        
        // Add header with current month and year
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = this.currentDate.toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
        });
        this.container.appendChild(header);

        // Create calendar grid
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        
        // Add empty cells for days before first of month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day inactive';
            grid.appendChild(emptyDay);
        }

        // Add days of month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = i;

            // Check if this is the current day
            if (i === this.currentDate.getDate()) {
                dayCell.classList.add('current');
            }

            // Check if this day is completed
            const dayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
            if (this.completedDays.has(dayDate.toDateString())) {
                dayCell.classList.add('completed');
            }

            // Make days before current date inactive
            if (i < this.currentDate.getDate()) {
                dayCell.classList.add('inactive');
            }

            grid.appendChild(dayCell);
        }

        this.container.appendChild(grid);
    }

    advanceDay() {
        // Mark current day as completed
        this.completedDays.add(this.currentDate.toDateString());
        
        // Advance to next day
        this.currentDate = new Date(this.currentDate.getTime() + (24 * 60 * 60 * 1000));
        
        // Re-render calendar
        this.render();
    }

    getCurrentDate() {
        return this.currentDate;
    }

    getCompletedDays() {
        return this.completedDays.size;
    }
} 