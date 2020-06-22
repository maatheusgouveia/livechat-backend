const { uuid } = require("uuidv4");

let messages = [
	{
		id: uuid(),
		message: "Bem vindo ao servidor Livechat",
		author: "livechat",
		timestamp: new Date(),
	},
];

module.exports = {
	async index(req, res) {
		return res.json(messages);
	},

	async store(req, res) {
		const newMessage = {
			id: uuid(),
			...req.body,
			timestamp: new Date(),
		};

		messages.push(newMessage);

		req.io.sockets.in("livechat").emit("received-message", newMessage);

		return res.json(newMessage);
	},
};
