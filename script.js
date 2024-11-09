delay = 20
stop = false
let mergeSortBool = false
let numberVals = 250



function createSquares() {
    const squaresContainer = document.getElementById("squares");
    squaresContainer.innerHTML = ""; // Clear any existing squares

    for (let i = 1; i <= numberVals; i++) {
        const square = document.createElement("div");
        square.id = `square${i}`;
        square.classList.add("square"); // Add a class for CSS styling
        squaresContainer.appendChild(square);
    }
}

function getVals() {
    rheights = [];
    heights = [];
    for (let i = 1; i <= numberVals; i++) {
        heights.push(i);
    }

    for (let i = 0; i < numberVals; i++) {
        num = Math.floor(Math.random()*heights.length)
        rheights.push(heights[num])
        heights.splice(num,1)
    }
    updateGraph()
    console.log(rheights)
}

function updateGraph() {
    console.log("hjo")
    for (let i = 0; i < rheights.length; i++) {
        const square = document.getElementById(`square${i + 1}`);
        if (square) {
            square.style.height = (((rheights[i] -1)/(numberVals -1))*45)+1 + "vh";
        }
    }
}

function updateGraphArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        const square = document.getElementById(`square${i + 1}`);
        if (square) {
            square.style.height = (((rheights[i] -1)/(numberVals -1))*45)+1 + "vh";
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


function updateDelay(value) {
    document.getElementById("delayValue").innerHTML = value
    delay = value
}

function updateNumberVals(value) {
    document.getElementById("numberValsText").innerHTML = value;
    numberVals = value;
    stopSort()
    createSquares();
    getVals();

    // Update each square's width based on the new numberVals
    const squares = document.querySelectorAll("#squares > div"); // Select all squares
    const newWidth = (numberVals/3000)+10 + "vw"; // Calculate new width

    squares.forEach(square => {
        square.style.width = newWidth; // Set each square's width
    });
}



function colorSquare(index, color) {
    const square = document.getElementById(`square${index}`);
    square.style.backgroundColor = color;
}

function statusUpdate(val) {
    if (val == 0) {
        document.getElementById("status").innerHTML = "Not running"
    }
    if (val == 1) {
        document.getElementById("status").innerHTML = "Running"
    }
}
function stopSort() {
    stop = true
    statusUpdate(0)

}

async function bogoSort() {
    stop = false
    if (document.getElementById("status").innerHTML == "Not running") {
        statusUpdate(1)
        getVals()
        updateGraph()
        
        while ((rheights != heights) && (stop == false)) {
            rheights = shuffleArray(rheights)
            updateGraph()
            await sleep(delay)

        }
        statusUpdate(0) 
        stop = false
    } else{
        console.log("Error: another sort is running")
    }
    
}

async function insertionSort() {
    if (document.getElementById("status").innerHTML == "Not running") {
        getVals()
        updateGraph()
        statusUpdate(1)
        stop = false;
        
        for (let i = 1;i<rheights.length;i++) {
            if (stop) break;
            let val = rheights[i]
            let j
            for (j = i-1; j>= 0 && rheights[j] > val; j--) {
                if (stop) break;
                rheights[j+1] = rheights[j]
                await sleep(delay)
                updateGraph()
            }

            rheights[j+1] = val
  

        } 
        statusUpdate(0)
        stop = false
        
    } else {
        console.log("Error: another sort is running")
    }
    
    
}



async function bubbleSort() {
    if (document.getElementById("status").innerHTML === "Not running") {
        getVals();
        updateGraph();
        statusUpdate(1);
        stop = false;

        for (let i = 0; i < rheights.length; i++) {
            if (stop) break;

            let swapped = false; // Track if any elements were swapped in this pass

            for (let j = 0; j < rheights.length - i - 1; j++) {
                if (stop) break;

                // Highlight the two elements being compared

                if (rheights[j] > rheights[j + 1]) {
                    // Swap if the left element is larger than the right
                    let temp = rheights[j];
                    rheights[j] = rheights[j + 1];
                    rheights[j + 1] = temp;
                    swapped = true;

                    // Update the graph to show the swap

                }

                // Reset colors after comparison
                updateGraph();
                await sleep(delay);
            }


            // If no elements were swapped, the array is sorted
            if (!swapped) break;
        }
        statusUpdate(0);
        stop = false;

    } else {
        console.log("Error: another sort is running");
    }


}


async function mergeSort(arr, start = 0) {
    // Base case: Arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    
    // Recursively sort both halves, awaiting the results
    const left = await mergeSort(arr.slice(0, mid), start);
    const right = await mergeSort(arr.slice(mid), start + mid);

    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Merge the sorted halves with delays to visualize the sorting
    while (leftIndex < left.length && rightIndex < right.length) {
        // Check for stop condition to halt the sorting
        if (stop === true) {
            mergeSortBool = false;
            statusUpdate(0); // Stop the sorting and reset status
            return sortedArray; // Exit the function early
        }

        if (left[leftIndex] < right[rightIndex]) {
            sortedArray.push(left[leftIndex]);
            rheights[start + sortedArray.length - 1] = left[leftIndex];
            leftIndex++;
        } else {
            sortedArray.push(right[rightIndex]);
            rheights[start + sortedArray.length - 1] = right[rightIndex];
            rightIndex++;
        }
        
        // Update the graph at each merge step for accurate visualization
        updateGraphArr(rheights);
        await sleep(delay);
    }

    // Append any remaining elements from left or right
    while (leftIndex < left.length) {
        // Check for stop condition
        if (stop === true) {
            mergeSortBool = false;
            statusUpdate(0); // Stop the sorting and reset status
            return sortedArray; // Exit the function early
        }

        sortedArray.push(left[leftIndex]);
        rheights[start + sortedArray.length - 1] = left[leftIndex];
        leftIndex++;
        updateGraphArr(rheights);
        await sleep(delay);
    }

    while (rightIndex < right.length) {
        // Check for stop condition
        if (stop === true) {
            mergeSortBool = false;
            statusUpdate(0); // Stop the sorting and reset status
            return sortedArray; // Exit the function early
        }

        sortedArray.push(right[rightIndex]);
        rheights[start + sortedArray.length - 1] = right[rightIndex];
        rightIndex++;
        updateGraphArr(rheights);
        await sleep(delay);
    }

    return sortedArray;
}

// Top-level function to run merge sort on rheights and update global array
async function runMergeSort() {
    // Ensure the sort only runs if it's not already running
    if (document.getElementById("status").innerHTML == "Not running" && !mergeSortBool) {
        mergeSortBool = true;
        getVals();
        updateGraph();
        statusUpdate(1); // Indicate that sorting is running
        stop = false
        rheights = await mergeSort(rheights); // Fully sorted array is assigned back to rheights
        statusUpdate(0); // Stop the sorting and reset status
        mergeSortBool = false
        stop = false
    } else {
        console.log("Error: another sort is running");
    }

}
 const maxStars = 60;
 let starCount = 0;
// Function to create a random star
function createStar() {
    if (starCount >= maxStars) return;
    starCount++;
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomize size between 1px and 3px
    const size = Math.random() * 2 + 1;  // Random size between 1px and 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Randomize initial position within the viewport
    const xPos = Math.random() * 100 + '%';  // Random X position
    const yPos = Math.random() * 100 + '%';  // Random Y position
    star.style.left = xPos;
    star.style.top = yPos;

    // Randomize movement direction
    const moveX = (Math.random() - 0.5) * 50;  // Random X movement (-50% to 50%)
    const moveY = (Math.random() - 0.5) * 50;  // Random Y movement (-50% to 50%)

    // Set custom properties for movement in the keyframes
    star.style.setProperty('--startX', xPos);
    star.style.setProperty('--startY', yPos);
    star.style.setProperty('--endX', `${parseFloat(xPos) + moveX}%`);
    star.style.setProperty('--endY', `${parseFloat(yPos) + moveY}%`);

    // Randomize the duration of the movement animation (between 5s and 10s)
    const animationDuration = Math.random() * 5 + 5;  // Random duration between 5s and 10s
    star.style.animationDuration = `${animationDuration}s`;

    // Append star to the body
    document.body.appendChild(star);
}

// Function to generate stars continuously
function generateStars() {
    setInterval(createStar, 400);  // Create a new star every 100ms
}

