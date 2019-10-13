// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8i89T3YXksYS3CkG4bocRDbSM2wj_IIg",
    authDomain: "contactform-c4a0b.firebaseapp.com",
    databaseURL: "https://contactform-c4a0b.firebaseio.com",
    projectId: "contactform-c4a0b",
    storageBucket: "contactform-c4a0b.appspot.com",
    messagingSenderId: "28678523470",
    appId: "1:28678523470:web:9428fc651754a98bf7d11f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(function () {
    //just make a variable to keep track of the data coming from Firebase
    var data = [];

    //create a new connection to firebase
    var ref = new Firebase('https://seneca-activs.firebaseio.com/activities');

    //listen to data updates from firebase
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        //when data updates at Firebase, put it in the data variable
        data = snapshot.val();
    })



    $('#newActivity').submit(function (event) {
        var $form = $(this);
        console.log("submit to Firebase");

        //make the submit disabled
        $form.find("#saveForm").prop('disabled', true);

        //get the actual values that we will send to firebase
        var titleToSend = $('#activityTitle').val();

        console.log(titleToSend);

        var descriptionToSend = $('#activityDescription').val();

        console.log(descriptionToSend);

        var categoryToSend = $('#activityCatagory').val();

        console.log(categoryToSend);

        //take the values from the form, and put them in an object
        var newActivity = {
            "description": descriptionToSend,
            "title": titleToSend,
            "type": categoryToSend
        }
        //put the new object into the data array
        data.push(newActivity);
        console.log(data);
        //send the new data to Firebase
        ref.set(data);

        return false;
    })
})