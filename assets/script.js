// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMBI3MpU0ih5o1DNRy5tkzRiGbA27No0Y",
    authDomain: "traintables-616ce.firebaseapp.com",
    databaseURL: "https://traintables-616ce.firebaseio.com",
    projectId: "traintables-616ce",
    storageBucket: "traintables-616ce.appspot.com",
    messagingSenderId: "723493074017"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initialize variables for inputs





// Define the function for the on button click event

$("#submitButton").on("click", function()

{

// Grabs user inputs

    var newName = $("#trainName").val();
    var newDest = $("#destination").val();
    var newTime = $("#firstTime").val();
    var newFreq = $("#frequency").val();




// Creates temporary object with user inputs

var newTrain = {
    name: newName,
    dest: newDest,
    time: newTime,
    freq: newFreq,
}

// Uploads train data to database

database.ref().push(newTrain);

// logs everything in console

console.log(newTrain.name , newTrain.dest, newTrain.time , newTrain.freq);


// Clears all of the text-boxes
$("#trainName").val("");
$("#destination").val("");
$("#firstTime").val("");
$("#frequency").val("");




})
