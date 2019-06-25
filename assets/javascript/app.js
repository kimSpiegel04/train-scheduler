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

//initial values
var trainName='';
var destination='';
var startTime='';
var frequency='';

$('#submit-info').on('click', function(event){
    event.preventDefault();
    //grab values
    trainName=$('#train-name').val().trim();
    destination=$('#destination').val().trim();
    startTime=$('#start-time').val().trim();
    frequency=$('#frequency').val().trim();

    //push
    database.ref().push({
        name: trainName,
        destination: destination,
        start: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


    database.ref().on('child_added', function(snapshot){
        var ss=snapshot.val();
        console.log(ss.name);

    })
    document.getElementById('train-name').value='';
    document.getElementById('destination').value='';
    document.getElementById('start-time').value='';
    document.getElementById('frequency').value='';
});
