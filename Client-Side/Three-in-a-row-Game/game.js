(function (){
const random = "https://prog2700.onrender.com/threeinarow/random";
const sample = "https://prog2700.onrender.com/threeinarow/sample";
const six = "https://prog2700.onrender.com/threeinarow/6x6";
const eight = "https://prog2700.onrender.com/threeinarow/8x8";
const ten = "https://prog2700.onrender.com/threeinarow/10x10";  
const twelve = "https://prog2700.onrender.com/threeinarow/12x12";
const fourteen = "https://prog2700.onrender.com/threeinarow/14x14";

function createTable() {
    return fetch(random).then(data => data.json()).then(data => {
        console.log(data);
        let rows = data.rows;
        const theGame = document.getElementById('theGame'); 
        theGame.style.gridTemplateColumns = `repeat(${rows.length}, 1fr)`;
        theGame.style.gridTemplateRows = `repeat(${rows.length}, 1fr)`;
        const squares = rows.reduce((acc, row) => {
            row.map(s => acc.push(s));
            return acc;
        }, []);
        squares.map((s, i) => {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${i + 1}`;
            square.addEventListener('click', () => changeColor(s, square.id));
            console.log(square);  //just to see the divs that are being created in DOM
            theGame.appendChild(square);
            //getting the starter colors
            if (s.currentState === 0) {
                square.style.backgroundColor = 'white';
            } else if (s.currentState === 1) {
                square.style.backgroundColor = 'lightPink';
            } else {
                square.style.backgroundColor = 'black';
            }
        })
        console.log(squares);
        return squares
        });
}

function createControls(squares) {
    //status button 
    const bContainer = document.createElement('div');
    bContainer.id = 'bContainer';
    const statusB = document.createElement('button');
    statusB.className = 'button';
    statusB.textContent = 'Check Status';
    statusB.addEventListener('click', () => checkStatus(squares));

    //extra feature - restart button
    const restartB = document.createElement('button');
    restartB.className = 'button';
    restartB.textContent = 'Restart';
    restartB.addEventListener('click', () => reset(squares));

    
    //creating label container that acts as a button
    const checkContainer = document.createElement('label');
    checkContainer.className = 'checkbox-button';
    checkContainer.htmlFor = 'check'; 

    //check box
    const error = document.createElement('input');
    error.type = 'checkbox';
    error.id = 'check';
    error.addEventListener('change', () => checkError(error, squares));

    //create text node for label
    const text = document.createTextNode('Check Errors');

    checkContainer.appendChild(error);
    checkContainer.appendChild(text); 

    //create dialog box
    const dialog = document.createElement('div');
    dialog.id = 'dialog';

    bContainer.appendChild(statusB);
    bContainer.appendChild(restartB);
    bContainer.appendChild(checkContainer);
    

    document.body.append(bContainer);
    document.body.append(dialog);

    document.getElementById('theGame').addEventListener('click', () => {
        document.getElementById('check').checked = false;
        squares.map((s, i) => {
            const square = document.getElementById(`${i + 1}`); 
            square.textContent = '';
        });
        document.getElementById('dialog').textContent = '';
    })
}

function changeColor(square, squareId) {
    if (square.canToggle) {
        if (square.currentState === 0) {
            square.currentState = 1;
            document.getElementById(squareId).style.backgroundColor = 'lightPink';
        } else if (square.currentState === 1) {
            square.currentState = 2;
            document.getElementById(squareId).style.backgroundColor = 'black';
        } else {
            square.currentState = 0;
            document.getElementById(squareId).style.backgroundColor = 'white';
        }
    }
}


function checkStatus(squares) {
    const dialog = document.getElementById('dialog');
    if (squares.every(s => s.currentState === s.correctState)) {
        dialog.textContent = 'You did it!';
    } else if (squares.some(s => s.currentState !== s.correctState && s.currentState !== 0)) {
        dialog.textContent = "Something's wrong...";
    } else if (squares.every(s => s.canToggle === false || s.currentState === 0)){
         dialog.textContent = 'Start by clicking on a white square.';
    }else {
        dialog.textContent = "So far so good!";
    }
}

function reset(squares) {
    squares.map((s, i) => {
        if (s.canToggle) {
            s.currentState = 0;
            const square = document.getElementById(`${i + 1}`);
            square.style.backgroundColor = 'white';
            square.textContent = '';
            document.getElementById('check').checked = false;
        }
    });
    const dialog = document.getElementById('dialog');
    dialog.textContent = '';
}

function checkError(error, squares) {
    if (error.checked) {
        let hasError = false;
        squares.map((s, i) => {
            if (s.currentState !== s.correctState && s.currentState !== 0) {
                hasError = true;
                const square = document.getElementById(`${i + 1}`); 
                square.textContent = '!';
                square.style.color = 'red';                 
                square.style.textAlign = 'center';
                if (squares.length < 100) {
                    square.style.fontSize = '50px';
                } else {
                    square.style.fontSize = '30px';
                }
            }
        });
        if(!hasError) {
        document.getElementById('dialog').textContent = 'No errors found.';
        }
    } else {
        squares.map((s, i) => {
            const square = document.getElementById(`${i + 1}`); 
            square.textContent = '';
        });
        document.getElementById('dialog').textContent = '';
    }
}

function main() {
    createTable().then(s => {
       createControls(s)});
}

main();

})();