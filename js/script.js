// ==============================
// Récupération des éléments
// ==============================

const menuButtons = document.querySelectorAll(".menu-button");
const mainContent = document.querySelector(".main-content");


// ==============================
// Navigation entre les modules
// ==============================

menuButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const module = button.dataset.module;

    menuButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    afficherModule(module);
  });

});


// ==============================
// Affichage des modules
// ==============================

function afficherModule(module) {

  if (module === "accueil") {
    afficherAccueil();
  }

  if (module === "resume") {
    afficherResume();
  }

  if (module === "traduction") {
    afficherTraduction();
  }

  if (module === "chat") {
    afficherChat();
  }

  if (module === "prediction") {
    afficherPrediction();
  }

  if (module === "historique") {
    afficherHistorique();
  }

  if (module === "classification") {
    afficherClassification();
  }
}


// ==============================
// Accueil
// ==============================

function afficherAccueil() {

  mainContent.innerHTML = `
    <section class="welcome-section">
      <h1>Tableau de bord</h1>
      <p>
        Bienvenue sur votre espace de travail intelligent.
      </p>
    </section>
  `;
}


// ==============================
// Résumé de texte
// ==============================

function afficherResume() {

  mainContent.innerHTML = `
    <section class="module-section">

      <h1>Résumé de texte</h1>

      <p>
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