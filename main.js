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
    let dates = args[2]; // format daymonthyear
    let hours = args[3]; // format 24hours

    let text = JSON.stringify({Name: name, date: dates,Hours: hours,PlayersAccepted:[],PlayersAcceptedRole:[],PlayersNotSure:[],PlayersNotSureRole:[]});
    fs.writeFile('./Events/'name + '.json', text, (err) => {
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
fs.unlink('/Events/'+name'.json', function(error) {
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
    eventname.PlayersAccepted.push(playername);
    eventname.PlayersAcceptedRole.push(role);

    // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + playername + "Join the event: " + eventname);
  }
  else
  if(message.content.startsWith(config.prefix + "Undecided")) { // !NotSure NomDelevent Role
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let role = args[2];
    let playername = message.author.username;
    eventname.PlayersNotSure.push(playername);
    eventname.PlayersNotSureRole.push(role);
    // add in the array call "PlayersNotSure" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + message.author.username + "Join the event " + eventname + "as undecided");
  }
  else
  if(message.content.startsWith(config.prefix + "Read")) { // !Read NomDelevent
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let JSON.parse
    message.channel.send("Event : "+ eventname.Name+ eventname.Date + eventname.Hours + eventname.PlayersAccepted + eventname.PlayersAcceptedRole + eventname.PlayersNotSure + eventname.PlayersNotSureRole);
  }




});
