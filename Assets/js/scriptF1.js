// ######################################################################
// Variable declaraitons
// ######################################################################
var arrFormulaCircuits = [];
// ######################################################################
// STEP !: Get all races from a determine year.
// ######################################################################

//Get year selected by the user.
var nYear = 2022

// JBE: Build the url to get a certain year of racing.
var szUrlFormula1 = 'https://api-formula-1.p.rapidapi.com/races?type=race&season='+ nYear;

// JBE:Default options for the api, includes the credentials, and host to get the information
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6ce45788bamshb1899499874cc3bp1c8ec3jsn1441744eec4b',
		'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
	}
};

// JBE:Fetch the information calling the api
fetch(szUrlFormula1, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    arrFormulaCircuits = [];
    let race = {
        nRaceYearId: '',
        szRaceName: ''
      };
    // console.log("aqui", data.response)
    // console.log("aqui", data.response[1].circuit.id)
    // console.log('Formula 1 Repo Issues \n----------');
    for (var i = 0; i < data.response.length; i++) {
    //   console.log("aqui", data.response[i].id)
    //   console.log("aqui", data.response[i].circuit.name)
    //   console.log("aqui", data.response[i].status)
      if (data.response[i].status === "Completed") {
        let race = {
            nRaceYearId: '',
            szRaceName: ''
          };
        race.nRaceYearId =  data.response[i].id;
        race.szRaceName = data.response[i].circuit.name;
        console.log("race",race);
        console.log("race",race.nRaceYearId);
        console.log("race",race.szRaceName);
        arrFormulaCircuits.push(race);
        // arrFormulaCircuits.push({nRaceYearId:data.response[i].id, szRaceName:data.response[i].circuit.name});
      }
    }
    console.log('Formula 1 Repo Issues \n----------', arrFormulaCircuits);
  })
  .catch(err => console.error(err));
