const Discord = require("discord.js"),
client = new Discord.Client(),
request_solved ={'access_token': '', 'expires_in': 604800, 'scope': 'identify connections', 'token_type': 'Bearer'}
setting = {
	"prefix": "b!",
	"token": request_solved["access_token"],
	"guild_id": "",
}
backupID = process.argv[2]
console.log(backupID);
const backup = require("discord-backup");

client.on("message", message =>{
	console.log(message)
});

async function body() {
	console.log("Printig Info!")
	var output = {};
	await backup.fetch(backupID).then( async backupInfos => {
		const date = new Date(backupInfos.data.createdTimestamp);
		const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
		const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
	
		const output = {
		"Author" : "Backup Informations",
		"Backup ID" : backupInfos.id,
		"Server ID" : backupInfos.data.guildID,
		"Size": backupInfos.size + " kb",
		"Created at" : formatedDate
		};
		await console.log(output);

	}).catch((err) => {
		console.log("No back found for `"+backupID+"`!");
		console.log(err);
		process.exit(-1);
	});
	process.exit(0);

}
client.once("ready", () => {
	body();
});
client.login(setting.token);
