// Roadmaps functionality
class RoadmapsManager {
  constructor() {
    this.filters = {
      difficulty: "all",
      duration: "all",
      category: "all",
    }
    this.roadmaps = []
    this.init()
  }

  init() {
    this.setupFilters()
    this.setupPreviewModals()
    this.loadRoadmaps()
    this.animateCards()
  }

  setupFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const filterType = e.target.dataset.type
        const filterValue = e.target.dataset.filter

        // Update active state
        document.querySelectorAll(`[data-type="${filterType}"]`).forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")

        // Update filter
        this.filters[filterType] = filterValue
        this.applyFilters()
      })
    })
  }

  setupPreviewModals() {
    const modal = document.getElementById("previewModal")
    const modalClose = document.getElementById("modalClose")
    const modalClose2 = document.getElementById("modalClose2")

    // Preview buttons
    document.querySelectorAll(".preview-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const roadmapId = e.target.dataset.roadmap
        this.showPreview(roadmapId)
      })
    })

    // Close modal
    modalClose.addEventListener("click", () => this.closeModal())
    modalClose2.addEventListener("click", () => this.closeModal())
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal()
    })

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal()
    })
  }

  loadRoadmaps() {
    this.roadmaps = [
      {
        id: "frontend",
        title: "Frontend Development",
        icon: "🎨",
        difficulty: "beginner",
        duration: "medium",
        category: "development",
        description: "Master modern web development with React, TypeScript, and responsive design",
        modules: [
          {
            title: "HTML & CSS Fundamentals",
            description: "Learn semantic HTML and modern CSS techniques",
          },
          {
            title: "JavaScript Essentials",
            description: "Master ES6+ features and DOM manipulation",
          },
          {
            title: "React Fundamentals",
            description: "Build interactive UIs with React hooks and components",
          },
          {
            title: "TypeScript Integration",
            description: "Add type safety to your JavaScript applications",
          },
          {
            title: "Responsive Design",
            description: "Create mobile-first, responsive web applications",
          },
          {
            title: "State Management",
            description: "Learn Redux, Context API, and modern state patterns",
          },
          {
            title: "Testing & Debugging",
            description: "Write unit tests and debug React applications",
          },
          {
            title: "Performance Optimization",
            description: "Optimize bundle size and runtime performance",
          },
          {
            title: "Deployment & CI/CD",
            description: "Deploy applications and set up automated workflows",
          },
          {
            title: "Portfolio Projects",
            description: "Build 3 comprehensive projects for your portfolio",
          },
        ],
      },
      {
        id: "backend",
        title: "Backend Development",
        icon: "⚙️",
        difficulty: "intermediate",
        duration: "medium",
        category: "development",
        description: "Build scalable server-side applications with Node.js, databases, and cloud services",
        modules: [
          {
            title: "Node.js Fundamentals",
            description: "Learn server-side JavaScript and npm ecosystem",
          },
          {
            title: "Express.js Framework",
            description: "Build RESTful APIs with Express.js",
          },
          {
            title: "Database Design",
            description: "Design and implement SQL and NoSQL databases",
          },
          {
            title: "Authentication & Security",
            description: "Implement JWT, OAuth, and security best practices",
          },
          {
            title: "API Development",
            description: "Create RESTful and GraphQL APIs",
          },
          {
            title: "Microservices Architecture",
            description: "Design and build microservices systems",
          },
          {
            title: "Cloud Services",
            description: "Deploy and scale applications on AWS/Azure",
          },
          {
            title: "DevOps Basics",
            description: "Learn Docker, CI/CD, and monitoring",
          },
          {
            title: "Performance & Scaling",
            description: "Optimize performance and handle high traffic",
          },
          {
            title: "Production Projects",
            description: "Build and deploy production-ready applications",
          },
        ],
      },
      {
        id: "data-science",
        title: "Data Science",
        icon: "📊",
        difficulty: "intermediate",
        duration: "long",
        category: "data",
        description: "Analyze data, build predictive models, and extract insights using Python and ML",
        modules: [
          {
            title: "Python for Data Science",
            description: "Master Python libraries: NumPy, Pandas, Matplotlib",
          },
          {
            title: "Statistics & Probability",
            description: "Learn statistical concepts and hypothesis testing",
          },
          {
            title: "Data Cleaning & Preprocessing",
            description: "Clean, transform, and prepare data for analysis",
          },
          {
            title: "Exploratory Data Analysis",
            description: "Discover patterns and insights in datasets",
          },
          {
            title: "Data Visualization",
            description: "Create compelling visualizations with Seaborn, Plotly",
          },
          {
            title: "Machine Learning Basics",
            description: "Understand supervised and unsupervised learning",
          },
          {
            title: "Advanced ML Algorithms",
            description: "Implement complex algorithms and ensemble methods",
          },
          {
            title: "Deep Learning Fundamentals",
            description: "Build neural networks with TensorFlow/PyTorch",
          },
          {
            title: "Model Deployment",
            description: "Deploy ML models to production environments",
          },
          {
            title: "Capstone Projects",
            description: "Complete end-to-end data science projects",
          },
        ],
      },
      // Add more roadmaps as needed
    ]
  }

  applyFilters() {
    const cards = document.querySelectorAll(".roadmap-card")

    cards.forEach((card) => {
      const difficulty = card.dataset.difficulty
      const duration = card.dataset.duration
      const category = card.dataset.category

      const matchesDifficulty = this.filters.difficulty === "all" || difficulty === this.filters.difficulty
      const matchesDuration = this.filters.duration === "all" || duration === this.filters.duration
      const matchesCategory = this.filters.category === "all" || category === this.filters.category

      if (matchesDifficulty && matchesDuration && matchesCategory) {
        card.classList.remove("hidden")
        card.style.animation = "fadeInUp 0.6s ease-out"
      } else {
        card.classList.add("hidden")
      }
    })
  }

  showPreview(roadmapId) {
    const roadmap = this.roadmaps.find((r) => r.id === roadmapId)
    if (!roadmap) return

    const modal = document.getElementById("previewModal")
    const modalTitle = document.getElementById("modalTitle")
    const modalBody = document.getElementById("modalBody")
    const modalStart = document.getElementById("modalStart")

    modalTitle.textContent = `${roadmap.title} - Preview`
    modalStart.href = `careers.html?path=${roadmapId}`

    modalBody.innerHTML = `
      <div class="roadmap-preview">
        <div class="preview-header">
          <div class="preview-icon">${roadmap.icon}</div>
          <h3 class="preview-title">${roadmap.title}</h3>
          <p class="preview-description">${roadmap.description}</p>
        </div>
        <div class="preview-modules">
          <h4 style="margin-bottom: 1rem; color: var(--foreground);">Learning Modules</h4>
          ${roadmap.modules
            .map(
              (module, index) => `
            <div class="module-item">
              <div class="module-number">${index + 1}</div>
              <div class="module-content">
                <h4>${module.title}</h4>
                <p>${module.description}</p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `

    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    const modal = document.getElementById("previewModal")
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  animateCards() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease-out"
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".roadmap-card").forEach((card) => {
      observer.observe(card)
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new RoadmapsManager()
})

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Animate progress bars on scroll
  const progressBars = document.querySelectorAll(".progress-fill")
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width
          entry.target.style.width = "0%"
          setTimeout(() => {
            entry.target.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Add hover effects to roadmap cards
  document.querySelectorAll(".roadmap-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Animate filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
})
