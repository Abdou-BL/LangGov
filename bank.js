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
  
  // Add this shuffle function at the top of the file after the firebaseConfig:
  
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
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
  
      const termsData = {
          'Common Bilingual Administrative Expressions': [
              {
                  fr: 'Journal Officiel',
                  en: 'Official Gazette',
                  defFr: 'Publication officielle contenant les textes législatifs et réglementaires de la République.',
                  defEn: 'Official publication containing legislative and regulatory texts of the Republic.',
                  exampleFr: 'La nouvelle loi sera publiée dans le Journal Officiel la semaine prochaine.',
                  exampleEn: 'The new law will be published in the Official Gazette next week.'
              },
              {
                  fr: 'Décret',
                  en: 'Decree',
                  defFr: 'Acte réglementaire pris par le Président ou le Premier ministre, souvent publié au Journal Officiel.',
                  defEn: 'Regulatory act issued by the President or the Prime Minister, often published in the Official Gazette.',
                  exampleFr: 'Le décret n°23-55 a été publié au JO du 12 mars.',
                  exampleEn: 'Decree no. 23-55 was published in the Official Gazette on March 12.'
              },
          ],
          'Public Institutions & Functions': [
              {
                  fr: 'Présidence de la République',
                  en: 'Presidency of the Republic',
                  defFr: "Institution suprême de l'État algérien, dirigée par le Président de la République qui est le chef de l'État.",
                  defEn: 'Supreme institution of the Algerian state, led by the President of the Republic who is the head of state.',
                  exampleFr: 'La Présidence de la République a annoncé de nouvelles mesures économiques.',
                  exampleEn: 'The Presidency of the Republic announced new economic measures.'
              },
              {
                  fr: 'Conseil de la Nation',
                  en: 'Council of the Nation',
                  defFr: "Chambre haute du Parlement algérien, composée de représentants élus et nommés.",
                  defEn: 'Upper house of the Algerian Parliament, composed of elected and appointed representatives.',
                  exampleFr: 'Le Conseil de la Nation a approuvé le projet de loi à la majorité.',
                  exampleEn: 'The Council of the Nation approved the bill by majority.'
              },
              {
                  fr: 'Assemblée Populaire Nationale',
                  en: "People's National Assembly",
                  defFr: "Chambre basse du Parlement algérien, élue au suffrage universel direct.",
                  defEn: 'Lower house of the Algerian Parliament, elected by direct universal suffrage.',
                  exampleFr: "L'Assemblée Populaire Nationale débat actuellement du budget 2025.",
                  exampleEn: "The People's National Assembly is currently debating the 2025 budget."
              },
              {
                  fr: 'Conseil Constitutionnel',
                  en: 'Constitutional Council',
                  defFr: "Institution chargée de veiller au respect de la Constitution.",
                  defEn: 'Institution responsible for ensuring compliance with the Constitution.',
                  exampleFr: 'Le Conseil Constitutionnel a validé les résultats des élections.',
                  exampleEn: 'The Constitutional Council validated the election results.'
              }
          ],
          'Sovereign Ministries': [
              {
                  fr: 'Ministère de la Défense Nationale',
                  en: 'Ministry of National Defense',
                  defFr: "Ministère responsable de la défense nationale et de la sécurité du territoire.",
                  defEn: 'Ministry responsible for national defense and territorial security.',
                  exampleFr: 'Le Ministère de la Défense Nationale a organisé un exercice militaire conjoint.',
                  exampleEn: 'The Ministry of National Defense organized a joint military exercise.'
              },
              {
                  fr: "Ministère de l'Intérieur",
                  en: 'Ministry of Interior',
                  defFr: "Ministère chargé de la sécurité intérieure et de l'administration territoriale.",
                  defEn: 'Ministry in charge of internal security and territorial administration.',
                  exampleFr: "Le Ministère de l'Intérieur a renforcé les mesures de sécurité.",
                  exampleEn: 'The Ministry of Interior has strengthened security measures.'
              },
              {
                  fr: 'Ministère de la Justice',
                  en: 'Ministry of Justice',
                  defFr: "Ministère responsable du système judiciaire et de l'application des lois.",
                  defEn: 'Ministry responsible for the judicial system and law enforcement.',
                  exampleFr: 'Le Ministère de la Justice a lancé une réforme du système pénitentiaire.',
                  exampleEn: 'The Ministry of Justice launched a reform of the prison system.'
              },
              {
                  fr: 'Ministère des Affaires Étrangères',
                  en: 'Ministry of Foreign Affairs',
                  defFr: "Ministère chargé des relations diplomatiques et de la politique étrangère.",
                  defEn: 'Ministry in charge of diplomatic relations and foreign policy.',
                  exampleFr: 'Le Ministère des Affaires Étrangères négocie de nouveaux accords commerciaux.',
                  exampleEn: 'The Ministry of Foreign Affairs is negotiating new trade agreements.'
              }
          ],
          'Economic Ministries': [
              {
                  fr: 'Ministère des Finances',
                  en: 'Ministry of Finance',
                  defFr: "Ministère responsable de la gestion des finances publiques et de la politique économique.",
                  defEn: 'Ministry responsible for public finance management and economic policy.',
                  exampleFr: 'Le Ministère des Finances a présenté le projet de loi de finances 2025.',
                  exampleEn: 'The Ministry of Finance presented the 2025 finance bill.'
              },
              {
                  fr: "Ministère de l'Industrie",
                  en: 'Ministry of Industry',
                  defFr: "Ministère chargé du développement industriel et de l'innovation technologique.",
                  defEn: 'Ministry in charge of industrial development and technological innovation.',
                  exampleFr: "Le Ministère de l'Industrie a lancé un programme de modernisation.",
                  exampleEn: 'The Ministry of Industry launched a modernization program.'
              }
          ],
          'Types of Legal/Official Documents': [
              {
                  fr: 'Lois & Décrets',
                  en: 'Laws & Decrees',
                  defFr: "Textes législatifs et réglementaires adoptés par le Parlement et le gouvernement.",
                  defEn: 'Legislative and regulatory texts adopted by Parliament and government.',
                  exampleFr: 'Les nouvelles lois et décrets entreront en vigueur le mois prochaine.',
                  exampleEn: 'The new laws and decrees will come into effect next month.'
              },
              {
                  fr: 'Réglementations',
                  en: 'Regulations',
                  defFr: "Ensemble des règles administratives régissant un domaine spécifique.",
                  defEn: 'Set of administrative rules governing a specific area.',
                  exampleFr: 'Les nouvelles réglementations environnementales sont plus strictes.',
                  exampleEn: 'The new environmental regulations are stricter.'
              },
              {
                  fr: 'Textes juridiques consolidés',
                  en: 'Consolidated Legal Texts',
                  defFr: "Version à jour d'un texte juridique intégrant toutes les modifications successives.",
                  defEn: 'Updated version of a legal text incorporating all successive modifications.',
                  exampleFr: 'La version consolidée du Code civil est disponible en ligne.',
                  exampleEn: 'The consolidated version of the Civil Code is available online.'
              }
          ]
      };
  
      const allTerms = [];
      Object.entries(termsData).forEach(([category, terms]) => {
          terms.forEach(term => {
              allTerms.push({
                  category: category,
                  ...term
              });
          });
      });
  
      // Language toggle functionality
      const langButtons = document.querySelectorAll('.lang-btn');
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      
      function setInitialLanguage(lang) {
          langButtons.forEach(btn => {
              btn.classList.toggle('active', btn.dataset.lang === lang);
          });
  
          document.querySelectorAll('.english, .french').forEach(el => {
              if (lang === 'en') {
                  el.style.display = el.classList.contains('english') ? 'block' : 'none';
              } else {
                  el.style.display = el.classList.contains('french') ? 'block' : 'none';
              }
          });
  
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
  
      setInitialLanguage(savedLanguage);
  
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
  
      const searchBtn = document.getElementById('searchGlossaryBtn');
      const searchModal = document.getElementById('searchModal');
      const searchInput = document.getElementById('searchInput');
      const searchResults = document.getElementById('searchResults');
      const closeModalButtons = document.querySelectorAll('.close-modal');
  
      function showTermDetail(term) {
          const termDetailModal = document.getElementById('termDetailModal');
          const termDetailTitle = document.getElementById('termDetailTitle');
          const termDetailContent = document.getElementById('termDetailContent');
          const activeModal = document.querySelector('.modal.active') || document.querySelector('.modal[style*="block"]');
          
          termDetailTitle.textContent = `${term.fr} – ${term.en}`;
          
          termDetailContent.innerHTML = `
              <div class="term-detail">
                  <div class="term-definition">
                      <h4>Définition (FR):</h4>
                      <p>${term.defFr || 'Définition non disponible'}</p>
                  </div>
                  
                  <div class="term-definition">
                      <h4>Definition (EN):</h4>
                      <p>${term.defEn || 'Definition not available'}</p>
                  </div>
                  
                  <div class="term-example">
                      <h4>Exemple d'usage / Example of use:</h4>
                      <div class="example-text">
                          FR: "${term.exampleFr || 'Exemple non disponible'}"
                      </div>
                      <div class="example-text">
                          EN: "${term.exampleEn || 'Example not available'}"
                      </div>
                  </div>
              </div>
          `;
          
          if (activeModal) activeModal.style.display = 'none';
          termDetailModal.style.display = 'block';
          if (overlay) overlay.style.display = 'block';
  
          const backBtn = termDetailModal.querySelector('.back-modal');
          backBtn.onclick = () => {
              termDetailModal.style.display = 'none';
              if (activeModal) activeModal.style.display = 'block';
              else if (overlay) overlay.style.display = 'none';
          };
      }
      window.showTermDetail = showTermDetail;
  
      // Log terminology bank usage
      document.querySelectorAll('.content-item, .download-option').forEach(item => {
          if (!item.id || (item.id !== 'searchGlossaryBtn' && !item.textContent.includes('Browse'))) {
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
  
                  showGeneralModal();
              });
          }
         
      });
  
      function showGeneralModal() {
          const generalModal = document.querySelector('.modal:not(#searchModal):not(#alphabeticalModal):not(#termDetailModal)');
          if(generalModal) {
              generalModal.classList.add('active');
              if (overlay) overlay.classList.add('active');
          }
      }
      
      function hideAllModals() {
          document.querySelectorAll('.modal').forEach(m => {
              m.style.display = 'none';
              m.classList.remove('active');
          });
          if (overlay) overlay.style.display = 'none';
      }
  
  
      closeModalButtons.forEach(btn => {
          btn.addEventListener('click', hideAllModals);
      });
  
      if (overlay) {
          overlay.addEventListener('click', hideAllModals);
      }
  
      // Search functionality
      function performSearch(query) {
          if (!query) {
              searchResults.innerHTML = '';
              return;
          }
  
          query = query.toLowerCase();
          const results = allTerms.filter(term => 
              term.fr.toLowerCase().includes(query) || 
              term.en.toLowerCase().includes(query)
          );
  
          if (results.length === 0) {
              searchResults.innerHTML = `
                  <div class="no-results">
                      <i class="fas fa-search"></i>
                      <p>No results found</p>
                  </div>
              `;
              return;
          }
  
          searchResults.innerHTML = results.map(term => `
              <div class="search-result-item" onclick="showTermDetail(${JSON.stringify(term).replace(/"/g, '&quot;')})">
                  <span class="result-fr">${term.fr}</span>
                  <span class="result-divider">→</span>
                  <span class="result-en">${term.en}</span>
              </div>
          `).join('');
      }
  
      if (searchBtn) {
          searchBtn.addEventListener('click', () => {
              searchModal.style.display = 'block';
              if (overlay) overlay.style.display = 'block';
              searchInput.focus();
          });
      }
  
      if (searchInput) {
          searchInput.addEventListener('input', (e) => {
              performSearch(e.target.value);
          });
      }
  
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
             hideAllModals();
          }
      });
  
      document.querySelectorAll('.content-box').forEach(box => {
          box.addEventListener('click', function() {
              const title = this.querySelector('.content-box-title').textContent;
              const terms = termsData[title];
              const modalEl = document.querySelector('.modal:not(#searchModal):not(#alphabeticalModal):not(#termDetailModal)');
              const modalTitleEl = modalEl.querySelector('.modal-title');
              const modalContentEl = modalEl.querySelector('.terms-list');
              
              if (terms) {
                  modalTitleEl.textContent = title;
                  modalContentEl.innerHTML = terms.map(term => `
                      <div class="term-item" onclick="showTermDetail(${JSON.stringify(term).replace(/"/g, '&quot;')})">
                          <span class="term-fr">${term.fr}</span>
                          <span class="term-divider">→</span>
                          <span class="term-en">${term.en}</span>
                      </div>
                  `).join('');
                  
                  modalEl.classList.add('active');
                  modalEl.style.display = 'block';
                  if (overlay) overlay.style.display = 'block';
              }
          });
      });
  
      // Replace the quizzes array with this expanded version:
      const quizzes = [
          {
              type: 'association',
              title: {
                  en: 'Match the French terms with their English translations:',
                  fr: 'Associez les termes français à leurs traductions anglaises :'
              },
              terms: {
                  fr: ['Journal Officiel', 'Arrêté ministériel', 'Assemblée Populaire'],
                  en: ['Official Gazette', 'Ministerial Order', "People's Assembly"]
              },
              correctPairs: [
                  [0, 0],
                  [1, 1],
                  [2, 2]
              ]
          },
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the administrative sentence:',
                  fr: 'Complétez la phrase administrative :'
              },
              sentence: {
                  fr: 'Le ______ n°23-12 précise les modalités de mise en œuvre du projet.',
                  en: 'Le ______ n°23-12 précise les modalités de mise en œuvre du projet.'
              },
              options: ['Note', 'Décret', 'Avis'],
              correctAnswer: 1,
              feedback: {
                  en: 'Well done! Decree = Décret',
                  fr: 'Bien joué ! Decree = Décret'
              }
          },
          {
              type: 'multipleChoice',
              title: {
                  en: 'Choose the correct translation:',
                  fr: 'Choisissez la bonne traduction :'
              },
              question: {
                  fr: '<< La circulaire précise les délais de réponse. >>',
                  en: '<< La circulaire précise les délais de réponse. >>'
              },
              options: [
                  'The circular clarifies the response deadlines.',
                  'The newsletter gives deadline instructions.',
                  'The article explains the reply conditions.'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Correct! "Circulaire" translates to "circular" in administrative context.',
                  fr: 'Correct ! "Circulaire" se traduit par "circular" dans un contexte administratif.'
              }
          },
          
          {
              type: 'association',
              title: {
                  en: 'Match the ministry names:',
                  fr: 'Associez les noms des ministères :'
              },
              terms: {
                  fr: [
                      'Ministère de la Justice',
                      'Ministère des Finances', 
                      'Ministère de la Défense',
                      'Ministère des Affaires Étrangères',
                      'Ministère de l\'Intérieur'
                  ],
                  en: [
                      'Ministry of Justice',
                      'Ministry of Finance',
                      'Ministry of Defense',
                      'Ministry of Foreign Affairs',
                      'Ministry of Interior'
                  ]
              },
              correctPairs: [
                  [0, 0],
                  [1, 1],
                  [2, 2],
                  [3, 3],
                  [4, 4]
              ]
          },
          {
              type: 'association',
              title: {
                  en: 'Match the institutions:',
                  fr: 'Associez les institutions :'
              },
              terms: {
                  fr: [
                      'Conseil Constitutionnel',
                      'Conseil de la Nation',
                      'Cour Suprême',
                      'Assemblée Populaire Nationale',
                      'Secrétariat Général du Gouvernement'
                  ],
                  en: [
                      'Constitutional Council',
                      'Council of the Nation', 
                      'Supreme Court',
                      'People\'s National Assembly',
                      'General Secretariat of Government'
                  ]
              },
              correctPairs: [
                  [0, 0],
                  [1, 1],
                  [2, 2],
                  [3, 3],
                  [4, 4]
              ]
          },
          
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the administrative term:',
                  fr: 'Complétez le terme administratif :'
              },
              sentence: {
                  fr: "Le ______ d'État a approuvé la proposition de loi.",
                  en: "Le ______ d'État a approuvé la proposition de loi."
              },
              options: ['Conseil', 'Bureau', 'Comité'],
              correctAnswer: 0,
              feedback: {
                  en: 'Excellent! Conseil = Council',
                  fr: 'Excellent ! Conseil = Council'
              }
          },
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the legal document type:',
                  fr: 'Complétez le type de document juridique :'
              },
              sentence: {
                  fr: 'La ______ ministérielle doit être signée par le ministre concerné.',
                  en: 'La ______ ministérielle doit être signée par le ministre concerné.'
              },
              options: ['Circulaire', 'Lettre', 'Note'],
              correctAnswer: 0,
              feedback: {
                  en: 'Perfect! Circulaire = Circular',
                  fr: 'Parfait ! Circulaire = Circular'
              }
          },
          
          {
              type: 'multipleChoice',
              title: {
                  en: 'Select the correct English equivalent:',
                  fr: 'Sélectionnez l\'équivalent anglais correct :'
              },
              question: {
                  fr: '<< Le décret présidentiel établit les nouvelles procédures. >>',
                  en: '<< Le décret présidentiel établit les nouvelles procédures. >>'
              },
              options: [
                  'The presidential decree establishes the new procedures.',
                  'The presidential order sets the new guidelines.',
                  'The presidential announcement defines the new protocols.'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Correct! "Décret présidentiel" translates to "presidential decree"',
                  fr: 'Correct ! "Décret présidentiel" se traduit par "presidential decree"'
              }
          },
          {
              type: 'multipleChoice',
              title: {
                  en: 'Choose the proper translation:',
                  fr: 'Choisissez la traduction appropriée :'
              },
              question: {
                  fr: '<< Le projet de loi a été adopté à l\'unanimité. >>',
                  en: '<< Le projet de loi a été adopté à l\'unanimité. >>'
              },
              options: [
                  'The bill was adopted unanimously.',
                  'The law project was voted for.',
                  'The legislation was approved by majority.'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Excellent! "À l\'unanimité" means "unanimously"',
                  fr: 'Excellent ! "À l\'unanimité" signifie "unanimously"'
              }
          },
          
          // Add these new fill in the blank quizzes:
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the administrative sentence:',
                  fr: 'Complétez la phrase administrative :'
              },
              sentence: {
                  fr: "La ______ interministérielle doit être signée par tous les ministres concernés.",
                  en: "La ______ interministérielle doit être signée par tous les ministres concernés."
              },
              options: ['Convention', 'Directive', 'Commission'],
              correctAnswer: 0,
              feedback: {
                  en: 'Excellent! Convention = Interministerial Convention',
                  fr: 'Excellent ! Convention = Convention interministérielle'
              }
          },
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the legal term:',
                  fr: 'Complétez le terme juridique :'
              },
              sentence: {
                  fr: "Un ______ de loi doit être approuvé par le Parlement.",
                  en: "Un ______ de loi doit être approuvé par le Parlement."
              },
              options: ['Projet', 'Document', 'Texte'],
              correctAnswer: 0,
              feedback: {
                  en: 'Correct! "Projet de loi" means "bill" or "draft law"',
                  fr: 'Correct ! "Projet de loi" signifie "bill" ou "draft law"'
              }
          },
          {
              type: 'fillBlank',
              title: {
                  en: 'Complete the administrative document type:',
                  fr: 'Complétez le type de document administratif :'
              },
              sentence: {
                  fr: "Le ______ de séance résume les points discutés lors de la réunion.",
                  en: "Le ______ de séance résume les points discutés lors de la réunion."
              },
              options: ['Procès-verbal', 'Rapport', 'Compte-rendu'],
              correctAnswer: 0,
              feedback: {
                  en: 'Perfect! "Procès-verbal" means "minutes" of a meeting',
                  fr: 'Parfait ! "Procès-verbal" signifie "minutes" d\'une réunion'
              }
          },
          
          // Add these new multiple choice quizzes:
          {
              type: 'multipleChoice',
              title: {
                  en: 'Choose the correct translation:',
                  fr: 'Choisissez la traduction correcte :'
              },
              question: {
                  fr: '<< Les dispositions de la présente loi entrent en vigueur dès sa publication. >>',
                  en: '<< Les dispositions de la présente loi entrent en vigueur dès sa publication. >>'
              },
              options: [
                  'The provisions of this law come into force upon its publication.',
                  'The arrangements of this law take effect after publication.',
                  'The measures of this law become active following publication.'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Correct! This is the standard legal translation',
                  fr: 'Correct ! C\'est la traduction juridique standard'
              }
          },
          {
              type: 'multipleChoice',
              title: {
                  en: 'Select the best translation:',
                  fr: 'Sélectionnez la meilleure traduction :'
              },
              question: {
                  fr: '<< Vu l\'avis conforme du Conseil d\'État... >>',
                  en: '<< Vu l\'avis conforme du Conseil d\'État... >>'
              },
              options: [
                  'Having regard to the conforming opinion of the Council of State...',
                  'Following the State Council\'s advice...',
                  'Given the State Council\'s recommendation...'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Correct! This is the formal administrative translation',
                  fr: 'Correct ! C\'est la traduction administrative formelle'
              }
          },
          {
              type: 'multipleChoice',
              title: {
                  en: 'Choose the proper translation:',
                  fr: 'Choisissez la traduction appropriée :'
              },
              question: {
                  fr: '<< Le Secrétaire Général est chargé de l\'exécution du présent arrêté. >>',
                  en: '<< Le Secrétaire Général est chargé de l\'exécution du présent arrêté. >>'
              },
              options: [
                  'The Secretary General is responsible for the implementation of this order.',
                  'The General Secretary will execute this decision.',
                  'The Secretary General must carry out this directive.'
              ],
              correctAnswer: 0,
              feedback: {
                  en: 'Excellent! This is the standard administrative formula',
                  fr: 'Excellent ! C\'est la formule administrative standard'
              }
          }
      ];
  
      function getRandomQuizzes(count = 3) {
          const quizzesByType = {
              association: quizzes.filter(q => q.type === 'association'),
              fillBlank: quizzes.filter(q => q.type === 'fillBlank'),
              multipleChoice: quizzes.filter(q => q.type === 'multipleChoice')
          };
          
          const selectedQuizzes = [];
          Object.values(quizzesByType).forEach(typeQuizzes => {
              const randomIndex = Math.floor(Math.random() * typeQuizzes.length);
              selectedQuizzes.push(typeQuizzes[randomIndex]);
          });
          
          return selectedQuizzes;
      }
  
      let currentQuizIndex = 0;
      let selectedAnswers = new Set();
      let currentAnswerCorrect = false;
  
      function initializeQuiz() {
          currentQuizIndex = 0;
          selectedAnswers = new Set();
          currentAnswerCorrect = false;
          
          window.currentQuizzes = getRandomQuizzes();
          
          const navigation = document.querySelector('.quiz-navigation');
          if (navigation) {
              navigation.style.display = 'flex';
          }
          
          const nextBtn = document.getElementById('nextQuestionBtn');
          if (nextBtn) {
              nextBtn.style.display = 'flex';
              nextBtn.disabled = true;
          }
          
          showCurrentQuiz();
          updateQuizProgress();
      }
  
      function showCurrentQuiz() {
          const quiz = window.currentQuizzes[currentQuizIndex];
          const quizContainer = document.getElementById('quizContainer');
          const currentLang = localStorage.getItem('preferredLanguage') || 'en';
          
          let quizHTML = '';
          
          switch(quiz.type) {
              case 'association':
                  // Create array of indices based on terms length
                  const indices = [...Array(quiz.terms.fr.length).keys()];
                  
                  // Shuffle the indices
                  shuffleArray(indices);
                  
                  // Create a second shuffled array for the English terms
                  const enIndices = [...indices];
                  shuffleArray(enIndices);
                  
                  // Use the shuffled indices to create the terms arrays
                  const shuffledFr = indices.map(i => quiz.terms.fr[i]);
                  const shuffledEn = enIndices.map(i => quiz.terms.en[i]);
                  
                  // Create a map of the new positions to original indices for checking answers
                  const frMap = {};
                  const enMap = {};
                  indices.forEach((orig, i) => frMap[orig] = i);
                  enIndices.forEach((orig, i) => enMap[orig] = i);
                  
                  quizHTML = `
                      <div class="quiz-question">
                          <h4>${quiz.title[currentLang]}</h4>
                          <div class="association-quiz">
                              <div class="terms-column french-terms">
                                  ${shuffledFr.map((term, i) => `
                                      <div class="term-card" data-index="${indices[i]}" data-side="fr">
                                          ${term}
                                      </div>
                                  `).join('')}
                              </div>
                              <div class="association-line"></div>
                              <div class="terms-column english-terms">
                                  ${shuffledEn.map((term, i) => `
                                      <div class="term-card" data-index="${enIndices[i]}" data-side="en">
                                          ${term}
                                      </div>
                                  `).join('')}
                              </div>
                          </div>
                          <div class="feedback-message"></div>
                      </div>
                  `;
                  break;
                  
              case 'fillBlank':
                  const shuffledOptions = [...quiz.options];
                  shuffleArray(shuffledOptions);
                  
                  // Create array of indices matching the shuffled options
                  const optionIndices = shuffledOptions.map(opt => quiz.options.indexOf(opt));
                  
                  quizHTML = `
                      <div class="quiz-question">
                          <h4>${quiz.title[currentLang]}</h4>
                          <div class="fill-blank-quiz">
                              <div class="fill-blank-sentence">
                                  ${quiz.sentence[currentLang]}
                              </div>
                              <div class="blank-options">
                                  ${shuffledOptions.map((option, i) => `
                                      <div class="blank-option" data-index="${optionIndices[i]}">
                                          ${option}
                                      </div>
                                  `).join('')}
                              </div>
                          </div>
                          <div class="feedback-message"></div>
                      </div>
                  `;
                  break;
                  
              case 'multipleChoice':
                  const shuffledChoices = [...quiz.options];
                  shuffleArray(shuffledChoices);
                  const choiceIndices = shuffledChoices.map(choice => quiz.options.indexOf(choice));
                  
                  quizHTML = `
                      <div class="quiz-question">
                          <h4>${quiz.title[currentLang]}</h4>
                          <p class="quiz-text">${quiz.question[currentLang]}</p>
                          <div class="multiple-choice-quiz">
                              ${shuffledChoices.map((option, i) => `
                                  <div class="quiz-option" data-index="${choiceIndices[i]}">
                                      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                                      ${option}
                                  </div>
                              `).join('')}
                          </div>
                          <div class="feedback-message"></div>
                      </div>
                  `;
                  break;
          }
          
          quizContainer.innerHTML = quizHTML;
          
          switch(quiz.type) {
              case 'association':
                  const terms = quizContainer.querySelectorAll('.term-card');
                  let selectedTerm = null;
                  
                  terms.forEach(term => {
                      term.addEventListener('click', () => {
                          if (selectedTerm === null) {
                              selectedTerm = term;
                              term.classList.add('selected');
                          } else {
                              const pair = [
                                  parseInt(selectedTerm.dataset.index),
                                  parseInt(term.dataset.index)
                              ];
                              
                              if (selectedTerm.dataset.side !== term.dataset.side) {
                                  checkAssociationAnswer(pair, selectedTerm, term);
                              }
                              
                              selectedTerm.classList.remove('selected');
                              selectedTerm = null;
                          }
                      });
                  });
                  break;
                  
              case 'fillBlank':
                  const options = quizContainer.querySelectorAll('.blank-option');
                  options.forEach(option => {
                      option.addEventListener('click', () => {
                          // Remove selected class from all options
                          options.forEach(opt => opt.classList.remove('selected'));
                          // Add selected class to clicked option
                          option.classList.add('selected');
                          // Check answer using the option's data-index
                          checkFillBlankAnswer(parseInt(option.dataset.index));
                      });
                  });
                  break;
                  
              case 'multipleChoice':
                  const choices = quizContainer.querySelectorAll('.quiz-option');
                  choices.forEach(choice => {
                      choice.addEventListener('click', () => {
                          choices.forEach(c => c.classList.remove('selected'));
                          choice.classList.add('selected');
                          checkMultipleChoiceAnswer(parseInt(choice.dataset.index));
                      });
                  });
                  break;
          }
      }
  
      function checkAssociationAnswer(pair, term1, term2) {
          const quiz = window.currentQuizzes[currentQuizIndex];
          const isCorrect = quiz.correctPairs.some(correctPair => 
              (correctPair[0] === pair[0] && correctPair[1] === pair[1]) ||
              (correctPair[0] === pair[1] && correctPair[1] === pair[0])
          );
          
          if (isCorrect) {
              term1.style.backgroundColor = '#e7f6e7';
              term2.style.backgroundColor = '#e7f6e7';
              term1.style.borderColor = '#81c784';
              term2.style.borderColor = '#81c784';
              selectedAnswers.add(pair.join('-'));
              
              if (selectedAnswers.size === quiz.correctPairs.length) {
                  showFeedback(true);
                  enableNextButton();
              }
          } else {
              term1.classList.add('shake');
              term2.classList.add('shake');
              
              setTimeout(() => {
                  term1.classList.remove('shake');
                  term2.classList.remove('shake');
                  term1.style.borderColor = '';
                  term2.style.borderColor = '';
                  term1.style.backgroundColor = '';
                  term2.style.backgroundColor = '';
              }, 500);
  
              const feedbackElement = document.querySelector('.feedback-message');
              if (feedbackElement) {
                  feedbackElement.className = 'feedback-message incorrect';
                  feedbackElement.innerHTML = `
                      <i class="fas fa-times-circle"></i> 
                      ${localStorage.getItem('preferredLanguage') === 'en' ? 
                          'Incorrect match. Try again!' : 
                          'Association incorrecte. Essayez encore !'}
                  `;
                  feedbackElement.style.display = 'block';
                  
                  setTimeout(() => {
                      feedbackElement.style.display = 'none';
                  }, 2000);
              }
          }
      }
  
      function checkFillBlankAnswer(answerIndex) {
          const quiz = window.currentQuizzes[currentQuizIndex];
          const isCorrect = answerIndex === quiz.correctAnswer;
          
          // Important: Find the actually selected option, not by index but by selected class
          const selectedOption = document.querySelector('.blank-option.selected');
          
          if (!isCorrect && selectedOption) {
              // Add error class only to the selected option
              selectedOption.classList.add('error');
              
              setTimeout(() => {
                  selectedOption.classList.remove('error');
              }, 500);
              
              const feedbackElement = document.querySelector('.feedback-message');
              if (feedbackElement) {
                  feedbackElement.className = 'feedback-message incorrect';
                  feedbackElement.innerHTML = `
                      <i class="fas fa-times-circle"></i> 
                      ${localStorage.getItem('preferredLanguage') === 'en' ? 
                          'Incorrect answer. Try again!' : 
                          'Réponse incorrecte. Essayez encore !'}
                  `;
                  feedbackElement.style.display = 'block';
                  
                  setTimeout(() => {
                      feedbackElement.style.display = 'none';
                  }, 2000);
              }
          } else if (isCorrect) {
              const feedbackElement = document.querySelector('.feedback-message');
              if (feedbackElement) {
                  feedbackElement.className = 'feedback-message correct';
                  feedbackElement.innerHTML = `
                      <i class="fas fa-check-circle"></i> 
                      ${quiz.feedback?.[localStorage.getItem('preferredLanguage') || 'en']}
                  `;
                  feedbackElement.style.display = 'block';
              }
              showFeedback(true);
              enableNextButton();
          }
      }
  
      function checkMultipleChoiceAnswer(answerIndex) {
          const quiz = window.currentQuizzes[currentQuizIndex];
          const isCorrect = answerIndex === quiz.correctAnswer;
          
          // Get the actual clicked element rather than using index
          const selectedChoice = document.querySelector('.quiz-option.selected');
          
          if (!isCorrect && selectedChoice) {
              // Add error class to the actually selected choice
              selectedChoice.classList.add('error');
              
              setTimeout(() => {
                  selectedChoice.classList.remove('error');
              }, 500);
              
              const feedbackElement = document.querySelector('.feedback-message');
              if (feedbackElement) {
                  feedbackElement.className = 'feedback-message incorrect';
                  feedbackElement.innerHTML = `
                      <i class="fas fa-times-circle"></i> 
                      ${localStorage.getItem('preferredLanguage') === 'en' ? 
                          'Incorrect choice. Try again!' : 
                          'Choix incorrect. Essayez encore !'}
                  `;
                  feedbackElement.style.display = 'block';
                  
                  // Only hide feedback for incorrect answers
                  setTimeout(() => {
                      feedbackElement.style.display = 'none';
                  }, 2000);
              }
          } else if (isCorrect) { // Add explicit check for correct answer
              showFeedback(true);
              enableNextButton();
              
              // Keep success feedback visible
              const feedbackElement = document.querySelector('.feedback-message');
              if (feedbackElement) {
                  feedbackElement.style.display = 'block';
              }
          }
      }
  
      function showFeedback(isCorrect) {
          const feedbackElement = document.querySelector('.feedback-message');
          const currentLang = localStorage.getItem('preferredLanguage') || 'en';
          const quiz = window.currentQuizzes[currentQuizIndex];
          
          feedbackElement.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
          feedbackElement.innerHTML = isCorrect ? 
              `<i class="fas fa-check-circle"></i> ${quiz.feedback?.[currentLang] || (currentLang === 'en' ? 'Correct!' : 'Correct !')}` :
              `<i class="fas fa-times-circle"></i> ${currentLang === 'en' ? 'Try again!' : 'Essayez encore !'}`;
          
          feedbackElement.style.display = 'block';
          currentAnswerCorrect = isCorrect;

          // Only hide incorrect feedback messages
          if (!isCorrect) {
              setTimeout(() => {
                  feedbackElement.style.display = 'none';
              }, 2000);
          }
          // Correct feedback messages stay visible until next question
      }
  
      function enableNextButton() {
          const nextBtn = document.getElementById('nextQuestionBtn');
          const navigation = document.querySelector('.quiz-navigation');
          
          if (nextBtn && navigation) {
              nextBtn.disabled = false;
              navigation.style.display = 'flex';
          }
      }
  
      function updateQuizProgress() {
          const currentNum = document.getElementById('currentQuestionNum');
          const totalNum = document.getElementById('totalQuestions');
          const progressFill = document.querySelector('.progress-fill');
          
          if (currentNum && totalNum && progressFill) {
              currentNum.textContent = currentQuizIndex + 1;
              totalNum.textContent = window.currentQuizzes.length;
              progressFill.style.width = `${((currentQuizIndex + 1) / window.currentQuizzes.length) * 100}%`;
          }
      }
  
      document.querySelectorAll('.content-item')[2].addEventListener('click', function() { 
          const quizModal = document.getElementById('quizModal');
          
          if (quizModal) {
              quizModal.style.display = 'block';
              if (overlay) overlay.style.display = 'block';
              
              initializeQuiz();
              
              const nextBtn = document.getElementById('nextQuestionBtn');
              const newNextBtn = nextBtn.cloneNode(true);
              nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
              
              newNextBtn.addEventListener('click', () => {
                  if (currentAnswerCorrect) {
                      currentQuizIndex++;
                      if (currentQuizIndex < window.currentQuizzes.length) {
                          showCurrentQuiz();
                          updateQuizProgress();
                          newNextBtn.disabled = true;
                          currentAnswerCorrect = false; 
                      } else {
                          const quizContainer = document.getElementById('quizContainer');
                          quizContainer.innerHTML = `
                              <div style="text-align: center; padding: 40px;">
                                  <i class="fas fa-trophy" style="font-size: 4rem; color: var(--primary-green);"></i>
                                  <h3 style="margin: 20px 0; color: var(--primary-green);">
                                      ${localStorage.getItem('preferredLanguage') === 'en' ? 
                                          'Congratulations! You\'ve completed the quiz!' : 
                                          'Félicitations ! Vous avez terminé le quiz !'}
                                  </h3>
                              </div>
                          `;
                          newNextBtn.style.display = 'none';
                          
                          const retryBtn = document.getElementById('retryQuizBtn');
                          if (retryBtn) {
                              retryBtn.addEventListener('click', () => {
                                  currentQuizIndex = 0;
                                  selectedAnswers = new Set();
                                  currentAnswerCorrect = false;
                                  showCurrentQuiz();
                                  updateQuizProgress();
                                  newNextBtn.style.display = 'flex';
                                  newNextBtn.disabled = true;
                                  document.querySelector('.quiz-navigation').style.display = 'flex';
                              });
                          }
                      }
                  }
              });
          }
      });
  
      const browseTermsBtn = document.querySelectorAll('.content-item')[1]; // Second item is browse
      if (browseTermsBtn) {
          browseTermsBtn.addEventListener('click', showAlphabeticalBrowser);
      }
  
      function showAlphabeticalBrowser() {
          const alphabeticalModal = document.getElementById('alphabeticalModal');
          const alphabeticalList = document.getElementById('alphabeticalList');
          const alphabetNav = alphabeticalModal.querySelector('.alphabet-nav');
          
          const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
          
          const sortedTerms = allTerms.sort((a, b) => a.fr.localeCompare(b.fr));
          
          const termsByLetter = {};
          sortedTerms.forEach(term => {
              const firstLetter = term.fr.charAt(0).toUpperCase();
              if (!termsByLetter[firstLetter]) {
                  termsByLetter[firstLetter] = [];
              }
              termsByLetter[firstLetter].push(term);
          });
  
          alphabetNav.innerHTML = alphabet.map(letter => {
              const hasTerms = !!termsByLetter[letter];
              return `<a href="#letter-${letter}" class="alphabet-letter ${!hasTerms ? 'disabled' : ''}">${letter}</a>`;
          }).join('');
  
          alphabetNav.querySelectorAll('a.alphabet-letter').forEach(link => {
              link.addEventListener('click', e => {
                  e.preventDefault();
                  const targetId = link.getAttribute('href');
                  const targetElement = alphabeticalList.querySelector(targetId);
                  if (targetElement) {
                      targetElement.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                      });
                  }
              });
          });
          
          alphabeticalList.innerHTML = alphabet.map(letter => {
              if (!termsByLetter[letter]) return '';
              
              return `
                  <div class="letter-section" id="letter-${letter}">
                      <h2 class="letter-header">${letter}</h2>
                      ${termsByLetter[letter].map(term => `
                          <div class="term-item" onclick="showTermDetail(${JSON.stringify(term).replace(/"/g, '&quot;')})">
                              <span class="term-fr">${term.fr}</span>
                              <span class="term-divider">→</span>
                              <span class="term-en">${term.en}</span>
                          </div>
                      `).join('')}
                  </div>
              `;
          }).join('');
          
          alphabeticalModal.style.display = 'block';
          if (overlay) overlay.style.display = 'block';
      }
  });