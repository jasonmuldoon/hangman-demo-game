var shows={
    
    1: {name: "Letterkenny", 
        img: "images/letterkenny.jpg"}, 
    
    2: {name: "One Punch Man", 
        img: "images/one-punch.png"},
   
    3: {name: "Rick and Morty", 
        img: "images/rick-and-morty.jpg"},
    
    4: {name: "Gravity Falls", 
        img: "images/gravity.jpg"},
   
    5: {name: "The Tick", 
        img: "images/thetick.jpg"},
    
    6: {name: "Misfits", 
        img: "images/misfits.jpg"},
    
    7: {name: "Adventure Time", 
        img: "images/adventure_time.jpg"},
   
    8: {name: "American Gods", 
        img: "images/american.jpg"},
    
    9: {name: "Bojack", 
        img: "images/bojack.jpg"},
    
    10: {name: "Over The Garden Wall", 
        img: "images/over-the-garden-wall.jpg"} ,
    
    11: {name: "Venture Brothers", 
        img: "images/venture.jpg"},
    
    12: {name: "Red Dwarf", 
        img: "images/red-dwarf.jpg"},
    
    13: {name: "The IT Crowd", 
        img: "images/crowd.jpg"}, 
    
    
};
var wins = 0;
var word;
var guess;
var remain = 14;
var ltrCount = 0;
var ltrCorrect = 0;
var trigger = 0;
var prevent = [];
var match = false;
var show;
var imgSrc;


//Selects word object from array
function selectWord() {

    show = shows[Math.floor((Math.random() * 13)) + 1]

    word = show.name;

    imgSrc = show.img;

    console.log(word);
    console.log(imgSrc);
    console.log("-----------------------------------------------");
    

}

//updates score
function updateScore() {

    $("#wins").text("Wins:" + wins);
    
}

//Displays Correct number of blank spaces and breaks in word
function displayBlanks() {

    for(var i = 0; i < word.length; i++){

        if(word[i] != " "){
       
            $("#ltrlist").append('<li class = "ltrbox"><div class ="ltr">' + word[i] + '</div></li>');
            ltrCount++;
        
        }else{

            $("#ltrlist").append('<li class = "blankspace"><div class ="ltr"></div></li>');

        }
    }
}

//clears list after win/loss
function clearLetterList(){

    $("#ltrlist").empty();

}

//Updates Remaining Guesses
function gRemain() {

    $("#gRemain").text("Guesses Remaining: " + remain);
    
}

//Updates Letters Guessed
function guessUpdate() {

    $("#ltrsUsed").append(guess + ", ");

}

//resets guess tracking display
function guessUpdateReset() {

    $("#ltrsUsed").empty();

}

//checks for Matches/Displays Matches, Returns match true/false
function check() {

    var match = false;

    $("li").each(function (index){

        var i = 0;
        var idValue = "L" + index;
        var lwrCase = $(this).text();
       
        lwrCase = lwrCase.toLowerCase();
        
        console.log(guess);
        console.log(lwrCase);
       
        if(lwrCase == guess){

 
            document.getElementById(idValue).style.visibility = "visible";
            ltrCorrect++;
            match = true;

        }else{

            
        }

    

    });
    
    return match;
}


//Assigns id to each letter of word to check against
function ltrIdAssign(){

    $(".ltr").each(function (index){

        var idValue = "L" + index;

        $(this).attr('id', idValue);


    });

}

//prevents user from entering the same key twice
function preventDouble(){
    
    var i = 0;
    

    if(trigger == 0){

        prevent[0] = guess;
        trigger = 1;
        match = false; 
        return match;

    }else{

        console.log(prevent.length + 1);
        
        while(i < prevent.length){

            if(prevent[i] == guess){

                console.log(prevent[i]);
                alert("You Have Already Guessed That, Try Another!");
                match = true;
                return match;

            }else{

                console.log(prevent[i])
                
            }
        
            i++;
        }
            
            console.log(i);
            prevent[i] = guess;

            match = false;
            return match;
        }

    }



    function resetVar(){

    ltrCorrect = 0;
    ltrCount = 0;
    trigger = 0;
    prevent = [];

}

//Assigns IMG SRC
function AssignImg() {

    $("#imgTarget").attr("src", imgSrc);
    console.log(imgSrc);

}
  // Plays win sound

  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/sound/applause-2.mp3");

//Displays IMG on Win
function displayImg(){

    $("#imgTarget").css("visibility", "visible");
            audioElement.play();
              console.log("display win");

}

//Hides IMG on Round Reset
function hideImg() {

    $("#imgTarget").css("visibility", "hidden");

}

//Alerts a Win After Win Image Displayed
function winAlert(callback) {

    var alertMonitor = false;
    
    while(alertMonitor == false){
        
        alert("Congratulations! You Win!");
        alertMonitor = true;
        console.log("You Win!");
    }
   
    alertMonitor = false;
    callback();
}

//Resets all round variables
function roundReset(){

    console.log("reset");
    hideImg();        
    resetVar();
    clearLetterList();
    guessUpdateReset();
    selectWord();
    AssignImg();
    displayBlanks();
    ltrIdAssign();
    main();


}

//Ensures page load before initializing first round
$(document).ready(function(){

    selectWord();
    AssignImg();
    updateScore();
    displayBlanks();
    ltrIdAssign();
    gRemain();

    main();

});

//Main function controlling game flow and detects win/loss conditions
function main(){

    document.onkeyup = function(event){

       
        if(remain == 0){
            

            gRemain();

            alert("Game Over!");
            alert("Try Again?");
            
            location.reload();
            
    
        }else if(ltrCount == ltrCorrect){
            
          
            wins++;
            updateScore();
            
            displayImg();
            
            
            jQuery(function($) {    
                
                $.when($("#imgTarget").html('')).done(function() {
                    
                    winAlert(roundReset);
                
                });
            });
         
        
        }else{
            
            guess = event.key;
            
            var double = preventDouble();
            console.log(prevent);
            if(double == false){
                var match = check();

                
                    if(match == false){

                    remain--;
                    gRemain();
                    guessUpdate();


                }else{

                }
            }else{

            }

    }

}
}