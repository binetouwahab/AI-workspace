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

    // Ajouter active uniquement au bouton cliqué
    button.classList.add("active");

    // Afficher le module
    afficherModule(module);
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

    case "historique":
      afficherHistorique();
      break;

    case "classification":
      afficherClassification();
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