/* 
Consegna

L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/


//L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata

// Genera una griglia attraverso una funzione
/**
 * Genera una griglia
 * @param {string} selettore selettore
 * @param {string} nome_tag nome del tag
 * @param {string} nome_classe nome della classe
 * @param {number} limite numero limite di elementi
 */
function generaGriglia(selettore, nome_tag, nome_classe, limite) {
    const cellsElement = document.querySelector(selettore);

    cellsElement.innerHTML = ''; //Pulizia celle

    for (let i = 1; i <= limite; i++) {
        const cellItem = document.createElement(nome_tag);
        cellItem.classList.add(nome_classe);
        cellItem.innerHTML = i;
        cellsElement.append(cellItem);
    }
};

// Funzione che seleziona un elemento e gli aggiunge una classe al click su una cella
/**
 * Funzione che attiva una classe al click su una cella
 * @param {string} selettore 
 * @param {*} classe_attivata 
 */
function selectElements(selettore, classe_attivata) {
    const cells = document.querySelectorAll(selettore);
    generateBombNumber();
    console.log(generateBombNumber());

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        cell.addEventListener('click', function () {
            //console.log(this, i);
            this.classList.add(classe_attivata);
            
            // identifico il numero della cella 

            // se il numero della cella combacia con il numero della bomba, allora aggiungi classe bomb , ossia la cella diventa rossa
            /* if (generateBombNumber() == this) {
                console.log('bomba');
            } */
            
          
            
        });
    };
};




/* In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. */


// quando clicca su play
let play = document.getElementById('play');
play.addEventListener('click', function (event) {
    event.preventDefault();

    const limite = document.getElementById('difficolta').value;
    //console.log(limite);

    // Numero di celle assegnato per difficoltà
    let limite_num;

    if (limite == 'easy') {
        limite_num = 100;
    } else if (limite == 'medium') {
        limite_num = 81;
    } else if (limite == 'hard') {
        limite_num = 49;
    }
    //console.log(limite_num);
    generaGriglia('.cells', 'div', 'cell', limite_num);

    //Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
    selectElements('.cell', 'bg_blue');

    // In base alla scelta della difficoltà cambia la grandezza della cella e della griglia
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (limite == 'easy') {
            cell.classList.add('cell_easy');
        } else if (limite == 'medium') {
            cell.classList.add('cell_medium');
        } else if (limite == 'hard') {
            cell.classList.add('cell_hard');
        }
    }
});

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

/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati. */

//Funzione che genera numeri casuali con un min e un max
function generateRundomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Funzione che genera 16 numeri casuali

function generateBombNumber() {
    // creo una lista di numeri
    const randomNumbers = [];
    let i = 1;
    //genera 16 numeri casuali non ripetibili 
    while (randomNumbers.length !== 16) {
        // genera un numero casuale da 1 a 16
        const randomNumber = generateRundomNumber(1, 16);
        // se il numero che genero non è incluso nella lista, aggiungilo
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
       i++;            
    };
    return randomNumbers; // la lista di numeri
};
//console.log(generateBombNumber());


/* In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. */



/* La partita termina quando:
 il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti. */



/* Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */
