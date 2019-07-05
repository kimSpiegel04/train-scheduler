// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBblzGHBwydDqaLSgfgZFeZn-qTvlsxMW0",
    authDomain: "train-project-8994c.firebaseapp.com",
    databaseURL: "https://train-project-8994c.firebaseio.com",
    projectId: "train-project-8994c",
    storageBucket: "train-project-8994c.appspot.com",
    messagingSenderId: "556033642177",
    appId: "1:556033642177:web:757c4b803f7173b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

//display current time (military)
function currentTime(){
    var getTime = moment().format('HH:mm');
    $('.current-time').text(getTime);
};

//animations for min away

$('#submit-info').on('click', function(event){
    event.preventDefault();

    //grab values
    var trainName=$('#train-name').val().trim();
    var destination=$('#destination').val().trim();
    var startTime = $('#start-time').val().trim();
    var frequency=$('#frequency').val().trim();

    var newTrain={
        name: trainName,
        destination: destination,
        start: startTime,
        frequency: frequency,
        inputDate: firebase.database.ServerValue.TIMESTAMP
    }

    //push
    database.ref().push(newTrain);

    //clear input
    document.getElementById('train-name').value='';
    document.getElementById('destination').value='';
    document.getElementById('start-time').value='';
    document.getElementById('frequency').value='';
});

setInterval(currentTime,1000);

database.ref().on('child_added', function(snapshot){
    //name and destination (no change required)
    var train = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

    //calculations 
    var start = moment(snapshot.val().start, 'HH:mm').subtract(1, 'y');
    var timeDiff = moment().diff(moment(start), "m");

    var remaining = timeDiff % frequency;
    var minAway = frequency - remaining;
    var nextArrival = moment().add(minAway, "minutes").format("HH:mm");;

    $(".info-table").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td class='min-away'>" + minAway + "</td></tr>");    
});