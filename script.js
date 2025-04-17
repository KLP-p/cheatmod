// Charger le fichier JSON contenant les cheats
fetch('cheats.json')
  .then(response => response.json())
  .then(data => {
    // Une fois le JSON chargé, créer les cheats dynamiquement
    loadCheats(data);
  })
  .catch(error => console.error('Erreur lors du chargement des cheats:', error));

// Fonction pour afficher les cheats sur la page
function loadCheats(cheats) {
    const cheatList = document.getElementById('cheatList');
    
    cheats.forEach(cheat => {
        const cheatDiv = document.createElement('div');
        cheatDiv.classList.add('cheat');
        cheatDiv.setAttribute('data-name', cheat.name.toLowerCase());
        cheatDiv.style.display = 'none'; // Initialement masqué

        cheatDiv.innerHTML = `
            <h2>${cheat.name}</h2>
            <p>${cheat.description}</p>
            <button onclick="downloadCheat('${cheat.file}')">Download</button>
        `;
        
        cheatList.appendChild(cheatDiv);
    });
}

// Fonction de recherche des cheats
function searchCheats() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cheats = document.querySelectorAll('.cheat');

    cheats.forEach(function(cheat) {
        let cheatName = cheat.getAttribute('data-name');
        if (cheatName.indexOf(input) > -1) {
            cheat.style.display = ''; // Affiche le cheat
        } else {
            cheat.style.display = 'none'; // Masque le cheat
        }
    });
}

// Fonction pour télécharger les cheats depuis le dossier "hack"
function downloadCheat(fileName) {
    const link = document.createElement('a');
    link.href = `hack/${fileName}`; // Chemin relatif vers le fichier dans le dossier "hack"
    link.download = fileName;
    link.click(); // Simule un clic pour démarrer le téléchargement
}