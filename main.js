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
    message.channel.send("Event Created Call: " + name + " The : "+ datess + " At: " + hours + " Hours");
  } else
  if(message.content.startsWith(config.prefix + "Accepted")) { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    // do an if the role is not dps heal or tank
    let eventname = args[1];
    let playername = message.author.username;
    let role = args[2];
    const jsonFile = require('./Events/' + eventname + '.json');
    jsonFile.PlayersAccepted.push(playername);
    jsonFile.PlayersAcceptedRole.push(role);

    fs.writeFile('./Events/' + eventname + '.json', JSON.stringify(jsonFile), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
    message.channel.send("Player : " + playername + " Join the event: " + eventname + " As : " + role);
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
    message.channel.send("Player : " + message.author.username + " Join the event " + eventname + " as undecided" + " As : " + role);
  }
  else
  if(message.content.startsWith(config.prefix + "Read")) { // !Read NomDelevent
    const args = message.content.split(/\s+/g);
    let eventname = args[1];
    const jsonFile = require('./Events/' + eventname + '.json');
    message.channel.send("Event name : " + JSON.stringify(jsonFile.Name));
    message.channel.send("Date of the event: " + JSON.stringify(jsonFile.dates));
    message.channel.send("Hours of the event: " + JSON.stringify(jsonFile.Hours));
    message.channel.send("Player Accepted : ");
    for (i = 0; i < jsonFile.PlayersAccepted.length; i++) {
    message.channel.send("" + JSON.stringify(jsonFile.PlayersAccepted[i]) + " " +JSON.stringify(jsonFile.PlayersAcceptedRole[i]));
    }
    message.channel.send("Player Undecided : ");
    for (i = 0; i < jsonFile.PlayersNotSure.length; i++) {
    message.channel.send("" + JSON.stringify(jsonFile.PlayersNotSure[i]) + " " +JSON.stringify(jsonFile.PlayersNotSureRole[i]));
    }


  //  message.channel.send("" + JSON.stringify(jsonFile));
  }




});
