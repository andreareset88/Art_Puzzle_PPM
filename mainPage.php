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

            <span id="showEndGame" class="popupText">
            </span>

        </div>
        <div id="player2">
            <div id="originalImageBoxSecondPlayer">

                <img id="originalImageSecondPlayer"/>
            </div>
            <ul id="fillableSecondPlayer" class="fillableSecondPlayer">
            </ul>

            <ul id="sortableSecondPlayer" class="sortableSecondPlayer">
            </ul>

            <span id="showEndGame" class="popupText">
            </span>

        </div>

    </div>

    <div id="currentTimeBox">
        Tempo impiegato: <span id="timerPanel"></span> secondi
    </div>

    <div id="numStepBox">
        Steps eseguiti da <?php echo strtoupper($_POST['user1']) ?>: <span id="stepPanel"></span>
    </div>
    <div id="numStepBoxSecondPlayer">
        Steps eseguiti da <?php echo strtoupper($_POST['user2']) ?>: <span id="stepPanelSecondPlayer"></span>
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
            <span id="winner"></span> vince la partita!
            <br/>
            L'immagine è stata ricostruita correttamente!
            <br/>
            Titolo: <span id="imageTitle"></span>
            <br/>
            Steps: <span id="stepEnd"></span>
            <br/>
            Tempo impiegato: <span id="timerEnd"></span> secondi
        </div>
    </div>


    <script>
        var images = [
            {src: 'images/David-Resized.jpg', title: 'David di Michelangelo'},
            {src: 'images/statue-of-libertyResized.jpg', title: 'Statua della Libertà'},
            {src: 'images/napoleone-Resized.jpg', title: 'Napoleone valica le Alpi'}
        ];

        window.onload = function () {
            puzzleGame.startGame(images, 4, "<?php echo strtoupper($_POST['user1']) ?>", "<?php echo strtoupper($_POST['user2']) ?>");
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

</body>
</html>