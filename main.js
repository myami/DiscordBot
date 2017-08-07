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
  //  if(message.author.id !== config.ownerID) return;
    const args = message.content.split(/\s+/g);
    let name = args[1];
    let datess = args[2]; // format daymonthyear
    let hours = args[3]; // format 24hours
    let text = JSON.stringify({Name: name, dates: datess,Hours: hours,PlayersAccepted:[],PlayersAcceptedRole:[],PlayersNotSure:[],PlayersNotSureRole:[]});
    fs.writeFile('./Events/' + name + '.json', text, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    message.channel.send("Event Created Call: " + name + " The :"+ datess + " At: " + hours + "Hours");
  } else
  if (message.content.startsWith(config.prefix + "DeleteEvent")) { // !DeleteEvent NomDelevent
    if(message.author.id !== config.ownerID) return;
    const args = message.content.split(/\s+/g);
    let name = args[1];
    // delete the json file
    fs.unlink('./Events/' + name + '.json', function(error) {
    if (error) {
        throw error;
        console.log('The file has been deleted!');

    }
});
    message.channel.send("Events : " + name + "As been deleted");
  } else
  if(message.content.startsWith(config.prefix + "Accepted")) { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let playername = message.author.username;
    let role = args[2];
    console.log(playername);
    const jsonFile = require('./Events/' + eventname + '.json');
    jsonFile.PlayersAccepted.push(playername);
    jsonFile.PlayersAcceptedRole.push(role);

    fs.writeFile('./Events/' + eventname + '.json', JSON.stringify(jsonFile), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + playername + "Join the event: " + eventname);
  }
  else
  if(message.content.startsWith(config.prefix + "Undecided")) { // !NotSure NomDelevent Role
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    let role = args[2];
    let playername = message.author.username;
    const jsonFile = require('./Events/' + eventname + '.json');
    jsonFile.PlayersNotSure.push(playername);
    jsonFile.PlayersNotSureRole.push(role);
    fs.writeFile('./Events/' + eventname + '.json', JSON.stringify(jsonFile), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    // add in the array call "PlayersNotSure" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player :" + message.author.username + "Join the event " + eventname + "as undecided");
  }
  else
  if(message.content.startsWith(config.prefix + "Read")) { // !Read NomDelevent
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    const jsonFile = require('./Events/' + eventname + '.json');
    message.channel.send("" + JSON.stringify(jsonFile));
  }




});
