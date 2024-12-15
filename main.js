let showPots = document.getElementById("show-pots")
let hidePots = document.getElementById("hide-pots")
let PotsContainer = document.querySelector(".pots-container")
let potsEls = document.querySelectorAll(".pot")
let startBtn = document.querySelector("#start-btn")
let groups = document.querySelectorAll(".group")

// Show & Hide Pots Container Popup
showPots.addEventListener("click" , ()=> PotsContainer.classList.add("active"))
hidePots.addEventListener("click" , ()=> PotsContainer.classList.remove("active"))

// Pots to be drawn
let Pots = {
    "Pot1" : [
        "Real Madrid",
        "Barcelona" , 
        "Man City" , 
        "Liverpool"
    ],
    "Pot2" : [
        "Atletico",
        "Chelsea" , 
        "Arsenal" , 
        "Bayern"
    ],
    "Pot3" : [
        "Alahly",
        "Raja ca" , 
        "Al hilal" , 
        "Inter"
    ],
    "Pot4" : [
        "Dortmund",
        "Wydad" , 
        "inter Miami" , 
        "Alnasr"
    ]
}
const SavedPots = JSON.parse(JSON.stringify(Pots));
// Creating Pots html elements from Pots Object
potsEls.forEach((pot, i)=>{
    pot.innerHTML =  `
            <table class="pot" border="1">
                    <thead>
                        <tr><td>Pot ${i+1}</td></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${Pots[`Pot${i+1}`][0]}</td>
                        </tr>
                        <tr>
                            <td>${Pots[`Pot${i+1}`][1]}</td>
                        </tr>
                        <tr>
                            <td>${Pots[`Pot${i+1}`][2]}</td>
                        </tr>
                        <tr>
                            <td>${Pots[`Pot${i+1}`][3]}</td>
                        </tr>
                    </tbody>
                </table>
        `
})


// Starting draw function
const StartDraw = ()=>{
    // Loops into Groups to create draw
    groups.forEach((group , i) =>{
        // Accessing Each Pot list by random index
        let pot1_index = Math.floor(Math.random() * Pots["Pot1"].length)
        let pot2_index = Math.floor(Math.random() * Pots["Pot2"].length)
        let pot3_index = Math.floor(Math.random() * Pots["Pot3"].length)
        let pot4_index = Math.floor(Math.random() * Pots["Pot4"].length)
        // Creating Groups 1 team from each pot (total : 4) 
        group.innerHTML = 
        `
        <h3>Group ${i+1}</h3>
        <ul class="group-teams">
            <li>${Pots["Pot1"][pot1_index]}</li>
            <li>${Pots["Pot2"][pot2_index]}</li>
            <li>${Pots["Pot3"][pot3_index]}</li>
            <li>${Pots["Pot4"][pot4_index]}</li>
        </ul>
        `
        // Removing Choosed Team from pot
        Pots["Pot1"].splice(pot1_index , 1)
        Pots["Pot2"].splice(pot2_index , 1)
        Pots["Pot3"].splice(pot3_index , 1)
        Pots["Pot4"].splice(pot4_index , 1)
    })
    // reset pots to start draw again
    Pots = JSON.parse(JSON.stringify(SavedPots));
}

// Starting draw proccess on click event
startBtn.addEventListener("click" , StartDraw)