// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // LinkedIn link handler
  const linkedinLink = document.getElementById('linkedin-link');
  if (linkedinLink) {
    linkedinLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('https://linkedin.com/in/pranav-mane-64073432b', '_blank');
      showToast('Opening LinkedIn profile...');
    });
  }
  
  // Download Resume Button (creates PDF from resume content)
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      // Create a downloadable text file with resume info (simulating PDF download)
      const resumeContent = `PRANAV MANE - RESUME
========================
Contact: +91-8850020087 | pmane2291@gmail.com
LinkedIn: linkedin.com/in/pranav-mane-64073432b

ABOUT ME:
Artificial Intelligence student skilled in data analysis, Excel, Tableau, and data entry with experience in Python and SQL. Interested in data-driven decision making, dashboard creation, and AI applications.

EDUCATION:
Bachelor of Science in Artificial Intelligence
Vivekanand Education Society's College, Mumbai
CGPA: 8.45/10.0 | June 2024 - June 2026

SKILLS:
- Data & Analysis: Data Entry, Data Cleaning, Excel (Pivot Tables, VLOOKUP), Tableau, Dashboard Creation, Statistical Analysis
- Programming: Python, SQL, JavaScript, HTML, CSS
- AI & ML: Machine Learning Fundamentals, Computer Vision, Generative AI, Scikit-learn, NumPy, Pandas
- Tools: Git/GitHub, VS Code, Flask

PROJECTS:
1. Smart Business Insights Dashboard: Built interactive dashboard with ML sales prediction
2. AI Chatbot for Office Helpdesk: NLP-based chatbot with Flask backend

CERTIFICATIONS:
- AWS Solutions Architecture Job Simulation
- Python for Data Science (Cognitive class.ai IBM)
- GenAI Powered Data Analytics - Tata x Forage
- Data Analytics Job Simulation - Deloitte x Forage
- Stock market using AI
- Data Analysis with Python (Cognitive class.ai IBM)

Generated from Pranav Mane's Portfolio - ${new Date().toLocaleDateString()}`;
      
      // Create blob and download as .txt file (indicated as resume)
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pranav_Mane_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Resume downloaded successfully!');
    });
  }
  
  // Contact Card Toggle
  const contactToggleBtn = document.getElementById('contactToggleBtn');
  const contactCard = document.getElementById('contactCard');
  const closeContactBtn = document.getElementById('closeContactBtn');
  
  if (contactToggleBtn && contactCard) {
    contactToggleBtn.addEventListener('click', function() {
      contactCard.classList.toggle('hidden');
      if (!contactCard.classList.contains('hidden')) {
        showToast('Contact card opened');
      }
    });
  }
  
  if (closeContactBtn && contactCard) {
    closeContactBtn.addEventListener('click', function() {
      contactCard.classList.add('hidden');
    });
  }
  
  // Close contact card when clicking outside
  window.addEventListener('click', function(e) {
    if (contactCard && !contactCard.classList.contains('hidden')) {
      if (!contactCard.contains(e.target) && e.target !== contactToggleBtn) {
        contactCard.classList.add('hidden');
      }
    }
  });
  
  // Add hover animation effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.card, .skill-category, .project-card, .cert-item');
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'none';
    observer.observe(el);
  });
  
  // Override style for observed elements
  const style = document.createElement('style');
  style.textContent = `
    .card, .skill-category, .project-card, .cert-item {
      opacity: 0;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Function to show toast notifications
  function showToast(message) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastMsg';
      toast.className = 'toast-message';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Add smooth scrolling for anchor links if any
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Add floating animation to card icons
  const icons = document.querySelectorAll('.card-icon, .project-icon');
  icons.forEach(icon => {
    icon.style.animation = 'floatIcon 3s ease-in-out infinite';
  });
  
  const floatStyle = document.createElement('style');
  floatStyle.textContent = `
    @keyframes floatIcon {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
  `;
  document.head.appendChild(floatStyle);
  
  console.log('Portfolio fully loaded and interactive!');
});

// Add resume download alternative in case of any issues
window.showToastMessage = function(message) {
  const toast = document.getElementById('toastMsg');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
};