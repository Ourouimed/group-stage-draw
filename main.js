// HTML Element References
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
    Pot1: [
        { name: "Morocco", flag: "assets/flags/ma.webp" },
        { name: "Senegal", flag: "assets/flags/sn.webp" },
        { name: "Egypt", flag: "assets/flags/eg.webp" },
        { name: "Algeria", flag: "assets/flags/dz.webp" },
        { name: "Nigeria", flag: "assets/flags/ng.webp" },
        { name: "Ivory Coast", flag: "assets/flags/ci.webp" }
    ],
    Pot2: [
        { name: "Cameroon", flag: "assets/flags/cm.webp" },
        { name: "Mali", flag: "assets/flags/ml.webp" },
        { name: "Tunisia", flag: "assets/flags/tn.webp" },
        { name: "South Africa", flag: "assets/flags/za.webp" },
        { name: "Burkina Faso", flag: "assets/flags/bf.webp" },
        { name: "DR Congo", flag: "assets/flags/cd.webp" }
    ],
    Pot3: [
        { name: "Gabon", flag: "assets/flags/ga.webp" },
        { name: "Angola", flag: "assets/flags/ao.webp" },
        { name: "Zambia", flag: "assets/flags/zm.webp" },
        { name: "Equatorial Guinea", flag: "assets/flags/gq.webp" },
        { name: "Uganda", flag: "assets/flags/ug.webp" },
        { name: "Benin", flag: "assets/flags/bj.webp" }
    ],
    Pot4: [
        { name: "Mozambique", flag: "assets/flags/mz.webp" },
        { name: "Comoros", flag: "assets/flags/km.webp" },
        { name: "Tanzania", flag: "assets/flags/tz.webp" },
        { name: "Sudan", flag: "assets/flags/sd.webp" },
        { name: "Zimbabwe", flag: "assets/flags/zw.webp" },
        { name: "Botswana", flag: "assets/flags/bw.webp" }
    ]
};

// Save a copy to reset the draw
const SavedPots = structuredClone(Pots);

// Create Pots HTML Elements
potsEls.forEach((pot, i) => {
    let thead = `<thead><tr><td>Pot ${i + 1}</td></tr></thead>`;
    let tbody = Pots[`Pot${i + 1}`].map(team => `<tr><td><img alt="${team.name}" src="${team.flag}"> ${team.name}</td></tr>`).join("");
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

    // Destructure Pots
    const { Pot1, Pot2, Pot3, Pot4 } = Pots;

    // Handle Group 1 explicitly to place Morocco
    let group1 = groups[0]; // First group

    // Randomly select other teams for Group 1
    let pot1_index = 0
    let pot2_index = Math.floor(Math.random() * Pot2.length);
    let pot3_index = Math.floor(Math.random() * Pot3.length);
    let pot4_index = Math.floor(Math.random() * Pot4.length);
    group1.innerHTML = `
        <h3>Group 1</h3>
        <ul class="group-teams">
            <li><img src="${Pot1[pot1_index].flag}" alt="${Pot1[pot1_index].name}">${Pot1[pot1_index].name}</li>
            <li><img src="${Pot2[pot2_index].flag}" alt="${Pot2[pot2_index].name}">${Pot2[pot2_index].name}</li>
            <li><img src="${Pot3[pot3_index].flag}" alt="${Pot3[pot3_index].name}">${Pot3[pot3_index].name}</li>
            <li><img src="${Pot4[pot4_index].flag}" alt="${Pot4[pot4_index].name}">${Pot4[pot4_index].name}</li>
        </ul>
    `;
    Pot1.splice(pot1_index, 1)
    Pot2.splice(pot2_index, 1)
    Pot3.splice(pot3_index, 1)
    Pot4.splice(pot4_index, 1)

    // Handle the remaining groups
    groups.forEach((group, i) => {
        if (i === 0) return; // Skip Group 1

        let pot1_index = Math.floor(Math.random() * Pot1.length);
        let pot2_index = Math.floor(Math.random() * Pot2.length);
        let pot3_index = Math.floor(Math.random() * Pot3.length);
        let pot4_index = Math.floor(Math.random() * Pot4.length);

        group.innerHTML = `
        <h3>Group ${i + 1}</h3>
        <ul class="group-teams">
            <li><img src="${Pot1[pot1_index].flag}" alt="${Pot1[pot1_index].name}">${Pot1[pot1_index].name}</li>
            <li><img src="${Pot2[pot2_index].flag}" alt="${Pot2[pot2_index].name}">${Pot2[pot2_index].name}</li>
            <li><img src="${Pot3[pot3_index].flag}" alt="${Pot3[pot3_index].name}">${Pot3[pot3_index].name}</li>
            <li><img src="${Pot4[pot4_index].flag}" alt="${Pot4[pot4_index].name}">${Pot4[pot4_index].name}</li>
        </ul>
    `;
    Pot1.splice(pot1_index, 1)
    Pot2.splice(pot2_index, 1)
    Pot3.splice(pot3_index, 1)
    Pot4.splice(pot4_index, 1)

    });

    // Reset Pots for another draw
    Object.assign(Pots, structuredClone(SavedPots));
};

// Start draw process on button click
startBtn.addEventListener("click", StartDraw);
