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