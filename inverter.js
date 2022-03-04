const emojilib = require('emojilib');
const fsPromises = require('fs').promises;

const invert = () => {
	const inverted = {};
	for (const [emoji, keywords] of Object.entries(emojilib)) {
		for (const keyword of keywords) {
			const emojiArray = inverted[keyword] ?? (inverted[keyword] = new Array());
			if (!emojiArray.includes(emoji)) emojiArray.push(emoji);
		}
	}
	return inverted;
};

const invertToFile = async (path) => {
	let handle;
	try {
		handle = await fsPromises.open(path, 'w');
		const inverted = invert();
		await handle.writeFile(JSON.stringify(inverted));
	}
	finally {
		if (handle != undefined) {await handle.close();}
	}
};

const start = async () => {
	await invertToFile('./emojis.json');
};

start();
