let quizScore = 0;

function incrementScore() {
    quizScore ++; 
}

function setQuizScore(value){
    quizScore = value;
}


export { quizScore,incrementScore,setQuizScore };