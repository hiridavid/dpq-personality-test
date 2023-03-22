

//-----[ init ]---

let questions = [
    {
        valueAsNumber: undefined,
        dataset: {
            touched: undefined,
        }
    }
];
document.querySelectorAll("input[name='score-input']").forEach(e=>{
    questions.push(e);
})
console.log(questions);
/* 
questions[i].index === i
questions[i].inputObj === questions[i]
questions[i].val === questions[i].valueAsNumber
questions[i].touched === data-touched !== "" ?
*/

const resultParagraph = document.querySelector("div#resultsBox>p#results");
const scoreObj = document.getElementById("score");
const hintBox = document.querySelector("#hint");
const hint = document.querySelector("#hint>span");

//-----[ feedback ]---

for (let i = 1; i < questions.length; i++) {
    questions[i].addEventListener("click", function(){
        questions[i].dataset.touched = "true"; //setAttribute("data-touched","true");
        console.log(`${i}. Question: ${(questions[i].dataset.touched !== "") ? "touched" : "untouched"}; val= ${questions[i].valueAsNumber}`);
        let cL = questions[i].parentElement.classList;
        if (cL.contains("highlighted")) {
            cL.remove("highlighted");
            cL.add("border-top", "border-bottom", "border-secondary");
        }
        scoreHandler(questions, resultParagraph, scoreObj, hintBox, hint);
    });
    questions[i].addEventListener("touchstart", function(){
        questions[i].dataset.touched = "true"; //setAttribute("data-touched","true");
        console.log(`${i}. Question: ${(questions[i].dataset.touched !== "") ? "touched" : "untouched"}; val= ${questions[i].valueAsNumber}`);
        let cL = questions[i].parentElement.classList;
        if (cL.contains("highlighted")) {
            cL.remove("highlighted");
            cL.add("border-top", "border-bottom", "border-secondary");
        }
        scoreHandler(questions, resultParagraph, scoreObj, hintBox, hint);
    });
}

function scoreHandler(questions=questions, resultParagraph=resultParagraph, scoreObj=scoreObj, hintBox=hintBox, hint=hint){
    let score = 0;
    for (let i = 1; i < questions.length; i++) {
        if (questions[i].dataset.touched !== "") score++;
    }
    scoreObj.innerHTML = `${score}/75`

    if (score>=75) getResults(questions, resultParagraph);
    if (score>=50) {
        let untouchedArr = [];
        for (let i = 1; i < questions.length; i++) {
            if (questions[i].dataset.touched === "") untouchedArr.push(i);
        }

        switch (untouchedArr.length) {
            case 0:
                hintBox.style.display = "none";
                break;
            
            case 1:
                hint.innerHTML = `Answer ${untouchedArr[0]} is missing.`;
                hintBox.style.display = "block";
                break;
            
            case 2:
                hint.innerHTML = `Answers ${untouchedArr[0]} & ${untouchedArr[1]} are missing.`;
                hintBox.style.display = "block";
                break;
            
            default:
                hint.innerHTML = `Answers ${untouchedArr.slice(0, untouchedArr.length-1).join(', ')} & ${untouchedArr.pop()} are missing.`;
                hintBox.style.display = "block";
                break;
        }
    }
}

function debug(offset=0){
    for (let i = 1; i < questions.length-offset; i++) {
        questions[i].valueAsNumber = Math.floor(Math.random() *6.99 +1);
        questions[i].dataset.touched = "true";
    }
    let rndi = Math.floor(Math.random() *(74.99-offset) +1) 
    console.log(`${questions.length-1-offset} items touched. Question ${rndi} value: ${questions[rndi].value}`)
    scoreHandler(questions, resultParagraph, scoreObj, hintBox, hint);
}

//-----[ buttons ]---

function highlight(){
    let untouchedArr = questions.filter(e => {return e.dataset.touched === ""});
    
    untouchedArr.forEach(e => {
        e.parentElement.classList.remove("border-top", "border-bottom", "border-secondary");
        e.parentElement.classList.add("highlighted");
        console.log(e.parentElement)
        console.log(e.parentElement.classList)
    });

    untouchedArr[0].parentElement.previousElementSibling.scrollIntoView();
}

function touchAll(offset=0){
    for (let i = 1; i < questions.length-offset; i++) {
        questions[i].dataset.touched = "true";
        let cL = questions[i].parentElement.classList;
        if (cL.contains("highlighted")) {
            cL.remove("highlighted");
            cL.add("border-top", "border-bottom", "border-secondary");
        }
    }
    scoreHandler(questions, resultParagraph, scoreObj, hintBox, hint);
}

//-----[ UX ]---



//-----[ test eval ]---

function getResults(q, write){
    console.log(`getResults(questions)`)

    function Reverse(n){
        return 8-n
    }

    function getVal(qn, q=q){
        if (typeof qn === typeof 0) {
            return q[qn].valueAsNumber;
        } else if (typeof qn === typeof "string" && (qn.length === 2 || qn.length === 3)) {
            let array = qn.split("");
            if (array[0] === "R" || array[0] === "r") {
                if (array.length === 3) {
                    array[1] = array[1] + array[2];
                    array.pop();
                }
                return Reverse(q[parseInt(array[1])].valueAsNumber);
            } else {
                return undefined;
            }
        } else return undefined;
    }

    function getSum(q1, q2, q3, q4, q5, q=q){
        n1 = getVal(q1, q);
        n2 = getVal(q2, q);
        n3 = getVal(q3, q);
        n4 = getVal(q4, q);
        n5 = getVal(q5, q);
        return (n1+n2+n3+n4+n5-5)/(30)
    }

    let results = {
        fearfullness: {
            fearOfPeople: getSum("R1", 12, 30, 47, 54, q),
            nonsocialFear: getSum(6, "R19", 24, "R38", "R58", q),
            fearOfDogs: getSum("r9", 21, 36, 66, 70, q),
            fearOfHandling: getSum(28, 32, 42, 61, 74, q),
            localScore: undefined
        },
        aggressionTowardsPeople: {
            generalAggression: getSum(13, 23, "R33", 68, 73, q),
            situationalAggression: getSum(2, 17, 43, 51, 62, q),
            localScore: undefined
        },
        activityOrExcitability: {
            excitability: getSum(27, 53, 55, "R69", 72, q),
            playfulness: getSum("R3", "R16", 31, 46, 59, q),
            activeEngagement: getSum("R10", 14, 25, 40, 48, q),
            companionability: getSum(7, 35, "R44", 63, 67, q),
            localScore: undefined
        },
        responsivenessToTraining: {
            trainability: getSum(37, "R45", "R50", "R64", 71, q),
            controllability: getSum("R4", 11, "R18", "R29", 56, q),
            localScore: undefined
        },
        aggressionTowardsAnimals: {
            aggressionTowardsDogs: getSum(5, 8, "R34", 57, "R60", q),
            preyDrive: getSum(15, 22, 26, 39, 65, q),
            dominanceOverDogs: getSum(20, 41, "R49", 52, 75, q),
            localScore: undefined
        }
    }

    results.fearfullness.localScore = (results.fearfullness.fearOfPeople + results.fearfullness.nonsocialFear + results.fearfullness.fearOfDogs + results.fearfullness.fearOfHandling) /4;
    results.aggressionTowardsPeople.localScore = (results.aggressionTowardsPeople.generalAggression + results.aggressionTowardsPeople.situationalAggression) /2;
    results.activityOrExcitability.localScore = (results.activityOrExcitability.excitability + results.activityOrExcitability.playfulness + results.activityOrExcitability.activeEngagement + results.activityOrExcitability.companionability) /4;
    results.responsivenessToTraining.localScore = (results.responsivenessToTraining.trainability + results.responsivenessToTraining.controllability) /2;
    results.aggressionTowardsAnimals.localScore = (results.aggressionTowardsAnimals.aggressionTowardsDogs + results.aggressionTowardsAnimals.preyDrive + results.aggressionTowardsAnimals.dominanceOverDogs) /3;

    function display(result){
        return Math.round(result*100) + "%<br>"
    }
    
    console.log(results);


    write.innerHTML =
    "Fearfullness — " + display(results.fearfullness.localScore) +
    " Fear of People: " + display(results.fearfullness.fearOfPeople) +
    " Non-social Fear: " + display(results.fearfullness.nonsocialFear) +
    " Fear of Dogs: " + display(results.fearfullness.fearOfDogs) +
    " Fear of Handling: " + display(results.fearfullness.fearOfHandling) +
    "<br>Aggression towards People — " + display(results.aggressionTowardsPeople.localScore) +
    " General Aggression: " + display(results.aggressionTowardsPeople.generalAggression) +
    " Situational Aggression: " + display(results.aggressionTowardsPeople.situationalAggression) +
    "<br>Activity & Excitability — " + display(results.activityOrExcitability.localScore) +
    " Excitability: " + display(results.activityOrExcitability.excitability) +
    " Playfullness: " + display(results.activityOrExcitability.playfulness) +
    " Active Engagement: " + display(results.activityOrExcitability.activeEngagement) +
    " Companionability: " + display(results.activityOrExcitability.companionability) +
    "<br>Responsiveness to Training — " + display(results.responsivenessToTraining.localScore) +
    " Trainability: " + display(results.responsivenessToTraining.trainability) +
    " Controllability: " + display(results.responsivenessToTraining.controllability) +
    "<br>Aggression towards Animals — " + display(results.aggressionTowardsAnimals.localScore) +
    " Aggression towards Dogs: " + display(results.aggressionTowardsAnimals.aggressionTowardsDogs) +
    " Prey Drive: " + display(results.aggressionTowardsAnimals.preyDrive) +
    " Dominance over Dogs: " + display(results.aggressionTowardsAnimals.dominanceOverDogs);
}






/* ---------------------------------------------------------------------------------------------------- */

/* Init */

/* 

const inputs = document.getElementsByName("score-input");
const scoreObj = document.getElementById("score");
const resultParagraph = document.querySelector("div#resultsBox>p#results");
const hintBox = document.querySelector("#hint");
const hint = document.querySelector("#hint>span");
let questions = [undefined];

console.log(inputs);

class Question {
    constructor(inputObj, index){
        this.index = index;
        this.inputObj = inputObj;
        this.val = inputObj.valueAsNumber;
        this.touched = false;
    }
}

inputs.forEach((element, i) => {
    questions.push(new Question(element, i+1));
});



*/

/* UX */

/* 
let touchY = undefined;
let touchX = undefined;
let swipeTreshold = 50;
let target = undefined;
//---event listener for mobile touches
window.addEventListener("touchstart", e => {
    touchY = e.changedTouches[0].pageY;    //sets the x position on page of touch event to a var
    touchX = e.changedTouches[0].pageX;    //sets the y position on page of touch event to a var
    target = e.target;
    console.log(target);
    console.log(`(X: ${touchX}, Y: ${touchY})`);
})

//---event listener for swipes (change of touch position)
window.addEventListener("touchmove", e => {
    if (target.name==="score-input") {
        const swipedY = Math.abs(e.changedTouches[0].pageY - touchY); //the Y distance between the original touch and your finger now
        const swipedX = Math.abs(e.changedTouches[0].pageX - touchX); //the X distance between the original touch and your finger now
        if (swipedY > swipedX) {
            target.style.pointerEvents = "none";
            //id = parseInt(target.id.split("").splice(5, 7).join(""));
            //questions[id].touched = false;
        }
    }
})

//---event listener for ending a touch
window.addEventListener("touchend", e => {
    target.style.pointerEvents = "";
    touchY = undefined;
    touchX = undefined;
    target = undefined;
})
*/

/* display */

/* questions[1].addEventListener("input", e=>{
    console.log(e.value);
}); */

/* feedback */

        /* 
        if (untouchedArr.length > 2) {
            hintBox.style.display = "block";
            hint.innerHTML = `Answers ${untouchedArr.slice(0, untouchedArr.length-1).join(', ')} & ${untouchedArr.pop()} are missing.`;
        } else if (untouchedArr.length === 2) {
            hintBox.style.display = "block";
            hint.innerHTML = `Answers ${untouchedArr[0]} & ${untouchedArr[1]} are missing.`;
        } else if (untouchedArr.length === 1) {
            hintBox.style.display = "block";
            hint.innerHTML = `Answer ${untouchedArr[0]} is missing.`;
        } else {
            hintBox.style.display = "none";
        }
        */



/* test eval */

