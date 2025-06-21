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
            submitBtn: "Submit Translation Request"
        },
        fr: {
            menu: {
                home: "Accueil",
                about: "À Propos",
                services: "Services",
                contact: "Nous Contacter"
            },
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
            submitBtn: "Soumettre la Demande de Traduction"
        }
    };

    // Gemini API Configuration (same as inter.js)
    const GEMINI_API_KEY = "AIzaSyCD4z1uc5x8G-H6yvVDoiO9PeoIC6PYf_Y";

    // Add PDF.js library for text extraction
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    document.head.appendChild(script);

    // Add jsPDF library for PDF generation
    const jsPDFScript = document.createElement('script');
    jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(jsPDFScript);

    function updateContent(lang) {
        const content = translations[lang];

        // Update page title
        const docTitle = document.querySelector('.translation-title');
        if (docTitle) docTitle.textContent = content.docTransTitle;

        // Update step titles
        const stepTitles = document.querySelectorAll('.step-title');
        if (stepTitles.length >= 3) {
            stepTitles[0].textContent = content.selectDoc;
            stepTitles[1].textContent = content.selectLang;
            stepTitles[2].textContent = content.previewTrans;
        }

        // Update drag & drop text
        const dragDropText = document.querySelector('.file-upload p');
        if (dragDropText) dragDropText.textContent = content.dragDrop;

        // Update supported formats text
        const formatsText = document.querySelector('.supported-formats');
        if (formatsText) formatsText.textContent = content.supportedFormats;

        // Update language options
        const langOptions = document.querySelectorAll('.language-option span');
        if (langOptions && langOptions.length >= 2) {
            langOptions[0].textContent = content.english;
            langOptions[1].textContent = content.french;
        }

        // Update preview text
        const previewText = document.querySelector('.preview-container p');
        if (previewText) previewText.textContent = content.previewPlaceholder;

        // Update AI section
        const aiTitle = document.querySelector('.ai-assist strong');
        if (aiTitle) aiTitle.textContent = content.aiPowered;

        const aiText = document.querySelector('.ai-assist p');
        if (aiText) aiText.textContent = content.aiAssist;

        // Update submit button
        const submitButton = document.querySelector('.submit-btn');
        if (submitButton) submitButton.textContent = content.submitBtn;

        // Update navigation menu - UPDATED
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
                switch(true) {
                    case link.textContent.includes('Home'):
                        link.textContent = content.menu.home;
                        break;
                    case link.textContent.includes('Accueil'):
                        link.textContent = content.menu.home;
                        break;
                    case link.textContent.includes('About'):
                        link.textContent = content.menu.about;
                        break;
                    case link.textContent.includes('À Propos'):
                        link.textContent = content.menu.about;
                        break;
                    case link.textContent.includes('Services'):
                        link.textContent = content.menu.services;
                        break;
                    case link.textContent.includes('Contact'):
                        link.textContent = content.menu.contact;
                        break;
                }
            }
        });
    }

    // Initialize language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    // Update language buttons
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLanguage);
        
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('preferredLanguage', lang);
            langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
            updateContent(lang);
        });
    });

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

    // File upload functionality
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.pdf,.doc,.docx,.xls,.xlsx';
    fileInput.style.display = 'none';
    fileUpload.appendChild(fileInput);

    fileUpload.addEventListener('click', () => {
        fileInput.click();
    });

    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.style.backgroundColor = 'var(--light-green)';
        fileUpload.style.borderColor = 'var(--primary-green)';
    });

    fileUpload.addEventListener('dragleave', (e) => {
        e.preventDefault();
        fileUpload.style.backgroundColor = '';
        fileUpload.style.borderColor = '';
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.style.backgroundColor = '';
        fileUpload.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    // Language selection functionality
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            languageOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Function to extract text from PDF
    async function extractTextFromPDF(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = async function() {
                try {
                    const typedarray = new Uint8Array(this.result);
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let fullText = '';
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        
                        // Improved text extraction with better formatting preservation
                        let pageText = '';
                        let lastY = null;
                        let lastX = null;
                        let currentLine = '';
                        const lineHeight = 12; // Approximate line height
                        
                        // Group text items by Y position (lines)
                        const lines = {};
                        textContent.items.forEach(item => {
                            const y = Math.round(item.transform[5] / lineHeight) * lineHeight;
                            if (!lines[y]) {
                                lines[y] = [];
                            }
                            lines[y].push(item);
                        });
                        
                        // Sort lines by Y position (top to bottom)
                        const sortedYPositions = Object.keys(lines).map(Number).sort((a, b) => b - a);
                        
                        sortedYPositions.forEach((y, lineIndex) => {
                            const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
                            let lineText = '';
                            let lastItemX = null;
                            
                            lineItems.forEach((item, itemIndex) => {
                                const currentX = item.transform[4];
                                
                                // Add spacing based on X position gaps
                                if (lastItemX !== null) {
                                    const gap = currentX - lastItemX;
                                    if (gap > 50) { // Large gap = tab or significant spacing
                                        lineText += '\t';
                                    } else if (gap > 20) { // Medium gap = multiple spaces
                                        lineText += '  ';
                                    } else if (gap > 5 && !lineText.endsWith(' ') && !item.str.startsWith(' ')) {
                                        lineText += ' ';
                                    }
                                }
                                
                                lineText += item.str;
                                lastItemX = currentX + item.width;
                            });
                            
                            // Add proper spacing between lines
                            if (lineIndex > 0) {
                                const prevY = sortedYPositions[lineIndex - 1];
                                const yGap = Math.abs(prevY - y);
                                
                                if (yGap > lineHeight * 2) {
                                    // Large gap = paragraph break
                                    pageText += '\n\n';
                                } else if (yGap > lineHeight * 1.5) {
                                    // Medium gap = section break
                                    pageText += '\n\n';
                                } else {
                                    // Normal line break
                                    pageText += '\n';
                                }
                            }
                            
                            // Preserve indentation by checking X position of first item
                            if (lineItems.length > 0) {
                                const firstItemX = lineItems[0].transform[4];
                                if (firstItemX > 100) { // Indented line
                                    const indentLevel = Math.floor(firstItemX / 50);
                                    lineText = '\t'.repeat(indentLevel) + lineText;
                                }
                            }
                            
                            pageText += lineText;
                        });
                        
                        fullText += pageText + '\n\n'; // Page break
                    }
                    
                    // Clean up excessive whitespace while preserving intentional formatting
                    fullText = fullText
                        .replace(/\n{4,}/g, '\n\n\n')  // Max 3 consecutive line breaks
                        .replace(/[ \t]+\n/g, '\n')    // Remove trailing spaces
                        .replace(/^[ \t]+/gm, (match) => match.replace(/ /g, '\t')) // Convert leading spaces to tabs for consistency
                        .trim();
                    
                    resolve(fullText);
                } catch (error) {
                    reject(error);
                }
            };
            fileReader.onerror = () => reject(new Error('Failed to read file'));
            fileReader.readAsArrayBuffer(file);
        });
    }

    // Function to convert text to HTML preserving format
    function convertToHTMLPreservingFormat(text) {
        return text
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // Convert tabs to non-breaking spaces
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
            .replace(/\n/g, '<br>'); // new lines
    }

    // Function to translate text using Gemini AI (same structure as inter.js)
    async function translateDocumentText(frenchText, sourceLang, targetLang) {
        try {
            const prompt = `Translate the following formal ${sourceLang} administrative letter into ${targetLang}. Return the result as valid HTML for web display.

- Keep the structure of the letter: titles, paragraphs, signature block.
- Use <strong> for section titles and important headings.
- Use <p> for paragraphs.
- Align the header (like dates/locations) to the right using <div style="text-align:right">.
- Do not add or rewrite any content — keep names, places, and dates the same.
- Maintain professional and formal language appropriate for administrative correspondence.

Text: """${frenchText}"""

Please ensure the translation:
- Maintains professional and formal language
- Preserves the original structure and formatting using proper HTML tags
- Uses appropriate ${targetLang} administrative terminology
- Keeps the same level of formality as the original
- Preserves any dates, numbers, and proper names accurately`;

            const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

            const requestBody = {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
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

            console.log('Sending translation request to Gemini API...');

            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${data.error?.message || 'Unknown error'}`);
            }

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                let translatedText = data.candidates[0].content.parts[0].text;
                
                // Clean up markdown code blocks
                translatedText = translatedText.replace(/```html\s*/gi, '').replace(/```\s*$/gi, '').trim();
                
                return translatedText;
            } else {
                throw new Error('Invalid response from AI service - no content generated');
            }
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }

    // Function to generate PDF with translated text
    async function generateTranslatedPDF(translatedText, originalFileName) {
        try {
            // Wait for jsPDF to load
            await new Promise(resolve => {
                const checkjsPDF = () => {
                    if (typeof window.jsPDF !== 'undefined') {
                        resolve();
                    } else {
                        setTimeout(checkjsPDF, 100);
                    }
                };
                checkjsPDF();
            });

            const { jsPDF } = window.jsPDF;
            const doc = new jsPDF();
            
            // Set font and font size
            doc.setFont('helvetica');
            doc.setFontSize(12);
            
            // Split text into lines that fit the page width
            const pageWidth = doc.internal.pageSize.getWidth();
            const margins = 20;
            const maxLineWidth = pageWidth - (2 * margins);
            
            const lines = doc.splitTextToSize(translatedText, maxLineWidth);
            
            // Add text to PDF with page breaks
            let yPosition = margins;
            const lineHeight = 7;
            const pageHeight = doc.internal.pageSize.getHeight();
            const maxY = pageHeight - margins;
            
            lines.forEach(line => {
                if (yPosition + lineHeight > maxY) {
                    doc.addPage();
                    yPosition = margins;
                }
                doc.text(line, margins, yPosition);
                yPosition += lineHeight;
            });
            
            // Generate the PDF blob
            const pdfBlob = doc.output('blob');
            
            // Create download link
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `translated_${originalFileName}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return pdfBlob;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    // Function to show notification
    function showNotification(message, type = 'success') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
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

    // Update handleFile function to support PDF processing
    function handleFile(file) {
        if (!file) return;

        // Store file info in Firebase
        const fileData = {
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: firebase.firestore.FieldValue.serverTimestamp(),
            userId: auth.currentUser ? auth.currentUser.uid : 'anonymous'
        };

        db.collection('uploads').add(fileData)
            .then(docRef => {
                console.log('File metadata stored with ID: ', docRef.id);
            })
            .catch(error => {
                console.error('Error storing file metadata: ', error);
            });

        // Clear existing content
        while (fileUpload.firstChild) {
            fileUpload.removeChild(fileUpload.firstChild);
        }

        const extension = file.name.split('.').pop().toLowerCase();
        
        let iconSrc;
        switch(extension) {
            case 'pdf':
                iconSrc = 'pdf_icon.png';
                break;
            case 'doc':
            case 'docx':
                iconSrc = 'word_icon.png';
                break;
            case 'xls':
            case 'xlsx':
                iconSrc = 'excel_icon.png';
                break;
            default:
                iconSrc = 'doc_icon.png';
        }

        const fileDisplay = document.createElement('div');
        fileDisplay.style.display = 'flex';
        fileDisplay.style.alignItems = 'center';
        fileDisplay.style.gap = '15px';
        fileDisplay.style.padding = '10px';

        const fileIcon = document.createElement('img');
        fileIcon.src = iconSrc;
        fileIcon.style.width = '40px';
        fileIcon.style.height = '40px';
        fileIcon.alt = 'File icon';

        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        fileName.style.fontSize = '1.1rem';
        fileName.style.color = 'var(--text-dark)';

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '&times;';
        removeButton.style.marginLeft = 'auto';
        removeButton.style.background = 'none';
        removeButton.style.border = 'none';
        removeButton.style.fontSize = '1.5rem';
        removeButton.style.cursor = 'pointer';
        removeButton.style.color = 'var(--primary-green)';
        removeButton.onclick = (e) => {
            e.stopPropagation();
            resetFileUpload();
            fileInput.value = '';
        };

        fileDisplay.appendChild(fileIcon);
        fileDisplay.appendChild(fileName);
        fileDisplay.appendChild(removeButton);
        fileUpload.appendChild(fileDisplay);

        // Store the file for processing
        fileUpload.dataset.uploadedFile = JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size
        });
        fileUpload.uploadedFileData = file;

        // Update submit button text to indicate next step
        const submitButton = document.querySelector('.submit-btn');
        if (submitButton) {
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            submitButton.textContent = currentLang === 'en' ? 'Extract Text' : 'Extraire le Texte';
        }

        // Hide preview boxes initially
        document.getElementById('originalTextContainer').style.display = 'none';
        document.getElementById('translatedTextContainer').style.display = 'none';
    }

    function resetFileUpload() {
        fileInput.value = '';
        
        while (fileUpload.firstChild) {
            fileUpload.removeChild(fileUpload.firstChild);
        }

        const icon = document.createElement('i');
        icon.className = 'fas fa-cloud-upload-alt fa-3x';
        icon.style.color = 'var(--primary-green)';

        const text = document.createElement('p');
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        text.textContent = translations[currentLang].dragDrop;

        const formats = document.createElement('div');
        formats.className = 'supported-formats';
        formats.textContent = translations[currentLang].supportedFormats;

        fileUpload.appendChild(icon);
        fileUpload.appendChild(text);
        fileUpload.appendChild(formats);
    }

    // Initialize content with saved language
    updateContent(savedLanguage);

    // Add real-time sync between translated text and print preview
    function syncPrintPreview() {
        const translatedTextBox = document.getElementById('translatedText');
        const printPreview = document.getElementById('printPreview');
        
        if (translatedTextBox && printPreview) {
            // Copy content from translated text to print preview
            printPreview.innerHTML = translatedTextBox.innerHTML;
        }
    }

    // Set up MutationObserver to watch for changes in translated text
    function setupPrintPreviewSync() {
        const translatedTextBox = document.getElementById('translatedText');
        
        if (translatedTextBox) {
            // Create observer instance
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || mutation.type === 'characterData' || mutation.type === 'attributes') {
                        syncPrintPreview();
                    }
                });
            });

            // Configuration of the observer
            const config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
                attributeOldValue: true,
                characterDataOldValue: true
            };

            // Start observing
            observer.observe(translatedTextBox, config);

            // Also listen for input events
            translatedTextBox.addEventListener('input', syncPrintPreview);
            translatedTextBox.addEventListener('keyup', syncPrintPreview);
            translatedTextBox.addEventListener('paste', function() {
                setTimeout(syncPrintPreview, 10); // Small delay to ensure paste content is processed
            });
        }
    }

    // Add submit button handler to process the document
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async function() {
            const selectedLanguage = document.querySelector('.language-option.selected');
            const uploadedFile = fileUpload.uploadedFileData;
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            
            // Check current step based on button text
            const buttonText = this.textContent;
            
            if (buttonText.includes('Extract') || buttonText.includes('Extraire')) {
                // Step 1: Extract text from document
                if (!uploadedFile) {
                    showNotification(currentLang === 'en' ? 'Please upload a document first.' : 'Veuillez d\'abord télécharger un document.', 'error');
                    return;
                }
                
                showNotification(currentLang === 'en' ? 'Extracting text from document...' : 'Extraction du texte du document...', 'info');
                
                try {
                    const previewContainer = document.querySelector('.preview-container');
                    previewContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-green); margin-bottom: 15px;"></i>
                            <h3>${currentLang === 'en' ? 'Extracting Text' : 'Extraction du Texte'}</h3>
                            <p style="margin: 10px 0;">${currentLang === 'en' ? 'Reading document content...' : 'Lecture du contenu du document...'}</p>
                        </div>
                    `;
                    
                    let extractedText;
                    if (uploadedFile.type === 'application/pdf') {
                        extractedText = await extractTextFromPDF(uploadedFile);
                    } else {
                        throw new Error(currentLang === 'en' ? 
                            'Currently only PDF files are supported for full processing. Other formats will be added soon.' :
                            'Actuellement, seuls les fichiers PDF sont pris en charge pour le traitement complet. D\'autres formats seront bientôt ajoutés.'
                        );
                    }
                    
                    // Hide old preview container and show new editable boxes
                    previewContainer.style.display = 'none';
                    
                    // Show extracted text in the new editable box
                    const originalTextContainer = document.getElementById('originalTextContainer');
                    originalTextContainer.style.display = 'block';
                    document.getElementById('originalText').innerHTML = convertToHTMLPreservingFormat(extractedText);

                    // Hide the placeholder
                    const extractedPreview = document.getElementById('extractedPreview');
                    if (extractedPreview) {
                        extractedPreview.style.display = 'none';
                    }

                    // Store extracted text for next step
                    this.dataset.extractedText = extractedText;
                    
                    // Update button for next step
                    this.textContent = currentLang === 'en' ? 'Translate Text' : 'Traduire le Texte';
                    
                    showNotification(currentLang === 'en' ? 'Text extracted successfully!' : 'Texte extrait avec succès!', 'success');
                    
                } catch (error) {
                    console.error('Text extraction error:', error);
                    
                    const previewContainer = document.querySelector('.preview-container');
                    previewContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff4444; margin-bottom: 15px;"></i>
                            <h3 style="color: #ff4444;">${currentLang === 'en' ? 'Extraction Failed' : 'Échec de l\'Extraction'}</h3>
                            <p style="margin: 15px 0; color: #666;">${error.message}</p>
                            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-green); color: white; border: none; border-radius: 5px; cursor: pointer;">
                                ${currentLang === 'en' ? 'Try Again' : 'Réessayer'}
                            </button>
                        </div>
                    `;
                    
                    showNotification(error.message, 'error');
                }
                
            } else if (buttonText.includes('Translate') || buttonText.includes('Traduire')) {
                // Step 2: Translate text
                if (!selectedLanguage) {
                    showNotification(currentLang === 'en' ? 'Please select target language.' : 'Veuillez sélectionner la langue cible.', 'error');
                    return;
                }
                
                const extractedText = this.dataset.extractedText;
                if (!extractedText) {
                    showNotification(currentLang === 'en' ? 'No text to translate. Please extract text first.' : 'Aucun texte à traduire. Veuillez d\'abord extraire le texte.', 'error');
                    return;
                }
                
                const targetLang = selectedLanguage.querySelector('span').textContent;
                const sourceLang = targetLang === 'English' ? 'French' : 'English';
                
                showNotification(currentLang === 'en' ? 'Translating text...' : 'Traduction du texte...', 'info');
                
                try {
                    // Show loading animation inside the translated text container
                    const translatedTextContainer = document.getElementById('translatedTextContainer');
                    translatedTextContainer.style.display = 'block';
                    document.getElementById('translatedText').innerHTML = `
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; color: var(--primary-green);">
                            <div style="width: 40px; height: 40px; border: 3px solid var(--border-light); border-top: 3px solid var(--primary-green); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 15px;"></div>
                            <h3 style="margin: 0; font-size: 1.2rem;">${currentLang === 'en' ? 'Translating...' : 'Traduction en cours...'}</h3>
                            <p style="margin: 5px 0 0 0; color: var(--text-medium);">${currentLang === 'en' ? 'Please wait while we translate your document' : 'Veuillez patienter pendant la traduction'}</p>
                        </div>
                        <style>
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        </style>
                    `;
                    
                    // Hide the placeholder
                    const translatedPreview = document.getElementById('translatedPreview');
                    if (translatedPreview) {
                        translatedPreview.style.display = 'none';
                    }

                    const translatedText = await translateDocumentText(extractedText, sourceLang, targetLang);
                    
                    // Show translated text in the editable box
                    document.getElementById('translatedText').innerHTML = convertToHTMLPreservingFormat(translatedText);

                    // Show translated letter in the formatted HTML box
                    const translatedBox = document.getElementById('translatedBox');
                    translatedBox.innerHTML = translatedText;

                    // Store translated text for printing
                    this.dataset.translatedText = translatedText;

                    // Update button for print step
                    this.textContent = currentLang === 'en' ? 'Prepare for Print' : 'Préparer pour Impression';
                    this.dataset.translationComplete = 'true';
                    
                    showNotification(currentLang === 'en' ? 'Text translated successfully!' : 'Texte traduit avec succès!', 'success');
                    
                } catch (error) {
                    console.error('Translation error:', error);
                    
                    let errorMessage = currentLang === 'en' ? 'Failed to translate text. Please try again.' : 'Échec de la traduction du texte. Veuillez réessayer.';
                    if (error.message.includes('API Error')) {
                        errorMessage = currentLang === 'en' ? 'Translation service error. Please try again later.' : 'Erreur du service de traduction. Veuillez réessayer plus tard.';
                    }
                    
                    showNotification(errorMessage, 'error');
                }
                
            } else if (buttonText.includes('Print') || buttonText.includes('Impression')) {
                // Step 3: Prepare for print
                const translatedText = this.dataset.translatedText;
                if (!translatedText) {
                    showNotification(currentLang === 'en' ? 'No translated text available.' : 'Aucun texte traduit disponible.', 'error');
                    return;
                }
                
                // Show print section
                const printSection = document.getElementById('printSection');
                printSection.style.display = 'block';
                
                // Populate print preview with the exact content from the translated text box
                syncPrintPreview();
                
                // Set up real-time sync for future changes
                setupPrintPreviewSync();
                
                // Hide submit button
                this.style.display = 'none';
                
                // Scroll to print section
                printSection.scrollIntoView({ behavior: 'smooth' });
                
                showNotification(currentLang === 'en' ? 'Document ready for printing!' : 'Document prêt pour impression!', 'success');
                
            } else if (buttonText.includes('New') || buttonText.includes('Nouvelle')) {
                // Reset for new translation
                location.reload();
            }
        });
    }

    // Add print functionality
    document.addEventListener('click', function(e) {
        if (e.target.id === 'printBtn' || e.target.closest('#printBtn')) {
            printTranslated();
        }
        
        if (e.target.id === 'newTranslationBtn' || e.target.closest('#newTranslationBtn')) {
            location.reload();
        }
    });
    
    // Add the new print function
    function printTranslated() {
        const content = document.getElementById('printPreview')?.innerHTML;
        if (!content) {
            alert('No content to print');
            return;
        }

        const w = window.open('', '_blank');
        w.document.write(`<html><head><style>@page{margin:1cm}body{margin:0;padding:1cm;font-family:Arial;line-height:1.6}</style></head><body>${content}<script>onload=()=>print()</script></body></html>`);
        w.document.close();
    }
});