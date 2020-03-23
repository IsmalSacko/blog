        // Initialisation des variables dans le formaulaire de validation

        $('#navBody').css('backgroundColor','darkseagreen');
        $('.nav-link').css('color','black');
        var largeur = document.getElementById('largeur');
        var hauteur = document.getElementById('hauteur');
        var nbErreurs = document.getElementById('nbErreurs');
        var nbFigure = document.getElementById('nbFigure');

        var validation = document.getElementById('jouer');
        validation.addEventListener('click', validerFormulaire);
        nbErreurs.addEventListener('change', champTemp);
        var interval;
        msgapres= document.innerHTML=' secondes pour trouver toutes les erreurs !';
        // La fonction qui va traiter et valide les valeur saisies dans le formaulaire
        function validerFormulaire(e) {
            e.preventDefault();
            monJeu = {
                width: largeur.value,
                height: hauteur.value,
                nbErreurs: nbErreurs.value,
                temps: 1000,
                figures: [nbFigure.value]
            }
            lancerJeu();            
            temps = document.getElementById('temps');
            counter = temps.value;
            clearInterval(interval);
            // Ici, on a la fonction setinterval, qui va s'occuper du chronomètre de du jeux
            interval = setInterval (function () {
                counter--;
                var tempsCourant = document.getElementById("timer");
                
                if(counter<10){
                    
                tempsCourant.innerHTML = 'Il vous reste '+ '0'+counter+msgapres;
                document.getElementById('timer').style.backgroundColor='red';
                document.getElementById('timer').style.marginLeft='30%';
                
                }else{
                    

                tempsCourant.innerHTML = 'Il vous reste'+ counter+msgapres;
                document.getElementById('timer').style.backgroundColor='lightgrey';
                document.getElementById('timer').style.marginLeft='30%';
                
                }
                var distance = counter;
                // Quand le temps est à 0, le chrono s'arrête, un message d'alert se declenche, les images du
                // jeux disparaissent et l'affichage du temps.
                if (distance == 0) {
                    clearInterval(interval);
                     alert('vous avez perdu');
                     document.getElementById('image').innerHTML="";
                     document.getElementById('image-clone').innerHTML="";
                     document.getElementById('form').classList.remove('nepaAficher');
                     document.getElementById('timer').classList.add('nepaAficher');
                
                }
                },1000);

        }
        function champTemp() {
            temps.value = nbErreurs.value * 10;
            document.getElementById("temps").disabled = true;
        }
        // C'est notre fonction qui lancer le jeux
        function lancerJeu() {
            document.getElementById('form').classList.add('nepaAficher');

            function enter() {
                event.target.setAttribute("fill-opacity", "0.7");
            }
            function out() {
                event.target.setAttribute("fill-opacity", "1");
            }

            var myRandom = (function () {
                var x0 = Math.ceil(Math.random() * 300);
                var m = Math.pow(2, 31) - 1;
                return {
                    init: function (s) {
                        x0 = s;
                    },
                    next: function () {
                        x0 = (x0 * 16807) % m;
                        return x0;
                    },
                    range: function (min, max) {
                        return this.next() % (max - min + 1) + min;
                    }
                }
            })();
            colors = ["red", "blue", "green", "yellow", "grey", "pink", "brown"];
            // La fonction qui crée l'image svg en lice
            function createLine(width, height) {
                line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute("x1", myRandom.range(1, width));
                line.setAttribute("y1", myRandom.range(1, height));
                line.setAttribute("x2", myRandom.range(1, width));
                line.setAttribute("x2", myRandom.range(1, height));
                line.setAttribute("stroke", colors[myRandom.range(0, colors.length - 1)]);
                line.setAttribute("stroke-width", myRandom.range(1, 4));
                return line.outerHTML;
            }
            /*La fonction qui crée le cercle en svg
             */
            function createCircle(width, height) {
                circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute("cx", myRandom.range(1, width));
                circle.setAttribute("cy", myRandom.range(1, height));
                circle.setAttribute("r", myRandom.range(1, 100));
                circle.setAttribute("fill", colors[myRandom.range(0, colors.length - 1)]);
                circle.setAttribute("stroke", colors[myRandom.range(0, colors.length - 1)]);
                circle.setAttribute("stroke-width", myRandom.range(1, 4));
                return circle.outerHTML;
            }
            /*
                La fonction qui crée le rectangle en svg           
             */
            function createRectangle(width, height) {
                rect=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute("width", myRandom.range(1, width));
                rect.setAttribute("height", myRandom.range(1, height));
                rect.setAttribute("fill", colors[myRandom.range(0, colors.length-1)]);
                rect.setAttribute("stroke", colors[myRandom.range(0, colors.length-1)]);
                rect.setAttribute("stroke-width", myRandom.range(1, 4));
                return rect.outerHTML;
                }
                /*La fonction qui crée le polygon en svg
                */
                function createPolygon(width, height) {
                polygon=document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                polygon.setAttribute("width", myRandom.range(1, width));
                polygon.setAttribute("height", myRandom.range(1, height));
                polygon.setAttribute("points", "100,90 70,198 190,78 10,78 160,198");
                polygon.setAttribute("fill", colors[myRandom.range(0, colors.length-1)]);
                polygon.setAttribute("stroke", colors[myRandom.range(0, colors.length-1)]);
                polygon.setAttribute("stroke-width", myRandom.range(1, 4));
                return polygon.outerHTML;
                }

            figureCreation = [createLine, createCircle,createRectangle,createPolygon ];
            for (i = 0; i < nbFigure.value; i++) {
                monJeu.figures.push({
                    forme: figureCreation[myRandom.range(0, figureCreation.length - 1)](monJeu.
                        width, monJeu.height)
                });
            }
           
            obj = {}
            obj.height = "200px";
            obj.width = "200px";
            obj.nbErreurs = 1;
            obj.figures = [];
            obj.figures.push({ forme: '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' }, { forme: '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />' });
            function createSVG(objetJson) {
                svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', objetJson.width);
                svg.setAttribute('height', objetJson.height);
                for (i = 0; i < objetJson.figures.length; i++) {
                    svg.innerHTML += objetJson.figures[i].forme;
                }
                document.getElementById('image').innerHTML = "";
                document.getElementById('image').appendChild(svg);
                clone = svg.cloneNode(true);
                fils = clone.getElementsByTagName('*');
                for (i = 0; i < fils.length; i++) {
                    fils[i].erreur = false;
                    fils[i].addEventListener("click", test);
                    fils[i].addEventListener("mouseenter", enter);
                    fils[i].addEventListener("mouseout", out);
                }
                i = objetJson.nbErreurs;
                while (i) {
                    el = myRandom.range(0, fils.length - 1);
                    if (!fils[el].erreur) {
                        fils[el].erreur = true;
                        if (fils[el].nodeName == "circle") {
                            r = fils[el].getAttribute("r");
                            r *= 1.5;   //1.2
                            fils[el].setAttribute("r", r);
                        }
                        else if (fils[el].nodeName == "line") {
                            strokeWidth = fils[el].getAttribute("stroke-width");
                            strokeWidth = 7;
                            fils[el].setAttribute("stroke-width", strokeWidth);
                        }
                        else
                            fils[el].setAttribute("fill", "grey");
                        i--;
                    }
                }
                document.getElementById('image-clone').appendChild(clone);
            }
           
            var countErreur = nbErreurs.value;
            // Cette fonction nous permet de d'effacer l'erreur si l'on clique après l'avoir detecter
            function test() {
                //alert('Bien joué');
                if (event.target.erreur) {
                    event.target.parentNode.removeChild(event.target);
                    event.target.erreur = false;
                    countErreur--;
                    if (countErreur == 0) {
                        clearInterval(interval);
                        alert("Vous avez gagnez !!!");
                        document.getElementById('image').innerHTML="";
                     document.getElementById('image-clone').innerHTML="";
                     document.getElementById('form').classList.remove('nepaAficher');
                     document.getElementById('timer').classList.add('nepaAficher');
                        
                    }
                }
                else
                    alert("Ceci n'est pas une erreur");
                console.log(event.target);
            }
            createSVG(monJeu); 
            
            // getJson('http://richard-ostrowski.eu/ADMS/fig1.php');
        }
       
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }

      