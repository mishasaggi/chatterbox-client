// var testMessage = {
//           username: 'Somthing',
//           text: 'my message!'
//         }; //passed hardcoded testing!!!

var app = {
  url: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //the initialization function should call fetch method
    app.fetch();
  },

  send: function(message){
    //ajax request to post message to the server
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
    //ajax request to get all messages from the server
    $.ajax({
      url: app.url,
      type: 'GET',
      contentType: 'application/JSON', //receives 401 without specifying this field
      success: function(data){
        console.log("data recieved from server", data);
        //call the function to add the fetched messages to DOM
        //sanitize messages
      },
      error: function(err){
        console.log("error on fetching messages", err);
      }

    });
  },

  clearMessages: function(){
    //clears messages from the DOM
  },

  addMessage: function(messageObject){
    //clear messages to avoid duplicacy
  
    //loop through the messages and append to DOM
  },

  addRoom: function(){
  },

  addFriend: "", //property or function

  handleSubmit: function(){
  }
};
//run the init function to kick start the app!
app.init();




