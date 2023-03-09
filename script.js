







/* Init */


const questions = document.getElementsByName("score-input");
let answers = [undefined];

for (let i = 0; i < questions.length; i++) {
    answers[i+1] = questions[i].valueAsNumber;
}

console.log(questions);

let thumbs = document.querySelectorAll("article>img");

questions.addEventListener(input, e=>{
    thumbs.x=e.x;
    thumbs.y=e.y;
})


/* display */



/* score */

let scoreObj = document.getElementById("score");
function scoreHandler(){
    let score = 0;
    scoreObj.innerHTML = `${score}/75`
}

/* eval */

function Rev(n){
    return 8-n
}
