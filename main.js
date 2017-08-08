const Discord = require("discord.js");
const client = new Discord.Client();
const low = require('lowdb');
const db = low(`./Events/db.json`);
const config = require("./config.json");


client.login(config.token);

client.on("ready", () => {
  console.log("Bot Ready");

});


client.on("message", (message) => {

  // Exit and stop if it's not there
  if (!message.content.startsWith(config.prefix)) return;

  if (message.content.startsWith(config.prefix + "CreateEvent")) { // !CreateEvent NomDelevent Date Heure
    const args = message.content.split(/\s+/g);
    const names = args[1];
    const datess = args[2];
    const hourss = args[3];

    db.get('events')
      .push({name: names ,date: datess , hours: hourss, playeraccepted: [],playerundecided: []})
      .write()
    message.channel.send(`Event Created Call: ${names} the ${datess} at ${hourss}`);
    message.channel.send("Done !!!! ");
    console.log('Event created');


  } else
  if(message.content.startsWith(config.prefix + "Accepted")) { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    // do an if the role is not dps heal or tank
    let eventname = args[1];
    let playername = message.author.username;
    let role = args[2];
    const roleplayercheck = db.get('role').find({ro:role}).value();
    // player
const playercheck = db.get('events').find({name: eventname}).get("playeraccepted").value().includes("playername") ;
  if (playercheck)  {
    console.log(`Player : ${playername} already in the event`);
  }
  else {
      db.get(`events.event.${name}.playeraccepted`).push({name: playername , role: role}).write()
      console.log(`Player : ${playername} add in the event as ${role}`);
  }






    }
  else
  if(message.content.startsWith(config.prefix + "Undecided"))  { // !Accepted NomDelevent Role
    const args = message.content.split(/\s+/g);
    // do an if the role is not dps heal or tank
    let name = args[1];
    let playername = message.author.username;
    let role = args[2];


    }
  else
  if(message.content.startsWith(config.prefix + "Read")) { // !Read NomDelevent
    const args = message.content.split(/\s+/g);
    let name = args[1];
    const jsonFile = require('./Events/' + eventname + '.json');

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
