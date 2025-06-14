// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7A0JxXYHnzQ_LzDBB5SmXbKl-bCv2ZPI",
  authDomain: "langgov-bf3b8.firebaseapp.com", 
  projectId: "langgov-bf3b8",
  storageBucket: "langgov-bf3b8.firebasestorage.app",
  messagingSenderId: "240928957703",
  appId: "1:240928957703:web:b2e50595e71a2ec966d1a2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const translations = {
        en: {
            menu: {
                home: "Home",
                about: "About Us",
                services: "Services",
                contact: "Contact Us"
            }
        },
        fr: {
            menu: {
                home: "Accueil",
                about: "À Propos",
                services: "Services",
                contact: "Nous Contacter"
            }
        }
    };

    // Initialize language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Add initial language display function
    function setInitialLanguage(lang) {
        // Set the correct button as active
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Hide non-selected language elements
        document.querySelectorAll('.english, .french').forEach(el => {
            if (lang === 'en') {
                el.style.display = el.classList.contains('english') ? 'block' : 'none';
            } else {
                el.style.display = el.classList.contains('french') ? 'block' : 'none';
            }
        });

        // Update navigation menu
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                switch(true) {
                    case href.includes('#hero'):
                        link.textContent = translations[lang].menu.home;
                        break;
                    case href.includes('#about'):
                        link.textContent = translations[lang].menu.about;
                        break;
                    case href.includes('#services'):
                        link.textContent = translations[lang].menu.services;
                        break;
                    case href.includes('#footer'):
                        link.textContent = translations[lang].menu.contact;
                        break;
                }
            } else {
                switch(true) {
                    case link.textContent.toLowerCase().includes('home') || 
                         link.textContent.toLowerCase().includes('accueil'):
                        link.textContent = translations[lang].menu.home;
                        break;
                    case link.textContent.toLowerCase().includes('about') || 
                         link.textContent.toLowerCase().includes('à propos'):
                        link.textContent = translations[lang].menu.about;
                        break;
                    case link.textContent.toLowerCase().includes('services'):
                        link.textContent = translations[lang].menu.services;
                        break;
                    case link.textContent.toLowerCase().includes('contact'):
                        link.textContent = translations[lang].menu.contact;
                        break;
                }
            }
        });
    }

    // Call setInitialLanguage immediately when the page loads
    setInitialLanguage(savedLanguage);

    // Language button click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('preferredLanguage', lang);
            langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            setInitialLanguage(lang);
        });
    });

    // Interactive elements functionality
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const closeModalBtn = document.querySelector('.close-modal');

    function showModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Log terminology bank usage
    document.querySelectorAll('.content-item, .download-option').forEach(item => {
        item.addEventListener('click', function() {
            const usageData = {
                action: this.textContent.trim(),
                accessDate: firebase.firestore.FieldValue.serverTimestamp(),
                userId: auth.currentUser ? auth.currentUser.uid : 'anonymous'
            };

            db.collection('terminology_usage').add(usageData)
                .then(docRef => {
                    console.log('Usage logged with ID: ', docRef.id);
                })
                .catch(error => {
                    console.error('Error logging usage: ', error);
                });

            showModal();
        });
    });

    closeModalBtn.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);
});