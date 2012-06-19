Noises = new Meteor.Collection("noises");

if (Meteor.is_client) {

  //makes blinky things blink
  function blinkit(){ $(".blinky").toggle() }
  setInterval(blinkit, 200);

  Template.noises.allNoises = function () {
    return Noises.find({});
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // delete everything and add a noise to start with
    Noises.remove({});
    Noises.insert({text: "doop", x: 300, y: 200});
  });
}