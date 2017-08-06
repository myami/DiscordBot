const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")

client.login(config.token);

client.on("ready", () => {
  console.log("Bot Ready");
});
client.on("message", (message) => {


  // Exit and stop if it's not there
  if (!message.content.startsWith(config.prefix)) return;

  if (message.content.startsWith(config.prefix + "CreateEvent")) { // !CreateEvent NomDelevent Date Heure
    if(message.author.id !== config.ownerID) return;
    const args = message.content.split(/\s+/g);
    let name = args[1];
    let date = args[2]; // format day/month/year
    let hours = args[3]; // format 24hours
    let text = "{'Name'"+":" + name + ","+ "\n" + "'Hours'"+":" + date + ","+"\n" +"'Hours'"+":" + hours +","+"\n"+"'PlayersAccepted':[]," + "\n" + "'PlayersAcceptedRole':[],"+ "\n"+"'PlayersNotSure':[],"+"\n" + " 'PlayersNotSureRole':[] "
    + "\n" +"}";
    fs.writeFile('./Events/'name + '.txt', text, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    message.channel.send("Event Created Call: " + name + "The :"+ date + "At: " + hours);
  } else
  if (message.content.startsWith(config.prefix + "DeleteEvent")) { // !DeleteEvent NomDelevent
    if(message.author.id !== config.ownerID) return;
    const args = message.content.split(/\s+/g);
    let name = args[1];
    // delete the json file
fs.unlink('/Events/'+name'.txt', function(error) {
    if (error) {
        throw error;
    }
});
    message.channel.send("Events : " + name + "As been deleted");
  } else
  if(message.content.startsWith(config.prefix + "Accepted")) { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let playername = message.author.username;
    let role = args[2];

    fs.writeFile("./" + eventname +".json", JSON.stringify(points), (err) => {
  if (err) console.error(err)
});
    // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + playername + "Join the event: " + eventname);
  }
  else
  if(message.content.startsWith(config.prefix + "Undecided")) { // !NotSure NomDelevent Role
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let role = args[2];
    // add in the array call "PlayersNotSure" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + message.author.username + "Join the event " + eventname + "as undecided");
  }
  else
  if(message.content.startsWith(config.prefix + "Read")) { // !Read NomDelevent
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    // return on the chat the json file
    message.channel.send("");
  }




});
