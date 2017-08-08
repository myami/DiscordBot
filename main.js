const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
 // TODO: Make on the config.json the role by default : Dps,Tank,Heal . But people can change them on it .(array loop to hit and compare the args) DONE!!!
 // TODO: Avoid one player can register multiple time to an event .(loop through the array to compare the username)
 // TODO: A way to remove someone on the list with a command like " !Remove NameofTheEvent NameOfThePlayer " (taking the index of the player and remove the role).(loop intp the array take the index and remove the name and the role)
 // TODO: A simple way to export for googlesheet .
 // TODO: Do a translate.json file to have commands and message in different language .
 // TODO: Simple way to transform the data to an html file for download and have a better view(Can replace googlesheet if didn't succed to made it work)
 // TODO: Simple integration to website  .
 // TODO: A way to add DKP or loot system to it (for MMORPG ).(add an array and use the index will neeed html file or googlesheet to looks better)
 // TODO: Add Mysql option ?
 // TODO: Clean Code.
client.login(config.token);

client.on("ready", () => {
  console.log("Bot Ready");
  console.log("" + config.Role.length);

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
    message.channel.send("Event Created Call: " + " ' " + name +  + " ' " + " The : "+ datess + " At: " + hours + " Hours");
    message.channel.send("Done !!!! ");

  } else
  if(message.content.startsWith(config.prefix + "Accepted")) { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    // do an if the role is not dps heal or tank
    let eventname = args[1];
    let playername = message.author.username;
    let role = args[2];
    const jsonFile = require('./Events/' + eventname + '.json');
    for (i = 0; i < config.Role.length; i++) {
      if (role == config.Role[i]){
        jsonFile.PlayersAccepted.push(playername);
        jsonFile.PlayersAcceptedRole.push(role);
        fs.writeFile('./Events/' + eventname + '.json', JSON.stringify(jsonFile), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
        // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
        message.channel.send("Player : " + playername + " Join the event: " + " ' " + eventname + " ' " + " As : " + role);
        message.channel.send("Done !!!! ");
      }
    }

  message.channel.send("Invalid Role");

  }
  else
  if(message.content.startsWith(config.prefix + "Undecided")) { // !Undecided NomDelevent Role
    const args = message.content.split(/\s+/g);

    let eventname = args[1];
    let role = args[2];
    let playername = message.author.username;
    const jsonFile = require('./Events/' + eventname + '.json');
      for (i = 0; i < config.Role.length; i++) {
          if (role == config.Role[i]){
            jsonFile.PlayersNotSure.push(playername);
            jsonFile.PlayersNotSureRole.push(role);
            fs.writeFile('./Events/' + eventname + '.json', JSON.stringify(jsonFile), (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });
            // add in the array call "PlayersAccepted" on the correct json file the username and the role on the PlayersAcceptedRole (should have the same index)
            message.channel.send("Player : " + message.author.username + " Join the event " + " ' " + eventname +" ' " + " as undecided" + " As : " + role);
            message.channel.send("Done !!!! ");
          }
        }

      message.channel.send("Invalid Role");


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
    message.channel.send(" Done !!!"); // they are a limit of message per second the bot can post so like that we know when he as done
  }

  if(message.content.startsWith(config.prefix + "Commands")) { // !Commands
    message.channel.send("The commands are : ");
    message.channel.send("1/ !CreateEvent NameofTheEvent Date Hours");
    message.channel.send("2/ !Accepted NameofTheEvent Role");
    message.channel.send("3/ !Undecided NameofTheEvent Role");
    message.channel.send("4/ !Read NameofTheEvent");
    message.channel.send("5/ !Commands");

    message.channel.send("You can choice 3 Role : DPS,HEAL,TANK");
    message.channel.send("For delete an event or change is content go into the bot folder call 'Events' and change or delete the .json file with the name of the event");
    message.channel.send("Everytime you do a commands you will get a message 'Done !!!!' to confirm it's made ");
    message.channel.send("Done !!!! ");


  }




});
