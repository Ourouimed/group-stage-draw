let showPots = document.getElementById("show-pots");
let hidePots = document.getElementById("hide-pots");
let PotsContainer = document.querySelector(".pots-container");
let potsEls = document.querySelectorAll(".pot");
let startBtn = document.querySelector("#start-btn");
let groupGrid = document.querySelector(".group-grid");

// Show & Hide Pots Container Popup
showPots.addEventListener("click", () => PotsContainer.classList.add("active"));
hidePots.addEventListener("click", () => PotsContainer.classList.remove("active"));

// Pots to be drawn
let Pots = {
    Pot1: ["Real Madrid", "Barcelona", "Man City", "Liverpool", "Atletico", "Chelsea", "Arsenal", "Bayern"],
    Pot2: ["PSG", "Inter Milan", "Juventus", "Napoli", "Dortmund", "RB Leipzig", "Wydad", "Sevilla"],
    Pot3: ["AC Milan", "Tottenham", "Benfica", "Ajax", "Marseille", "Lazio", "Al Hilal", "Inter Miami"],
    Pot4: ["Galatasaray", "Celtic", "Rangers", "Feyenoord", "Red Star Belgrade", "Al Nasr", "Raja CA", "Al Ahly"]
};

// Save a copy to reset the draw
const SavedPots = structuredClone(Pots);

// Create Pots HTML Elements
potsEls.forEach((pot, i) => {
    let thead = `<thead><tr><td>Pot ${i + 1}</td></tr></thead>`;
    let tbody = Pots[`Pot${i + 1}`].map(team => `<tr><td>${team}</td></tr>`).join("");
    pot.innerHTML = thead + `<tbody>${tbody}</tbody>`;
});

// Create Groups dynamically
for (let i = 0; i < Pots.Pot1.length; i++) {
    let group = document.createElement("div");
    group.className = "group";
    group.innerHTML = `<h3>Group ${i + 1}</h3>`;
    groupGrid.append(group);
}

// Start Draw Function
const StartDraw = () => {
    let groups = document.querySelectorAll(".group");

    groups.forEach((group, i) => {
        // Destructure Pots and get random indexes
        const { Pot1, Pot2, Pot3, Pot4 } = Pots;

        let pot1_index = Math.floor(Math.random() * Pot1.length);
        let pot2_index = Math.floor(Math.random() * Pot2.length);
        let pot3_index = Math.floor(Math.random() * Pot3.length);
        let pot4_index = Math.floor(Math.random() * Pot4.length);

        // Update group content
        group.innerHTML = `
            <h3>Group ${i + 1}</h3>
            <ul class="group-teams">
                <li>${Pot1.splice(pot1_index, 1)}</li>
                <li>${Pot2.splice(pot2_index, 1)}</li>
                <li>${Pot3.splice(pot3_index, 1)}</li>
                <li>${Pot4.splice(pot4_index, 1)}</li>
            </ul>
        `;
    });

    // Reset Pots for another draw
    Object.assign(Pots, structuredClone(SavedPots));
};

// Start draw process on button click
startBtn.addEventListener("click", StartDraw);
