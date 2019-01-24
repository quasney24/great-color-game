cardCounter = 6;
var colors = [];
var squares = $(".square");
var pickedColor;
var colorDisplay = $("#selectedColorText");
var messageDisplay = $("#message");
var h1 = $(".title1");
var resetButton = $("#reset");
var modeBtn = $(".mode");
var scoreDisplay = $("#score")
var levelDisplay = $(".leveler")
var levelUp = $(".level-up");

init();

function init(){
    for(var i=0; i< modeBtn.length; i++){
        modeBtn[i].addEventListener("click", function(){
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent==="Easy" ? cardCounter = 6: cardCounter = 9; 
    
            reset();
    
        });
    };

    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = colors[i]
        var maxPoint = 5;
        var totalScore = 0;
    
        //click listeners to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            console.log(clickedColor, pickedColor)
            if(clickedColor === pickedColor){
                totalScore = maxPoint + totalScore
                scoreDisplay.text(totalScore);
                messageDisplay.text("Correct!");
                resetButton.text("Continue");
                changeColors(clickedColor);
                h1.css("background-color", clickedColor)
                playerLevelUp();
                scoreKeeper();

            } else{
                totalScore = totalScore - 1
                this.style.backgroundColor = "#232323"
                messageDisplay.text("Try Again")

            }
    
        })
    }
    reset();
}


function reset(){
    colors = generateRandomColors(cardCounter);
    pickedColor = pickColor();
    colorDisplay.text(pickedColor);
    resetButton.text("New Colors");
    messageDisplay.text("");

    for(var i=0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];

        }else{
            squares[i].style.display= "none";
        }
    }
    h1.css("background-color", "steelblue")

}

gameCounter = 0
resetButton.on("click", function(){
    reset();
    

})
colorDisplay.text(pickedColor);




function changeColors(color){
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random()* colors.length)
    return colors[random];
}

function generateRandomColors(num){
    //make an array
    var arr = []
    //add num random colors to array
    for(var i=0; i< num; i++){
        arr.push(randomColor())


    }

    return arr;
}

function randomColor(){
    //red
    var r = Math.floor(Math.random() * 256);
   //blue
    var g = Math.floor(Math.random() * 256);
   //green
    var b = Math.floor(Math.random() * 256);
   return "rgb(" + r + ", " + g + ", " + b + ")";
}

function scoreKeeper(){
    //total games played
    gameCounter = gameCounter+1
    var scoreVal = scoreDisplay.text();
    console.log(scoreVal);
    //total score divided by 5
    percentScore = scoreVal / 5; 
    var level = percentScore / gameCounter;
    console.log(level)

    if(level >= 0.9 ){
        levelDisplay.text("Wizard")
    }
    else if(level >= 0.7){
        levelDisplay.text("PRO")
            
    }
    else{
        levelDisplay.text("Rookie")
        }
    };

//level up 
//
function playerLevelUp(){
    var currentLevel = 1
    var scoreVal = scoreDisplay.text();
    console.log("player up ", scoreVal)

    //Level parameters 
    if(scoreVal >= 120){
        levelUp.text("Level 9")
    }
    else if(scoreVal >= 80){
        levelUp.text("Level 8");
    }else if(scoreVal >= 70){
        levelUp.text("Level 7");
    }else if(scoreVal >= 60){
        levelUp.text("Level 6")
    }else if(scoreVal >= 50){
        levelUp.text("Level 5");
    }else if(scoreVal >= 40){
        levelUp.text("Level 4");
    }else if(scoreVal >= 30){
        levelUp.text("Level 3");
        cardCounter = 9;
    }else if(scoreVal >= 20){
        levelUp.text("Level 2");
        cardCounter = 9;
    }else{
        levelUp.text("level 1");
    }
           
}

//@todo - level up adding additional rankings & Showing achievements 
//@todo - Adding more choices as you increase in rank 
//@todo - lives ++ gain when you level up
//@todo - re-build via state 
//@todo - bonus rounds timed after x amount to gain lives 
//@todo - gray sales bonues super difficult
//@todo - streaks play into bonus rounds 

