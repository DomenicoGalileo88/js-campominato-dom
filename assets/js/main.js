/* 
Consegna 2

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando:
 il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS: 1
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/

//L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata

// Genera una griglia attraverso una funzione
/**
 * Genera una griglia
 * @param {string} selettore selettore
 * @param {string} nome_tag nome del tag
 * @param {string} nome_classe nome della classe
 * @param {number} difficolta numero limite di elementi
 */
function generaGriglia(selettore, nome_tag, nome_classe, difficolta) {
    const cellsElement = document.querySelector(selettore);

    cellsElement.innerHTML = ''; //Pulizia celle

    for (let i = 1; i <= difficolta; i++) {
        const cellItem = document.createElement(nome_tag);
        cellItem.classList.add(nome_classe);
        cellItem.innerHTML = i;
        cellsElement.append(cellItem);
    }
};

// Funzione che seleziona un elemento e gli aggiunge una classe al click su una cella
/**
 * Funzione che attiva una classe al click su una cella
 * @param {string} selettore selettore
 * @param {string} classe_attivata classe che vuoi aggiungere
 * @param {string} classe_bomba ulteriore classe che vuoi aggiungere
 * 
 */
function selectElements(selettore, classe_attivata, classe_bomba) {
    const cells = document.querySelectorAll(selettore);
    //generateBombNumber();
    //console.log(generateBombNumber());
    let bombNumber = generateBombNumber();
    console.log(bombNumber);

    const bomb = function () {
        // identifico il numero della cella 
        let cellNumber = parseInt(this.textContent);
        //console.log(cellNumber);

        // se la lista che contiene i numeri delle posizioni delle bombe include il numero della cella cliccata, allora aggiungi classe bomb , ossia la cella diventa rossa
        if (bombNumber.includes(cellNumber)) {
            this.classList.add(classe_bomba);
            this.innerHTML = 'Boom';
            alert('Game over');
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                cell.removeEventListener('click', bomb);
            };
        } else {
            this.classList.add(classe_attivata);
        }
    }

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.addEventListener('click', bomb);
    };
};

// quando clicca su play

// richiamo il bottone attraverso l'id
let play = document.getElementById('play');
// quando clicco 
play.addEventListener('click', function (event) {
    // prevenire il comportamento di defoult che ricarica la pagina
    event.preventDefault();

    // dichiaro una costante che mi restituisce il valore del select (difficoltà)
    const difficolta_selezionata = document.getElementById('difficolta').value;
    //console.log(limite);

    // Dichiaro una variabile a cui viene assegnato il valore della difficoltà in base alla scelta dell'utente
    let livello_difficolta = difficolta();

    //Evoco la funzione che genera una griglia
    generaGriglia('.cells', 'div', 'cell', livello_difficolta);

    // evoco la funzione che aggiunge le classi alle celle
    selectElements('.cell', 'bg_blue', 'bomb');

    // In base alla scelta della difficoltà cambia la grandezza della cella e della griglia

    //Dichiaro una costante celle che contiene la cella
    const cells = document.querySelectorAll('.cell');

    //inizio un ciclo per aggiungere a tutte le celle la dimensione in base alla difficoltà scelta
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (difficolta_selezionata == 'easy') {
            cell.classList.add('cell_easy');
        } else if (difficolta_selezionata == 'medium') {
            cell.classList.add('cell_medium');
        } else if (difficolta_selezionata == 'hard') {
            cell.classList.add('cell_hard');
        }
    }
});

/**
 * Funzione che genera numeri casuali tra un min e un max
 * @param {number} min minimo
 * @param {number} max massimo
 * @returns Un numero random
 */
function generateRundomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Funzione che in base alla scelta della difficoltà dell'utente restituisce il numero di celle
 * @returns numero delle celle
 */
function difficolta() {
    let livello = document.getElementById('difficolta').value;

    let livello_difficolta;

    if (livello == 'easy') {
        livello_difficolta = 100;
    } else if (livello == 'medium') {
        livello_difficolta = 81;
    } else if (livello == 'hard') {
        livello_difficolta = 49;
    }

    return livello_difficolta;
};

/**
 * Funzione che genera 16 numeri casuali
 * @returns Una lista di numeri casuali da 1 a (numero delle celle)
 */
function generateBombNumber() {
    // creo una lista di numeri
    const randomNumbers = [];

    let livello_difficolta = difficolta();
    
    let i = 1;
    //genera 16 numeri casuali non ripetibili 
    while (randomNumbers.length !== 16) {
        // genera un numero casuale da 1 a 16
        const randomNumber = generateRundomNumber(1, livello_difficolta);
        // se il numero che genero non è incluso nella lista, aggiungilo
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
       i++;            
    };
    return randomNumbers; // la lista di numeri
};
//console.log(generateBombNumber());


//funzione che visualizza tutte le bombe

function show_bomb() {
    
}