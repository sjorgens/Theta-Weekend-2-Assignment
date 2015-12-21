//  set global variables and CONSTANTS
var thetaArray = [];
var TOTAL_INDEXES = 0;
var currentIndex = 0;
var SWITCH_PERSON_TIMER = 10000;
var myVar = 0;

$(document).ready(function(){
    getData();

    //  Set the timer to switch to the next person
    myVar = setInterval(function(){ nextPerson() }, SWITCH_PERSON_TIMER);
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            buildArray(data);
            showData();
            generateButtons();
        }
    });
}

////////////////////////////////////////////
///////////////  build array ///////////////
////////////////////////////////////////////
function buildArray(data){

    //  receive the data upon success from getData() and store in global array thetaArray
    thetaArray = data.people;
    //  set the global constant to the lenght of the array
    TOTAL_INDEXES = thetaArray.length;
}

/////////////////////////////////////////////////
///////////////  show data in DOM ///////////////
/////////////////////////////////////////////////
function showData(){

    //  create a <div> container under #peopleContainer to store each object in the array
    //  and display each property in its own <p> tag.  Hide each person when appended.
    for (var i = 0; i < thetaArray.length; i++){
        $("#peopleContainer").append("<div class='people' id='person" + i + "'></div>");
        var $el = $("#peopleContainer").children().last().hide();
        $el.append("<img class='avatar' src='" + thetaArray[i].imgURL + "' alt='" + thetaArray[i].name + " avatar' />");
        $el.append("<p>" + thetaArray[i].name + "</p>");
        $el.append("<p>" + thetaArray[i].location + "</p>");
        $el.append("<p>" + thetaArray[i].animal + "</p>");
    }

    //  Show the first person with index 0 in the array of objects.
    $("#person0").fadeIn("slow");
}

/////////////////////////////////////////////////
///////////////  generate buttons ///////////////
/////////////////////////////////////////////////
function generateButtons(){

    //  create a <div> container under #lecture to store a set of index buttons
    $("#lecture").append("<div class='indexes'></div>");
    var $el = $("#lecture").children().last();

    //  create index buttons based on the length of the array of objects
    for (var i = 0; i < TOTAL_INDEXES; i++){
        $el.append("<button class='index-point' id='index" + i + "'></button>");
    }

    //  create a <div> container to store the navigation buttons 'prev' & 'next'
    $("#lecture").append("<div class='navigation'></div>");
    var $el = $("#lecture").children().last();

    //  create 'prev' & 'next' navigation buttons
    $el.append("<button class='prev'>prev</button>");
    $el.append("<button class='next'>next</button>");

    //  create event listeners for button clicks
    $("#lecture").on("click", '.index-point', indexPerson);
    $("#lecture").on("click", '.prev', previousPerson);
    $("#lecture").on("click", '.next', nextPerson);

    //  highlight the first index button by default
    $(".indexes .index-point:first").toggleClass("index-point-active");
}

//////////////////////////////////////////////////////////////////
///////////////  future index button functionality ///////////////
//////////////////////////////////////////////////////////////////
function indexPerson(){

    //$(this).toggleClass("index-point-active");
}

//////////////////////////////////////////////////////////
///////////////  prev button functionality ///////////////
//////////////////////////////////////////////////////////
function previousPerson(){

    //  call function to reset the timer from switching persons
    timerReset();

    //  Turn off all button classes with 'index-point-active'
    $(".index-point-active").toggleClass("index-point-active");

    //  Hide the current person via fadeToggle transition.  Upon completion,
    //  execute function to reveal new person via fadeIn transition
    $("#person" + currentIndex).fadeToggle(function(){

        //  If at the first index, reset the currentIndex to the last
        //  index, cycle around to the last person and highlight the
        //  last index button.  Else, show the previous person and highlight
        //  that index button.
        if (currentIndex == 0){
            currentIndex = (TOTAL_INDEXES - 1);
            $("#person" + currentIndex).fadeIn("slow");
            $("#index" + currentIndex).toggleClass("index-point-active");
        } else {
            currentIndex--;
            $("#person" + currentIndex).fadeIn("slow");
            $("#index" + currentIndex).toggleClass("index-point-active");
        }
    });
}

//////////////////////////////////////////////////////////
///////////////  next button functionality ///////////////
//////////////////////////////////////////////////////////
function nextPerson(){

    //  call function to reset the timer from switching persons
    timerReset();

    //  Turn off all button classes with 'index-point-active'
    $(".index-point-active").toggleClass("index-point-active");

    //  Hide the current person via fadeToggle transition.  Upon completion,
    //  execute function to reveal new person via fadeIn transition.
    $("#person" + currentIndex).fadeToggle(function(){

        //  If at the last index, reset the currentIndex to 0, cycle
        //  around to the first person and highlight the first index
        //  button.  Else, show the next person and highlight that
        //  index button.
        if (currentIndex == (TOTAL_INDEXES - 1)){
            currentIndex = 0;
            $("#person" + currentIndex).fadeIn("slow");
            $("#index" + currentIndex).toggleClass("index-point-active");
        } else {
            currentIndex++;
            $("#person" + currentIndex).fadeIn("slow");
            $("#index" + currentIndex).toggleClass("index-point-active");
        }
    });
}

function timerReset(){

    //  Stop the timer interval and restart when 'prev' or 'next' buttons are clicked
    clearInterval(myVar);
    myVar = setInterval(function(){ nextPerson() }, SWITCH_PERSON_TIMER);
}
