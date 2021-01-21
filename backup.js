const Discord = require("discord.js"),
client = new Discord.Client(),
request_solved ={'access_token': '', .XEcCgg.1Eb5CQcf_scE7HnX_NhIEwkeXqk', 'expires_in': 604800, 'scope': 'identify connections', 'token_type': 'Bearer'}
setting = {
	"prefix": "b!",
	"token": request_solved["access_token"],
	"guild_id": "",
	"log_channel_id" :"" ,
}
console.log(setting.token);
const backup = require("discord-backup");

client.on("message", message =>{
});

async function body() {
	console.log("Creating Backup!")
	var Guild;
	Guild = await client.guilds.fetch(setting["guild_id"]).catch( _err => {console.log(_err); process.exit(-1)}); 
	LogChannel = await client.channels.fetch(setting["log_channel_id"]).catch(_err => {return null});
	console.log("Ready, starting to backup!");
	options = {
		jsonBeautify: true
	}
	await backup.create(Guild, options).then(backupInfos => {
	        //LogChannel.send("Successfull!")
		const date = new Date(backupInfos.createdTimestamp);
		const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
		const formatedDate =`${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`
			
		output = {
		"Author" : "Backup Informations",
		"Backup ID" : backupInfos.id,
		"Server ID" : backupInfos.guildID,
		"Size" : backupInfos.size + " kb",
		"Created at" : formatedDate
		};
		console.log(output);
		console.log("The backup has been created!\n The ID is " +backupInfos.id);

	}).catch ( (_err) => {
		console.log("Backup did not work!")
		console.log(_err)
		
	});
	process.exit(0);
}
client.once("ready", () => {
	body();
});
client.login(setting.token);
