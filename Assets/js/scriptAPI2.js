// API #2 
var APIURL = "https://ergast.com/api/f1/current/driverStandings.json"

// Call for current F1 driver standings 
fetch(APIURL)
.then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      console.log(data);
      getStandings(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })
  .catch(function (error) {
    alert('Unable to connect to Formula One API');
  });    

// Obtains data and creates table for standings 
function getStandings (data) {
  
  // Creates table rows with F1 information about current standings
  for (var i=0; i < data.MRData.StandingsTable.StandingsLists[0].DriverStandings.length; i++){
    var table = document.getElementById("table");
    var line = document.createElement("tr");
    line.id = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;
    table.append(line);
    
    
    // When a row is clicked, the image of the selected pilot is displayed 
    document.getElementById(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName).addEventListener("click", function showDriverInfo () {
          
      for (var t = 0; t < 21; t++) {  
          document.getElementById(data.MRData.StandingsTable.StandingsLists[0].DriverStandings[t].Driver.familyName + "-img").style.display = "none";
      }
      
      document.getElementById(this.id + "-img").style.display = "block";
    });

    var position = document.createElement("td");
    position.textContent = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].position;
    line.append(position);
    
    var driver = document.createElement("td");
    driver.textContent = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName + " " + data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName;
    line.append(driver);

    var points = document.createElement("td");
    points.textContent = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points;
    line.append(points);

    var wins = document.createElement("td");
    wins.textContent = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins;
    line.append(wins);
  }
  
};




// Slide Show.
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}





      
      
      
     

                            
                            


// szRaceTime:data.response[i].time
// szTeamName: data.response[i].team.name
// urlTeamLogo: data.response[i].team.logo