var timer;

var puzzleGame = {
    stepsNumber: 0,
    stepsNumberSecondPlayer: 0,
    startTime: new Date().getTime(),

    startGame: function (images, gridSize, user1, user2) {
        this.setImage(images, gridSize, user1, user2);
        helper.doc('mainPanel').style.display = 'block';
        helper.shuffle('sortable');
        helper.shuffle('sortableSecondPlayer');

        this.stepsNumber = 0;
        this.stepsNumberSecondPlayer = 0;
        this.startTime = new Date().getTime();
        this.clock();
    },

    clock: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - puzzleGame.startTime) / 1000, 10);
        helper.doc('timerPanel').innerHTML = elapsedTime;
        timer = setTimeout(puzzleGame.clock, 1000);
    },

    setImage: function (images, gridSize = 4, user1, user2) {
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        var imageSecondPlayer = images[Math.floor(Math.random() * images.length)];
        helper.doc('originalImage').setAttribute('src', image.src);
        helper.doc('originalImageSecondPlayer').setAttribute('src', imageSecondPlayer.src);
        helper.doc('sortable').innerHTML = '';
        helper.doc('sortableSecondPlayer').innerHTML = '';
        helper.doc('fillable').innerHTML = '';
        helper.doc('fillableSecondPlayer').innerHTML = '';
        for(var i = 0; i < (gridSize * gridSize); i++){
            var posX = (percentage * (i % gridSize)) + '%';
            var posY = (percentage * Math.floor(i / gridSize)) + '%';
            var posYVerticalShift = (percentage * Math.floor(i / gridSize)) + 500 + '%';
            var posXHorizontalShift = (percentage * (i % gridSize)) + 720 + '%';

            // Creazione della tabella con celle vuote, dove andranno inseriti i pezzi
            // dell'immagine
            let fillableLi = document.createElement('li');
            let FiId = 'F'.concat(i.toString());
            fillableLi.id = FiId;
            fillableLi.setAttribute('data-value', FiId);
            fillableLi.style.backgroundSize = (gridSize * 100) + '%';
            fillableLi.style.backgroundPosition = posX + ' ' + posY;
            fillableLi.style.width = 300 / gridSize + 'px';
            fillableLi.style.height = 300 / gridSize + 'px';

            fillableLi.setAttribute('draggable', 'true');

            // Creazione tabella con pezzi dell'immagine disordinata

            let sortableLi = document.createElement('li');
            sortableLi.id = i;
            sortableLi.setAttribute('data-value', i);
            sortableLi.style.backgroundImage = 'url(' + image.src + ')';
            sortableLi.style.backgroundSize = (gridSize * 100) + '%';
            sortableLi.style.backgroundPosition = posX + ' ' + posYVerticalShift;
            sortableLi.style.width = 300 / gridSize + 'px';
            sortableLi.style.height = 300 / gridSize + 'px';

            sortableLi.setAttribute('draggable', 'true');

            // Creazione della tabella con celle vuote, dove andranno inseriti i pezzi
            // dell'immagine
            let fillableLiSecondPlayer = document.createElement('li');
            let FiIdSecondPlayer = 'FS'.concat(i.toString());
            fillableLiSecondPlayer.id = FiIdSecondPlayer;
            fillableLiSecondPlayer.setAttribute('data-value', FiIdSecondPlayer);
            fillableLiSecondPlayer.style.backgroundSize = (gridSize * 100) + '%';
            fillableLiSecondPlayer.style.backgroundPosition = posXHorizontalShift + ' ' + posY;
            fillableLiSecondPlayer.style.width = 300 / gridSize + 'px';
            fillableLiSecondPlayer.style.height = 300 / gridSize + 'px';

            fillableLiSecondPlayer.setAttribute('draggable', 'true');

            // Creazione tabella con pezzi dell'immagine disordinata

            let sortableLiSecondPlayer = document.createElement('li');
            let sortableLiSecondPlayerId = 'S'.concat(i.toString());
            sortableLiSecondPlayer.id = sortableLiSecondPlayerId;
            sortableLiSecondPlayer.setAttribute('data-value', sortableLiSecondPlayerId);
            sortableLiSecondPlayer.style.backgroundImage = 'url(' + imageSecondPlayer.src + ')';
            sortableLiSecondPlayer.style.backgroundSize = (gridSize * 100) + '%';
            sortableLiSecondPlayer.style.backgroundPosition = posXHorizontalShift + ' ' + posYVerticalShift;
            sortableLiSecondPlayer.style.width = 300 / gridSize + 'px';
            sortableLiSecondPlayer.style.height = 300 / gridSize + 'px';

            sortableLiSecondPlayer.setAttribute('draggable', 'true');

            // TODO:
            //       1) Impostare connessione db per php aggiunta descrizione
            //       2) Ricontrollare immagini sfalsate: integrare qui php4x4Backup.html
            //       3) test schermi
            //       4) Pulsante start in mainPage.php
            //       5) Fare match al meglio di 3 (se possibile), quindi una volta che un giocatore
            //          arriva a 2 si inizia una nuova partita

            sortableLi.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            fillableLi.ondragover = (event) => event.preventDefault();
            fillableLi.ondrop = (event) => {
                let source = helper.doc(event.dataTransfer.getData('data'));
                let destination = helper.doc(event.target.id);
                let p = destination.parentNode;

                if (source && destination && p) {

                    let data = event.dataTransfer.getData('data');
                    event.target.appendChild(document.getElementById(data));


                    let valuesId = Array.from(helper.doc('sortable').children).map(x => x.id);
                    var now = new Date().getTime();
                    let incrementedStep = ++puzzleGame.stepsNumber;
                    helper.doc('stepPanel').innerHTML = incrementedStep;

                    if (isImageSorted(valuesId)) {
                        helper.doc('winner').innerHTML = user1.toString();
                        helper.doc('imageTitle').innerHTML = image.title;
                        helper.doc('timerEnd').innerHTML = (parseInt((now - puzzleGame.startTime) / 1000, 10));
                        helper.doc('stepEnd').innerHTML = incrementedStep;
                        helper.doc('showEndGame').innerHTML = helper.doc('endGame').innerHTML;
                        document.getElementById('sortable').setAttribute('style', 'display:none');

                        for (var j=0; j<(gridSize*gridSize); j++){
                            document.getElementById('F'.concat(j.toString())).setAttribute('draggable', 'false');
                            document.getElementById('F'.concat(j.toString())).ondragstart = "return false;";
                            document.getElementById('F'.concat(j.toString())).ondrop = "return false;";
                            document.getElementById('S'.concat(j.toString())).setAttribute('draggable', 'false');
                            document.getElementById('S'.concat(j.toString())).ondragstart = "return false;";
                            document.getElementById('S'.concat(j.toString())).ondrop = "return false;";
                        }

                        document.getElementById('currentTimeBox').setAttribute('style', 'display:none');
                        document.getElementById('numStepBox').setAttribute('style', 'display:none');
                        document.getElementById('numStepBoxSecondPlayer').setAttribute('style', 'display:none');
                    }
                }
            };

            // GESTIONE DRAG & DROP SECONDO GIOCATORE

            sortableLiSecondPlayer.ondragstart = (event) => event.dataTransfer.setData('data', event.target.id);
            fillableLiSecondPlayer.ondragover = (event) => event.preventDefault();
            fillableLiSecondPlayer.ondrop = (event) => {
                let source = helper.doc(event.dataTransfer.getData('data'));
                let destination = helper.doc(event.target.id);
                let p = destination.parentNode;

                if (source && destination && p) {

                    let data = event.dataTransfer.getData('data');
                    event.target.appendChild(document.getElementById(data));


                    let valuesIdSecondPlayer = Array.from(helper.doc('sortableSecondPlayer').children).map(x => x.id);
                    var now = new Date().getTime();
                    let incrementedStepSecondPlayer = ++puzzleGame.stepsNumberSecondPlayer;
                    helper.doc('stepPanelSecondPlayer').innerHTML = incrementedStepSecondPlayer;

                    if (isImageSorted(valuesIdSecondPlayer)) {
                        helper.doc('winner').innerHTML = user2.toString();
                        helper.doc('imageTitle').innerHTML = imageSecondPlayer.title;
                        helper.doc('timerEnd').innerHTML = (parseInt((now - puzzleGame.startTime) / 1000, 10));
                        helper.doc('stepEnd').innerHTML = incrementedStepSecondPlayer;
                        helper.doc('showEndGame').innerHTML = helper.doc('endGame').innerHTML;
                        document.getElementById('sortableSecondPlayer').setAttribute('style', 'display:none');

                        for (var k=0; k<(gridSize*gridSize); k++){
                            document.getElementById('FS'.concat(k.toString())).setAttribute('draggable', 'false');
                            document.getElementById('FS'.concat(k.toString())).ondragstart = "return false;";
                            document.getElementById('FS'.concat(k.toString())).ondrop = "return false;";
                            document.getElementById(k.toString()).setAttribute('draggable', 'false');
                            document.getElementById(k.toString()).ondragstart = "return false;";
                            document.getElementById(k.toString()).ondrop = "return false;";
                        }

                        document.getElementById('currentTimeBox').setAttribute('style', 'display:none');
                        document.getElementById('numStepBox').setAttribute('style', 'display:none');
                        document.getElementById('numStepBoxSecondPlayer').setAttribute('style', 'display:none');
                    }
                }
            };

            sortableLi.setAttribute('dragstart', 'true');
            sortableLiSecondPlayer.setAttribute('dragstart', 'true');
            fillableLi.setAttribute('dragstart', 'true');
            fillableLiSecondPlayer.setAttribute('dragstart', 'true');
            helper.doc('sortable').appendChild(sortableLi);
            helper.doc('sortableSecondPlayer').appendChild(sortableLiSecondPlayer);
            helper.doc('fillable').appendChild(fillableLi);
            helper.doc('fillableSecondPlayer').appendChild(fillableLiSecondPlayer);

        }
        helper.shuffle('sortable');
        helper.shuffle('sortableSecondPlayer');
        helper.shuffle('fillable');
        helper.shuffle('fillableSecondPlayer');
    }

};

isImageSorted = (idsList) =>
    idsList.every((id, index) => {
        return id == index;
    });

var helper = {
    doc: (id) => document.getElementById(id) || document.createElement("div"),

    shuffle: (id) => {
        var ul = document.getElementById(id);
        for (var i = ul.children.length; i >= 0; i--){
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
}