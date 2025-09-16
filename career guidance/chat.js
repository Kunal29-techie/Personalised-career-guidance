// Chat functionality
class ChatBot {
  constructor() {
    this.messages = []
    this.isTyping = false
    this.messageInput = document.getElementById("messageInput")
    this.sendButton = document.getElementById("sendButton")
    this.chatMessages = document.getElementById("chatMessages")
    this.typingIndicator = document.getElementById("typingIndicator")

    this.init()
  }

  init() {
    // Event listeners
    this.messageInput.addEventListener("input", () => this.handleInputChange())
    this.messageInput.addEventListener("keydown", (e) => this.handleKeyDown(e))
    this.sendButton.addEventListener("click", () => this.sendMessage())

    // Quick question buttons
    document.querySelectorAll(".question-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.dataset.question
        this.messageInput.value = question
        this.sendMessage()
      })
    })

    // Auto-resize textarea
    this.messageInput.addEventListener("input", () => {
      this.messageInput.style.height = "auto"
      this.messageInput.style.height = this.messageInput.scrollHeight + "px"
    })
  }

  handleInputChange() {
    const hasText = this.messageInput.value.trim().length > 0
    this.sendButton.disabled = !hasText || this.isTyping
  }

  handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  async sendMessage() {
    const message = this.messageInput.value.trim()
    if (!message || this.isTyping) return

    // Add user message
    this.addMessage(message, "user")
    this.messageInput.value = ""
    this.messageInput.style.height = "auto"
    this.handleInputChange()

    // Show typing indicator
    this.showTyping()

    // Simulate AI response
    await this.simulateAIResponse(message)
  }

  addMessage(content, sender) {
    const messageContainer = document.createElement("div")
    messageContainer.className = `message ${sender}-message`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.textContent = sender === "user" ? "👤" : "🤖"

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    const bubble = document.createElement("div")
    bubble.className = "message-bubble"

    if (typeof content === "string") {
      bubble.innerHTML = this.formatMessage(content)
    } else {
      bubble.appendChild(content)
    }

    const time = document.createElement("div")
    time.className = "message-time"
    time.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    messageContent.appendChild(bubble)
    messageContent.appendChild(time)
    messageContainer.appendChild(avatar)
    messageContainer.appendChild(messageContent)

    // Insert before quick questions
    const quickQuestions = document.querySelector(".quick-questions")
    quickQuestions.parentNode.insertBefore(messageContainer, quickQuestions)

    // Scroll to bottom
    this.scrollToBottom()

    // Add to messages array
    this.messages.push({ content, sender, timestamp: new Date() })
  }

  formatMessage(message) {
    // Convert line breaks to <br> tags
    return message.replace(/\n/g, "<br>")
  }

  showTyping() {
    this.isTyping = true
    this.typingIndicator.classList.add("active")
    this.handleInputChange()
  }

  hideTyping() {
    this.isTyping = false
    this.typingIndicator.classList.remove("active")
    this.handleInputChange()
  }

  async simulateAIResponse(userMessage) {
    // Simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    this.hideTyping()

    // Generate response based on user message
    const response = this.generateResponse(userMessage.toLowerCase())
    this.addMessage(response, "bot")
  }

  generateResponse(message) {
    // Simple response generation based on keywords
    const responses = {
      career: `Great question about career paths! In computer science, you have numerous exciting options:

🎯 **Software Development**: Frontend, Backend, Full-stack, Mobile
📊 **Data Science**: Data Analyst, Data Scientist, ML Engineer
🔒 **Cybersecurity**: Security Analyst, Ethical Hacker, Security Architect
☁️ **Cloud Computing**: Cloud Engineer, DevOps, Site Reliability Engineer
🤖 **AI/ML**: Machine Learning Engineer, AI Researcher, NLP Specialist
🎮 **Game Development**: Game Programmer, Graphics Engineer
💼 **Product Management**: Technical Product Manager, Engineering Manager

Each path has different requirements and growth opportunities. Would you like me to dive deeper into any specific area?`,

      salary: `Salary ranges vary by location, experience, and specialization:

💰 **Entry Level (0-2 years)**:
- Software Engineer: $70K - $120K
- Data Analyst: $60K - $90K
- Cybersecurity Analyst: $65K - $95K

💰 **Mid Level (3-5 years)**:
- Senior Software Engineer: $100K - $160K
- Data Scientist: $110K - $150K
- DevOps Engineer: $105K - $145K

💰 **Senior Level (5+ years)**:
- Staff Engineer: $150K - $250K+
- Principal Data Scientist: $160K - $220K+
- Security Architect: $140K - $200K+

Remember, these are base salaries and don't include bonuses, stock options, or benefits. Location significantly impacts these numbers!`,

      skills: `Here are the essential skills for different CS roles:

🔧 **Technical Skills**:
- Programming languages (Python, JavaScript, Java, C++)
- Data structures and algorithms
- System design and architecture
- Database management (SQL, NoSQL)
- Version control (Git)
- Cloud platforms (AWS, Azure, GCP)

🧠 **Soft Skills**:
- Problem-solving and analytical thinking
- Communication and teamwork
- Project management
- Continuous learning mindset
- Attention to detail

📚 **Specialized Skills** (based on your chosen path):
- **Web Dev**: React, Node.js, HTML/CSS
- **Data Science**: Statistics, R, Pandas, Tableau
- **ML**: TensorFlow, PyTorch, scikit-learn
- **Mobile**: Swift, Kotlin, React Native

What specific role are you interested in? I can provide more targeted skill recommendations!`,

      interview: `Here's your complete interview preparation guide:

📝 **Technical Preparation**:
- Practice coding problems on LeetCode, HackerRank
- Review data structures: arrays, linked lists, trees, graphs
- Study algorithms: sorting, searching, dynamic programming
- Practice system design for senior roles
- Review your projects and be ready to explain them

🗣️ **Behavioral Questions**:
- Prepare STAR method examples (Situation, Task, Action, Result)
- Common questions: "Tell me about a challenge you overcame"
- "Describe a time you worked in a team"
- "How do you handle tight deadlines?"

💡 **Day of Interview**:
- Research the company and role thoroughly
- Prepare thoughtful questions to ask them
- Practice explaining your thought process out loud
- Bring copies of your resume
- Dress appropriately for the company culture

🎯 **Follow-up**:
- Send thank-you emails within 24 hours
- Reiterate your interest and key qualifications
- Be patient but follow up if you don't hear back

Would you like me to help you prepare for any specific type of interview?`,

      transition: `Career transitions in tech are definitely possible! Here's how to approach it:

🔄 **Assess Your Current Skills**:
- Identify transferable skills from your current role
- Determine what new skills you need to learn
- Create a learning timeline and stick to it

📚 **Learning Strategy**:
- Take online courses (Coursera, Udemy, edX)
- Build projects to demonstrate new skills
- Contribute to open source projects
- Join relevant communities and forums

🛠️ **Build Your Portfolio**:
- Create 3-5 projects showcasing your new skills
- Document your learning journey on GitHub
- Write blog posts about what you're learning
- Get involved in hackathons or coding challenges

🤝 **Networking**:
- Attend tech meetups and conferences
- Connect with professionals in your target field
- Find a mentor who's made a similar transition
- Join online communities (Reddit, Discord, Slack groups)

📈 **Gradual Transition**:
- Look for roles that bridge your current and target fields
- Consider freelance projects to gain experience
- Apply for junior roles even if you have senior experience elsewhere

What specific transition are you considering? I can provide more targeted advice!`,

      default: `I understand you're looking for career guidance! I'm here to help with:

🎯 **Career Planning**: Exploring different CS paths and specializations
💰 **Salary Information**: Understanding compensation across different roles
📚 **Skill Development**: Learning roadmaps and resource recommendations  
💼 **Interview Prep**: Technical and behavioral interview strategies
🔄 **Career Transitions**: Moving between different tech roles
📈 **Growth Strategies**: Advancing in your current career path

Feel free to ask me anything specific about your CS career journey. You can also click on one of the popular questions above to get started!

What aspect of your career would you like to explore today?`,
    }

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (key !== "default" && message.includes(key)) {
        return response
      }
    }

    // Check for specific keywords
    if (message.includes("machine learning") || message.includes("ml")) {
      return responses.transition.replace(
        "What specific transition are you considering?",
        "Machine Learning is a fantastic field! You'll need strong math skills (statistics, linear algebra), Python programming, and experience with ML libraries like scikit-learn and TensorFlow. Start with online courses and build projects to showcase your skills!",
      )
    }

    if (message.includes("data scien")) {
      return responses.skills.replace(
        "What specific role are you interested in?",
        "For Data Science specifically, focus on: Python/R, SQL, statistics, data visualization (Tableau, matplotlib), and machine learning. Build a portfolio with real datasets and document your analysis process!",
      )
    }

    if (message.includes("web dev")) {
      return responses.skills.replace(
        "What specific role are you interested in?",
        "For Web Development, master: HTML/CSS, JavaScript, a frontend framework (React/Vue), backend technologies (Node.js, Python), databases, and version control. Build full-stack projects to showcase your abilities!",
      )
    }

    return responses.default
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight
    }, 100)
  }
}

// Initialize chat when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ChatBot()
})

// Add some interactive animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate quick question buttons on hover
  document.querySelectorAll(".question-btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.02)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add floating animation to advisor avatar
  const advisorAvatar = document.querySelector(".advisor-avatar")
  if (advisorAvatar) {
    setInterval(() => {
      advisorAvatar.style.transform = "translateY(-5px)"
      setTimeout(() => {
        advisorAvatar.style.transform = "translateY(0)"
      }, 1000)
    }, 3000)
  }
})
