//API Call Options
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6ce45788bamshb1899499874cc3bp1c8ec3jsn1441744eec4b",
    "X-RapidAPI-Host": "api-formula-1.p.rapidapi.com",
  },
};

//Variables to run the getRacecNames function
let nYearArray = [];
let nYear = null;
var arrFormulaCircuits = [];
var arrFormulaPilots = [];
var arrPilotsComparison = [];

//Navbar Burger - Mobile
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  -(
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
        $target.style.transition = "all 400ms ease";
      });
    })
  );
});

// dropDownValue.onchange = onChange;
function onSelectingYear() {
  let dropDownValue = document.getElementById("select").value;
  dropDownValue = parseInt(dropDownValue);
  let nYear = dropDownValue;
  nYearArray.push(nYear);
  getRacecNames(nYearArray);
}

//JBE:Default options for the api, includes the credentials, and host to get the information
function getRacecNames(nYearArray) {
  var szUrlFormula1 =
    "https://api-formula-1.p.rapidapi.com/races?type=race&season=" +
    nYearArray[0];

  // // JBE:Fetch the information calling the api
  fetch(szUrlFormula1, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      arrFormulaCircuits = [];
      // JBE:Uncomment to debug reponse from api
      for (var i = 0; i < data.response.length; i++) {
        if (data.response[i].status === "Completed") {
          arrFormulaCircuits.push({
            nRaceYearId: data.response[i].id,
            szRaceName: data.response[i].circuit.name,
          });
        }
      }
      putCareerNames(arrFormulaCircuits);
      // console.log("Formula 1 Repo Issues \n----------", arrFormulaCircuits);
    })
    .catch((err) => console.error(err));
}

//Put Career names in the HTML Dropdown
function putCareerNames(arrFormulaCircuits) {
  document.querySelector("option[value=change-text-race]").text =
    "Ready to search Race";
  console.log(arrFormulaCircuits);
  for (let i = 0; i < arrFormulaCircuits.length; i++) {
    let dropDownValue = document.getElementById("select_race_name");
    let option = document.createElement("option");
    option.value = arrFormulaCircuits[i].szRaceName;
    option.text = arrFormulaCircuits[i].szRaceName;
    dropDownValue.add(option);
  }
}

//Select the career name from the dropdown
function onSelectingCareerName() {
  let dropDownValue = document.getElementById("select_race_name").value;
  let raceName = dropDownValue;
  console.log(raceName);
  var IDraceName = arrFormulaCircuits.find((o) => o.szRaceName === raceName);
  callPilotAPI(IDraceName.nRaceYearId);
}

//Get the Pilot values based on the race from the API
function callPilotAPI(IDraceName) {
  // JBE: Build the url to get a certain year of racing.
  var szUrlFormula1Rankings =
    "https://api-formula-1.p.rapidapi.com/rankings/races?race=" + IDraceName;

  //TODO: Check with Jorge if we can delete this, we already have these values in the first lines of codes
  const options2 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6ce45788bamshb1899499874cc3bp1c8ec3jsn1441744eec4b",
      "X-RapidAPI-Host": "api-formula-1.p.rapidapi.com",
    },
  };

  fetch(szUrlFormula1Rankings, options2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      arrFormulaPilots = [];
      for (var i = 0; i < data.response.length; i++) {
        arrFormulaPilots.push({
          nDriverId: data.response[i].driver.id,
          szDriverName: data.response[i].driver.name,
        });
      }
      console.log("Formula 1 Repo Issues \n----------", arrFormulaPilots);
      putPilotNames(arrFormulaPilots);
    })
    .catch((err) => console.error(err));
}

//Put Pilot names in the HTML Dropdown
function putPilotNames(arrFormulaPilots) {
  document.querySelector("option[value=change-text-pilot1]").text =
    "Ready to search Pilot";
  for (let i = 0; i < arrFormulaPilots.length; i++) {
    let dropDownValue = document.getElementById("select_pilot_name1");
    let option = document.createElement("option");
    option.value = arrFormulaPilots[i].szDriverName;
    option.text = arrFormulaPilots[i].szDriverName;
    dropDownValue.add(option);
  }
  document.querySelector("option[value=change-text-pilot2]").text =
    "Ready to search Pilot";
  for (let i = 0; i < arrFormulaPilots.length; i++) {
    let dropDownValue = document.getElementById("select_pilot_name2");
    let option = document.createElement("option");
    option.value = arrFormulaPilots[i].szDriverName;
    option.text = arrFormulaPilots[i].szDriverName;
    dropDownValue.add(option);
  }
}

//Select Pilot from Dropdown
function onSelectingPilot1() {
  //Selecting pilot1
  let dropDownValuePilot1 = document.getElementById("select_pilot_name1").value;
  let pilotName1 = dropDownValuePilot1;
  console.log(pilotName1);
  arrPilotsComparison.push(pilotName1);
}

function onSelectingPilot2() {
  //Selecting Pilot2
  let dropDownValuePilot2 = document.getElementById("select_pilot_name2").value;
  let pilotName2 = dropDownValuePilot2;
  console.log(pilotName2);
  arrPilotsComparison.push(pilotName2);
  userFinalAnswer()
}

//Ask the user if he/she wants to run the comparison
function userFinalAnswer() {
  const userFinalAnswerSection = document.getElementById("user-final-answer");
  const h2Title = document.createElement("h2");
  //Giving it a class of "subtitle"
  h2Title.classList.add("subtitle");
  //Creating text for h2Title
  const h2Text = document.createTextNode("Would you like to start the comparison?");
  //Apending h2Text to h2Title
  h2Title.appendChild(h2Text);
  //Apending h2Title to userFinalAnswerSection
  userFinalAnswerSection.append(h2Title);
  //Create button
  const button = document.createElement("button");
  //Giving it a class of "button"
  button.classList.add("button");
  button.classList.add("my-button");
  button.textContent = "Run Comparison"
  //giving it color background
  button.style.backgroundColor = "#e25a28";
  userFinalAnswerSection.append(button);
  button.onclick = function() {createComparisonDashboard()};
}

//-------- Pilot Section --------
function createComparisonDashboard() {
  const pilot1 = arrPilotsComparison[0];
  const pilot2 = arrPilotsComparison[1];
  console.log(pilot1)
  console.log(pilot2)
  //Grab pilot-section by ID
  const pilotSection = document.getElementById("pilot-section");
  //Create an H1 element
  //------------ H1 Section --------
  const h1Title = document.createElement("h1");
  //Giving it a class of "title" and "h1"
  h1Title.classList.add("title");
  h1Title.classList.add("h1");
  //Creating text for h1Title
  const h1Text = document.createTextNode("Pilot Comparison");
  //Apending h1Text to h1Title
  h1Title.appendChild(h1Text);
  //Apending h1Title to pilotSection
  pilotSection.append(h1Title);
  //-------- COMPARATIVE SQUARE --------
  //Creating father div (BULMA NEEDS)
  const divComparativeSectionFather = document.createElement("div");
  //giving classes to that div father
  divComparativeSectionFather.classList.add("container");
  divComparativeSectionFather.classList.add("is-max-desktop");
  //apending that div to the pilot-section
  pilotSection.append(divComparativeSectionFather);
  //Creating child div (BULMA NEEDS)
  const divComparativeSectionChild = document.createElement("div");
  //giving classes to that div child
  divComparativeSectionChild.classList.add("notification");
  divComparativeSectionChild.classList.add("is-primary");
  divComparativeSectionChild.style.backgroundColor = "#e25a28";
  //apending that div to the pilot-section
  pilotSection.append(divComparativeSectionChild);
  //-------- H2 Section --------
  //Creating Pilot 1 Section using h2 element
  const pilot1h2 = document.createElement("h2");
  //giving pilot1h2 a class of subtitle
  pilot1h2.classList.add("subtitle");
  //creating text for pilot1
  const textPilot1 = document.createTextNode(`${pilot1}`);
  //appending text to pitlot1h2
  pilot1h2.appendChild(textPilot1);
  //appending pilot to pilotSection
  divComparativeSectionChild.append(pilot1h2);
  //Creating Pilot 2 Section using h2 element
  const pilot2h2 = document.createElement("h2");
  //giving pilot1h2 a class of subtitle
  pilot2h2.classList.add("subtitle");
  //creating text for pilot1
  const textPilot2 = document.createTextNode(`${pilot2}`);
  //appending text to pitlot1h2
  pilot2h2.appendChild(textPilot2);
  //appending pilot to pilotSection
  divComparativeSectionChild.append(pilot2h2);
}

//TODO: Make some global variables to save Pilot Names and Pilot Race Name,
//Because Jorge's function will need them.
//Pilot Names
//Pilot Race Name
