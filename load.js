const Discord = require("discord.js"),
client = new Discord.Client(),
request_solved ={'access_token': '', 'expires_in': 604800, 'scope': 'identify connections', 'token_type': 'Bearer'}
setting = {
	"prefix": "b!",
	"token": request_solved["access_token"],
	"guild_id": "",
	"log_channel_id" :"" ,
}
backupID = process.argv[2]
const backup = require("discord-backup");

client.on("message", message =>{
});

async function body() {
	Guild = await client.guilds.fetch(setting["guild_id"]).catch( _err => {console.log(_err); process.exit(-1)}); 
	k = await backup.fetch(backupID).catch( _err => {
		console.log("No back found for `"+backupID+"`!");
		process.exit(-1);

	});
	'use strict';

	var fs = require('fs');

	console.read = len => {
		  var buff = Buffer.alloc(len);
		  fs.readSync(process.stdin.fd, buff, 0, len);
		  return buff.toString();
	};

	console.readline = () => {
		  var str = '';
		  do{
		      var char = console.read(1);
		      if(char !== '\n') str += char;
		    }while(char !== '\n');
		  return str;
	};
	console.log("Type -confirm to load the backup.");
	r = console.readline();
	if ("-confirm" != r.trim()) { console.log(" Exiting.") ; process.exit(-1);}
	await backup.load(backupID, Guild).then(() => {
		//backup.remove(backupID);
	} ).catch( (err) => {
		console.log("Error occured!");
		console.log(err);
	});
	console.log("Success!");
	process.exit(0);
}
client.once("ready", () => {
	body();
});
client.login(setting.token);
