var APIURL = "https://ergast.com/api/f1/current/driverStandings.json"

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
    alert('Unable to connect to OpenWeather');
  });    

function getStandings (data) {
  
  for (i=0; i < data.MRData.StandingsTable.StandingsLists[0].DriverStandings.length; i++){
    var table = document.getElementById("table");
    var line = document.createElement("tr");
    table.append(line);

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