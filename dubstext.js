Noises = new Meteor.Collection("noises");

if (Meteor.is_client) {

  //makes blinky things blink
  function blinkit(){ $(".blinky").toggle() }
  setInterval(blinkit, 200);


  //allnoise helpers/events
  Template.noises.allNoises = function () {
    return Noises.find({});
  }
  Template.noises.newNoise = function () {
    return Session.get("newNoise")
  }
  Template.noises.events = {
    'click #container' : function (e) {
      Session.set("newNoise", {x: e.x, y: e.y})
    }
  };
  //end of allnoise helpers/events


  //newnoise events
  Template.newNoise.events = {
    'click #text' : function(e) { return false; },
    'click #submit' : function(e) {
      Noises.insert({text: $("#text").val(), x: this.x, y: this.y })
      Session.set("newNoise", undefined);
      return false;
    }
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // delete everything and add a noise to start with
    Noises.remove({});
    Noises.insert({text: "doop", x: 300, y: 200});
  });
}