
//user input: include: Train Name, Destination, First Train Time (military time), and frequency (minutes).
//self-determine when the next train is to arrive relative to the current time.
//firebase the data 

var trainData = new Firebase("https://torainscheduling.firebaseio.com");

//Grab user input

$('#newTrainButton').on('click', function(){

var trainName= $("#trainNameInput").val().trim();
var destinationName= $("#destinationInput").val().trim();
var firstTrainTime= $("#trainTimeInput").val().trim();
var frequency= $("#frequencyInput").val().trim();


//local temporary object to store data

var newTrainData={
	name:trainName,
	destination:destinationName,
	firstTime:firstTrainTime,
	frequencyTrain:frequency
}

//push the new train data into firebase
trainData.push(newTrainData);

	console.log(newTrainData.name);
	console.log(newTrainData.destination); 
	console.log(newTrainData.firstTime);
	console.log(newTrainData.frequencyTrain);

// Alert
	alert("Employee successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainTimeInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
		





	return false;

});

trainData.on("child_added", function(childSnapshot,prevChildKey){

	console.log(childSnapshot.val());  //Entire info for specific child 

//Store Everything Into A Variable
		var tFrequency =$("#frequencyInput").val().trim(); 
		var firstTrainTime = $("#trainTimeInput").val().trim(); // Time is 3:30 AM

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTrainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted); //object: at 2015

		// Current Time
		var currentTime = moment(); //literally the current time 
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm")); 

		// Difference between the times: 527284 minutes
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder):  527284 minutes/3 minutes= 1 minute remainder 

		var tRemainder = diffTime % tFrequency; 
		console.log(tRemainder);

		// Minute Until Train::: 3-1= 2 minutes till next train
		var tMinutesTillTrain = tFrequency - tRemainder;  
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train: current time + minutes until train 
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		var y=moment(nextTrain).format("hh:mm");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
		var x=$('#employeeTable');
	x.append($('<tr/>')
		.append($('<td/>').text(childSnapshot.val().name))
		.append($('<td/>').text(childSnapshot.val().destination))
		.append($('<td/>').text(childSnapshot.val().firstTime))
		.append($('<td/>').text(childSnapshot.val().frequencyTrain))
		.append($('<td/>').text(y))
		.append($('<td/>').text(tMinutesTillTrain)));

//$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartPretty + "</td><td>" + empRate + "</td><td>" + empMonths + "</td><td>" + empBilled + "</td></tr>");


});

















