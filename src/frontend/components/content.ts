export const content = {
  navbar: {
    logo: "RC.DEV",
    items: ["About", "Skills", "Projects", "Research", "Experience", "Contact"],
  },

  hero: {
    badge: "Open to internships & full-time opportunities",
    title: "Rudrani Chavarkar",
    role: "Software Engineer • MSCS @ USC",
    description:
      "I design and build scalable systems and AI-powered applications, transforming complex ideas into",
    descriptionHighlight: "reliable, real-world solutions.",
    btnPrimary: "View Projects",
    btnSecondary: "Get in Touch",
  },

  about: {
    title: "About Me",
    paragraphs: [
      {
        text: "I'm a",
        highlight: "software engineer",
        postHighlight:
          "and Master's student in Computer Science at the University of Southern California, with a strong foundation in distributed systems, backend engineering, and cloud-native development.",
      },
      {
        text: "My experience spans scalable microservices, RESTful APIs, cloud infrastructure, and AI/ML systems. I value",
        highlight: "clean architecture, performance optimization,",
        postHighlight: "and building systems that scale reliably in production environments.",
      },
      {
        text: "Beyond engineering, I actively explore generative AI, contribute to research-driven projects, and enjoy mentoring, leadership, and community-driven initiatives.",
        highlight: "",
        postHighlight: "",
      },
    ],
  },

  skills: {
  title: "Technical Toolkit",
  categories: {
    "Programming Languages": [
      { name: "Java", color: "group-hover:text-[#ED8B00]" },
      { name: "Python", color: "group-hover:text-[#3776AB]" },
      { name: "SQL", color: "group-hover:text-[#4479A1]" },
      { name: "TypeScript", color: "group-hover:text-[#3178C6]" },
      { name: "JavaScript", color: "group-hover:text-[#F7DF1E]" },
      { name: "Bash", color: "group-hover:text-[#4EAA25]" },
    ],

    "Backend & Distributed Systems": [
      { name: "Spring Boot", color: "group-hover:text-[#6DB33F]" },
      { name: "FastAPI", color: "group-hover:text-[#009688]" },
      { name: "Node.js", color: "group-hover:text-[#339933]" },
      { name: "RESTful APIs", color: "group-hover:text-[#0A66C2]" },
      { name: "Microservices Architecture", color: "group-hover:text-[#FF6F00]" },
      { name: "Distributed Systems", color: "group-hover:text-[#8A2BE2]" },
    ],

    "Frontend & Mobile Development": [
      { name: "ReactJS", color: "group-hover:text-[#61DAFB]" },
      { name: "React Native", color: "group-hover:text-[#61DAFB]" },
      { name: "HTML", color: "group-hover:text-[#E34F26]" },
      { name: "CSS", color: "group-hover:text-[#1572B6]" },
      { name: "Responsive Design", color: "group-hover:text-[#FF4081]" },
      { name: "Component-Based UI", color: "group-hover:text-[#673AB7]" },
    ],

    "Databases & Data Engineering": [
      { name: "MySQL", color: "group-hover:text-[#4479A1]" },
      { name: "MongoDB", color: "group-hover:text-[#47A248]" },
      { name: "Database Design", color: "group-hover:text-[#795548]" },
      { name: "Query Optimization", color: "group-hover:text-[#0097A7]" },
      { name: "Indexing", color: "group-hover:text-[#F57C00]" },
      { name: "Transaction Management", color: "group-hover:text-[#5D4037]" },
    ],

    "Cloud, DevOps & Infrastructure": [
      { name: "AWS EC2", color: "group-hover:text-[#FF9900]" },
      { name: "AWS S3", color: "group-hover:text-[#FF9900]" },
      { name: "AWS Lambda", color: "group-hover:text-[#FF9900]" },
      { name: "Docker", color: "group-hover:text-[#2496ED]" },
      { name: "CI/CD Pipelines", color: "group-hover:text-[#0A66C2]" },
      { name: "Git", color: "group-hover:text-[#F05032]" },
    ],

    "Machine Learning & AI Systems": [
      { name: "Large Language Models (LLaMA 3)", color: "group-hover:text-[#8A2BE2]" },
      { name: "ML Inference Pipelines", color: "group-hover:text-[#00ACC1]" },
      { name: "Speech Recognition (Wav2Vec2)", color: "group-hover:text-[#4B8BBE]" },
      { name: "Text-to-Speech (VITS)", color: "group-hover:text-[#FF69B4]" },
      { name: "Computer Vision (VGG16 / VGG19)", color: "group-hover:text-[#FF5733]" },
      { name: "XGBoost", color: "group-hover:text-[#228B22]" },
    ],
  },
},

 projects: {
  title: "Featured Projects",
  items: [
    {
      title: "Maya – GenAI Language Learning App",
      description:
        "Multilingual GenAI-powered mobile app with AI chat, speech interaction, and community features, delivering high-accuracy translation, STT, and TTS.",
      tech: ["React Native", "FastAPI", "AWS", "LLaMA 3"],
      github: "https://github.com/Rudrani26/Maya_LanguageLearningApp",
      color: "from-purple-500 to-indigo-500",
      animation: "fire" // Keep dots animation
    },
    {
      title: "Serenity – AI Mental Well-Being Platform",
      description:
        "AI-driven mental health web application featuring facial emotion recognition, mood prediction, and personalized music therapy.",
      tech: ["Python", "Streamlit", "VGG19", "XGBoost", "AWS"],
      github: "https://github.com/Rudrani26/Serenity-A-Mental-Well-Being-Web-Application",
      color: "from-purple-500 to-indigo-500",
      animation: "fire" // Change to fire animation
    },
  ],
},
  research: {
    title: "Research & Publications",
    items: [
      {
        title: "The Random Forest That Found the Fibroids: Machine Learning Algorithms for Uterine Fibroid Detection",
        description: "This study evaluates five machine learning algorithms, including Support Vector Machine, VGG16, Gaussian Mixture Model, Gaussian Mixture Model with Stacking (using Random Forest and Logistic Regression), and Random Forest for fibroid detection.",
        venue: "Lecture Notes in Networks and Systems ((LNNS,volume 1162)), Springer (ICT4SD 2024)",
        link: "https://link.springer.com/chapter/10.1007/978-981-97-8605-3_13",
        tags: ["Machine Learning", "Python", "Random Forest", "SVM", "VGG16", "GMM", "GMM-Stacking", "VGG16"],
      },
    ],
  },

  experience: {
    title: "Professional Journey",
    items: [
      {
        company: "The Clearing Corporation of India",
        role: "Software Engineering Intern",
        period: "Jun 2024 – Nov 2024",
        description:
          "Refactored a legacy monolithic system into scalable microservices, improving throughput by 20% for 50K+ users. Built secure REST APIs, optimized database performance, and supported CI/CD-driven deployments in a production distributed environment.",
        highlights: ["Microservices", "Spring Boot", "React", "CI/CD"],
      },
      {
        company: "Clover Infotech Pvt. Ltd.",
        role: "Software Engineering Intern",
        period: "Mar 2023 – Jul 2023",
        description:
          "Developed high-throughput backend services and RESTful APIs using Spring Boot and MySQL, improving system reliability and performance under heavy load.",
        highlights: ["Backend Systems", "API Design", "Performance Optimization"],
      },
    ],
  },

  contact: {
    title: "Get In Touch",
    apiEndpoint: "http://127.0.0.1:5000/api/contact",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your Name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      phoneLabel: "Phone (Optional)",
      phonePlaceholder: "+1 (123) 456-7890",
      subjectLabel: "Subject",
      subjectPlaceholder: "Opportunity / Collaboration",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project or opportunity...",
      btnSend: "Send Message",
      btnSending: "Sending...",
      btnSuccess: "Message Sent!",
      btnError: "Something went wrong.",
    },
  },

  footer: {
    name: "Rudrani Chavarkar",
    rights: "All rights reserved.",
    techStack: "Built with React • TypeScript • Tailwind • Framer Motion",
    social: [
      { icon: "Github", href: "https://github.com/Rudrani26", label: "GitHub" },
      {
        icon: "Linkedin",
        href: "https://linkedin.com/in/rudranichavarkar/",
        label: "LinkedIn",
      },
      { icon: "Mail", href: "mailto:chavarkar.rudrani8251@gmail.com", label: "Email" },
    ],
  },
};
