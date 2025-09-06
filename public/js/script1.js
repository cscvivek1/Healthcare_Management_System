document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  
    // Preloader
    window.addEventListener("load", () => {
      const preloader = document.querySelector(".preloader");
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  
    // Get Started Button - Open Register Modal
    const getStartedBtn = document.getElementById("getStartedBtn");
    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        const registerModal = document.getElementById("registerModal");
        openModal(registerModal);
      });
    }
  
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");
    const authButtons = document.querySelector(".auth-buttons");
  
    if (mobileToggle) {
      mobileToggle.addEventListener("click", function () {
        this.classList.toggle("active");
  
        // Create mobile menu if it doesn't exist
        if (!document.querySelector(".mobile-menu")) {
          const mobileMenu = document.createElement("div");
          mobileMenu.classList.add("mobile-menu");
  
          // Clone nav links and auth buttons
          const navLinksClone = navLinks.cloneNode(true);
          const authButtonsClone = authButtons.cloneNode(true);
  
          mobileMenu.appendChild(navLinksClone);
          mobileMenu.appendChild(authButtonsClone);
  
          document.body.appendChild(mobileMenu);
  
          // Style mobile menu
          mobileMenu.style.position = "fixed";
          mobileMenu.style.top = "80px";
          mobileMenu.style.left = "0";
          mobileMenu.style.width = "100%";
          mobileMenu.style.backgroundColor = "white";
          mobileMenu.style.padding = "20px";
          mobileMenu.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
          mobileMenu.style.zIndex = "999";
          mobileMenu.style.display = "none";
          mobileMenu.style.flexDirection = "column";
          mobileMenu.style.gap = "20px";
  
          // Style nav links in mobile menu
          navLinksClone.style.display = "flex";
          navLinksClone.style.flexDirection = "column";
          navLinksClone.style.gap = "15px";
  
          // Style auth buttons in mobile menu
          authButtonsClone.style.display = "flex";
          authButtonsClone.style.flexDirection = "column";
          authButtonsClone.style.gap = "15px";
  
          // Add event listeners to mobile menu links
          const mobileLinks = mobileMenu.querySelectorAll("a");
          mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
              mobileMenu.style.display = "none";
              mobileToggle.classList.remove("active");
            });
          });
        }
  
        // Toggle mobile menu visibility
        const mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
          mobileMenu.style.display = "flex";
        } else {
          mobileMenu.style.display = "none";
        }
      });
    }
  
    // Hamburger animation
    if (mobileToggle) {
      mobileToggle.addEventListener("click", function () {
        const spans = this.querySelectorAll("span");
        if (this.classList.contains("active")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";
        }
      });
    }
  
    // Counter Animation
    const counters = document.querySelectorAll(".counter");
  
    function animateCounter(counter) {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / 100;
  
      const updateCounter = () => {
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target;
        }
      };
  
      updateCounter();
    }
  
    // Animate counters when they come into view
    const observerOptions = {
      threshold: 0.5,
    };
  
    // Use Intersection Observer if available
    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
  
      counters.forEach((counter) => {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      counters.forEach((counter) => {
        animateCounter(counter);
      });
    }
  
    // Services Tabs
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((btn) => {
          btn.classList.remove("active");
        });
  
        // Add active class to clicked button
        btn.classList.add("active");
  
        // Show corresponding tab content
        const tabId = btn.getAttribute("data-tab");
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });
        document.getElementById(`${tabId}-content`).classList.add("active");
      });
    });
  
    // Testimonial Slider
    const testimonialTrack = document.querySelector(".testimonial-track");
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
  
    let currentSlide = 0;
    const slideWidth = 100; // 100%
  
    function goToSlide(index) {
      if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${index * slideWidth}%)`;
  
        // Update dots
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });
        dots[index].classList.add("active");
  
        currentSlide = index;
      }
    }
  
    // Initialize first slide
    goToSlide(0);
  
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });
  
    // Event listeners for prev/next buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = testimonialCards.length - 1;
        }
        goToSlide(currentSlide);
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide++;
        if (currentSlide >= testimonialCards.length) {
          currentSlide = 0;
        }
        goToSlide(currentSlide);
      });
    }
  
    // Auto slide every 5 seconds
    let testimonialInterval;
  
    function startTestimonialInterval() {
      testimonialInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide >= testimonialCards.length) {
          currentSlide = 0;
        }
        goToSlide(currentSlide);
      }, 5000);
    }
  
    if (testimonialCards.length > 0) {
      startTestimonialInterval();
  
      // Pause auto slide on hover
      const testimonialSlider = document.querySelector(".testimonial-slider");
      if (testimonialSlider) {
        testimonialSlider.addEventListener("mouseenter", () => {
          clearInterval(testimonialInterval);
        });
  
        testimonialSlider.addEventListener("mouseleave", () => {
          startTestimonialInterval();
        });
      }
    }
  
    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll("nav a, .footer-links a");
  
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
  
        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
  
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
  
            // Close mobile menu if open
            const mobileMenu = document.querySelector(".mobile-menu");
            if (mobileMenu && mobileMenu.style.display === "flex") {
              mobileMenu.style.display = "none";
              mobileToggle.classList.remove("active");
            }
  
            // Update active nav link
            navLinks.querySelectorAll("a").forEach((link) => {
              link.classList.remove("active");
            });
            this.classList.add("active");
          }
        }
      });
    });
  
    // Update active nav link on scroll
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
  
      // Get all sections
      const sections = document.querySelectorAll("section");
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.querySelectorAll("a").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
  
      // Add fixed header on scroll
      const header = document.querySelector("header");
      if (scrollPosition > 50) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.backgroundColor = "white";
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
      }
    });
  
    // Form submission
    const contactForm = document.querySelector(".contact-form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
  
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert("Please fill in all fields");
          return;
        }
  
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        alert("Thank you for your message! We will get back to you soon.");
  
        // Reset form
        contactForm.reset();
      });
    }
  
    // Modal functionality
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const closeBtns = document.querySelectorAll(".close-modal");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
  
    // Open modal function
    function openModal(modal) {
      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }
  
    // Close modal function
    function closeModal(modal) {
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  
    // Event listeners for opening modals
    document.querySelectorAll(".btn-outline").forEach((btn) => {
      btn.addEventListener("click", () => {
        openModal(loginModal);
      });
    });
  
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      if (btn.textContent.trim() === "Register") {
        btn.addEventListener("click", () => {
          openModal(registerModal);
        });
      }
    });
  
    // Event listeners for closing modals
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal");
        closeModal(modal);
      });
    });
  
    // Close modal when clicking outside of modal content
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal(e.target);
      }
    });
  
    // Switch between login and register modals
    if (showRegister) {
      showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
      });
    }
  
    if (showLogin) {
      showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
      });
    }
  
    // User type selection
    const userTypes = document.querySelectorAll(".user-type");
  
    userTypes.forEach((type) => {
      type.addEventListener("click", function () {
        // Remove active class from all user types in the same container
        const container = this.closest(".user-type-selector");
        container.querySelectorAll(".user-type").forEach((t) => {
          t.classList.remove("active");
        });
  
        // Add active class to clicked user type
        this.classList.add("active");
      });
    });
  
    // Password toggle
    const togglePassword = document.querySelectorAll(".toggle-password");
  
    togglePassword.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const passwordField = this.previousElementSibling;
  
        if (passwordField.type === "password") {
          passwordField.type = "text";
          this.classList.remove("fa-eye-slash");
          this.classList.add("fa-eye");
        } else {
          passwordField.type = "password";
          this.classList.remove("fa-eye");
          this.classList.add("fa-eye-slash");
        }
      });
    });
  
    // Add animations to elements when they come into view
    function animateOnScroll() {
      const elements = document.querySelectorAll(".feature-card, .service-card, .contact-card, .step");
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
  
        if (elementPosition < screenPosition) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    }
  
    // Run animation on scroll
    window.addEventListener("scroll", animateOnScroll);
    // Run once on page load
    animateOnScroll();
  });
  function redirectToDashboard() {
    const userType = document.querySelector('.user-type.active').getAttribute('data-type');
    
    if (userType === 'doctor') {
      window.location.href = '/doctor-dashboard';
    } else {
      window.location.href = '/patient-dashboard';
    }
  }