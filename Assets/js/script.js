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
  document.querySelector("option[value=change-text-race]").text = "Ready to search Race";
  console.log(arrFormulaCircuits);
  for (let i=0; i<arrFormulaCircuits.length; i++) {
    let dropDownValue = document.getElementById("select_race_name");
    let option = document.createElement("option");
    option.value = arrFormulaCircuits[i].szRaceName;
    option.text = arrFormulaCircuits[i].szRaceName;;
    dropDownValue.add(option);
  }
}

//Select the career name from the dropdown
function onSelectingCareerName() {
  let dropDownValue = document.getElementById("select_race_name").value;
  let raceName = dropDownValue;
  console.log(raceName)
  var IDraceName = arrFormulaCircuits.find(o => o.szRaceName === raceName)
  console.log(IDraceName.nRaceYearId)
  callPilotAPI(IDraceName.nRaceYearId)
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
      putPilotNames(arrFormulaPilots)
      console.log("Formula 1 Repo Issues \n----------", arrFormulaPilots);
    })
    .catch((err) => console.error(err));
}

//Put Pilot names in the HTML Dropdown
function putPilotNames(arrFormulaPilots) {
  document.querySelector("option[value=change-text-pilot1]").text = "Ready to search Pilot"
  for (let i=0; i<arrFormulaPilots.length; i++) {
    let dropDownValue = document.getElementById("select_pilot_name1");
    let option = document.createElement("option");
    option.value = arrFormulaPilots[i].szDriverName;
    option.text = arrFormulaPilots[i].szDriverName;;
    dropDownValue.add(option);
  }
  document.querySelector("option[value=change-text-pilot2]").text = "Ready to search Pilot"
  for (let i=0; i<arrFormulaPilots.length; i++) {
    let dropDownValue = document.getElementById("select_pilot_name2");
    let option = document.createElement("option");
    option.value = arrFormulaPilots[i].szDriverName;
    option.text = arrFormulaPilots[i].szDriverName;;
    dropDownValue.add(option);
  }
}

//TODO: Make some global variables to save Pilot Names and Pilot Race Name,
//Because Jorge's function will need them.
//Pilot Names
//Pilot Race Name