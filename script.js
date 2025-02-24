let firstRow = document.getElementById("f").getElementsByTagName("span");
let secondRow = document.getElementById("s").getElementsByTagName("span");
let thirdRow = document.getElementById("t").getElementsByTagName("span");
let win = document.getElementsByClassName("Win");
let lose = document.getElementsByClassName("Lose");
let tieBlock = document.getElementsByClassName("Tie");
let container = document.getElementsByClassName("container");

document.getElementById("lose").style.display = "none";
document.getElementById("win").style.display = "none";
document.getElementById("tie").style.display = "none";
win[0].style.display = "none";
lose[0].style.display = "none";
tieBlock[0].style.display = "none";

let matrix = [
    [firstRow[0], firstRow[1], firstRow[2]],
    [secondRow[0], secondRow[1], secondRow[2]],
    [thirdRow[0], thirdRow[1], thirdRow[2]],
];

let mpR = new Array(3).fill(0);
let mpRaddC = new Array(5).fill(0);
let mpRsubC = new Array(5).fill(0);
let mpC = new Array(3).fill(0);

let mpRO = new Array(3).fill(0);
let mpRaddCO = new Array(5).fill(0);
let mpRsubCO = new Array(5).fill(0);
let mpCO = new Array(3).fill(0);

let Computer = (row, col, counter, maxi, tie) => {
    let i = Math.floor(Math.random() * 3);
    let j = Math.floor(Math.random() * 3);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let maxiO = Math.max(
                mpCO[j],
                mpRO[i],
                mpRaddCO[i + j],
                mpRsubCO[2 + j - i]
            );
            if (
                (maxiO == mpCO[j] ||
                    maxiO == mpRO[i] ||
                    maxiO == mpRaddCO[i + j] ||
                    maxiO == mpRsubCO[2 + j - i]) &&
                maxiO == 2 &&
                matrix[i][j].textContent == ""
            ) {
                matrix[i][j].textContent = "O";
                setTimeout(() => {
                    document.getElementById("lose").style.display = "block";
                    lose[0].style.display = "flex";
                }, 100);
                return;
            }
        }
    }

    if (
        maxi == mpC[col] &&
        i != row &&
        j == col &&
        matrix[i][j].textContent == ""
    ) {
        mpCO[j]++;
        mpRO[i]++;
        mpRaddCO[i + j]++;
        mpRsubCO[2 + j - i]++;
        matrix[i][j].textContent = "O";
        return;
    } else if (
        maxi == mpR[row] &&
        i == row &&
        j != col &&
        matrix[i][j].textContent == ""
    ) {
        mpCO[j]++;
        mpRO[i]++;
        mpRaddCO[i + j]++;
        mpRsubCO[2 + j - i]++;
        matrix[i][j].textContent = "O";
        return;
    } else if (
        maxi == mpRaddC[row + col] &&
        j + i == row + col &&
        matrix[i][j].textContent == ""
    ) {
        mpCO[j]++;
        mpRO[i]++;
        mpRaddCO[i + j]++;
        mpRsubCO[2 + j - i]++;
        matrix[i][j].textContent = "O";
        return;
    } else if (
        maxi == mpRsubC[2 + col - row] &&
        2 + j - i == 2 + row - col &&
        matrix[i][j].textContent == ""
    ) {
        mpCO[j]++;
        mpRO[i]++;
        mpRaddCO[i + j]++;
        mpRsubCO[2 + j - i]++;
        matrix[i][j].textContent = "O";
        return;
    }

    counter++;
    if (tie >= 6) {
        document.getElementById("tie").style.display = "inline-block";
        tieBlock[0].style.display = "flex";
        return;
    }
    if (counter < 500) Computer(row, col, counter, maxi, tie);
    else {
        if (maxi == mpC[col] && maxi != mpR[row]) maxi = mpR[row];
        else if (maxi == mpR[row] && maxi != mpRaddC[row + col])
            maxi = mpRaddC[row + col];
        else if (maxi == mpRaddC[row + col] && maxi != mpRsubC[2 + row - col])
            maxi = mpRsubC[2 + row - col];
        else if (maxi == mpRsubC[2 + row - col] && maxi != mpC[col])
            maxi = mpC[col];
        tie++;
        Computer(row, col, 0, maxi, tie);
    }
};

let countmove = 0;
matrix.forEach((i) => {
    i.forEach((j) => {
        j.addEventListener("click", () => {
            countmove++;

            if (j.textContent != "") return;

            if (j.textContent == "") j.textContent = "X";

            let col = Number(j.id);
            let i = Number(j.className);
            let row = 0;
            if (i > 2 && i <= 5) {
                row = 1;
            }
            if (i > 5 && i <= 8) {
                row = 2;
            }

            let tie = 0;
            mpR[row]++;
            mpRaddC[row + col]++;
            mpRsubC[2 + row - col]++;
            mpC[col]++;

            if (
                mpR[row] == 3 ||
                mpC[col] == 3 ||
                mpRaddC[row + col] == 3 ||
                mpRsubC[2 + row - col] == 3
            ) {
                document.getElementById("win").style.display = "inline-block";
                document.getElementById("win").childNodes[2].textContent +=
                    countmove.toString();
                win[0].style.display = "flex";
                return;
            }
            let counter = 0;
            let maxi = Math.max(
                mpC[col],
                mpR[row],
                mpRaddC[row + col],
                mpRsubC[2 + col - row]
            );
            Computer(row, col, counter, maxi, 0);
        });
    });
});

document.getElementById("tie").addEventListener("click", () => {
    window.location.reload();
});

document.getElementById("win").addEventListener("click", () => {
    window.location.reload();
});

document.getElementById("lose").addEventListener("click", () => {
    window.location.reload();
});

win[0].addEventListener("click", () => {
    window.location.reload();
});
tieBlock[0].addEventListener("click", () => {
    window.location.reload();
});
lose[0].addEventListener("click", () => {
    window.location.reload();
});