let villeChoisie;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    position => {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

      let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
      requete.open("GET", url); // Nous récupérons juste des données
      requete.responseType = "json"; // Nous attendons du JSON
      requete.send(); // Nous envoyons notre requête

      // Dès qu'on reçoit une réponse, cette fonction est executée
      requete.onload = function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
          if (requete.status === 200) {
            let reponse = requete.response;
            // console.log(reponse);
            let temperature = reponse.main.temp;
            let ville = reponse.name;
            // console.log(temperature);
            $("#temperature_label").text(temperature);
            $("#ville").text(ville) 
          } else {
            alert("Un problème est intervenu, merci de revenir plus tard.");
          }
        }
      };
    },
    erreur,
    options
  );

  var options = {
    enableHighAccuracy: true
  };
} else {
  villeChoisie = "Bamako";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector("#changer");
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous voir ?");
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Bamako";
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open("GET", url); // Nous récupérons juste des données
  requete.responseType = "json"; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        // console.log(temperature);
        $("#temperature_label").text(temperature);
        $("#ville").text(ville);
      } else {
        alert("Un problème est intervenu, merci de revenir plus tard.");
      }
    }
  };
}
let changerCv = $("#autrecv");
let cvActuel= $("#cv");
let titreCV = $("#titreCV");

changerCv.on('click', ()=>{
  let html =['<a href="/images/js.jpg"><img class="col-md-12" src="/images/js.jpg" alt="cv"></a>',
  '<a href="/images/java.jpg"><img class="col-md-12" src="/images/java.jpg" alt="cv"></a>',
  '<a href="">Revenir en arrière</a>'
 ];
  for (let i = 0; i < html.length; i++) {
    
    cvActuel.html(html)[i];
    titreCV.text("Mes certificats");
  }
})

