var testMessage = {
          username: 'Somthing',
          text: 'my message!'
        }; //passed hardcoded testing!!

var app = {
  url: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //the initialization function should call fetch method
    app.fetch();

  },
  send: function(message){
    $.ajax({
      url: app.url,
      type: 'POST',
      contentType: 'application/JSON', 
      data: JSON.stringify(message),
      success: function(status){
        console.log("successfully sent the data, and recieved: ", status, "from the server.");
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

    //create a div to hold a single message
    var postDiv = $("<div></div>");
    var usernameDiv = $("<div></div>");
    var textDiv = $("<div></div>");

    usernameDiv.append($username);
    textDiv.append($usertext);

    postDiv.append(usernameDiv);
    postDiv.append(textDiv);

    $("#all-chats").append(postDiv).append('</br>');
  },
  addRoom: function(){

  },
  addFriend: "", //property or function
  
  handleSubmit: function(){
    //prevent default

  }

};

//run the init function to kick start the app!
app.init();
// app.send(testMessage); //test send message




