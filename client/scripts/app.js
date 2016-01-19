var testMessage = {
          username: 'Somthing',
          text: 'my message!'
        }; //passed hardcoded testing!!

var app = {
  url: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //the initialization function should call fetch method
    app.fetch(); //first call on loading the page
    setInterval(app.fetch, 10000); //auto refresh every 5 seconds
    $(document).ready(function(){
      $('#chat-form').on('submit', function(event){
        //prevent default
        event.preventDefault();

        //grab user input values
        var $inputname = $('#user-name').val();
        var $inputtext = $('#user-text').val();
        var $inputroom = $('#user-room').val();
        app.handleSubmit($inputname, $inputtext, $inputroom);
      });
    });

  },
  send: function(message){
    $.ajax({
      url: app.url,
      type: 'POST',
      contentType: 'application/JSON', 
      data: JSON.stringify(message),
      success: function(status){
        console.log("successfully sent the data, and recieved: ", status, "from the server.");
        app.fetch();
      },
      error: function(err){
        console.log("error in sending messages to server", err);
      }
    });

  },
  fetch: function(){
    $.ajax({
      url: app.url,
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/JSON', //receives 401 without specifying this field
      success: function(data){
        console.log("data recieved from server", data);
        //clear messages to avoid duplicacy
        app.clearMessages();
        var sanitizedMessage;

        for(var index = 0; index < data.results.length; index++) {
          // sanitizedMessage = filterXSS(currentMessage[index]);
          sanitizedMessage = data.results[index];
          app.addMessage(sanitizedMessage);
        }

      },
      error: function(err){
        console.log("error on fetching messages", err);
      }

    });

  },
  clearMessages: function(){
    //clears messages from the DOM
    $("#all-chats").children().remove();

  },
  addMessage: function(message){
    var $username = message.username;
    var $usertext = message.text;
    var $timestamp = message.createdAt;
    var $userroom = message.room;

    //add default room
    if(!$userroom) $userroom = 'lobby';
    //create a div to hold a single message
    var postDiv = $("<div></div>");
    var usernameDiv = $("<div></div>");
    var textDiv = $("<div></div>");


    usernameDiv.append($username).append(' in ').append($userroom);
    textDiv.append($usertext).append(' ').append($timestamp);

    postDiv.append(usernameDiv);
    postDiv.append(textDiv);

    $("#all-chats").append(postDiv).append('</br>');

    //call addRoom if unique
    //store room names in an object, keys are unique
    //might be a redundant step if we have to check before appending to the dropdown too.
    // if(!app.rooms[$userroom]) {
    //   app.rooms[$userroom] = $userroom;
    // }
    // console.log(app.rooms);
    // for(var key in app.rooms) {
      //append only if it in not in the drop down 

      //test addition
      // var newOption = $('<option value="dummy">dummy</option>');
      // $('#rooms').append(newOption);

      //$('#rooms')[0]) gives the object(array) containing all select options
      //$('#rooms')[0][0]) gives the first select option row

      //set flag
      var haveRoom = false;

      $('#rooms option').each(function(){
        console.log($(this).val(), "this");
        if( $(this).val() === $userroom) {
          console.log("found room");
          haveRoom = true;
        }
      });
      if(!haveRoom) {
        var newOption = $('<option value="'+ $userroom +'">'+ $userroom +'</option>');
        $('#rooms').append(newOption);
      }
      
    // };

    // app.addRoom($userroom);
  },
  rooms: { },

  addRoom: function(){
    //have a drop down with room names, keep unique values only.

  },
  addFriend: "", //property or function
  
  handleSubmit: function(username, usertext, userroom){
    
    console.log("arguments recieved by the handle submit", username, usertext);
    //create message object to send to the server
    var message = {
          username: username,
          text: usertext,
          room: userroom
        };

    app.send(message);
  }

};

//run the init function to kick start the app!
app.init();
// app.send(testMessage); //test send message




