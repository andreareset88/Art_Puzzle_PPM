<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Puzzle Game</title>

    <link href="css/puzzle-game.css" rel="stylesheet">
    <script src="js/puzzle-game.js">

    </script>
</head>
<body class="bg-info">

<div id="collage">

    <?php
    echo "<h3>" . "Benvenuti " . strtoupper($_POST['user1']) . " e " . strtoupper($_POST['user2']) . " al Puzzle Game</h3>";
    ?>

    <hr/>

    <div id="mainPanel" style="padding: 5px; display: none">
        <h3 id="imageTitle"></h3>
        <div id="player1">

            <ul id="fillable" class="fillable">
            </ul>
            <div id="originalImageBox">
                <img id="originalImage"/>
                <div>

                    <!--<button class="popup" onclick="showRules()">
                        Mostra regole
                        <span class="popupText" id="popupRules">
                                    I 2 giocatori si sfidano nel comporre un puzzle che rappresenta la ricostruzione
                                dell'immagine proposta dal gioco. La partita tiene traccia del tempo impiegato:
                                il primo giocatore che completa il puzzle vince la partita, visualizzando una breve
                                descrizione dell'opera alla destra del puzzle.
                                Il tempo trascorso viene visualizzato nella parte inferiore della schermata.
                                Entrambi i giocatori possono richiedere di cambiare l'immagine da ricomporre.
                                </span>
                    </button>


                    <button id="beginGame" type="button" class="btn" onclick="start();">
                        Start
                    </button>


                    <button id="changedPhoto" type="button" class="btn" onclick="restart();">
                        Restart
                    </button>-->

                </div>
            </div>
            <ul id="sortable" class="sortable">
            </ul>

            <!--            <div class="vl"></div>-->
        </div>
        <div id="player2">
            <div id="originalImageBoxSecondPlayer">

                <img id="originalImageSecondPlayer"/>
            </div>
            <ul id="fillableSecondPlayer" class="fillableSecondPlayer">
            </ul>

            <ul id="sortableSecondPlayer" class="sortableSecondPlayer">
            </ul>
        </div>

    </div>

    <div id="currentTimeBox">
        Tempo impiegato: <span id="timerPanel"></span> secondi
    </div>

    <div id="numStepBox">
        Steps primo giocatore: <span id="stepPanel"></span>
    </div>
    <div id="numStepBoxSecondPlayer">
        Steps secondo giocatore: <span id="stepPanelSecondPlayer"></span>
    </div>

    <div id="buttons">
        <button id="rules" class="popup" onclick="showRules()">
            Mostra regole
            <span class="popupText" id="popupRules">
                    I 2 giocatori si sfidano nel comporre un puzzle che rappresenta la ricostruzione
                dell'immagine proposta dal gioco. La partita tiene traccia del tempo impiegato:
                il primo giocatore che completa il puzzle vince la partita, visualizzando una breve
                descrizione dell'opera alla destra del puzzle.
                Il tempo trascorso viene visualizzato nella parte inferiore della schermata.
                Entrambi i giocatori possono richiedere di cambiare l'immagine da ricomporre.
                </span>
        </button>

        <button id="changeThePhoto" type="button" class="btn" onclick="restart();">
            Restart
        </button>

    </div>


    <div id="endGame" style="display: none;">
        <div style="background-color: #f1580e; padding: 5px 10px 20px 10px; text-align: center; ">

            <h2 style="text-align: center">Game Over</h2>
            <br/>
            L'immagine è stata ricostruita correttamente!
            <br/>
            Titolo: <span id="imageTitle"></span>
            Steps: <span id="stepEnd"></span>
            <br/>
            Tempo impiegato: <span id="timerEnd"></span> secondi
        </div>
    </div>

    <span id="showEndGame" class="popupText">
    </span>


    <script>
        var images = [
            {src: 'images/David.jpg', title: 'David di Michelangelo'},
            {src: 'images/statue-of-libertyResized.jpg', title: 'Statua della Libertà'},
            {src: 'images/napoleone.jpg', title: 'Napoleone valica le Alpi'}
        ];

        window.onload = function () {
            puzzleGame.startGame(images, 4);
        }


        function start() {
            puzzleGame.startGame(images, 4);
        }

        function restart() {
            start();
        }

        function showRules() {
            var popup = document.getElementById("popupRules");
            popup.classList.toggle("show");
        }



    </script>
</div>

<?php
/*        echo "<center><h2>" . "Benvenuti " . strtoupper($_POST['user1']) . " e " . strtoupper($_POST['user2']) . "</center></h2>";
        */?>

<!--<img src="./images/David.jpg" alt="David di Michelangelo" width="250" height="270">
<img src="./images/Libertà.jpg" alt="Statua della Libertà" width="250" height="270">-->

<!--        <div id="test"></div>-->

<!--<script type="text/javascript">

    function showRules() {
        var popup = document.getElementById("popupRules");
        popup.classList.toggle("show");
    }


</script>-->

</body>
</html>