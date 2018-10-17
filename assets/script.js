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


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });