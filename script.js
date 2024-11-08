

function getvals() {
    rheights = [];
    heights = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
    for (let i = 0; i < 100; i++) {
        num = Math.floor(Math.random()*heights.length)
        console.log(num)
        rheights.push(heights[num])
        heights.splice(num,1)
    }
    updategraph()
    console.log(rheights)
}

function updategraph() {
    for (let i = 0; i < rheights.length; i++) {
        const square = document.getElementById(`square${i + 1}`);
        if (square) {
            square.style.height = (rheights[i]*0.9) + "vh";
        }
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bogosort() {
    while (rheights != heights) {
        rheights = shuffleArray(rheights)
        updategraph()
        playSound("sine", rheights[0]*8, 0.1)
        await sleep(document.getElementById("delay").value)

    }
}


function beep() {
    var audio = new Audio('beep.mp3');
    audio.play();
}

async function insertionsort() {

    for (let i = 1;i<rheights.length;i++) {
        let val = rheights[i]
        let j
        for (j = i-1; j>= 0 && rheights[j] > val; j--) {
            rheights[j+1] = rheights[j]

            
            playSound("sine", val*8, 0.1)
            await sleep(document.getElementById("delay").value)
        }

        rheights[j+1] = val
        updategraph()
        
 

    }
}