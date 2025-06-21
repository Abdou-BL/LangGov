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
            },
            title: "International Correspondence Support",
            subtitle: "Draft and Review International Administrative Letters",
            letterType: "Letter Type",
            request: "Request",
            invitation: "Invitation",
            complaint: "Complaint",
            response: "Response",
            draftLabel: "Draft Your Letter",
            placeholder: "Write your draft here",
            aiLabel: "AI-Generated English Version",
            aiPlaceholder: "This is where your polished English version will be generated.",
            suggestions: "Suggestions",
            download: "Send",  // Changed from "Download or Send" to "Send"
            modalTitle: "Feature Under Development",
            modalContent: "Integration with AI and email will be added soon."
        },
        fr: {
            menu: {
                home: "Accueil",
                about: "À Propos",
                services: "Services",
                contact: "Nous Contacter"
            },
            title: "Support de Correspondance Internationale",
            subtitle: "Rédaction et Révision de Lettres Administratives Internationales",
            letterType: "Type de Lettre",
            request: "Demande",
            invitation: "Invitation",
            complaint: "Réclamation",
            response: "Réponse",
            draftLabel: "Rédigez Votre Lettre",
            placeholder: "Écrivez votre brouillon ici",
            aiLabel: " Version Anglaise Générée par l'IA",
            aiPlaceholder: "C'est ici que votre version anglaise peaufinée sera générée.",
            suggestions: "Suggestions", 
            download: "Envoyer",  // Changed from "Télécharger ou Envoyer" to "Envoyer"
            modalTitle: "Fonctionnalité en Développement",
            modalContent: "L'intégration avec l'IA et l'email sera bientôt ajoutée."
        }
    };

    // Initialize language - remove localStorage dependency for Claude.ai compatibility
    let currentLanguage = 'en';

    // Add initial language display function
    function setInitialLanguage(lang) {
        currentLanguage = lang;
        // Set the correct button as active
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Hide non-selected language elements immediately
        document.querySelectorAll('.english, .french').forEach(el => {
            if (lang === 'en') {
                el.style.display = el.classList.contains('english') ? 'block' : 'none';
            } else {
                el.style.display = el.classList.contains('french') ? 'block' : 'none';
            }
        });
    }

    // Call setInitialLanguage immediately when the page loads
    setInitialLanguage(currentLanguage);

    // Language button click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            currentLanguage = lang;
            langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            setInitialLanguage(lang);
            updateContent(lang);
        });
    });

    function updateContent(lang) {
        const content = translations[lang];
        
        // Update navigation menu
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                switch(true) {
                    case href.includes('#hero'):
                        link.textContent = content.menu.home;
                        break;
                    case href.includes('#about'):
                        link.textContent = content.menu.about;
                        break;
                    case href.includes('#services'):
                        link.textContent = content.menu.services;
                        break;
                    case href.includes('#footer'):
                        link.textContent = content.menu.contact;
                        break;
                }
            } else {
                if (link.textContent.includes('Home') || link.textContent.includes('Accueil')) {
                    link.textContent = content.menu.home;
                } else if (link.textContent.includes('About') || link.textContent.includes('À Propos')) {
                    link.textContent = content.menu.about;
                } else if (link.textContent.includes('Services')) {
                    link.textContent = content.menu.services;
                } else if (link.textContent.includes('Contact')) {
                    link.textContent = content.menu.contact;
                }
            }
        });

        // Update page title and subtitle
        const pageTitle = document.querySelector('.page-title');
        const pageSubtitle = document.querySelector('.page-subtitle');
        if (pageTitle) pageTitle.textContent = translations[lang].title;
        if (pageSubtitle) pageSubtitle.textContent = translations[lang].subtitle;

        // Update letter type options
        const typeOptions = document.querySelectorAll('.type-option');
        typeOptions.forEach(option => {
            const englishEl = option.querySelector('.english');
            const frenchEl = option.querySelector('.french');
            if (englishEl) englishEl.style.display = lang === 'en' ? 'block' : 'none';
            if (frenchEl) frenchEl.style.display = lang === 'fr' ? 'block' : 'none';
        });

        // Update editor labels and placeholders - always French for left box
        const editorLabel = document.querySelector('.editor-container .bilingual-label');
        if (editorLabel) {
            editorLabel.innerHTML = `<span>${translations['fr'].draftLabel}</span>`;
        }
        
        const textarea = document.querySelector('.editor-textarea');
        if (textarea) {
            textarea.placeholder = translations['fr'].placeholder;
        }

        // AI Label always English
        const aiLabel = document.querySelector('.ai-output .bilingual-label');
        if (aiLabel) {
            aiLabel.innerHTML = `<span>${translations['en'].aiLabel}</span>`;
        }
        
        const aiPlaceholder = document.querySelector('.ai-placeholder');
        if (aiPlaceholder) {
            aiPlaceholder.textContent = translations['en'].aiPlaceholder;
        }

        // Update buttons
        const suggestionsBtn = document.querySelector('.suggestions-btn');
        if (suggestionsBtn) {
            suggestionsBtn.textContent = content.suggestions;
        }

        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.textContent = content.download;
        }

        // Update modal content
        const modalTitle = document.querySelector('.modal h3');
        if (modalTitle) {
            modalTitle.innerHTML = `<span>${translations[lang].modalTitle}</span>`;
        }

        const modalContent = document.querySelector('.modal p');
        if (modalContent) {
            modalContent.innerHTML = `<span>${translations[lang].modalContent}</span>`;
        }
    }

    // Letter type selection
    const typeOptions = document.querySelectorAll('.type-option');
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Wording suggestions functionality
    const suggestionsBtn = document.querySelector('.suggestions-btn');
    const textarea = document.querySelector('.editor-textarea');
    const suggestions = {
        request: {
            en: [
                "Introduction:\nDear [Name],\nI am writing to formally request...\n\nBody:\nThe purpose of this request is to...\n\nConclusion:\nI look forward to your favorable response.\n\nYours sincerely,\n[Your Name]",
                
                "Introduction:\nTo whom it may concern,\nI am reaching out regarding...\n\nBody:\nI would greatly appreciate if you could...\n\nConclusion:\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]",
                
                "Introduction:\nDear Sir/Madam,\nI am writing to inquire about...\n\nBody:\nSpecifically, I would like to request...\n\nConclusion:\nI await your response with interest.\n\nYours faithfully,\n[Your Name]",
                
                "Introduction:\nDear [Department] Team,\nI hope this letter finds you well. I am writing to request...\n\nBody:\nThe details of my request are as follows...\n\nConclusion:\nI appreciate your attention to this matter.\n\nKind regards,\n[Your Name]",
                
                "Introduction:\nDear [Title],\nI am writing on behalf of [Department/Organization] to request...\n\nBody:\nThis request is necessitated by...\n\nConclusion:\nThank you for considering this request.\n\nSincerely yours,\n[Your Name]"
            ],
            fr: [
                "Introduction:\nCher/Chère [Nom],\nJe vous écris pour demander formellement...\n\nCorps:\nL'objectif de cette demande est de...\n\nConclusion:\nDans l'attente d'une réponse favorable.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nÀ qui de droit,\nJe me permets de vous contacter concernant...\n\nCorps:\nJe vous serais très reconnaissant(e) si vous pouviez...\n\nConclusion:\nJe vous remercie de votre temps et considération.\n\nBien cordialement,\n[Votre Nom]",
                
                "Introduction:\nMadame, Monsieur,\nJe vous écris pour me renseigner sur...\n\nCorps:\nPlus précisément, je souhaiterais demander...\n\nConclusion:\nJ'attends votre réponse avec intérêt.\n\nJe vous prie d'agréer mes salutations distinguées,\n[Votre Nom]",
                
                "Introduction:\nCher(e)s membres de l'équipe [Département],\nJ'espère que ce courrier vous trouve bien. Je vous écris pour demander...\n\nCorps:\nLes détails de ma demande sont les suivants...\n\nConclusion:\nJe vous remercie de votre attention.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Titre],\nJe vous écris au nom de [Département/Organisation] pour demander...\n\nCorps:\nCette demande est motivée par...\n\nConclusion:\nJe vous remercie de l'attention portée à cette demande.\n\nVeuillez agréer mes salutations distinguées,\n[Votre Nom]"
            ]
        },
        invitation: {
            en: [
                "Introduction:\nDear [Name],\nWe are pleased to invite you to...\n\nBody:\nThe event details are as follows...\n\nConclusion:\nWe look forward to your presence.\n\nBest regards,\n[Your Name]",
                
                "Introduction:\nDear [Title],\nOn behalf of [Organization], I am delighted to extend an invitation...\n\nBody:\nThis special occasion will feature...\n\nConclusion:\nPlease RSVP by [date].\n\nKind regards,\n[Your Name]",
                
                "Introduction:\nDear [Name],\nIt is our pleasure to invite you to join us for...\n\nBody:\nDuring this event, we will...\n\nConclusion:\nWe hope you can join us for this special occasion.\n\nSincerely,\n[Your Name]",
                
                "Introduction:\nDear Colleague,\nWe would be honored by your presence at...\n\nBody:\nThe program will include...\n\nConclusion:\nPlease confirm your attendance by [date].\n\nYours sincerely,\n[Your Name]",
                
                "Introduction:\nDear [Name],\nYou are cordially invited to attend...\n\nBody:\nThis gathering will provide an opportunity to...\n\nConclusion:\nWe await your confirmation.\n\nBest wishes,\n[Your Name]"
            ],
            fr: [
                "Introduction:\nCher/Chère [Nom],\nNous avons le plaisir de vous inviter à...\n\nCorps:\nLes détails de l'événement sont les suivants...\n\nConclusion:\nNous espérons vivement votre présence.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Titre],\nAu nom de [Organisation], j'ai le plaisir de vous convier...\n\nCorps:\nCette occasion spéciale comprendra...\n\nConclusion:\nMerci de confirmer votre présence avant le [date].\n\nBien cordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Nom],\nC'est avec grand plaisir que nous vous invitons à...\n\nCorps:\nAu cours de cet événement, nous...\n\nConclusion:\nNous espérons que vous pourrez vous joindre à nous.\n\nSincèrement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère Collègue,\nNous serions honorés de votre présence à...\n\nCorps:\nLe programme comprendra...\n\nConclusion:\nMerci de confirmer votre participation avant le [date].\n\nBien à vous,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Nom],\nVous êtes cordialement invité(e) à...\n\nCorps:\nCette réunion sera l'occasion de...\n\nConclusion:\nNous attendons votre confirmation.\n\nMeilleures salutations,\n[Votre Nom]"
            ]
        },
        complaint: {
            en: [
                "Introduction:\nDear [Name],\nI am writing to express my concern regarding...\n\nBody:\nThe specific issues are as follows...\n\nConclusion:\nI look forward to your prompt attention to this matter.\n\nYours sincerely,\n[Your Name]",
                
                "Introduction:\nTo whom it may concern,\nI must bring to your attention a serious issue regarding...\n\nBody:\nThis situation has caused considerable...\n\nConclusion:\nI request your immediate action on this matter.\n\nBest regards,\n[Your Name]",
                
                "Introduction:\nDear Sir/Madam,\nI regret to inform you about...\n\nBody:\nThe following incidents have occurred...\n\nConclusion:\nI await your response and resolution.\n\nYours faithfully,\n[Your Name]",
                
                "Introduction:\nDear [Department] Manager,\nI am writing to file a formal complaint about...\n\nBody:\nThe details of my complaint are...\n\nConclusion:\nI expect a timely resolution to this issue.\n\nKind regards,\n[Your Name]",
                
                "Introduction:\nDear [Title],\nI need to bring to your attention an ongoing issue...\n\nBody:\nThis situation has negatively impacted...\n\nConclusion:\nI trust you will address this matter promptly.\n\nSincerely,\n[Your Name]"
            ],
            fr: [
                "Introduction:\nCher/Chère [Nom],\nJe vous écris pour exprimer ma préoccupation concernant...\n\nCorps:\nLes problèmes spécifiques sont les suivants...\n\nConclusion:\nJ'attends votre prompte attention à ce sujet.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nÀ qui de droit,\nJe dois porter à votre attention un problème sérieux concernant...\n\nCorps:\nCette situation a causé un préjudice considérable...\n\nConclusion:\nJe demande votre intervention immédiate.\n\nBien cordialement,\n[Votre Nom]",
                
                "Introduction:\nMadame, Monsieur,\nJe regrette de devoir vous informer de...\n\nCorps:\nLes incidents suivants se sont produits...\n\nConclusion:\nJ'attends votre réponse et une résolution.\n\nJe vous prie d'agréer mes salutations distinguées,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère Responsable de [Département],\nJe vous écris pour déposer une plainte formelle concernant...\n\nCorps:\nLes détails de ma plainte sont...\n\nConclusion:\nJ'attends une résolution rapide de ce problème.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Titre],\nJe dois porter à votre attention un problème persistant...\n\nCorps:\nCette situation a eu un impact négatif sur...\n\nConclusion:\nJe compte sur vous pour traiter cette question rapidement.\n\nSincèrement,\n[Votre Nom]"
            ]
        },
        response: {
            en: [
                "Introduction:\nDear [Name],\nThank you for your correspondence regarding...\n\nBody:\nIn response to your inquiry...\n\nConclusion:\nPlease don't hesitate to contact us for any further clarification.\n\nBest regards,\n[Your Name]",
                
                "Introduction:\nDear [Title],\nI acknowledge receipt of your letter concerning...\n\nBody:\nAfter careful consideration of your request...\n\nConclusion:\nWe remain at your disposal for any additional information.\n\nKind regards,\n[Your Name]",
                
                "Introduction:\nDear [Name],\nI am writing in response to your letter dated...\n\nBody:\nRegarding the points you raised...\n\nConclusion:\nI trust this addresses your concerns.\n\nYours sincerely,\n[Your Name]",
                
                "Introduction:\nDear Sir/Madam,\nThank you for bringing this matter to our attention...\n\nBody:\nWe have thoroughly reviewed your request...\n\nConclusion:\nPlease feel free to reach out with any questions.\n\nBest wishes,\n[Your Name]",
                
                "Introduction:\nDear [Name],\nI appreciate you taking the time to write to us about...\n\nBody:\nIn addressing your concerns...\n\nConclusion:\nWe value your feedback and continued cooperation.\n\nSincerely yours,\n[Your Name]"
            ],
            fr: [
                "Introduction:\nCher/Chère [Nom],\nJe vous remercie pour votre correspondance concernant...\n\nCorps:\nEn réponse à votre demande...\n\nConclusion:\nN'hésitez pas à nous contacter pour toute précision supplémentaire.\n\nCordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Titre],\nJ'accuse réception de votre lettre concernant...\n\nCorps:\nAprès examen attentif de votre demande...\n\nConclusion:\nNous restons à votre disposition pour tout complément d'information.\n\nBien cordialement,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Nom],\nJe vous écris en réponse à votre lettre du...\n\nCorps:\nConcernant les points que vous avez soulevés...\n\nConclusion:\nJ'espère avoir répondu à vos préoccupations.\n\nBien à vous,\n[Votre Nom]",
                
                "Introduction:\nMadame, Monsieur,\nJe vous remercie d'avoir porté cette question à notre attention...\n\nCorps:\nNous avons examiné en détail votre demande...\n\nConclusion:\nN'hésitez pas à nous contacter pour toute question.\n\nMeilleures salutations,\n[Votre Nom]",
                
                "Introduction:\nCher/Chère [Nom],\nJe vous remercie d'avoir pris le temps de nous écrire au sujet de...\n\nCorps:\nEn réponse à vos préoccupations...\n\nConclusion:\nNous apprécions vos commentaires et votre coopération continue.\n\nSincèrement,\n[Votre Nom]"
            ]
        }
    };

    let currentSuggestionIndex = 0;

    // Gemini API Configuration
    const GEMINI_API_KEY = "AIzaSyCD4z1uc5x8G-H6yvVDoiO9PeoIC6PYf_Y";
    
    console.log('API Key loaded (first 10 chars):', GEMINI_API_KEY.substring(0, 10));

    // Test function to verify API key and connection
    async function testGeminiAPI() {
        try {
            const testPrompt = "Translate this simple French sentence to English: 'Bonjour, comment allez-vous?'";
            const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
            
            console.log('Testing API with URL:', GEMINI_API_URL.split('?key=')[0] + '?key=***');
            
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: testPrompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            console.log('API Test Result:', response.status, data);
            
            if (response.ok) {
                console.log('✅ API Key is working correctly');
                return true;
            } else {
                console.log('❌ API Key test failed:', data.error?.message || 'Unknown error');
                return false;
            }
        } catch (error) {
            console.error('❌ API Test Error:', error);
            return false;
        }
    }

    // Function to translate French text to English using Gemini AI
    async function translateToEnglish(frenchText) {
        const aiOutput = document.querySelector('.ai-output .ai-placeholder');
        if (!aiOutput) {
            console.error('AI output element not found');
            return;
        }

        aiOutput.innerHTML = '<div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i> Traduction en cours...</div>';

        try {
            const selectedType = document.querySelector('.type-option.selected');
            const letterType = selectedType ? selectedType.dataset.type : 'general';
            
            const prompt = `You are a professional translator specializing in formal administrative correspondence. 

Please translate the following French ${letterType} letter into professional English, maintaining the formal tone and structure appropriate for international administrative correspondence:

${frenchText}

Please ensure the translation:
- Maintains professional and formal language
- Preserves the original structure and formatting
- Uses appropriate English administrative terminology
- Keeps the same level of politeness and formality as the French original`;

            // Updated API URL for the newer version
            const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };

            console.log('Sending request to Gemini API...');
            console.log('Request body:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            const data = await response.json();
            console.log('Full API response:', data);
            
            if (!response.ok) {
                console.error('API Error:', data);
                throw new Error(`API Error: ${response.status} - ${data.error?.message || 'Unknown error'}`);
            }

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                const translatedText = data.candidates[0].content.parts[0].text;
                console.log('Translation successful:', translatedText.substring(0, 100) + '...');
                
                aiOutput.innerHTML = `<div style="white-space: pre-wrap; line-height: 1.6; font-size: 0.95rem;">${translatedText}</div>`;
                
                console.log('Translation completed successfully');

            } else {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response from AI service - no content generated');
            }
        } catch (error) {
            console.error('Translation error details:', error);
            
            let errorMessage = 'Erreur de traduction. Veuillez réessayer.<br><small>Translation error. Please try again.</small>';
            
            // Provide more specific error messages
            if (error.message.includes('API Error: 400')) {
                errorMessage = 'Erreur de requête. Vérifiez le texte saisi.<br><small>Request error. Please check your input text.</small>';
            } else if (error.message.includes('API Error: 401')) {
                errorMessage = 'Erreur d\'authentification API.<br><small>API authentication error.</small>';
            } else if (error.message.includes('API Error: 403')) {
                errorMessage = 'Accès API refusé. Vérifiez vos permissions.<br><small>API access denied. Check your permissions.</small>';
            } else if (error.message.includes('API Error: 429')) {
                errorMessage = 'Limite de requêtes atteinte. Réessayez plus tard.<br><small>Rate limit reached. Try again later.</small>';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Erreur de connexion réseau.<br><small>Network connection error.</small>';
            }

            aiOutput.innerHTML = `
                <div style="color: #d32f2f; text-align: center; padding: 20px;">
                    <i class="fas fa-exclamation-triangle"></i><br>
                    ${errorMessage}
                </div>
            `;
        }
    }

    // Test the API when page loads
    console.log('Testing Gemini API...');
    testGeminiAPI();

    if (suggestionsBtn && textarea) {
        suggestionsBtn.addEventListener('click', function() {
            const selectedType = document.querySelector('.type-option.selected');
            if (selectedType) {
                const type = selectedType.dataset.type;
                
                console.log('Suggestion requested for type:', type);
                
                // Always use French suggestions for the textarea
                if (suggestions[type] && suggestions[type]['fr']) {
                    textarea.value = suggestions[type]['fr'][currentSuggestionIndex];
                    
                    // Increment index or reset to 0 if we've reached the end
                    currentSuggestionIndex = (currentSuggestionIndex + 1) % suggestions[type]['fr'].length;
                }
            } else {
                console.log('No letter type selected');
            }
        });
    }

    // Download or Send button - now triggers AI translation
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn && textarea) {
        downloadBtn.addEventListener('click', function() {
            const selectedType = document.querySelector('.type-option.selected');
            
            if (textarea.value.trim()) {
                console.log('Starting translation for text:', textarea.value.substring(0, 50) + '...');
                
                // Translate the French text to English using Gemini AI
                translateToEnglish(textarea.value);
            } else {
                console.log('No text entered, showing modal');
                // Show modal if no text entered
                showModal();
            }
        });
    }

    // Modal functionality
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const closeModalBtn = document.querySelector('.close-modal');

    function showModal() {
        if (modal && overlay) {
            modal.classList.add('active');
            overlay.classList.add('active');
        }
    }

    function hideModal() {
        if (modal && overlay) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', hideModal);
    }

    // Add keyboard shortcut for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });

    console.log('International Correspondence Support loaded successfully');
});