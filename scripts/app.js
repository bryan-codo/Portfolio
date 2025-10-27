// scripts/app.js
const { useState, useEffect } = React;

function App() {
    const [activeSection, setActiveSection] = useState('home');
    const [navbarScrolled, setNavbarScrolled] = useState(false);
    
    const projects = [
        {
            id: 1,
            title: "E-commerce Store",
            description: "Full-stack e-commerce platform with React, Node.js, and MongoDB. Features user authentication, payment processing, and admin dashboard.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
            github: "#",
            demo: "#"
        },
        {
            id: 2,
            title: "Task Manager Pro",
            description: "Productivity app with drag-and-drop functionality, real-time updates, and team collaboration features. Built with React and Firebase.",
            technologies: ["React", "Firebase", "CSS3", "Context API"],
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Real-time weather application with location-based forecasts and interactive charts. Features geolocation and multiple data sources.",
            technologies: ["JavaScript", "API Integration", "Chart.js", "Geolocation"],
            github: "#",
            demo: "#"
        }
    ];

    const skills = [
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "Python", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "HTML/CSS", level: 95 },
        { name: "SQL", level: 70 }
    ];

    // Handle scroll for navbar background
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setNavbarScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return React.createElement('div', { className: 'App' },
        React.createElement(Navigation, { 
            activeSection: activeSection, 
            setActiveSection: setActiveSection,
            scrolled: navbarScrolled
        }),
        activeSection === 'home' && React.createElement(HeroSection, { setActiveSection: setActiveSection }),
        activeSection === 'about' && React.createElement(AboutSection, { skills: skills }),
        activeSection === 'projects' && React.createElement(ProjectsSection, { projects: projects }),
        activeSection === 'contact' && React.createElement(ContactSection)
    );
}

function Navigation({ activeSection, setActiveSection, scrolled }) {
    return React.createElement('nav', { className: `navbar ${scrolled ? 'scrolled' : ''}` },
        React.createElement('div', { className: 'nav-brand' }, 'John Developer'),
        React.createElement('ul', { className: 'nav-links' },
            ['home', 'about', 'projects', 'contact'].map(section =>
                React.createElement('li', { key: section },
                    React.createElement('button', {
                        className: activeSection === section ? 'active' : '',
                        onClick: () => setActiveSection(section)
                    }, section.charAt(0).toUpperCase() + section.slice(1))
                )
            )
        )
    );
}

function HeroSection({ setActiveSection }) {
    const handleClick = () => {
        console.log('Button clicked!');
        setActiveSection('projects');
    };

    return React.createElement('section', { className: 'hero' },
        React.createElement('div', { className: 'hero-content' },
            React.createElement('h1', null, 'Hi, I\'m John Developer'),
            React.createElement('h2', null, 'Full-Stack Developer & UI/UX Enthusiast'),
            React.createElement('p', null, 'I create beautiful, functional web applications using modern technologies'),
            React.createElement('button', {
                className: 'cta-button btn btn-primary',
                onClick: handleClick
            }, 'View My Work')
        )
    );
}

function AboutSection({ skills }) {
    return React.createElement('section', { className: 'about' },
        React.createElement('h2', null, 'About Me'),
        React.createElement('div', { className: 'about-content container' },
            React.createElement('div', { className: 'about-text' },
                React.createElement('p', null, 
                    'I\'m a passionate full-stack developer with expertise in creating responsive, mobile-first web applications. I specialize in modern technologies like React, Node.js, and Python.'
                )
            ),
            React.createElement('div', { className: 'skills' },
                React.createElement('h3', null, 'Technical Skills'),
                skills.map(skill =>
                    React.createElement('div', { key: skill.name, className: 'skill-item' },
                        React.createElement('span', null, skill.name),
                        React.createElement('div', { className: 'skill-bar' },
                            React.createElement('div', { 
                                className: 'skill-progress',
                                style: { width: `${skill.level}%` }
                            })
                        )
                    )
                )
            )
        )
    );
}

function ProjectsSection({ projects }) {
    return React.createElement('section', { className: 'projects' },
        React.createElement('h2', null, 'My Projects'),
        React.createElement('div', { className: 'projects-grid container' },
            projects.map(project =>
                React.createElement('div', { key: project.id, className: 'project-card fade-in-up' },
                    React.createElement('h3', null, project.title),
                    React.createElement('p', null, project.description),
                    React.createElement('div', { className: 'tech-tags' },
                        project.technologies.map(tech =>
                            React.createElement('span', { key: tech, className: 'tech-tag' }, tech)
                        )
                    ),
                    React.createElement('div', { className: 'project-links' },
                        React.createElement('a', { 
                            href: project.github, 
                            target: '_blank', 
                            rel: 'noopener noreferrer' 
                        }, 'GitHub'),
                        React.createElement('a', { 
                            href: project.demo, 
                            target: '_blank', 
                            rel: 'noopener noreferrer' 
                        }, 'Live Demo')
                    )
                )
            )
        )
    );
}

function ContactSection() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        message: '' 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return React.createElement('section', { className: 'contact' },
        React.createElement('h2', null, 'Get In Touch'),
        React.createElement('div', { className: 'contact-content container' },
            React.createElement('form', { onSubmit: handleSubmit, className: 'contact-form' },
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Your Name',
                    value: formData.name,
                    onChange: (e) => setFormData({...formData, name: e.target.value}),
                    required: true
                }),
                React.createElement('input', {
                    type: 'email',
                    placeholder: 'Your Email',
                    value: formData.email,
                    onChange: (e) => setFormData({...formData, email: e.target.value}),
                    required: true
                }),
                React.createElement('textarea', {
                    placeholder: 'Your Message',
                    value: formData.message,
                    onChange: (e) => setFormData({...formData, message: e.target.value}),
                    required: true
                }),
                React.createElement('button', { type: 'submit' }, 'Send Message')
            )
        )
    );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));