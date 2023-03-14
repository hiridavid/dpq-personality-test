







/* Init */

const inputs = document.getElementsByName("score-input");
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

console.log(questions)

resultParagraph = document.querySelector("div#resultsBox>p#results");

console.log(resultParagraph.innerHTML);

let hintBox = document.querySelector("#hint");
let hint = document.querySelector("#hint>span");

/* display */

/* questions[1].addEventListener("input", e=>{
    console.log(e.value);
}); */





/* feedback */

for (let i = 1; i < questions.length; i++) {
    questions[i].inputObj.addEventListener("click", function(){
        questions[i].touched=true;
        console.log(`${questions[i].index}. Question: ${(questions[i].touched) ? "touched" : "untouched"};`)
        scoreHandler();
    });
}

let scoreObj = document.getElementById("score");

function scoreHandler(){
    let score = 0;
    for (let i = 1; i < questions.length; i++) {
        if (questions[i].touched) score++;
    }
    scoreObj.innerHTML = `${score}/75`

    if (score>=75) getResults(questions);
    if (score>=60) {
        let untouchedArr = [];
        for (let i = 1; i < questions.length; i++) {
            if (!questions[i].touched) untouchedArr.push(i);
        }
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
        
    }
}



/* test eval */

function getResults(q){

    function Reverse(n){
        return 8-n
    }

    function getVal(qn, q=questions){
        if (typeof qn === typeof 0) {
            return q[qn].val;
        } else if (typeof qn === typeof "string" && (qn.length === 2 || qn.length === 3)) {
            array = qn.split("");
            if (array[0] === "R" || array[0] === "r") {
                if (typeof array[2] === typeof 0) {
                    array[1] = array[1] + array[2];
                }
                return Reverse(q[parseInt(array[1])].val);
            } else {
                return undefined;
            }
        } else return undefined;
    }

    function getSum(q1, q2, q3, q4, q5, q=questions){
        n1 = getVal(q1);
        n2 = getVal(q2);
        n3 = getVal(q3);
        n4 = getVal(q4);
        n5 = getVal(q5);
        return (n1+n2+n3+n4+n5)/(35)
    }

    const results = {
        fearfullness: {
            fearOfPeople: getSum("R1", 12, 30, 47, 54, q),
            nonsocialFear: getSum(6, "R19", 24, "R38", "R58"),
            fearOfDogs: getSum("r9", 21, 36, 66, 70),
            fearOfHandling: getSum(28, 32, 42, 61, 74),
            localScore: undefined
        },
        aggressionTowardsPeople: {
            generalAggression: getSum(13, 23, "R33", 68, 73),
            situationalAggression: getSum(2, 17, 43, 51, 62),
            localScore: undefined
        },
        activityOrExcitability: {
            excitability: getSum(27, 53, 55, "R69", 72),
            playfulness: getSum("R3", "R16", 31, 46, 59),
            activeEngagement: getSum("R10", 14, 25, 40, 48),
            companionability: getSum(7, 35, "R44", 63, 67),
            localScore: undefined
        },
        responsivenessToTraining: {
            trainability: getSum(37, "R45", "R50", "R64", 71),
            controllability: getSum("R4", 11, "R18", "R29", 56),
            localScore: undefined
        },
        aggressionTowardsAnimals: {
            aggressionTowardsDogs: getSum(5, 8, "R34", 57, "R60"),
            preyDrive: getSum(15, 22, 26, 39, 65),
            dominanceOverDogs: getSum(20, 41, "R49", 52, 75),
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
    
    console.log(((Reverse(q[1].val)+q[12].val+q[30].val+q[47].val+q[54].val)/(35))===(getSum("R1", 12, 30, 47, 54, q)));
    console.log(results);


    resultParagraph.innerHTML =
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