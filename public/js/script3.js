// Modern Healthcare Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Generate calendar
    generateCalendar();
    
    // Initialize charts
    initializeCharts();
});

// Initialize Dashboard
function initializeDashboard() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleIcon();
    }
    
    // Add animation classes to elements
    animateElements();
}

// Set up event listeners
function setupEventListeners() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Navigation between dashboard sections
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            dashboardSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.parentElement.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
            }
            
            // Animate elements in the newly active section
            animateElements();
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update theme toggle icon
            updateThemeToggleIcon();
            
            // Save theme preference
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
          window.location.href = "/"; 
        }
      });
    }
    
    
    // New Appointment button
    const newAppointmentBtn = document.getElementById('newAppointmentBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, #cancelAppointmentBtn');
    
    if (newAppointmentBtn && appointmentModal) {
        newAppointmentBtn.addEventListener('click', function() {
            appointmentModal.style.display = 'flex';
        });
        
        // Close modal
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                appointmentModal.style.display = 'none';
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === appointmentModal) {
                appointmentModal.style.display = 'none';
            }
        });
    }
    
    // Save appointment button
    const saveAppointmentBtn = document.getElementById('saveAppointmentBtn');
    if (saveAppointmentBtn) {
        saveAppointmentBtn.addEventListener('click', function() {
            // Validate form
            const appointmentType = document.getElementById('appointmentType').value;
            const appointmentDoctor = document.getElementById('appointmentDoctor').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const appointmentTime = document.getElementById('appointmentTime').value;
            
            if (!appointmentType || !appointmentDoctor || !appointmentDate || !appointmentTime) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real app, this would submit the form to the server
            alert('Appointment booked successfully!');
            
            // Close modal
            appointmentModal.style.display = 'none';
        });
    }
    
    // Appointment type change handler
    const appointmentType = document.getElementById('appointmentType');
    const appointmentDoctor = document.getElementById('appointmentDoctor');
    
    if (appointmentType && appointmentDoctor) {
        appointmentType.addEventListener('change', function() {
            const type = this.value;
            
            // Clear previous options
            appointmentDoctor.innerHTML = '<option value="">Select Doctor</option>';
            
            // Add doctors based on selected type
            if (type === 'general') {
                addDoctorOption('Dr. Michael Johnson', 'johnson');
                addDoctorOption('Dr. Emily Davis', 'davis');
            } else if (type === 'cardiology') {
                addDoctorOption('Dr. Sarah Smith', 'smith');
                addDoctorOption('Dr. Robert Chen', 'chen');
            } else if (type === 'dermatology') {
                addDoctorOption('Dr. Lisa Wong', 'wong');
                addDoctorOption('Dr. David Miller', 'miller');
            } else if (type === 'neurology') {
                addDoctorOption('Dr. James Wilson', 'wilson');
                addDoctorOption('Dr. Patricia Moore', 'moore');
            } else if (type === 'orthopedics') {
                addDoctorOption('Dr. Thomas Brown', 'brown');
                addDoctorOption('Dr. Jennifer Lee', 'lee');
            }
        });
        
        function addDoctorOption(name, value) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = name;
            appointmentDoctor.appendChild(option);
        }
    }
    
    // Appointment date and doctor change handler
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    
    if (appointmentDate && appointmentTime && appointmentDoctor) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.setAttribute('min', today);
        
        // Update available times when date or doctor changes
        function updateAvailableTimes() {
            const date = appointmentDate.value;
            const doctor = appointmentDoctor.value;
            
            if (!date || !doctor) return;
            
            // Clear previous options
            appointmentTime.innerHTML = '<option value="">Select Time</option>';
            
            // Add time slots (in a real app, these would come from the server based on availability)
            const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
                              '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];
            
            // Randomly make some slots unavailable for demo purposes
            timeSlots.forEach(time => {
                if (Math.random() > 0.3) { // 70% chance of being available
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    appointmentTime.appendChild(option);
                }
            });
        }
        
        appointmentDate.addEventListener('change', updateAvailableTimes);
        appointmentDoctor.addEventListener('change', updateAvailableTimes);
    }
    
    // Calendar navigation
    const prevMonthBtn = document.querySelector('.calendar-nav.prev');
    const nextMonthBtn = document.querySelector('.calendar-nav.next');
    
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            navigateCalendar(-1);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            navigateCalendar(1);
        });
    }
    
    // Edit Profile Button
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    if (editProfileBtn && editProfileModal) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.style.display = 'flex';
        });
        
        // Close modal
        if (cancelEditProfileBtn) {
            cancelEditProfileBtn.addEventListener('click', function() {
                editProfileModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                editProfileModal.style.display = 'none';
            }
        });
        
        // Save profile changes
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', function() {
                // In a real app, this would submit the form to the server
                alert('Profile updated successfully!');
                
                // Update profile info on the page
                const fullName = document.getElementById('editFullName').value;
                document.getElementById('userName').textContent = fullName;
                
                // Close modal
                editProfileModal.style.display = 'none';
            });
        }
    }
    
    // Edit Medical History Button
    const editMedicalHistoryBtn = document.getElementById('editMedicalHistoryBtn');
    if (editMedicalHistoryBtn) {
        editMedicalHistoryBtn.addEventListener('click', function() {
            alert('Medical history update functionality would be implemented here.');
        });
    }
    
    // Settings Tabs
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    if (settingsTabs.length > 0) {
        settingsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and panels
                settingsTabs.forEach(t => t.classList.remove('active'));
                settingsPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId + '-panel').classList.add('active');
            });
        });
    }
    
    // Account Edit Button
    const editAccountBtn = document.getElementById('editAccountBtn');
    if (editAccountBtn) {
        editAccountBtn.addEventListener('click', function() {
            const accountForm = document.getElementById('accountForm');
            const formInputs = accountForm.querySelectorAll('input');
            
            // Toggle disabled state of form inputs
            formInputs.forEach(input => {
                input.disabled = !input.disabled;
            });
            
            // Change button text based on state
            if (formInputs[0].disabled) {
                this.innerHTML = '<i class="fas fa-edit"></i> Edit';
            } else {
                this.innerHTML = '<i class="fas fa-save"></i> Save';
            }
        });
    }
    
    // Dark Mode Toggle in Settings
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Set initial state based on body class
        darkModeToggle.checked = document.body.classList.contains('dark-mode');
        
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            updateThemeToggleIcon();
            
            // Save theme preference
            const theme = this.checked ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
    
    // Font Size Buttons
    const fontSizeBtns = document.querySelectorAll('.font-size-btn');
    if (fontSizeBtns.length > 0) {
        fontSizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                fontSizeBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get font size
                const fontSize = this.getAttribute('data-size');
                
                // Apply font size to body
                if (fontSize === 'small') {
                    document.body.style.fontSize = '0.875rem';
                } else if (fontSize === 'medium') {
                    document.body.style.fontSize = '1rem';
                } else if (fontSize === 'large') {
                    document.body.style.fontSize = '1.125rem';
                }
            });
        });
    }
}

// Generate calendar
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarDays || !currentMonthElement) return;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Store current view in data attributes
    calendarDays.dataset.month = currentMonth;
    calendarDays.dataset.year = currentYear;
    
    renderCalendar(currentMonth, currentYear);
}

// Render calendar for a specific month and year
function renderCalendar(month, year) {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarDays || !currentMonthElement) return;
    
    // Clear previous days
    calendarDays.innerHTML = '';
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // Highlight current day
        const currentDate = new Date();
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dayCell.classList.add('current-day');
        }
        
        // Add appointment indicators (example data)
        if ((month === 4 && (day === 15 || day === 22)) || 
            (Math.random() > 0.8)) { // Random appointments for demo
            const appointmentIndicator = document.createElement('div');
            appointmentIndicator.classList.add('appointment-indicator');
            dayCell.appendChild(appointmentIndicator);
            
            // Make day clickable
            dayCell.classList.add('has-appointment');
            dayCell.addEventListener('click', function() {
                alert(`View appointments for ${monthNames[month]} ${day}, ${year}`);
            });
        }
        
        calendarDays.appendChild(dayCell);
    }
}

// Navigate calendar
function navigateCalendar(direction) {
    const calendarDays = document.getElementById('calendarDays');
    
    if (!calendarDays) return;
    
    let month = parseInt(calendarDays.dataset.month);
    let year = parseInt(calendarDays.dataset.year);
    
    month += direction;
    
    if (month < 0) {
        month = 11;
        year--;
    } else if (month > 11) {
        month = 0;
        year++;
    }
    
    calendarDays.dataset.month = month;
    calendarDays.dataset.year = year;
    
    renderCalendar(month, year);
}

// Initialize charts
function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    // Blood Pressure Chart
    const bpCanvas = document.getElementById('bloodPressureChart');
    if (bpCanvas) {
        const bpChart = new Chart(bpCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: 'Systolic',
                        data: [125, 128, 122, 120, 118],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        tension: 0.3
                    },
                    {
                        label: 'Diastolic',
                        data: [85, 82, 80, 78, 80],
                        borderColor: '#f72585',
                        backgroundColor: 'rgba(247, 37, 133, 0.1)',
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 140
                    }
                }
            }
        });
    }
    
    // Heart Rate Chart
    const hrCanvas = document.getElementById('heartRateChart');
    if (hrCanvas) {
        const hrChart = new Chart(hrCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Heart Rate',
                    data: [75, 72, 78, 70, 72],
                    borderColor: '#f72585',
                    backgroundColor: 'rgba(247, 37, 133, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Weight Chart
    const weightCanvas = document.getElementById('weightChart');
    if (weightCanvas) {
        const weightChart = new Chart(weightCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Weight',
                    data: [168, 165, 166, 165, 165],
                    borderColor: '#2ec4b6',
                    backgroundColor: 'rgba(46, 196, 182, 0.1)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 150,
                        max: 180
                    }
                }
            }
        });
    }
}

// Update theme toggle icon
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Animate elements
function animateElements() {
    // Add animation classes to elements in the active section
    const activeSection = document.querySelector('.dashboard-section.active');
    if (!activeSection) return;
    
    // Animate stat cards with delay
    const statCards = activeSection.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('slide-in-up');
    });
    
    // Animate dashboard cards with delay
    const dashboardCards = activeSection.querySelectorAll('.dashboard-card');
    dashboardCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + statCards.length) * 0.1}s`;
        card.classList.add('slide-in-up');
    });
    
    // Animate appointment cards with delay
    const appointmentCards = activeSection.querySelectorAll('.appointment-card');
    appointmentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('slide-in-up');
    });
    
    // Animate doctor cards with delay
    const doctorCards = activeSection.querySelectorAll('.doctor-card');
    doctorCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('slide-in-up');
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust UI based on window size
    if (window.innerWidth > 992) {
        document.querySelector('.sidebar').classList.remove('open');
    }
});