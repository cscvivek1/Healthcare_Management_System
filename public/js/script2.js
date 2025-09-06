// DOM Elements
const dashboardContainer = document.getElementById("dashboard-container")
const logoutBtn = document.getElementById("logout-btn")
const mobileToggle = document.getElementById("mobile-toggle")
const sidebar = document.querySelector(".sidebar")
const navItems = document.querySelectorAll(".sidebar-nav li")
const contentSections = document.querySelectorAll(".content-section")
const currentDateElement = document.getElementById("current-date")
const patientSearch = document.getElementById("patient-search")

// Sample Data
const patients = [
  {
    id: "P001",
    firstName: "John",
    lastName: "Doe",
    dob: "1985-05-15",
    gender: "male",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    medicalHistory: "Hypertension, Diabetes Type 2",
    lastVisit: "2023-03-10",
  },
  {
    id: "P002",
    firstName: "Jane",
    lastName: "Smith",
    dob: "1990-08-22",
    gender: "female",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    medicalHistory: "Asthma, Allergies",
    lastVisit: "2023-03-15",
  },
  {
    id: "P003",
    firstName: "Robert",
    lastName: "Johnson",
    dob: "1978-11-30",
    gender: "male",
    email: "robert.j@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine Rd, Nowhere, USA",
    medicalHistory: "Heart Disease, High Cholesterol",
    lastVisit: "2023-03-18",
  },
  {
    id: "P004",
    firstName: "Emily",
    lastName: "Williams",
    dob: "1995-02-12",
    gender: "female",
    email: "emily.w@example.com",
    phone: "(555) 234-5678",
    address: "321 Elm St, Anytown, USA",
    medicalHistory: "Migraine, Anxiety",
    lastVisit: "2023-03-20",
  },
  {
    id: "P005",
    firstName: "Michael",
    lastName: "Brown",
    dob: "1982-07-08",
    gender: "male",
    email: "michael.b@example.com",
    phone: "(555) 876-5432",
    address: "654 Maple Dr, Somewhere, USA",
    medicalHistory: "Back Pain, Insomnia",
    lastVisit: "2023-03-22",
  },
]

const appointments = [
  {
    id: "A001",
    patientId: "P001",
    date: "2023-03-25",
    time: "09:00",
    purpose: "Follow-up",
    status: "scheduled",
    notes: "Check blood pressure",
  },
  {
    id: "A002",
    patientId: "P002",
    date: "2023-03-25",
    time: "10:30",
    purpose: "Consultation",
    status: "scheduled",
    notes: "Discuss allergy treatment",
  },
  {
    id: "A003",
    patientId: "P003",
    date: "2023-03-25",
    time: "13:00",
    purpose: "Check-up",
    status: "scheduled",
    notes: "Review medication",
  },
  {
    id: "A004",
    patientId: "P004",
    date: "2023-03-26",
    time: "11:00",
    purpose: "Therapy",
    status: "scheduled",
    notes: "Anxiety management",
  },
  {
    id: "A005",
    patientId: "P005",
    date: "2023-03-26",
    time: "14:30",
    purpose: "Consultation",
    status: "scheduled",
    notes: "Discuss sleep issues",
  },
  {
    id: "A006",
    patientId: "P001",
    date: "2023-03-20",
    time: "09:00",
    purpose: "Check-up",
    status: "completed",
    notes: "Patient doing well",
  },
  {
    id: "A007",
    patientId: "P002",
    date: "2023-03-18",
    time: "10:30",
    purpose: "Follow-up",
    status: "completed",
    notes: "Prescribed new medication",
  },
  {
    id: "A008",
    patientId: "P003",
    date: "2023-03-15",
    time: "13:00",
    purpose: "Check-up",
    status: "completed",
    notes: "Adjusted medication dosage",
  },
]

const patientVisits = [
  {
    id: "V001",
    patientId: "P001",
    date: "2023-03-10",
    reason: "Regular check-up",
    diagnosis: "Hypertension - Controlled",
    prescription: "Lisinopril 10mg daily",
  },
  {
    id: "V002",
    patientId: "P002",
    date: "2023-03-15",
    reason: "Asthma follow-up",
    diagnosis: "Mild asthma exacerbation",
    prescription: "Albuterol inhaler as needed",
  },
  {
    id: "V003",
    patientId: "P003",
    date: "2023-03-18",
    reason: "Chest pain",
    diagnosis: "Stable angina",
    prescription: "Nitroglycerin as needed",
  },
  {
    id: "V004",
    patientId: "P004",
    date: "2023-03-20",
    reason: "Migraine",
    diagnosis: "Chronic migraine",
    prescription: "Sumatriptan 50mg as needed",
  },
  {
    id: "V005",
    patientId: "P005",
    date: "2023-03-22",
    reason: "Back pain",
    diagnosis: "Lumbar strain",
    prescription: "Cyclobenzaprine 5mg, Ibuprofen 600mg",
  },
]

const emergencyCases = [
  {
    id: "E001",
    patientId: "P001",
    admittedDate: "2023-03-24",
    admittedTime: "22:30",
    condition: "Chest Pain",
    vitalSigns: {
      bp: "140/90",
      pulse: "95",
      temp: "98.6°F",
      oxygen: "97%",
    },
    status: "stable",
    notes: "Patient experiencing chest pain, ECG shows no acute changes",
  },
  {
    id: "E002",
    patientId: "P004",
    admittedDate: "2023-03-24",
    admittedTime: "20:15",
    condition: "Severe Migraine",
    vitalSigns: {
      bp: "130/85",
      pulse: "88",
      temp: "99.1°F",
      oxygen: "99%",
    },
    status: "improving",
    notes: "Patient with history of migraines, responding to medication",
  },
  {
    id: "E003",
    patientId: "P003",
    admittedDate: "2023-03-24",
    admittedTime: "23:45",
    condition: "Acute Angina",
    vitalSigns: {
      bp: "150/95",
      pulse: "102",
      temp: "98.8°F",
      oxygen: "96%",
    },
    status: "critical",
    notes: "Patient with known heart disease, monitoring closely",
  },
]

const chatContacts = [
  {
    id: "C001",
    name: "Dr. James Wilson",
    role: "Neurologist",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Could you review the MRI results for patient Emily Williams?",
    time: "10:30 AM",
  },
  {
    id: "C002",
    name: "Dr. Lisa Chen",
    role: "Pediatrician",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Thanks for the consultation yesterday.",
    time: "Yesterday",
  },
  {
    id: "C003",
    name: "Nurse Jessica Taylor",
    role: "Head Nurse",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Patient in room 302 needs attention.",
    time: "11:45 AM",
  },
  {
    id: "C004",
    name: "Dr. Michael Rodriguez",
    role: "Cardiologist",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Let's discuss the case tomorrow.",
    time: "Yesterday",
  },
  {
    id: "C005",
    name: "Admin Staff",
    role: "Front Desk",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "New patient registration completed.",
    time: "09:15 AM",
  },
]

const chatMessages = {
  C001: [
    {
      sender: "them",
      content: "Good morning, Dr. Johnson. Could you review the MRI results for patient Emily Williams?",
      time: "10:30 AM",
    },
    { sender: "me", content: "Good morning, Dr. Wilson. Yes, I'll take a look at them right away.", time: "10:35 AM" },
    { sender: "them", content: "Thank you. I'm particularly concerned about the frontal lobe area.", time: "10:36 AM" },
    {
      sender: "me",
      content: "I see what you mean. Let me review the complete scan and I'll get back to you with my assessment.",
      time: "10:40 AM",
    },
  ],
  C003: [
    {
      sender: "them",
      content: "Dr. Johnson, patient in room 302 needs attention. Complaining of chest pain.",
      time: "11:45 AM",
    },
    { sender: "me", content: "I'll be there right away. Have you checked their vitals?", time: "11:46 AM" },
    { sender: "them", content: "Yes, BP 140/90, pulse 95, oxygen sat 97%.", time: "11:47 AM" },
    { sender: "me", content: "Thank you. Please prepare an ECG and I'll be there in 5 minutes.", time: "11:48 AM" },
  ],
  C005: [
    { sender: "them", content: "New patient registration completed for tomorrow at 9:00 AM.", time: "09:15 AM" },
    { sender: "me", content: "Thank you. What's the reason for their visit?", time: "09:20 AM" },
    {
      sender: "them",
      content: "Initial consultation for chronic back pain. Medical records have been uploaded to the system.",
      time: "09:22 AM",
    },
    { sender: "me", content: "Perfect, I'll review them before the appointment.", time: "09:25 AM" },
  ],
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Set current date
  const now = new Date()
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  currentDateElement.textContent = now.toLocaleDateString("en-US", options)

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "/"; 
    }
  });
  
  // Handle mobile sidebar toggle
  mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
  })

  // Handle navigation
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      navItems.forEach((navItem) => navItem.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Hide all content sections
      contentSections.forEach((section) => section.classList.remove("active"))

      // Show the corresponding content section
      const targetSection = this.getAttribute("data-page")
      document.getElementById(targetSection).classList.add("active")

      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active")
      }
    })
  })

  // Handle patient search
  patientSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    if (searchTerm.length >= 2) {
      const results = patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm) ||
          patient.lastName.toLowerCase().includes(searchTerm) ||
          patient.id.toLowerCase().includes(searchTerm),
      )

      // Show search results (in a dropdown or redirect to patients page)
      console.log("Search results:", results)

      // For demo purposes, navigate to patients page if there are results
      if (results.length > 0) {
        document.querySelector('[data-page="patients"]').click()
      }
    }
  })

  // Initialize modals
  initializeModals()

  // Initialize appointment management
  initializeAppointments()

  // Initialize emergency management
  initializeEmergency()

  // Initialize patient records
  initializePatients()

  // Initialize chat
  initializeChat()

  // Load dashboard data
  loadDashboardData()
})

// Load dashboard data
function loadDashboardData() {
  // Load upcoming appointments
  const upcomingAppointmentsTable = document.getElementById("upcoming-appointments-table")
  upcomingAppointmentsTable.innerHTML = ""

  const todayAppointments = appointments
    .filter((appointment) => appointment.status === "scheduled" && new Date(appointment.date) >= new Date())
    .slice(0, 5)

  todayAppointments.forEach((appointment) => {
    const patient = patients.find((p) => p.id === appointment.patientId)
    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${patient.firstName} ${patient.lastName}</td>
      <td>${formatTime(appointment.time)}</td>
      <td><span class="status status-${appointment.status}">${capitalizeFirstLetter(appointment.status)}</span></td>
    `

    upcomingAppointmentsTable.appendChild(row)
  })

  // Load emergency cases
  const emergencyCasesTable = document.getElementById("emergency-cases-table")
  if (emergencyCasesTable) {
    emergencyCasesTable.innerHTML = ""

    emergencyCases.slice(0, 3).forEach((emergency) => {
      const patient = patients.find((p) => p.id === emergency.patientId)
      const row = document.createElement("tr")

      row.innerHTML = `
        <td>${patient.firstName} ${patient.lastName}</td>
        <td>${emergency.condition}</td>
        <td><span class="status status-${emergency.status}">${capitalizeFirstLetter(emergency.status)}</span></td>
      `

      emergencyCasesTable.appendChild(row)
    })
  }

  // Load emergency table
  const emergencyTable = document.getElementById("emergency-table")
  if (emergencyTable) {
    emergencyTable.innerHTML = ""

    emergencyCases.forEach((emergency) => {
      const patient = patients.find((p) => p.id === emergency.patientId)
      const row = document.createElement("tr")

      row.innerHTML = `
        <td>${patient.firstName} ${patient.lastName}</td>
        <td>${formatDate(emergency.admittedDate)} ${emergency.admittedTime}</td>
        <td>${emergency.condition}</td>
        <td>BP: ${emergency.vitalSigns.bp}, Pulse: ${emergency.vitalSigns.pulse}</td>
        <td><span class="status status-${emergency.status}">${capitalizeFirstLetter(emergency.status)}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-btn edit" data-id="${emergency.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-id="${emergency.id}" title="Delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      `

      emergencyTable.appendChild(row)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll("#emergency-table .action-btn.edit").forEach((button) => {
      button.addEventListener("click", function () {
        const emergencyId = this.getAttribute("data-id")
        editEmergency(emergencyId)
      })
    })

    document.querySelectorAll("#emergency-table .action-btn.delete").forEach((button) => {
      button.addEventListener("click", function () {
        const emergencyId = this.getAttribute("data-id")
        deleteEmergency(emergencyId)
      })
    })
  }

  // Load recent patients
  const recentPatientsTable = document.getElementById("recent-patients-table")
  recentPatientsTable.innerHTML = ""

  const recentPatients = [...patients].sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit)).slice(0, 5)

  recentPatients.forEach((patient) => {
    const visit = patientVisits.find((v) => v.patientId === patient.id)
    const row = document.createElement("tr")

    row.innerHTML = `
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${visit ? visit.diagnosis : "N/A"}</td>
            <td>${formatDate(patient.lastVisit)}</td>
        `

    recentPatientsTable.appendChild(row)
  })
}

// Initialize modals
function initializeModals() {
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".close-modal")

  // Close modal when clicking the close button
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.style.display = "none"
    })
  })

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })
}

// Initialize appointment management
function initializeAppointments() {
  const appointmentsTable = document.getElementById("appointments-table")
  const addAppointmentBtn = document.getElementById("add-appointment-btn")
  const appointmentModal = document.getElementById("appointment-modal")
  const appointmentForm = document.getElementById("appointment-form")
  const cancelAppointmentBtn = document.getElementById("cancel-appointment-btn")
  const patientSelect = document.getElementById("patient-select")
  const applyFiltersBtn = document.getElementById("apply-filters-btn")
  const dateFilter = document.getElementById("appointment-date-filter")
  const statusFilter = document.getElementById("appointment-status-filter")

  // Populate patient select dropdown
  patientSelect.innerHTML = '<option value="">Select Patient</option>'
  patients.forEach((patient) => {
    const option = document.createElement("option")
    option.value = patient.id
    option.textContent = `${patient.firstName} ${patient.lastName}`
    patientSelect.appendChild(option)
  })

  // Load appointments
  function loadAppointments(filterDate = "", filterStatus = "all") {
    appointmentsTable.innerHTML = ""

    let filteredAppointments = [...appointments]

    // Apply date filter
    if (filterDate) {
      filteredAppointments = filteredAppointments.filter((appointment) => appointment.date === filterDate)
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === filterStatus)
    }

    filteredAppointments.forEach((appointment) => {
      const patient = patients.find((p) => p.id === appointment.patientId)
      const row = document.createElement("tr")

      row.innerHTML = `
        <td>${patient.firstName} ${patient.lastName}</td>
        <td>${formatDate(appointment.date)}</td>
        <td>${formatTime(appointment.time)}</td>
        <td>${appointment.purpose}</td>
        <td><span class="status status-${appointment.status}">${capitalizeFirstLetter(appointment.status)}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-btn edit" data-id="${appointment.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-id="${appointment.id}" title="Delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      `

      appointmentsTable.appendChild(row)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll(".action-btn.edit").forEach((button) => {
      button.addEventListener("click", function () {
        const appointmentId = this.getAttribute("data-id")
        editAppointment(appointmentId)
      })
    })

    document.querySelectorAll(".action-btn.delete").forEach((button) => {
      button.addEventListener("click", function () {
        const appointmentId = this.getAttribute("data-id")
        deleteAppointment(appointmentId)
      })
    })
  }

  // Load initial appointments
  loadAppointments()

  // Apply filters
  applyFiltersBtn.addEventListener("click", () => {
    loadAppointments(dateFilter.value, statusFilter.value)
  })

  // Add new appointment
  addAppointmentBtn.addEventListener("click", () => {
    document.getElementById("appointment-modal-title").textContent = "Add New Appointment"
    appointmentForm.reset()
    document.getElementById("appointment-id").value = ""
    appointmentModal.style.display = "block"
  })

  // Cancel appointment form
  cancelAppointmentBtn.addEventListener("click", () => {
    appointmentModal.style.display = "none"
  })

  // Save appointment
  appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const appointmentId = document.getElementById("appointment-id").value
    const patientId = patientSelect.value
    const date = document.getElementById("appointment-date").value
    const time = document.getElementById("appointment-time").value
    const purpose = document.getElementById("appointment-purpose").value
    const status = document.getElementById("appointment-status").value
    const notes = document.getElementById("appointment-notes").value

    if (appointmentId) {
      // Update existing appointment
      const index = appointments.findIndex((a) => a.id === appointmentId)
      if (index !== -1) {
        appointments[index] = {
          ...appointments[index],
          patientId,
          date,
          time,
          purpose,
          status,
          notes,
        }
      }
    } else {
      // Add new appointment
      const newId = "A" + String(appointments.length + 1).padStart(3, "0")
      appointments.push({
        id: newId,
        patientId,
        date,
        time,
        purpose,
        status,
        notes,
      })
    }

    // Reload appointments and close modal
    loadAppointments()
    appointmentModal.style.display = "none"

    // Refresh dashboard data
    loadDashboardData()
  })

  // Edit appointment
  function editAppointment(appointmentId) {
    const appointment = appointments.find((a) => a.id === appointmentId)
    if (appointment) {
      document.getElementById("appointment-modal-title").textContent = "Edit Appointment"
      document.getElementById("appointment-id").value = appointment.id
      document.getElementById("patient-select").value = appointment.patientId
      document.getElementById("appointment-date").value = appointment.date
      document.getElementById("appointment-time").value = appointment.time
      document.getElementById("appointment-purpose").value = appointment.purpose
      document.getElementById("appointment-status").value = appointment.status
      document.getElementById("appointment-notes").value = appointment.notes || ""

      appointmentModal.style.display = "block"
    }
  }

  // Delete appointment
  function deleteAppointment(appointmentId) {
    if (confirm("Are you sure you want to delete this appointment?")) {
      const index = appointments.findIndex((a) => a.id === appointmentId)
      if (index !== -1) {
        appointments.splice(index, 1)
        loadAppointments()
        loadDashboardData()
      }
    }
  }
}

// Initialize emergency management
function initializeEmergency() {
  const emergencyTable = document.getElementById("emergency-table")
  const addEmergencyBtn = document.getElementById("add-emergency-btn")
  const emergencyModal = document.getElementById("emergency-modal")
  const emergencyForm = document.getElementById("emergency-form")
  const cancelEmergencyBtn = document.getElementById("cancel-emergency-btn")
  const emergencyPatientSelect = document.getElementById("emergency-patient-select")

  if (!emergencyTable || !addEmergencyBtn) return

  // Populate patient select dropdown
  emergencyPatientSelect.innerHTML = '<option value="">Select Patient</option>'
  patients.forEach((patient) => {
    const option = document.createElement("option")
    option.value = patient.id
    option.textContent = `${patient.firstName} ${patient.lastName}`
    emergencyPatientSelect.appendChild(option)
  })

  // Add new emergency case
  addEmergencyBtn.addEventListener("click", () => {
    document.getElementById("emergency-modal-title").textContent = "Add New Emergency Case"
    emergencyForm.reset()
    document.getElementById("emergency-id").value = ""
    emergencyModal.style.display = "block"
  })

  // Cancel emergency form
  cancelEmergencyBtn.addEventListener("click", () => {
    emergencyModal.style.display = "none"
  })

  // Save emergency
  emergencyForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const emergencyId = document.getElementById("emergency-id").value
    const patientId = emergencyPatientSelect.value
    const condition = document.getElementById("emergency-condition").value
    const bp = document.getElementById("emergency-bp").value
    const pulse = document.getElementById("emergency-pulse").value
    const temp = document.getElementById("emergency-temp").value
    const oxygen = document.getElementById("emergency-oxygen").value
    const status = document.getElementById("emergency-status").value
    const notes = document.getElementById("emergency-notes").value

    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })

    if (emergencyId) {
      // Update existing emergency
      const index = emergencyCases.findIndex((e) => e.id === emergencyId)
      if (index !== -1) {
        emergencyCases[index] = {
          ...emergencyCases[index],
          patientId,
          condition,
          vitalSigns: {
            bp,
            pulse,
            temp,
            oxygen,
          },
          status,
          notes,
        }
      }
    } else {
      // Add new emergency case
      const newId = "E" + String(emergencyCases.length + 1).padStart(3, "0")
      emergencyCases.push({
        id: newId,
        patientId,
        admittedDate: today,
        admittedTime: time,
        condition,
        vitalSigns: {
          bp,
          pulse,
          temp,
          oxygen,
        },
        status,
        notes,
      })
    }

    // Reload emergency cases and close modal
    loadDashboardData()
    emergencyModal.style.display = "none"
  })

  // Edit emergency
  const editEmergency = (emergencyId) => {
    const emergency = emergencyCases.find((e) => e.id === emergencyId)
    if (emergency) {
      document.getElementById("emergency-modal-title").textContent = "Edit Emergency Case"
      document.getElementById("emergency-id").value = emergency.id
      document.getElementById("emergency-patient-select").value = emergency.patientId
      document.getElementById("emergency-condition").value = emergency.condition
      document.getElementById("emergency-bp").value = emergency.vitalSigns.bp
      document.getElementById("emergency-pulse").value = emergency.vitalSigns.pulse
      document.getElementById("emergency-temp").value = emergency.vitalSigns.temp
      document.getElementById("emergency-oxygen").value = emergency.vitalSigns.oxygen
      document.getElementById("emergency-status").value = emergency.status
      document.getElementById("emergency-notes").value = emergency.notes || ""

      emergencyModal.style.display = "block"
    }
  }

  // Delete emergency
  const deleteEmergency = (emergencyId) => {
    if (confirm("Are you sure you want to delete this emergency case?")) {
      const index = emergencyCases.findIndex((e) => e.id === emergencyId)
      if (index !== -1) {
        emergencyCases.splice(index, 1)
        loadDashboardData()
      }
    }
  }

  // Add event listener for emergency case button in patient details
  const addEmergencyCaseBtn = document.getElementById("add-emergency-case-btn")
  if (addEmergencyCaseBtn) {
    addEmergencyCaseBtn.addEventListener("click", () => {
      const patientDetailsModal = document.getElementById("patient-details-modal")
      patientDetailsModal.style.display = "none"

      // Navigate to emergency tab
      document.querySelector('[data-page="emergency"]').click()

      // Open emergency modal with patient pre-selected
      document.getElementById("emergency-modal-title").textContent = "Add New Emergency Case"
      document.getElementById("emergency-form").reset()
      document.getElementById("emergency-id").value = ""
      document.getElementById("emergency-patient-select").value =
        document.getElementById("details-patient-id").textContent
      document.getElementById("emergency-modal").style.display = "block"
    })
  }
}

// Initialize patient records
function initializePatients() {
  const patientsTable = document.getElementById("patients-table")
  const addPatientBtn = document.getElementById("add-patient-btn")
  const patientModal = document.getElementById("patient-modal")
  const patientForm = document.getElementById("patient-form")
  const cancelPatientBtn = document.getElementById("cancel-patient-btn")
  const patientDetailsModal = document.getElementById("patient-details-modal")
  const searchPatientBtn = document.getElementById("search-patient-btn")
  const patientSearchField = document.getElementById("patient-search-field")

  // Load patients
  function loadPatients(searchTerm = "") {
    patientsTable.innerHTML = ""

    let filteredPatients = [...patients]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filteredPatients = filteredPatients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(term) ||
          patient.lastName.toLowerCase().includes(term) ||
          patient.id.toLowerCase().includes(term) ||
          (patient.medicalHistory && patient.medicalHistory.toLowerCase().includes(term)),
      )
    }

    filteredPatients.forEach((patient) => {
      const row = document.createElement("tr")
      const age = calculateAge(patient.dob)

      row.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.firstName} ${patient.lastName}</td>
        <td>${age}</td>
        <td>${capitalizeFirstLetter(patient.gender)}</td>
        <td>${patient.phone}</td>
        <td>${formatDate(patient.lastVisit)}</td>
        <td>
          <div class="table-actions">
            <button class="action-btn view" data-id="${patient.id}" title="View">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit" data-id="${patient.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-id="${patient.id}" title="Delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      `

      patientsTable.appendChild(row)
    })

    // Add event listeners to view, edit and delete buttons
    document.querySelectorAll(".action-btn.view").forEach((button) => {
      button.addEventListener("click", function () {
        const patientId = this.getAttribute("data-id")
        viewPatientDetails(patientId)
      })
    })

    document.querySelectorAll(".action-btn.edit").forEach((button) => {
      button.addEventListener("click", function () {
        const patientId = this.getAttribute("data-id")
        editPatient(patientId)
      })
    })

    document.querySelectorAll(".action-btn.delete").forEach((button) => {
      button.addEventListener("click", function () {
        const patientId = this.getAttribute("data-id")
        deletePatient(patientId)
      })
    })
  }

  // Load initial patients
  loadPatients()

  // Search patients
  searchPatientBtn.addEventListener("click", () => {
    loadPatients(patientSearchField.value)
  })

  patientSearchField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      loadPatients(this.value)
    }
  })

  // Add new patient
  addPatientBtn.addEventListener("click", () => {
    document.getElementById("patient-modal-title").textContent = "Add New Patient"
    patientForm.reset()
    document.getElementById("patient-id").value = ""
    patientModal.style.display = "block"
  })

  // Cancel patient form
  cancelPatientBtn.addEventListener("click", () => {
    patientModal.style.display = "none"
  })

  // Save patient
  patientForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const patientId = document.getElementById("patient-id").value
    const firstName = document.getElementById("patient-first-name").value
    const lastName = document.getElementById("patient-last-name").value
    const dob = document.getElementById("patient-dob").value
    const gender = document.getElementById("patient-gender").value
    const email = document.getElementById("patient-email").value
    const phone = document.getElementById("patient-phone").value
    const address = document.getElementById("patient-address").value
    const medicalHistory = document.getElementById("patient-medical-history").value

    if (patientId) {
      // Update existing patient
      const index = patients.findIndex((p) => p.id === patientId)
      if (index !== -1) {
        patients[index] = {
          ...patients[index],
          firstName,
          lastName,
          dob,
          gender,
          email,
          phone,
          address,
          medicalHistory,
        }
      }
    } else {
      // Add new patient
      const newId = "P" + String(patients.length + 1).padStart(3, "0")
      const today = new Date().toISOString().split("T")[0]
      patients.push({
        id: newId,
        firstName,
        lastName,
        dob,
        gender,
        email,
        phone,
        address,
        medicalHistory,
        lastVisit: today,
      })
    }

    // Reload patients and close modal
    loadPatients()
    patientModal.style.display = "none"

    // Refresh dashboard data
    loadDashboardData()
  })

  // Edit patient
  function editPatient(patientId) {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      document.getElementById("patient-modal-title").textContent = "Edit Patient"
      document.getElementById("patient-id").value = patient.id
      document.getElementById("patient-first-name").value = patient.firstName
      document.getElementById("patient-last-name").value = patient.lastName
      document.getElementById("patient-dob").value = patient.dob
      document.getElementById("patient-gender").value = patient.gender
      document.getElementById("patient-email").value = patient.email
      document.getElementById("patient-phone").value = patient.phone
      document.getElementById("patient-address").value = patient.address
      document.getElementById("patient-medical-history").value = patient.medicalHistory || ""

      patientModal.style.display = "block"
    }
  }

  // Delete patient
  function deletePatient(patientId) {
    if (confirm("Are you sure you want to delete this patient?")) {
      const index = patients.findIndex((p) => p.id === patientId)
      if (index !== -1) {
        patients.splice(index, 1)

        // Also delete related appointments and visits
        const appointmentIndices = []
        appointments.forEach((appointment, i) => {
          if (appointment.patientId === patientId) {
            appointmentIndices.unshift(i)
          }
        })
        appointmentIndices.forEach((i) => appointments.splice(i, 1))

        const visitIndices = []
        patientVisits.forEach((visit, i) => {
          if (visit.patientId === patientId) {
            visitIndices.unshift(i)
          }
        })
        visitIndices.forEach((i) => patientVisits.splice(i, 1))

        loadPatients()
        loadDashboardData()
      }
    }
  }

  // View patient details
  function viewPatientDetails(patientId) {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      document.getElementById("patient-details-name").textContent = `${patient.firstName} ${patient.lastName}`
      document.getElementById("details-patient-id").textContent = patient.id
      document.getElementById("details-patient-age").textContent = calculateAge(patient.dob)
      document.getElementById("details-patient-gender").textContent = capitalizeFirstLetter(patient.gender)
      document.getElementById("details-patient-email").textContent = patient.email
      document.getElementById("details-patient-phone").textContent = patient.phone
      document.getElementById("details-patient-address").textContent = patient.address
      document.getElementById("details-patient-medical-history").textContent =
        patient.medicalHistory || "No medical history recorded."

      // Load patient visits
      const patientVisitsTable = document.getElementById("patient-visits-table")
      patientVisitsTable.innerHTML = ""

      const visits = patientVisits.filter((visit) => visit.patientId === patientId)

      if (visits.length > 0) {
        visits.forEach((visit) => {
          const row = document.createElement("tr")

          row.innerHTML = `
            <td>${formatDate(visit.date)}</td>
            <td>${visit.reason}</td>
            <td>${visit.diagnosis}</td>
            <td>${visit.prescription}</td>
          `

          patientVisitsTable.appendChild(row)
        })
      } else {
        const row = document.createElement("tr")
        row.innerHTML = '<td colspan="4" class="text-center">No visits recorded</td>'
        patientVisitsTable.appendChild(row)
      }

      // Add event listeners for patient detail actions
      document.getElementById("add-visit-btn").onclick = () => {
        alert("Add visit functionality would be implemented here.")
      }

      document.getElementById("schedule-appointment-btn").onclick = () => {
        patientDetailsModal.style.display = "none"

        // Navigate to appointments tab
        document.querySelector('[data-page="appointments"]').click()

        // Open appointment modal with patient pre-selected
        document.getElementById("appointment-modal-title").textContent = "Add New Appointment"
        document.getElementById("appointment-form").reset()
        document.getElementById("appointment-id").value = ""
        document.getElementById("patient-select").value = patientId
        document.getElementById("appointment-modal").style.display = "block"
      }

      patientDetailsModal.style.display = "block"
    }
  }
}

// Initialize chat
function initializeChat() {
  const chatContactsContainer = document.getElementById("chat-contacts")
  const chatMessagesContainer = document.getElementById("chat-messages")
  const chatInput = document.getElementById("chat-input")
  const chatSendBtn = document.getElementById("chat-send-btn")
  const chatUserName = document.getElementById("chat-user-name")
  const chatUserStatus = document.getElementById("chat-user-status")

  let currentChatContact = null

  // Load chat contacts
  function loadChatContacts() {
    chatContactsContainer.innerHTML = ""

    chatContacts.forEach((contact) => {
      const contactElement = document.createElement("div")
      contactElement.className = "chat-contact"
      contactElement.setAttribute("data-id", contact.id)

      contactElement.innerHTML = `
        <img src="${contact.avatar}" alt="${contact.name}" class="chat-avatar">
        <div class="chat-contact-info">
          <div class="chat-contact-name">${contact.name}</div>
          <div class="chat-contact-preview">${contact.lastMessage}</div>
        </div>
        <div class="chat-time">${contact.time}</div>
      `

      contactElement.addEventListener("click", function () {
        // Remove active class from all contacts
        document.querySelectorAll(".chat-contact").forEach((el) => el.classList.remove("active"))

        // Add active class to clicked contact
        this.classList.add("active")

        // Load chat messages for this contact
        const contactId = this.getAttribute("data-id")
        currentChatContact = contactId
        loadChatMessages(contactId)

        // Update chat header
        const contact = chatContacts.find((c) => c.id === contactId)
        chatUserName.textContent = contact.name
        chatUserStatus.textContent = capitalizeFirstLetter(contact.status)
        chatUserStatus.className = `chat-status ${contact.status}`
      })

      chatContactsContainer.appendChild(contactElement)
    })
  }

  // Load chat messages
  function loadChatMessages(contactId) {
    chatMessagesContainer.innerHTML = ""

    if (chatMessages[contactId]) {
      chatMessages[contactId].forEach((message) => {
        const messageElement = document.createElement("div")
        messageElement.className = `message ${message.sender === "me" ? "sent" : "received"}`

        messageElement.innerHTML = `
          <div class="message-content">
            <p>${message.content}</p>
            <div class="message-time">${message.time}</div>
          </div>
        `

        chatMessagesContainer.appendChild(messageElement)
      })

      // Scroll to bottom
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight
    } else {
      chatMessagesContainer.innerHTML = '<div class="chat-start-message"><p>No messages yet</p></div>'
    }
  }

  // Send message
  function sendMessage() {
    if (!currentChatContact || !chatInput.value.trim()) return

    const messageContent = chatInput.value.trim()
    const now = new Date()
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })

    // Create new message
    const newMessage = {
      sender: "me",
      content: messageContent,
      time: time,
    }

    // Add message to chat
    if (!chatMessages[currentChatContact]) {
      chatMessages[currentChatContact] = []
    }

    chatMessages[currentChatContact].push(newMessage)

    // Update contact's last message
    const contactIndex = chatContacts.findIndex((c) => c.id === currentChatContact)
    if (contactIndex !== -1) {
      chatContacts[contactIndex].lastMessage = messageContent
      chatContacts[contactIndex].time = time
    }

    // Reload messages
    loadChatMessages(currentChatContact)

    // Clear input
    chatInput.value = ""

    // Simulate response after 1-3 seconds
    setTimeout(
      () => {
        const responses = [
          "I'll check the patient's records and get back to you.",
          "Thank you for the update. I'll follow up on this.",
          "Got it. I'll review this information shortly.",
          "Thanks for letting me know. I'll handle this right away.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const responseMessage = {
          sender: "them",
          content: randomResponse,
          time: time,
        }

        chatMessages[currentChatContact].push(responseMessage)
        loadChatMessages(currentChatContact)
      },
      Math.random() * 2000 + 1000,
    )
  }

  // Send message on button click
  chatSendBtn.addEventListener("click", sendMessage)

  // Send message on Enter key
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Load initial chat contacts
  loadChatContacts()
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function calculateAge(dateOfBirth) {
  const dob = new Date()
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }

  return age
}

