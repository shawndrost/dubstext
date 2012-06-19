Noises = new Meteor.Collection("noises");

if (Meteor.is_client) {

  //makes blinky things blink
  function setBlinkIntervalForSpeed(speed){ 
    return setInterval(function(){
      $(".blinky-" + speed).toggle()
    }, speed);
  }

  //allnoise helpers/events
  intervalIds = []
  setupBlinks = function (noises) {
    var existingIntervals = [];
    _.each(intervalIds, function(id){ clearInterval(id) })
    noises.forEach(function(noise){
      if(!existingIntervals[noise.speed]){
        existingIntervals[noise.speed] = true
        id = setBlinkIntervalForSpeed(noise.speed)
        intervalIds.push(id);
      }
    })
  }
  Template.noises.allNoises = function () {
    var noises = Noises.find({});
    setupBlinks(noises); //janky rerender listener
    return noises;
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
  clickCanceler = function(e) { return false; }
  Template.newNoise.events = {
    'click .bordered' : clickCanceler,
    'click #submit'   : function(e) {
      Noises.insert({text: $("#text").val(), speed: $("#speed").val(), size: $("#size").val(), x: this.x, y: this.y })
      Session.set("newNoise", undefined);
      return false;
    }
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // delete everything and add a noise to start with
    Noises.remove({});
    Noises.insert({text: "doop", x: 300, y: 200, speed: 200, size: 20});
  });
}