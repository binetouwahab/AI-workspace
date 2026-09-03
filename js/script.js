

// ==============================
// Récupération des éléments
// ==============================

const menuButtons = document.querySelectorAll(".menu-button");
const mainContent = document.querySelector(".view");

// Sauvegarde du dashboard original
const dashboardContent = mainContent.innerHTML;



// ==============================
// Navigation entre les modules
// ==============================

menuButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const module = button.dataset.module;

    // Retirer active de tous les boutons
    menuButtons.forEach((item) => {
      item.classList.remove("active");
    });

    // Activer le bouton sélectionné
    button.classList.add("active");

    // Afficher le module
    afficherModule(module);

    // Sauvegarder le module actuel
    localStorage.setItem("moduleActif", module);
  });

});

// ==============================
// Affichage des modules
// ==============================

function afficherModule(module) {

  switch (module) {

    case "accueil":
      afficherAccueil();
      break;

    case "resume":
      afficherResume();
      break;

    case "traduction":
      afficherTraduction();
      break;

    case "chat":
      afficherChat();
      break;

    case "classification":
      afficherPrediction();
      break;


    case "historique":
      afficherHistorique();
      break;

    default:
      afficherAccueil();
  }
}


// ==============================
// Tableau de bord
// ==============================

function afficherAccueil() {

  // On remet le dashboard original
  mainContent.innerHTML = dashboardContent;
}


// ==============================
// Résumé de texte
// ==============================

function afficherResume() {

  mainContent.innerHTML = `
    <section class="module-section">

      <h1>Résumé de texte</h1>

      <p class="subtitle">
        Entrez un texte pour obtenir un résumé simulé.
      </p>

      <textarea
        id="resume-input"
        placeholder="Entrez votre texte ici..."
      ></textarea>

      <button id="resume-button">
        Résumer
      </button>

      <div id="resume-result" class="result-box">
        Le résumé apparaîtra ici.
      </div>

    </section>
  `;

  const button = document.querySelector("#resume-button");

  button.addEventListener("click", () => {

    const texte = document.querySelector("#resume-input").value;
    const result = document.querySelector("#resume-result");

    if (texte.trim() === "") {
      result.textContent = "Veuillez saisir un texte.";
      return;
    }

    result.textContent =
      "Résumé simulé : ce texte présente les idées principales du contenu fourni.";
  });
}




// tradution
function afficherTraduction() {

  mainContent.innerHTML = `
    <h1>Traduction</h1>

    <p class="subtitle">
      Entrez un texte et choisissez la langue de traduction.
    </p>

    <div class="module-section">

      <label for="traduction-input">
        Texte à traduire
      </label>

      <textarea
        id="traduction-input"
        placeholder="Entrez votre texte ici..."
      ></textarea>

      <label for="traduction-langue">
        Traduire vers
      </label>

      <select id="traduction-langue">
        <option value="en">Anglais</option>
        <option value="es">Espagnol</option>
        <option value="de">Allemand</option>
        <option value="it">Italien</option>
      </select>

      <button id="traduction-button">
        Traduire
      </button>

      <div class="result-box">
        <h2>Résultat</h2>

        <p id="traduction-result">
          La traduction apparaîtra ici.
        </p>
      </div>

    </div>
  `;

  const bouton = document.getElementById("traduction-button");

  bouton.addEventListener("click", traduireTexte);
}

async function traduireTexte() {
  const texte = document.getElementById("traduction-input").value;
  const langue = document.getElementById("traduction-langue").value;
  const resultat = document.getElementById("traduction-result");

  if (texte.trim() === "") {
    resultat.textContent = "Veuillez entrer un texte.";
    return;
  }

  resultat.textContent = "Traduction en cours...";

  try {
    const url =
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=fr|${langue}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de la traduction");
    }

    const data = await response.json();

    resultat.textContent =
      data.responseData.translatedText;

  } catch (error) {
    console.error(error);

    resultat.textContent =
      "Impossible d'effectuer la traduction.";
  }
}


// chatbot
function afficherChat() {
  mainContent.innerHTML = `
    <section class="chat-section">

      <div class="chat-header">
        <div>
          <h1>Chat IA</h1>
          <p>Discutez avec votre assistant IA.</p>
        </div>

        <div class="chat-status">
          <span class="status-dot"></span>
          IA en ligne
        </div>
      </div>

      <div class="chat-wrapper">

        <div id="chat-messages" class="chat-messages">

          <div class="message ai-message">
            <div class="message-avatar">IA</div>

            <div class="message-content">
              <div class="message-name">Assistant IA</div>
              <div class="message-bubble">
                Bonjour ! 👋<br><br>
                Je suis votre assistant IA. Comment puis-je vous aider ?
              </div>
            </div>
          </div>

        </div>

        <div class="chat-input-area">

          <div class="chat-input-wrapper">

            <textarea
              id="chat-input"
              rows="1"
              placeholder="Écrivez votre message..."
            ></textarea>

            <button id="chat-button" type="button">
              <span>➤</span>
            </button>

          </div>

          <p class="chat-hint">
            Entrée pour envoyer · Shift + Entrée pour aller à la ligne
          </p>

        </div>

      </div>

    </section>
  `;

  const chatInput = document.querySelector("#chat-input");
  const chatButton = document.querySelector("#chat-button");
  const chatMessages = document.querySelector("#chat-messages");

  function ajouterMessage(message, type) {

    const messageElement = document.createElement("div");

    if (type === "user") {
      messageElement.className = "message user-message";

      messageElement.innerHTML = `
        <div class="message-content">
          <div class="message-name">Vous</div>
          <div class="message-bubble">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `;
    }

    if (type === "ai") {
      messageElement.className = "message ai-message";

      messageElement.innerHTML = `
        <div class="message-avatar">IA</div>

        <div class="message-content">
          <div class="message-name">Assistant IA</div>

          <div class="message-bubble">
            ${message}
          </div>
        </div>
      `;
    }

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function envoyerMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
      return;
    }

    // Affichage du message utilisateur
    ajouterMessage(message, "user");

    // Vider le champ
    chatInput.value = "";

    // Réponse simulée
    setTimeout(() => {

      ajouterMessage(
        "Je comprends votre demande. Ceci est une réponse simulée de l’intelligence artificielle.",
        "ai"
      );

    }, 700);
  }

  // Bouton envoyer
  chatButton.addEventListener("click", envoyerMessage);

  // Entrée = envoyer
  chatInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      envoyerMessage();
    }

  });

  // Agrandir automatiquement le textarea
  chatInput.addEventListener("input", () => {

    chatInput.style.height = "auto";

    chatInput.style.height =
      Math.min(chatInput.scrollHeight, 150) + "px";

  });

  // Focus automatique
  chatInput.focus();
}




// 
// ==============================
// Prédiction
// ==============================

function afficherPrediction() {

  mainContent.innerHTML = `
    <section class="module-section">

      <h1>Prédiction</h1>

      <p class="subtitle">
        Entrez les informations nécessaires pour obtenir une prédiction fictive.
      </p>

      <div class="prediction-form">

        <div class="form-group">
          <label for="prediction-age">Âge</label>

          <input
            type="number"
            id="prediction-age"
            placeholder="Entrez votre âge"
          />
        </div>

        <div class="form-group">
          <label for="prediction-revenu">Revenu</label>

          <input
            type="number"
            id="prediction-revenu"
            placeholder="Entrez votre revenu"
          />
        </div>

        <div class="form-group">
          <label for="prediction-ville">Ville</label>

          <input
            type="text"
            id="prediction-ville"
            placeholder="Entrez votre ville"
          />
        </div>

        <button
          id="prediction-button"
          type="button"
        >
          Prédire
        </button>

      </div>

      <div
        id="prediction-result"
        class="result-box"
      >
        La prédiction apparaîtra ici.
      </div>

    </section>
  `;


  const ageInput =
    document.querySelector("#prediction-age");

  const revenuInput =
    document.querySelector("#prediction-revenu");

  const villeInput =
    document.querySelector("#prediction-ville");

  const button =
    document.querySelector("#prediction-button");

  const result =
    document.querySelector("#prediction-result");


  button.addEventListener("click", function () {

    const age =
      ageInput.value.trim();

    const revenu =
      revenuInput.value.trim();

    const ville =
      villeInput.value.trim();


    // Vérification des champs
    if (
      age === "" ||
      revenu === "" ||
      ville === ""
    ) {

      result.textContent =
        "Veuillez remplir tous les champs.";

      return;
    }


    // ==============================
    // PRÉDICTION SIMULÉE
    // ==============================

    const prediction =
      "Profil susceptible d'effectuer un achat prochainement.";


    // ==============================
    // AFFICHER LE RÉSULTAT
    // ==============================

    result.innerHTML = `

      <h2>Résultat de la prédiction</h2>

      <p>
        <strong>Âge :</strong>
        ${age} ans
      </p>

      <p>
        <strong>Revenu :</strong>
        ${revenu}
      </p>

      <p>
        <strong>Ville :</strong>
        ${ville}
      </p>

      <p class="prediction-message">

        <strong>Prédiction :</strong>
        ${prediction}

      </p>

    `;


    // ==============================
    // ENREGISTRER DANS L'HISTORIQUE
    // ==============================

    enregistrerRequete(
      "Prédiction",
      `Âge : ${age}, Revenu : ${revenu}, Ville : ${ville}`,
      prediction
    );

    console.log("Prédiction enregistrée dans l'historique");

  });

}



// ==============================
// HISTORIQUE
// ==============================

// Récupérer l'historique depuis le navigateur
function recupererHistorique() {
  return JSON.parse(
    localStorage.getItem("historique")
  ) || [];
}


// ==============================
// ENREGISTRER UNE REQUÊTE
// ==============================

function enregistrerRequete(type, requete, resultat) {

  const historique = recupererHistorique();

  const nouvelleRequete = {
    id: Date.now(),
    type: type,
    requete: requete,
    resultat: resultat,
    date: new Date().toLocaleString("fr-FR")
  };

  historique.push(nouvelleRequete);

  localStorage.setItem(
    "historique",
    JSON.stringify(historique)
  );
}


// ==============================
// AFFICHER LE MODULE HISTORIQUE
// ==============================

function afficherHistorique() {

  mainContent.innerHTML = `

    <section class="module-section history-section">

      <div class="history-header">

        <div>
          <h1>Historique</h1>

          <p class="subtitle">
            Consultez et gérez vos requêtes précédentes.
          </p>
        </div>

        <button
          id="clear-history-button"
          class="clear-history-button"
          type="button"
        >
          Vider l'historique
        </button>

      </div>


      <!-- Recherche -->

      <div class="history-search">

        <input
          type="text"
          id="history-search-input"
          placeholder="Rechercher une requête..."
        />

      </div>


      <!-- Liste -->

      <div id="history-list">
      </div>

    </section>

  `;


  // Affichage initial
  afficherListeHistorique();


  // ==============================
  // RECHERCHE
  // ==============================

  const searchInput =
    document.querySelector("#history-search-input");

  searchInput.addEventListener("input", function () {

    afficherListeHistorique(
      this.value
    );

  });


  // ==============================
  // VIDER L'HISTORIQUE
  // ==============================

  const clearButton =
    document.querySelector("#clear-history-button");

  clearButton.addEventListener("click", function () {

    const historique =
      recupererHistorique();

    if (historique.length === 0) {
      return;
    }

    const confirmation = confirm(
      "Voulez-vous vraiment vider tout l'historique ?"
    );

    if (!confirmation) {
      return;
    }

    localStorage.removeItem("historique");

    afficherListeHistorique();

  });

}


// ==============================
// AFFICHER LA LISTE
// ==============================

function afficherListeHistorique(recherche = "") {

  const historyList =
    document.querySelector("#history-list");


  if (!historyList) {
    return;
  }


  const historique =
    recupererHistorique();


  const texteRecherche =
    recherche.toLowerCase().trim();


  // Filtrer les résultats
  const resultats =
    historique.filter(function (element) {

      return (

        element.type
          .toLowerCase()
          .includes(texteRecherche)

        ||

        element.requete
          .toLowerCase()
          .includes(texteRecherche)

        ||

        element.resultat
          .toLowerCase()
          .includes(texteRecherche)

      );

    });


  // ==============================
  // AUCUN RÉSULTAT
  // ==============================

  if (resultats.length === 0) {

    historyList.innerHTML = `

      <div class="empty-history">

        <div class="empty-history-icon">
          🕘
        </div>

        <h3>Aucune requête trouvée</h3>

        <p>
          Votre historique apparaîtra ici
          après vos premières requêtes.
        </p>

      </div>

    `;

    return;
  }


  // ==============================
  // AFFICHER LES REQUÊTES
  // ==============================

  historyList.innerHTML = resultats
    .slice()
    .reverse()
    .map(function (element) {

      return `

        <article class="history-item">

          <div class="history-item-content">

            <div class="history-top">

              <span class="history-type">
                ${element.type}
              </span>

              <span class="history-date">
                ${element.date}
              </span>

            </div>


            <div class="history-query">

              <span class="history-label">
                Requête
              </span>

              <p>
                ${element.requete}
              </p>

            </div>


            <div class="history-result">

              <span class="history-label">
                Résultat
              </span>

              <p>
                ${element.resultat}
              </p>

            </div>

          </div>


          <button
            class="delete-history-button"
            data-id="${element.id}"
            type="button"
          >
            Supprimer
          </button>

        </article>

      `;

    })
    .join("");


  // ==============================
  // SUPPRIMER UNE REQUÊTE
  // ==============================

  document
    .querySelectorAll(".delete-history-button")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        const id =
          Number(this.dataset.id);

        supprimerRequete(id);

      });

    });

}


// ==============================
// SUPPRIMER UNE REQUÊTE
// ==============================

function supprimerRequete(id) {

  const historique =
    recupererHistorique();


  const nouvelHistorique =
    historique.filter(function (element) {

      return element.id !== id;

    });


  localStorage.setItem(
    "historique",
    JSON.stringify(nouvelHistorique)
  );


  afficherListeHistorique();

}



























// ==============================
// Restaurer le module après actualisation
// ==============================

const dernierModule = localStorage.getItem("moduleActif");

if (dernierModule) {

  // Afficher le dernier module
  afficherModule(dernierModule);

  // Mettre le bouton correspondant en active
  menuButtons.forEach((button) => {

    if (button.dataset.module === dernierModule) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

  });
}