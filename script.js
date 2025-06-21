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
const storage = firebase.storage();

// Initialize Firebase Auth
const provider = new firebase.auth.GoogleAuthProvider();

// Create account modal HTML structure with user type selection
const accountModal = `
<div id="accountModal" class="modal">
    <div class="modal-content">
        <button class="close-modal">&times;</button>
        <div class="modal-body">
            <div class="video-carousel">
                <video id="carouselVideo" autoplay muted>
                    
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="form-section">
                <h2>Join LangGov</h2>
                <p>Create your account to access all features</p>
                
<div class="account-type-selection">
    <h3>Select Account Type</h3>
    <div class="type-options">
        <label class="type-option">
            <i class="fas fa-landmark type-icon"></i>
            <div class="type-content">
                <span class="type-label">Administrative</span>
                <span class="type-description">For government and administrative staff</span>
            </div>
        </label>
        <label class="type-option">
            <i class="fas fa-user-tie type-icon"></i>
            <div class="type-content">
                <span class="type-label">Employee</span>
                <span class="type-description">For company employees and individuals</span>
            </div>
        </label>
    </div>
    <button id="googleSignIn" class="google-btn" disabled>
        <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20">
        Continue with Google
    </button>
</div>
            </div>
        </div>
    </div>
</div>
`;

// Profile information modal
const profileInfoModal = `
<div id="profileInfoModal" class="modal">
    <div class="modal-content">
        <button class="close-modal">&times;</button>
        <h2>Complete Your Profile</h2>
        <form id="profileForm" class="profile-form">
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" required>
            </div>
            <div class="form-group">
                <label for="dateOfBirth">Date of Birth</label>
                <input type="date" id="dateOfBirth" required>
            </div>
            <button type="submit" class="submit-btn">
                <i class="fas fa-check-circle"></i> Complete Profile
            </button>
        </form>
    </div>
</div>
`;

// Update profile modal with enhanced layout
const profileModal = `
<div id="profileModal" class="modal">
    <div class="modal-content">
        <button class="close-modal">&times;</button>
        <h2>User Profile</h2>
        <div class="profile-info">
            <div class="user-avatar">
                <img id="userAvatar" src="" alt="User avatar">
            </div>
            <div class="user-details">
                <h3 id="userName"></h3>
                <p><i class="fas fa-envelope"></i> <span id="userEmail"></span></p>
                <p><i class="fas fa-user-tag"></i> <span id="userType"></span></p>
                <p><i class="fas fa-calendar-alt"></i> <span id="userDOB"></span></p>
            </div>
        </div>
        <button id="signOut" class="action-btn">
            <i class="fas fa-sign-out-alt"></i> Sign Out
        </button>
    </div>
</div>
`;

// Add modals to the body
document.body.insertAdjacentHTML('beforeend', accountModal);
document.body.insertAdjacentHTML('beforeend', profileInfoModal);
document.body.insertAdjacentHTML('beforeend', profileModal);

// Add additional styles
const additionalStyles = `
    .modal-body {
        display: flex;
        gap: 0px;
        align-items: stretch;
        height: 570px;  /* Set fixed height */
    }

    .video-carousel {
        width: 360px;
        height: 570px;  /* Match parent height */
        border-radius: 15px 0 0 15px;
        overflow: hidden;
        flex-shrink: 0;
        background: #000;
        position: relative;
    }

    #carouselVideo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .form-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 400px;
        padding: 30px;
        background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
        border-radius: 0 15px 15px 0;
        height: 600px;  /* Match parent height */
    }

    .account-type-selection {
        margin: 20px 0;
        padding: 20px;
        background: linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(74, 124, 89, 0.05) 100%);
        border-radius: 15px;
        border: 1px solid rgba(45, 90, 61, 0.1);
        flex-grow: 1;  /* Take remaining space */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .account-type-selection h3 {
        color: var(--primary-green);
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 30px;
        text-align: center;
    }
.type-options {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.type-option {
    display: flex;
    align-items: center;
    padding: 30px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    flex: 1;
}

    .type-icon {
        font-size: 2.5rem;
        color: var(--primary-green);
        width: 60px;
        text-align: center;
    }

    .type-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .type-option:hover {
        border-color: var(--primary-green);
        background: linear-gradient(135deg, #f2fbe1 0%, #e8f5e8 100%);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(45, 90, 61, 0.15);
    }

    .type-option.selected {
        border-color: var(--primary-green);
        background: linear-gradient(135deg, #f2fbe1 0%, #e8f5e8 100%);
        box-shadow: 0 8px 25px rgba(45, 90, 61, 0.15);
    }

    .type-option.selected .type-icon {
        transform: scale(1.1);
    }

    .type-label {
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--primary-green);
        transition: color 0.3s ease;
    }

    .type-description {
        font-size: 0.95rem;
        color: var(--text-medium);
        line-height: 1.4;
    }

    .modal-content {
        width: 900px;
        max-width: 95vw;
        padding: 0;
        border-radius: 15px;
        overflow: hidden;
        background: transparent;
        height: auto;
    }

    /* Profile Information Form Modal */
    #profileInfoModal .modal-content {
        background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 
            0 20px 60px rgba(45, 90, 61, 0.15),
            0 8px 25px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes modalSlideUp {
        0% {
            opacity: 0;
            transform: translate(-50%, 20%);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }

    .profile-form {
        display: grid;
        gap: 20px;
    }

    .form-group {
        position: relative;
        overflow: hidden;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        color: var(--primary-green);
        font-weight: 600;
        transform: translateY(0);
        transition: transform 0.3s ease;
    }

    .form-group input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid rgba(45, 90, 61, 0.2);
        border-radius: 10px;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.9);
        transition: all 0.3s ease;
    }

    .form-group input:focus {
        border-color: var(--primary-green);
        box-shadow: 0 4px 12px rgba(45, 90, 61, 0.1);
        outline: none;
    }

    .form-group input:focus + label {
        transform: translateY(-25px);
    }

    .submit-btn {
        background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 30px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
        box-shadow: 0 4px 15px rgba(45, 90, 61, 0.2);
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(45, 90, 61, 0.3);
    }

    /* Profile Display Modal */
    #profileModal .modal-content {
        background: linear-gradient(145deg, #ffffff 0%, #f8fffe 100%);
        padding: 40px;
        border-radius: 20px;
        box-shadow: 
            0 20px 60px rgba(45, 90, 61, 0.15),
            0 8px 25px rgba(0, 0, 0, 0.1);
        animation: profileSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes profileSlideIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    .profile-info {
        text-align: center;
        padding: 20px;
    }

    .user-avatar {
        width: 120px;
        height: 120px;
        margin: 0 auto 20px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid var(--primary-green);
        box-shadow: 0 8px 25px rgba(45, 90, 61, 0.2);
        transition: transform 0.3s ease;
    }

    .user-avatar:hover {
        transform: scale(1.05);
    }

    .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .user-details {
        margin-top: 25px;
    }

    .user-details h3 {
        color: var(--primary-green);
        font-size: 1.8rem;
        margin-bottom: 10px;
    }

    .user-details p {
        color: var(--text-medium);
        margin: 8px 0;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .user-details p i {
        color: var(--primary-green);
    }

    #signOut {
        background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 30px;
        box-shadow: 0 4px 15px rgba(45, 90, 61, 0.2);
    }

    #signOut:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(45, 90, 61, 0.3);
    }

    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(45, 90, 61, 0.1);
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary-green);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .close-modal:hover {
        background: var(--primary-green);
        color: white;
        transform: rotate(90deg) scale(1.1);
    }

    /* Update existing styles */
    @media (max-width: 768px) {
        .type-options {
            flex-direction: column;
        }
        
        .type-option {
            width: 100%;
        }
        
        .modal-body {
            flex-direction: column;
            height: auto;
        }
        
        .video-carousel {
            width: 100%;
            height: 300px;
            border-radius: 15px 15px 0 0;
        }
        
        .form-section {
            min-width: auto;
            border-radius: 0 0 15px 15px;
            height: auto;
            min-height: 500px;
        }
        
        .modal-content {
            width: 100%;
            padding: 20px;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Authentication state observer
auth.onAuthStateChanged((user) => {
    const userIcon = document.querySelector('.fa-user').parentElement;
    const startJoiningBtn = document.querySelector('.cta .btn-primary');
    const ctaTitle = document.querySelector('.cta-title');
    const ctaSubtitle = document.querySelector('.cta-subtitle');
    
    if (user) {
        // User is signed in
        userIcon.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width: 24px; height: 24px; border-radius: 50%;">`;
        
        // Clear any live session data when user state changes
        sessionStorage.removeItem('redirectToLive');
        sessionStorage.removeItem('isInLiveSession');
        
        if (startJoiningBtn) {
            startJoiningBtn.style.display = 'none';
        }
        
        // Update CTA text for logged in users
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        if (ctaTitle && ctaSubtitle) {
            ctaTitle.textContent = (currentLang === 'en') ? 'Welcome to Your Language Transition Journey' : 'Bienvenue dans Votre Parcours de Transition Linguistique';
            ctaSubtitle.innerHTML = (currentLang === 'en') ? 'Explore our services and start your transformation today' : 'Explorez nos services et commencez votre transformation dès aujourd\'hui';
        }
    } else {
        // User is signed out
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
        
        // Clear live session data when user signs out
        sessionStorage.removeItem('redirectToLive');
        sessionStorage.removeItem('isInLiveSession');
        sessionStorage.removeItem('currentLiveId');
        
        if (startJoiningBtn) {
            startJoiningBtn.style.display = 'block';
        }
        
        // Restore original CTA text
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        if (ctaTitle && ctaSubtitle) {
            const content = translations[currentLang];
            ctaTitle.innerHTML = content.ctaTitle;
            if (content.ctaKeywords) {
                let keywordsHTML = content.ctaKeywords.map((word, index) => `<span class="keyword" style="animation-delay: ${index * 0.2 + 0.5}s">${word}</span>`).join(' &bull; ');
                ctaSubtitle.innerHTML = `${content.ctaSubtitle}<br><div class="keywords-container">${keywordsHTML}</div>`;
            } else {
                ctaSubtitle.textContent = content.ctaSubtitle;
            }
        }
    }
});

// Update the language toggle handler to also update CTA text based on auth state
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            const user = auth.currentUser;
            const ctaTitle = document.querySelector('.cta-title');
            const ctaSubtitle = document.querySelector('.cta-subtitle');
            
            if (ctaTitle && ctaSubtitle) {
                if (user) {
                    // Logged in text
                    if (lang === 'en') {
                        ctaTitle.textContent = 'Welcome to Your Language Transition Journey';
                        ctaSubtitle.textContent = 'Explore our services and start your transformation today';
                    } else {
                        ctaTitle.textContent = 'Bienvenue dans Votre Parcours de Transition Linguistique';
                        ctaSubtitle.textContent = 'Explorez nos services et commencez votre transformation dès aujourd\'hui';
                    }
                } else {
                    // Logged out text
                    const content = translations[lang];
                    if (content) {
                        ctaTitle.innerHTML = content.ctaTitle;
                        if (content.ctaKeywords) {
                            let keywordsHTML = content.ctaKeywords.map((word, index) => `<span class="keyword" style="animation-delay: ${index * 0.2 + 0.5}s">${word}</span>`).join(' &bull; ');
                            ctaSubtitle.innerHTML = `${content.ctaSubtitle}<br><div class="keywords-container">${keywordsHTML}</div>`;
                        } else {
                            ctaSubtitle.textContent = content.ctaSubtitle;
                        }
                    }
                }
            }
        });
    });
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const startJoiningBtn = document.querySelector('.cta .btn-primary');
    const userIcon = document.querySelector('.fa-user').parentElement;
    const accountModal = document.getElementById('accountModal');
    const profileModal = document.getElementById('profileModal');
    const profileInfoModal = document.getElementById('profileInfoModal');
    const googleSignInBtn = document.getElementById('googleSignIn');
    const signOutBtn = document.getElementById('signOut');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Account type selection handler
    const typeOptions = document.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', () => {
            typeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('googleSignIn').disabled = false;
        });
    });

    // Start Joining button click handler
    if (startJoiningBtn) {
        startJoiningBtn.addEventListener('click', () => {
            if (!auth.currentUser) {
                accountModal.style.display = 'block';
            }
        });
    }

    // Google Sign In handler - UPDATED
    googleSignInBtn.addEventListener('click', () => {
        const selectedType = document.querySelector('.type-option.selected');
        if (!selectedType) return;

        const accountType = selectedType.querySelector('.type-label').textContent;
        
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;

                // Check both collections for existing user
                return Promise.all([
                    db.collection('admins').doc(user.uid).get(),
                    db.collection('users').doc(user.uid).get()
                ]).then(([adminDoc, userDoc]) => {
                    if (adminDoc.exists || userDoc.exists) {
                        // Get existing account type
                        const existingAccountType = adminDoc.exists ? 
                            adminDoc.data().accountType : userDoc.data().accountType;
                        
                        // If trying to create different account type, sign out and show error
                        if (existingAccountType !== accountType) {
                            return auth.signOut().then(() => {
                                throw new Error(`This email is already associated with a ${existingAccountType} account. Please use a different email or sign in with the existing account type.`);
                            });
                        }
                        
                        // If same account type and user has incomplete profile, show profile form
                        const userData = adminDoc.exists ? adminDoc.data() : userDoc.data();
                        if (!userData.firstName || !userData.lastName || !userData.dateOfBirth) {
                            profileInfoModal.style.display = 'block';
                            accountModal.style.display = 'none';
                            return;
                        }
                        
                        // Account exists and is complete, just close modal
                        accountModal.style.display = 'none';
                        return;
                    }
                    
                    // If no existing account, proceed with account creation
                    const collectionName = accountType === 'Administrative' ? 'admins' : 'users';
                    return db.collection(collectionName).doc(user.uid).set({
                        email: user.email,
                        accountType: accountType,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true }).then(() => {
                        // Show profile info modal for new users
                        profileInfoModal.style.display = 'block';
                        accountModal.style.display = 'none';
                    });
                });
            })
            .catch((error) => {
                console.error('Authentication error:', error);
                
                // Handle different types of errors
                let errorMessage = 'An error occurred during sign in. Please try again.';
                
                if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage = 'Sign in was cancelled. Please try again.';
                } else if (error.code === 'auth/popup-blocked') {
                    errorMessage = 'Pop-up was blocked. Please allow pop-ups and try again.';
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = 'Network error. Please check your connection and try again.';
                } else if (error.message.includes('already associated')) {
                    errorMessage = error.message;
                }
                
                showNotification(errorMessage, 'error');
                
                // Ensure the user icon is reset to default
                const userIcon = document.querySelector('.fa-user').parentElement;
                userIcon.innerHTML = '<i class="fas fa-user"></i>';
                
                // Close modals
                accountModal.style.display = 'none';
            });
    });

    // Profile form submission handler - UPDATED
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // First, get the user's account type
        const user = auth.currentUser;
        if (!user) return;

        // Query both collections to find where the user exists
        Promise.all([
            db.collection('admins').doc(user.uid).get(),
            db.collection('users').doc(user.uid).get()
        ]).then(([adminDoc, userDoc]) => {
            const collectionName = adminDoc.exists ? 'admins' : 'users';
            
            const userData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                dateOfBirth: document.getElementById('dateOfBirth').value,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            return db.collection(collectionName).doc(user.uid).update(userData);
        })
        .then(() => {
            document.getElementById('profileInfoModal').style.display = 'none';
            showProfileModal(); // Show the profile with updated info
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
        });
    });

    // Function to show profile modal with user data - UPDATED
    function showProfileModal() {
        if (auth.currentUser) {
            // Add loading state
            const profileModal = document.getElementById('profileModal');
            const modalContent = profileModal.querySelector('.modal-content');
            
            // Show loading spinner
            modalContent.innerHTML = `
                <button class="close-modal">&times;</button>
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-green);"></i>
                    <p style="margin-top: 15px;">Loading profile...</p>
                </div>
            `;
            profileModal.style.display = 'block';
            
            // Check both collections for the user's data
            Promise.all([
                db.collection('admins').doc(auth.currentUser.uid).get(),
                db.collection('users').doc(auth.currentUser.uid).get()
            ]).then(([adminDoc, userDoc]) => {
                const doc = adminDoc.exists ? adminDoc : userDoc;
                if (doc.exists) {
                    const data = doc.data();
                    
                    // Restore full profile modal content
                    modalContent.innerHTML = `
                        <button class="close-modal">&times;</button>
                        <h2>User Profile</h2>
                        <div class="profile-info">
                            <div class="user-avatar">
                                <img id="userAvatar" src="${auth.currentUser.photoURL}" alt="User avatar">
                            </div>
                            <div class="user-details">
                                <h3 id="userName">${data.firstName} ${data.lastName}</h3>
                                <p><i class="fas fa-envelope"></i> <span id="userEmail">${auth.currentUser.email}</span></p>
                                <p><i class="fas fa-user-tag"></i> <span id="userType">Account Type: ${data.accountType}</span></p>
                                <p><i class="fas fa-calendar-alt"></i> <span id="userDOB">Date of Birth: ${data.dateOfBirth}</span></p>
                            </div>
                        </div>
                        <button id="signOut" class="action-btn">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    `;
                    
                    // Re-attach event listeners
                    const newCloseBtn = modalContent.querySelector('.close-modal');
                    const newSignOutBtn = modalContent.querySelector('#signOut');
                    
                    newCloseBtn.addEventListener('click', () => {
                        profileModal.style.display = 'none';
                    });
                    
                    newSignOutBtn.addEventListener('click', () => {
                        auth.signOut().then(() => {
                            profileModal.style.display = 'none';
                        });
                    });
                } else {
                    // No profile data found
                    modalContent.innerHTML = `
                        <button class="close-modal">&times;</button>
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ff4444;"></i>
                            <h3 style="margin: 15px 0;">Profile Not Found</h3>
                            <p>Please complete your profile setup.</p>
                            <button onclick="this.closest('.modal').style.display='none'; document.getElementById('profileInfoModal').style.display='block';" 
                                    style="margin-top: 15px; padding: 10px 20px; background: var(--primary-green); color: white; border: none; border-radius: 5px; cursor: pointer;">
                                Complete Profile
                            </button>
                        </div>
                    `;
                    
                    const newCloseBtn = modalContent.querySelector('.close-modal');
                    newCloseBtn.addEventListener('click', () => {
                        profileModal.style.display = 'none';
                    });
                }
            }).catch((error) => {
                console.error('Error loading profile:', error);
                
                // Show error state
                modalContent.innerHTML = `
                    <button class="close-modal">&times;</button>
                    <div style="text-align: center; padding: 40px;">
                        <i class="fas fa-wifi" style="font-size: 2rem; color: #ff4444;"></i>
                        <h3 style="margin: 15px 0;">Connection Error</h3>
                        <p>Unable to load profile. Please check your internet connection and try again.</p>
                        <button onclick="location.reload();" 
                                style="margin-top: 15px; padding: 10px 20px; background: var(--primary-green); color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Refresh Page
                        </button>
                    </div>
                `;
                
                const newCloseBtn = modalContent.querySelector('.close-modal');
                newCloseBtn.addEventListener('click', () => {
                    profileModal.style.display = 'none';
                });
                
                showNotification('Unable to load profile. Please check your connection.', 'error');
            });
        }
    }

    // User icon click handler
    userIcon.addEventListener('click', () => {
        if (auth.currentUser) {
            showProfileModal();
        } else {
            accountModal.style.display = 'block';
        }
    });

    // Sign Out handler
    signOutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            profileModal.style.display = 'none';
        });
    });

    // Close modal handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            accountModal.style.display = 'none';
            profileModal.style.display = 'none';
            profileInfoModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
        }
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
        if (e.target === profileInfoModal) {
            profileInfoModal.style.display = 'none';
        }
    });

    // Initialize video carousel
    initializeVideoCarousel();
});

// Add video carousel functionality
function initializeVideoCarousel() {
    const videos = ['vid1.mp4', 'vid2.mp4', 'vid3.mp4'];
    let currentVideoIndex = 0;
    const carouselVideo = document.getElementById('carouselVideo');
   
    if (!carouselVideo) return;
   
    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        const nextVideo = videos[currentVideoIndex];
       
        // Fade out
        carouselVideo.style.opacity = '0.3';
       
        setTimeout(() => {
            carouselVideo.src = nextVideo;
            carouselVideo.load();
            carouselVideo.play().then(() => {
                // Fade in
                carouselVideo.style.opacity = '1';
            }).catch(error => {
                console.log('Video play error:', error);
                carouselVideo.style.opacity = '1';
            });
        }, 300);
    }
   
    // Set up video transition
    carouselVideo.style.transition = 'opacity 0.3s ease';
   
    carouselVideo.addEventListener('ended', () => {
        playNextVideo();
    });
   
    // Handle video load errors
    carouselVideo.addEventListener('error', () => {
        console.log('Video error, trying next video');
        playNextVideo();
    });
   
    // Start with first video
    carouselVideo.src = videos[0];
    carouselVideo.load();
    carouselVideo.play().catch(error => {
        console.log('Initial video play error:', error);
    });
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const translations = {
        en: {
            title: "Supporting Algeria's Administrative Transition",
            highlight: "From French to English",
            subtitle: "Professional language services to facilitate your administrative and business communications",
            learnMore: "Learn More",
            servicesTitle: "LangGov Services",
            service1Title: "Administrative Document Translation",
            service1Desc: "Submit and receive high-quality translations of official documents adapted to administrative standards. This service includes terminology, consistency, translation suggestions, and internal use of AI-supported tools to enhance speed and accuracy.",
            service2Title: "Online English Courses for Officials",
            service2Desc: "Access customized English learning paths designed for public service professionals.",
            service3Title: "International Correspondence Support",
            service3Desc: "Get assistance in drafting and reviewing international administrative emails and letters",
            service4Title: "Language Transition Consulting",
            service4Desc: "Receive strategic guidance and planning tools to lead a smooth linguistic shift in your department",
            service5Title: "Terminology Bank",
            service5Desc: "Search official bilingual terms to ensure accuracy and consistency in translation",
            ctaTitle: "Strengthening Algeria for Global Competitiveness",
            ctaSubtitle: "A digital solution for introducing English into Algerian administration.",
            ctaKeywords: ["Training", "Translation", "Monitoring"],
            startJourney: "Start Joining",
            privacyTitle: "Privacy Policy",
            lastUpdated: "Last updated: June 4, 2025",
            introduction: "Introduction",
            introText: "LangGov (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our language transition services and visit our website.",
            termsTitle: "Terms of Service",
            acceptance: "1. Acceptance of Terms",
            acceptanceText: "By accessing and using LangGov's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.",
            aboutTitle: "A Linguistic platform for Transitioning from French to English in Algerian administration",
            aboutWhatIsLangGov: "What is LangGov?",
            aboutIntro: "Algerian administrations are called upon to undergo a linguistic transition from French to English. This change, key to modernization, is slowed down by a lack of tools, training, and support.",
            aboutMissionTitle: "Mission:",
            aboutMissionText: "Our goal is to provide a comprehensive platform along with tailored training programs, adapted to the specific needs of each public institution regardless of its size or function to ensure an effective, sustainable, and well-structured transition to English.",
            aboutVisionTitle: "Vision:",
            aboutVisionText: "Make LangGov a key player to Support the modernization of Algerian administration through a smooth shift to English, promoting an open and globally connected administrative culture",
            docTransTitle: "Administrative Document Translation",
            selectDoc: "Select Document",
            dragDrop: "Drag and drop your file here or click to browse",
            supportedFormats: "Supported formats: Text files, PDF, Word, Excel",
            selectLang: "Select Language",
            english: "English",
            french: "French",
            previewTrans: "Preview Translation",
            previewPlaceholder: "Your translated document will appear here...",
            aiPowered: "AI-Powered Translation",
            aiAssist: "Our AI tools assist for higher accuracy and speed",
            submitBtn: "Submit Translation Request",
            courseTitle: "Online English Courses for Officials",
            courseSubtitle: "Interactive Language Training for Public Officials",
            courseCategories: "Course Categories",
            flexibleSchedule: "Flexible Schedule",
            trackCertify: "Track and Certify",
            flexibleDesc: "Attend Live Online sessions or access recorded Lessons 24/7",
            trackDesc: "Monitor your progress and download your certificate upon completion",
            beginners: "Beginners",
            intermediate: "Intermediate",
            legalAdmin: "Legal/Administrative English",
            recordedLessons: "Recorded Lessons",
            liveOnline: "Live Online",
            progress: "Progress Tracking",
            certification: "Certification",
            boxTitles: {
                beginners: "Beginners",
                intermediate: "Intermediate",
                legalAdmin: "Legal/Administrative English",
                liveOnline: "Live Online",
                recordedLessons: "Recorded Lessons",
                progress: "Your Progress",
                certificate: "Certificate"
            },
            menu: {
                home: "Home",
                about: "About Us",
                services: "Services", 
                contact: "Contact Us",
                people: "People"
            },
            goButton: "Go"
        },
        fr: {
            title: "Soutenir la Transition Administrative de l'Algérie",
            highlight: "Du Français vers l'Anglais",
            subtitle: "Services linguistiques professionnels pour faciliter vos communications administratives et commerciales",
            learnMore: "En Savoir Plus",
            servicesTitle: "Services LangGov",
            service1Title: "Traduction de Documents Administratifs",
            service1Desc: "Soumettez et recevez des traductions de haute qualité de documents officiels adaptés aux normes administratives. Ce service comprend la terminologie, la cohérence, des suggestions de traduction et l'utilisation interne d'outils assistés par l'IA pour améliorer la rapidité et la précision.",
            service2Title: "Cours d'Anglais en Ligne pour Fonctionnaires",
            service2Desc: "Accédez à des parcours d'apprentissage personnalisés conçus pour les professionnels de la fonction publique.",
            service3Title: "Support de Correspondance Internationale",
            service3Desc: "Obtenez de l'aide pour la rédaction et la révision d'e-mails et de lettres administratives internationales",
            service4Title: "Conseil en Transition Linguistique",
            service4Desc: "Recevez des conseils stratégiques et des outils de planification pour mener une transition linguistique en douceur dans votre département",
            service5Title: "Banque de Terminologie",
            service5Desc: "Recherchez des termes bilingues officiels pour assurer l'exactitude et la cohérence de la traduction",
            ctaTitle: "Renforcer l'Algérie pour la Compétitivité Mondiale",
            ctaSubtitle: "Une solution digitale pour introduire l'anglais dans l'administration algérienne.",
            ctaKeywords: ["Formation", "Traduction", "Suivi"],
            startJourney: "Commencez à Rejoindre",
            privacyTitle: "Politique de Confidentialité",
            lastUpdated: "Dernière mise à jour: 4 juin 2025",
            introduction: "Introduction",
            introText: "LangGov (\"nous\", \"notre\" ou \"nos\") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez nos services de transition linguistique et visitez notre site web.",
            termsTitle: "Conditions d'Utilisation",
            acceptance: "1. Acceptation des Conditions",
            acceptanceText: "En accédant et en utilisant les services de LangGov, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne pouvez pas accéder à nos services.",
            aboutTitle: "Une plateforme linguistique pour la transition du français vers l'anglais dans l'administration algérienne",
            aboutWhatIsLangGov: "Qu'est-ce que LangGov ?",
            aboutIntro: "Les administrations algériennes sont appelées à opérer une transition linguistique du français vers l'anglais. Ce changement, clé de la modernisation, est freiné par un manque d'outils, de formation et d'accompagnement.",
            aboutMissionTitle: "Mission :",
            aboutMissionText: "Notre objectif est de fournir une plateforme complète ainsi que des programmes de formation sur mesure, adaptés aux besoins spécifiques de chaque institution publique, quelle que soit sa taille ou sa fonction, afin d'assurer une transition efficace, durable et bien structurée vers l'anglais.",
            aboutVisionTitle: "Vision :",
            aboutVisionText: "Faire de LangGov un acteur clé pour soutenir la modernisation de l'administration algérienne à travers un passage en douceur à l'anglais, favorisant une culture administrative ouverte et connectée au monde.",
            docTransTitle: "Traduction de Documents Administratifs",
            selectDoc: "Sélectionner le Document",
            dragDrop: "Glissez et déposez votre fichier ici ou cliquez pour parcourir",
            supportedFormats: "Formats pris en charge : Fichiers texte, PDF, Word, Excel",
            selectLang: "Sélectionner la Langue",
            english: "Anglais",
            french: "Français",
            previewTrans: "Aperçu de la Traduction",
            previewPlaceholder: "Votre document traduit apparaîtra ici...",
            aiPowered: "Traduction Assistée par IA",
            aiAssist: "Nos outils d'IA assistent pour une meilleure précision et rapidité",
            submitBtn: "Soumettre la Demande de Traduction",
            courseTitle: "Cours d'Anglais en Ligne pour Fonctionnaires",
            courseSubtitle: "Formation Linguistique Interactive pour les Fonctionnaires",
            courseCategories: "Catégories de Cours",
            flexibleSchedule: "Horaire Flexible",
            trackCertify: "Suivi et Certification",
            flexibleDesc: "Assistez aux sessions en direct ou accédez aux leçons enregistrées 24h/24 et 7j/7",
            trackDesc: "Suivez vos progrès et téléchargez votre certificat une fois terminé",
            beginners: "Débutants",
            intermediate: "Intermédiaire",
            legalAdmin: "Anglais Juridique/Administratif",
            recordedLessons: "Leçons Enregistrées",
            liveOnline: "En Direct",
            progress: "Suivi des Progrès",
            certification: "Certification",
            boxTitles: {
                beginners: "Débutants",
                intermediate: "Intermédiaire",
                legalAdmin: "Anglais Juridique/Administratif",
                liveOnline: "En Direct",
                recordedLessons: "Leçons Enregistrées",
                progress: "Suivi des Progrès",
                certificate: "Certificat"
            },
            menu: {
                home: "Accueil",
                about: "À Propos",
                services: "Services",
                contact: "Nous Contacter",
                people: "Notre Équipe"
            },
            goButton: "Aller"
        }
    };

    // Add language persistence using localStorage
    function setLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        updateContent(lang);
    }

    // Initialize language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    // Update language button click handlers
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });

    // Modal functionality
    const modal = document.querySelector('.welcome-modal');
    const overlay = document.querySelector('.modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    const learnMoreBtn = document.querySelector('.btn-secondary');

    function showModal() {
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (learnMoreBtn) learnMoreBtn.addEventListener('click', showModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    if (overlay) overlay.addEventListener('click', hideModal);

    function updateContent(lang) {
        const content = translations[lang];
        
        // Update navigation menu
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const text = link.textContent.trim().toLowerCase();
            if (text.includes('home') || text.includes('accueil')) {
                link.textContent = content.menu.home;
            } else if (text.includes('about') || text.includes('à propos')) {
                link.textContent = content.menu.about;
            } else if (text.includes('services')) {
                link.textContent = content.menu.services;
            } else if (text.includes('contact') || text.includes('nous contacter')) {
                link.textContent = content.menu.contact;
            } else if (text.includes('people') || text.includes('notre équipe')) {
                link.textContent = content.menu.people;
            }
        });
        
        const isTermsPage = document.querySelector('.terms-content');
        const isPrivacyPage = document.querySelector('.policy-content');
        const isDocTransPage = window.location.pathname.includes('document-translation.html');
        const isOnlineCoursesPage = window.location.pathname.includes('online-courses.html');
        const isServicesPage = window.location.pathname.includes('services.html');
        const isAboutPage = window.location.pathname.includes('about.html');
        
        if (isTermsPage) {
            // Update terms of service content
            const title = document.querySelector('.terms-content h1');
            const lastUpdated = document.querySelector('.terms-content p');
            const acceptanceTitle = document.querySelector('.terms-content h2');
            const acceptanceText = document.querySelector('.terms-content p:nth-of-type(2)');
            
            if (title) title.textContent = content.termsTitle;
            if (lastUpdated) lastUpdated.textContent = content.lastUpdated;
            if (acceptanceTitle) acceptanceTitle.textContent = content.acceptance;
            if (acceptanceText) acceptanceText.textContent = content.acceptanceText;
            // Add other terms content updates as needed
        } else if (isPrivacyPage) {
            // Update privacy policy content
            const title = document.querySelector('.policy-content h1');
            const lastUpdated = document.querySelector('.policy-content p');
            const introTitle = document.querySelector('.policy-content h2');
            const introText = document.querySelector('.policy-content p:nth-of-type(2)');
            
            if (title) title.textContent = content.privacyTitle;
            if (lastUpdated) lastUpdated.textContent = content.lastUpdated;
            if (introTitle) introTitle.textContent = content.introduction;
            if (introText) introText.textContent = content.introText;
            // Add other privacy policy content updates
        } else if (isOnlineCoursesPage) {
            // Update online courses page content
            const title = document.querySelector('.courses-title');
            const subtitle = document.querySelector('.courses-subtitle');
            const categories = document.querySelector('.course-column:nth-child(1) .column-title');
            const schedule = document.querySelector('.course-column:nth-child(2) .column-title');
            const track = document.querySelector('.course-column:nth-child(3) .column-title');
            const flexDesc = document.querySelector('.course-column:nth-child(2) .column-description');
            const trackDesc = document.querySelector('.course-column:nth-child(3) .column-description');
            
            const courseItems = document.querySelectorAll('.course-item');
            
            function updateCoursesContent(lang) {
                const content = translations[lang];
                
                if (title) title.textContent = content.courseTitle;
                if (subtitle) subtitle.textContent = content.courseSubtitle;
                if (categories) categories.textContent = content.courseCategories;
                if (schedule) schedule.textContent = content.flexibleSchedule;
                if (track) track.textContent = content.trackCertify;
                if (flexDesc) flexDesc.textContent = content.flexibleDesc;
                if (trackDesc) trackDesc.textContent = content.trackDesc;
                
                if (courseItems.length >= 7) {
                    courseItems[0].textContent = content.beginners;
                    courseItems[1].textContent = content.intermediate;
                    courseItems[2].textContent = content.legalAdmin;
                    courseItems[3].textContent = content.recordedLessons;
                    courseItems[4].textContent = content.liveOnline;
                    courseItems[5].textContent = content.progress;
                    courseItems[6].textContent = content.certification;
                }
            }
            
            // Initialize with saved language
            const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
            updateCoursesContent(savedLanguage);
        } else if (isServicesPage || isAboutPage) {
            // Update services and about pages content
            const sectionTitle = document.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.textContent = content.servicesTitle;
            }
            
            const aboutTitle = document.querySelector('.about-title');
            if (aboutTitle) {
                aboutTitle.textContent = content.aboutTitle;
            }
            
            if (isAboutPage) {
                const aboutWhatIs = document.querySelector('#aboutWhatIsLangGov');
                if (aboutWhatIs) aboutWhatIs.textContent = content.aboutWhatIsLangGov;

                const aboutIntro = document.querySelector('#aboutIntro');
                if (aboutIntro) aboutIntro.textContent = content.aboutIntro;

                const aboutMissionTitle = document.querySelector('#aboutMissionTitle');
                if (aboutMissionTitle) aboutMissionTitle.textContent = content.aboutMissionTitle;
                
                const aboutMissionText = document.querySelector('#aboutMissionText');
                if (aboutMissionText) aboutMissionText.textContent = content.aboutMissionText;

                const aboutVisionTitle = document.querySelector('#aboutVisionTitle');
                if (aboutVisionTitle) aboutVisionTitle.textContent = content.aboutVisionTitle;
                
                const aboutVisionText = document.querySelector('#aboutVisionText');
                if (aboutVisionText) aboutVisionText.textContent = content.aboutVisionText;
            }
            
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                const title = card.querySelector('.service-title');
                const desc = card.querySelector('.service-description');
                const btn = card.querySelector('.service-btn');
                
                if (title && desc && btn) {
                    switch(index) {
                        case 0:
                            title.textContent = content.service1Title;
                            desc.textContent = content.service1Desc;
                            break;
                        case 1:
                            title.textContent = content.service2Title;
                            desc.textContent = content.service2Desc;
                            break;
                        case 2:
                            title.textContent = content.service3Title;
                            desc.textContent = content.service3Desc;
                            break;
                        case 3:
                            title.textContent = content.service4Title;
                            desc.textContent = content.service4Desc;
                            break;
                        case 4:
                            title.textContent = content.service5Title;
                            desc.textContent = content.service5Desc;
                            break;
                    }
                    btn.textContent = content.goButton;
                }
            });
        } else {
            // Update about title
            const aboutTitle = document.querySelector('.about-title');
            if (aboutTitle) {
                aboutTitle.textContent = content.aboutTitle;
            }

            // Existing homepage content updates
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.innerHTML = `${content.title}<br><span class="highlight">${content.highlight}</span>`;
            }
            
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
                heroSubtitle.textContent = content.subtitle;
            }
            
            const learnMoreBtns = document.querySelectorAll('.btn-secondary');
            learnMoreBtns.forEach(btn => {
                if (btn) btn.textContent = content.learnMore;
            });
            
            // Update CTA section
            const ctaTitle = document.querySelector('.cta-title');
            const ctaSubtitle = document.querySelector('.cta-subtitle');
            const ctaButton = document.querySelector('.cta .btn-primary');
            
            const user = auth.currentUser;

            if (user) {
                // Logged-in user
                const loggedInTitle = (lang === 'en') ? 'Welcome to Your Language Transition Journey' : 'Bienvenue dans Votre Parcours de Transition Linguistique';
                const loggedInSubtitle = (lang === 'en') ? 'Explore our services and start your transformation today' : 'Explorez nos services et commencez votre transformation dès aujourd\'hui';
                if(ctaTitle) ctaTitle.textContent = loggedInTitle;
                if(ctaSubtitle) ctaSubtitle.innerHTML = loggedInSubtitle;
            } else {
                // Logged-out user
                if (ctaTitle) ctaTitle.textContent = content.ctaTitle;
                if (ctaSubtitle && content.ctaKeywords) {
                    let keywordsHTML = content.ctaKeywords.map((word, index) => `<span class="keyword" style="animation-delay: ${index * 0.2 + 0.5}s">${word}</span>`).join(' &bull; ');
                    ctaSubtitle.innerHTML = `${content.ctaSubtitle}<br><div class="keywords-container">${keywordsHTML}</div>`;
                } else if (ctaSubtitle) {
                    ctaSubtitle.textContent = content.ctaSubtitle;
                }
            }
            
            if (ctaButton) ctaButton.textContent = content.startJourney;
        }
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100; // Offset for the fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe about columns
    document.querySelectorAll('.about-column').forEach((column, index) => {
        observer.observe(column);
    });

    // Online courses page functionality
    if (window.location.pathname.includes('online-courses.html')) {
        // Update language toggle click handlers for online courses page
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.dataset.lang;
                setLanguage(lang);
                updateCoursesContent(lang);  // Add this line to update content on button click
            });
        });

        function updateCoursesContent(lang) {
            const content = translations[lang];
            
            // Update main titles
            const title = document.querySelector('.courses-title');
            const subtitle = document.querySelector('.courses-subtitle');
            const categories = document.querySelector('.course-column:nth-child(1) .column-title');
            const schedule = document.querySelector('.course-column:nth-child(2) .column-title');
            const track = document.querySelector('.course-column:nth-child(3) .column-title');
            const flexDesc = document.querySelector('.course-column:nth-child(2) .column-description');
            const trackDesc = document.querySelector('.course-column:nth-child(3) .column-description');
            
            if (title) title.textContent = content.courseTitle;
            if (subtitle) subtitle.textContent = content.courseSubtitle;
            if (categories) categories.textContent = content.courseCategories;
            if (schedule) schedule.textContent = content.flexibleSchedule;
            if (track) track.textContent = content.trackCertify;
            if (flexDesc) flexDesc.textContent = content.flexibleDesc;
            if (trackDesc) trackDesc.textContent = content.trackDesc;
            
            // Update box titles - Using querySelectorAll to get all box titles
            document.querySelectorAll('[data-title-key]').forEach(element => {
                const key = element.getAttribute('data-title-key');
                if (content.boxTitles[key]) {
                    element.textContent = content.boxTitles[key];
                }
            });
        }
        
        // Initialize with saved language
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        updateCoursesContent(savedLanguage);
    }

    // Add hover functionality for services dropdown
    const servicesNav = document.querySelector('.services-nav');
    const dropdown = servicesNav?.querySelector('.services-dropdown');
    
    if (servicesNav && dropdown) {
        // Only enable dropdown on pages other than about.html
        if (!window.location.pathname.includes('about.html')) {
            servicesNav.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
            });
            
            servicesNav.addEventListener('mouseleave', () => {
                dropdown.style.display = 'none';
            });
        } else {
            // For about.html, hide dropdown and make services link direct to services page
            dropdown.style.display = 'none';
        }
        
        // Add click handler for services link
        servicesNav.querySelector('.nav-link').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'services.html';
        });
    }

    // Add target="_blank" to privacy and terms links in footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        if (link.href.includes('privacy-policy.html') || link.href.includes('terms-of-service.html')) {
            link.setAttribute('target', '_blank');
        }
    });
});

// Handle smooth scrolling for service section links
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('services.html')) {
        document.querySelectorAll('.dropdown-item').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close dropdown
                    const dropdown = document.querySelector('.services-dropdown');
                    if (dropdown) {
                        dropdown.style.display = 'none';
                        setTimeout(() => {
                            dropdown.style.display = '';
                        }, 1000);
                    }
                    
                    // Calculate scroll position accounting for fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

// Add this helper function to check if profile is complete
function checkProfileCompletion(userId) {
    return db.collection('users').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                return !!(data.firstName && data.lastName && data.dateOfBirth);
            }
            return false;
        });
}

// Update the auth state observer to show profile form if needed
auth.onAuthStateChanged((user) => {
    const userIcon = document.querySelector('.fa-user').parentElement;
    const startJoiningBtn = document.querySelector('.cta .btn-primary');
    const ctaTitle = document.querySelector('.cta-title');
    const ctaSubtitle = document.querySelector('.cta-subtitle');
    
    if (user) {
        // User is signed in
        userIcon.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width: 24px; height: 24px; border-radius: 50%;">`;
        
        // Clear any live session data when user state changes
        sessionStorage.removeItem('redirectToLive');
        sessionStorage.removeItem('isInLiveSession');
        
        if (startJoiningBtn) {
            startJoiningBtn.style.display = 'none';
        }
        
        // Update CTA text for logged in users
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        if (ctaTitle && ctaSubtitle) {
            ctaTitle.textContent = (currentLang === 'en') ? 'Welcome to Your Language Transition Journey' : 'Bienvenue dans Votre Parcours de Transition Linguistique';
            ctaSubtitle.innerHTML = (currentLang === 'en') ? 'Explore our services and start your transformation today' : 'Explorez nos services et commencez votre transformation dès aujourd\'hui';
        }
        
        // Check if profile needs to be completed
        checkProfileCompletion(user.uid).then(isComplete => {
            if (!isComplete) {
                document.getElementById('profileInfoModal').style.display = 'block';
            }
        });
    } else {
        // User is signed out
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
        
        // Clear live session data when user signs out
        sessionStorage.removeItem('redirectToLive');
        sessionStorage.removeItem('isInLiveSession');
        sessionStorage.removeItem('currentLiveId');
        
        if (startJoiningBtn) {
            startJoiningBtn.style.display = 'block';
        }
        
        // Restore original CTA text
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        if (ctaTitle && ctaSubtitle) {
            const content = translations[currentLang];
            ctaTitle.innerHTML = content.ctaTitle;
            if (content.ctaKeywords) {
                let keywordsHTML = content.ctaKeywords.map((word, index) => `<span class="keyword" style="animation-delay: ${index * 0.2 + 0.5}s">${word}</span>`).join(' &bull; ');
                ctaSubtitle.innerHTML = `${content.ctaSubtitle}<br><div class="keywords-container">${keywordsHTML}</div>`;
            } else {
                ctaSubtitle.textContent = content.ctaSubtitle;
            }
        }
    }
});

// Add consulting page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the consulting page
    if (window.location.pathname.includes('consult.html')) {
        initializeConsultingPage();
    }
});

// Consulting page initialization
function initializeConsultingPage() {
    // Yes/No button functionality
    document.querySelectorAll('.yes-no-buttons').forEach(group => {
        const buttons = group.querySelectorAll('.yes-no-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    });

    // Assessment functionality
    const getAssessmentBtn = document.getElementById('getAssessment');
    if (getAssessmentBtn) {
        getAssessmentBtn.addEventListener('click', () => {
            const results = document.getElementById('auditResults');
            results.classList.add('active');
            
            // Calculate progress based on selected answers
            const yesAnswers = document.querySelectorAll('.yes-no-btn.selected[data-value="yes"]').length;
            const totalQuestions = document.querySelectorAll('.checklist-item').length;
            const percentage = Math.round((yesAnswers / totalQuestions) * 100);
            
            // Update progress bar and percentage
            const progressFill = results.querySelector('.progress-fill');
            const percentageText = results.querySelector('.percentage');
            
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = `${percentage}%`;
                percentageText.textContent = `${percentage}%`;
            }, 100);

            // Save assessment results to Firebase
            const assessmentData = {
                score: percentage,
                answers: yesAnswers,
                totalQuestions: totalQuestions,
                assessmentDate: firebase.firestore.FieldValue.serverTimestamp(),
                userId: auth.currentUser ? auth.currentUser.uid : 'anonymous'
            };

            db.collection('assessments').add(assessmentData)
                .then(docRef => {
                    console.log('Assessment saved with ID: ', docRef.id);
                })
                .catch(error => {
                    console.error('Error saving assessment: ', error);
                });

            // Update feedback
            updateAssessmentFeedback(yesAnswers, totalQuestions);
        });
    }

    // Language Audit Assessment feedback
    const feedbackData = {
        en: {
            strengths: [
                "Dedicated language training programs in place",
                "Bilingual documentation available",
                "Key positions staffed with bilingual personnel"
            ],
            weaknesses: [
                "No dedicated language training programs",
                "Documentation not available in both languages",
                "Lack of bilingual staff in key positions"
            ]
        },
        fr: {
            strengths: [
                "Programmes de formation linguistique dédiés en place",
                "Documentation bilingue disponible",
                "Postes clés occupés par du personnel bilingue"
            ],
            weaknesses: [
                "Pas de programmes de formation linguistique dédiés",
                "Documentation non disponible dans les deux langues",
                "Manque de personnel bilingue aux postes clés"
            ]
        }
    };

    function updateAssessmentFeedback(yesAnswers, totalQuestions) {
        const strengthsList = document.getElementById('strengthsList');
        const weaknessesList = document.getElementById('weaknessesList');
        const lang = localStorage.getItem('preferredLanguage') || 'en';
        
        if (strengthsList && weaknessesList) {
            strengthsList.innerHTML = '';
            weaknessesList.innerHTML = '';

            document.querySelectorAll('.checklist-item').forEach((item, index) => {
                const isYes = item.querySelector('.yes-no-btn.selected')?.dataset.value === 'yes';
                const li = document.createElement('li');
                li.textContent = isYes ? feedbackData[lang].strengths[index] : feedbackData[lang].weaknesses[index];
                if (isYes) {
                    strengthsList.appendChild(li);
                } else {
                    weaknessesList.appendChild(li);
                }
            });
        }
    }

    // Multi-select functionality
    document.querySelectorAll('.select-option').forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('selected');
        });
    });

    // Roadmap Plan Generation
    const roadmapForm = document.querySelector('.roadmap-form');
    if (roadmapForm) {
        roadmapForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateRoadmapPlan();
        });
    }

    function generateRoadmapPlan() {
        const planModal = document.getElementById('planModal');
        const overlay = document.querySelector('.overlay');
        const planContent = planModal.querySelector('.plan-content');
        const lang = localStorage.getItem('preferredLanguage') || 'en';

        const phases = {
            en: [
                {
                    title: "Phase 1: Initial Assessment and Planning (1-2 months)",
                    steps: [
                        "Conduct detailed language proficiency assessment",
                        "Identify priority departments and documents",
                        "Develop timeline and resource allocation plan"
                    ]
                },
                {
                    title: "Phase 2: Infrastructure Setup (2-3 months)",
                    steps: [
                        "Establish language training programs",
                        "Set up translation workflows",
                        "Create bilingual templates and guidelines"
                    ]
                },
                {
                    title: "Phase 3: Implementation (3-6 months)",
                    steps: [
                        "Begin staff training programs",
                        "Start document translation process",
                        "Implement bilingual communication protocols"
                    ]
                },
                {
                    title: "Phase 4: Monitoring and Optimization",
                    steps: [
                        "Track progress and completion rates",
                        "Gather feedback and adjust processes",
                        "Evaluate and celebrate successes"
                    ]
                }
            ],
            fr: [
                {
                    title: "Phase 1: Évaluation Initiale et Planification (1-2 mois)",
                    steps: [
                        "Effectuer une évaluation détaillée des compétences linguistiques",
                        "Identifier les départements et documents prioritaires",
                        "Développer un calendrier et un plan d'allocation des ressources"
                    ]
                },
                {
                    title: "Phase 2: Mise en Place de l'Infrastructure (2-3 mois)",
                    steps: [
                        "Établir des programmes de formation linguistique",
                        "Mettre en place des flux de traduction",
                        "Créer des modèles et directives bilingues"
                    ]
                },
                {
                    title: "Phase 3: Mise en Œuvre (3-6 mois)",
                    steps: [
                        "Commencer les programmes de formation du personnel",
                        "Démarrer le processus de traduction des documents",
                        "Mettre en œuvre des protocoles de communication bilingue"
                    ]
                },
                {
                    title: "Phase 4: Suivi et Optimisation",
                    steps: [
                        "Suivre les progrès et les taux d'achèvement",
                        "Recueillir des retours et ajuster les processus",
                        "Évaluer et célébrer les succès"
                    ]
                }
            ]
        };

        planContent.innerHTML = phases[lang].map(phase => `
            <div class="plan-phase">
                <h4>${phase.title}</h4>
                <ul>
                    ${phase.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        planModal.classList.add('active');
        overlay.classList.add('active');
    }

    // Training Cards Interaction
    document.querySelectorAll('.training-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('action-btn')) return;

            const trainingType = this.querySelector('.bilingual-label').textContent;
            const modal = document.getElementById('trainingModal');
            const content = modal.querySelector('.training-content');
            const overlay = document.querySelector('.overlay');

            if (trainingType.includes('Workshop') || trainingType.includes('Atelier')) {
                const workshopModal = document.getElementById('workshopModal');
                workshopModal.classList.add('active');
                overlay.classList.add('active');
                initializeCalendar();
            } else {
                content.innerHTML = `<p>Content for ${trainingType} will be available soon.</p>`;
                modal.classList.add('active');
                overlay.classList.add('active');
            }
        });
    });

    // Calendar Functionality
    function initializeCalendar() {
        const calendar = document.querySelector('.calendar-grid');
        const currentMonthDisplay = document.querySelector('.current-month');
        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();

        function renderCalendar() {
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                              'July', 'August', 'September', 'October', 'November', 'December'];

            currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            calendar.innerHTML = '';

            // Add day headers
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.classList.add('calendar-day-header');
                dayHeader.textContent = day;
                calendar.appendChild(dayHeader);
            });

            // Add empty cells for days before first of month
            for (let i = 0; i < firstDay.getDay(); i++) {
                calendar.appendChild(document.createElement('div'));
            }

            // Add days
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dayCell = document.createElement('div');
                dayCell.classList.add('calendar-day');
                dayCell.textContent = day;

                const date = new Date(currentYear, currentMonth, day);
                if (date < today) {
                    dayCell.classList.add('disabled');
                } else {
                    dayCell.addEventListener('click', function() {
                        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                        this.classList.add('selected');
                        const bookBtn = document.querySelector('.book-btn');
                        if (bookBtn) bookBtn.disabled = false;
                    });
                }

                calendar.appendChild(dayCell);
            }
        }

        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentMonth > today.getMonth() || currentYear > today.getFullYear()) {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    renderCalendar();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            });
        }

        renderCalendar();
    }

    // Close modals
    document.querySelectorAll('.close-modal, .overlay').forEach(element => {
        element.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
            const overlay = document.querySelector('.overlay');
            if (overlay) overlay.classList.remove('active');
        });
    });

    // Download PDF button
    const downloadPdfBtn = document.querySelector('.download-pdf-btn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            alert('PDF download simulation: Your transition plan is being downloaded.');
        });
    }

    // Book workshop button
    const bookBtn = document.querySelector('.book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            const selectedDate = document.querySelector('.calendar-day.selected');
            if (selectedDate) {
                alert(`Workshop booking simulation: Your workshop has been booked for ${selectedDate.textContent} ${document.querySelector('.current-month').textContent}`);
                const workshopModal = document.getElementById('workshopModal');
                const overlay = document.querySelector('.overlay');
                if (workshopModal) workshopModal.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    }

    // Feature buttons functionality
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const modal = document.getElementById('planModal');
            const content = modal.querySelector('.plan-content');
            const overlay = document.querySelector('.overlay');
            const lang = localStorage.getItem('preferredLanguage') || 'en';

            switch(action) {
                case 'questionnaire':
                    content.innerHTML = `
                        <h4>${lang === 'en' ? 'Transition Assessment Questionnaire' : 'Questionnaire d\'Évaluation de Transition'}</h4>
                        <p>${lang === 'en' ? 'The interactive questionnaire will be available soon.' : 'Le questionnaire interactif sera bientôt disponible.'}</p>
                    `;
                    break;
                case 'templates':
                    // Simulate PDF download
                    alert(lang === 'en' ? 'Downloading templates...' : 'Téléchargement des modèles...');
                    return;
                case 'consultation':
                    content.innerHTML = `
                        <div class="calendar-container">
                            <div class="calendar-header">
                                <button class="calendar-nav prev">&lt;</button>
                                <h4 class="current-month">June 2025</h4>
                                <button class="calendar-nav next">&gt;</button>
                            </div>
                            <div class="calendar-grid"></div>
                        </div>
                        <button class="book-btn" disabled>
                            ${lang === 'en' ? 'Book Consultation' : 'Réserver la Consultation'}
                        </button>
                    `;
                    initializeCalendar();
                    break;
                case 'generate':
                    content.innerHTML = `
                        <h4>${lang === 'en' ? 'Timeline Generator' : 'Générateur d\'Échéancier'}</h4>
                        <p>${lang === 'en' ? 'Sample timeline will be generated here.' : 'L\'échéancier exemple sera généré ici.'}</p>
                    `;
                    break;
            }

            modal.classList.add('active');
            overlay.classList.add('active');
        });
    });
}

// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only run this code if we're on the contact page
    if (window.location.pathname.includes('contact.html')) {
        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const loadingSpinner = submitBtn.querySelector('.loading-spinner');
            const successMessage = document.querySelector('.success-message');

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Check if user is authenticated
                if (!auth.currentUser) {
                    alert('Please sign in to submit the form');
                    return;
                }

                // Start loading state
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                loadingSpinner.style.display = 'block';

                try {
                    // Get form data
                    const contactData = {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        company: document.getElementById('company').value,
                        message: document.getElementById('message').value,
                        userId: auth.currentUser.uid,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    };

                    // Save to Firebase
                    await db.collection('contact').add(contactData);

                    // Show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';

                    // Reset form
                    contactForm.reset();

                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('An error occurred. Please try again.');
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'block';
                    loadingSpinner.style.display = 'none';
                }
            });
        }

        // Add specific contact page language translations
        const translations = {
            en: {
                ...window.translations?.en || {},
                contactTitle: "Contact Us",
                contactSubtitle: "Get in touch with our team for any inquiries or support",
                firstName: "First Name",
                lastName: "Last Name",
                email: "Email Address",
                phone: "Phone Number",
                company: "Company Name",
                message: "Your Message",
                send: "Send Message",
                success: "Thank you for contacting us!",
                successMsg: "We've received your message and will get back to you soon."
            },
            fr: {
                ...window.translations?.fr || {},
                contactTitle: "Contactez-nous",
                contactSubtitle: "Contactez notre équipe pour toute demande ou assistance",
                firstName: "Prénom",
                lastName: "Nom",
                email: "Adresse Email",
                phone: "Numéro de Téléphone",
                company: "Nom de l'Entreprise",
                message: "Votre Message",
                send: "Envoyer",
                success: "Merci de nous avoir contactés !",
                successMsg: "Nous avons reçu votre message et vous répondrons bientôt."
            }
        };

        // Update contact page content based on language
        function updateContactContent(lang) {
            const content = translations[lang];
            
            document.querySelector('.contact-title').textContent = content.contactTitle;
            document.querySelector('.contact-subtitle').textContent = content.contactSubtitle;
            
            document.querySelectorAll('.form-label').forEach(label => {
                const inputId = label.getAttribute('for');
                switch(inputId) {
                    case 'firstName': label.textContent = content.firstName; break;
                    case 'lastName': label.textContent = content.lastName; break;
                    case 'email': label.textContent = content.email; break;
                    case 'phone': label.textContent = content.phone; break;
                    case 'company': label.textContent = content.company; break;
                    case 'message': label.textContent = content.message; break;
                }
            });

            const btnText = document.querySelector('.btn-text');
            if (btnText) btnText.textContent = content.send;
            
            const successTitle = document.querySelector('.success-message h2');
            if (successTitle) successTitle.textContent = content.success;
            
            const successMsg = document.querySelector('.success-message p');
            if (successMsg) successMsg.textContent = content.successMsg;
        }

        // Initialize with saved language
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        updateContactContent(savedLanguage);

        // Update language handlers for contact page
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                updateContactContent(lang);
            });
        });
    }
});

// Add notification function
function showNotification(message, type = 'error') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <i class="icon fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span class="message">${message}</span>
        <button class="close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Add close button functionality
    const closeBtn = notification.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add authentication check function for service access
function checkAuthAndRedirect(servicePage) {
    if (auth.currentUser) {
        // User is authenticated, redirect to service
        // For live.html, add a session parameter to indicate intentional access
        if (servicePage === 'live.html') {
            window.location.href = servicePage + '?session=join';
        } else {
            window.location.href = servicePage;
        }
    } else {
        // User is not authenticated, show sign-in modal
        const accountModal = document.getElementById('accountModal');
        if (accountModal) {
            accountModal.style.display = 'block';
        }
    }
}

// Make function globally available
window.checkAuthAndRedirect = checkAuthAndRedirect;

// Add network status detection
window.addEventListener('online', () => {
    showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showNotification('You are currently offline. Some features may not work.', 'error');
});