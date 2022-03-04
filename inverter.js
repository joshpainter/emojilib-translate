const emojilib = require('emojilib')
const fsPromises = require('fs').promises

invert = () => {
  let inverted = {}
  for (let [emoji, keywords] of Object.entries(emojilib)) {
    for (const keyword of keywords) {
      emojiArray = inverted[keyword] ?? (inverted[keyword] = new Array());
      if (!emojiArray.includes(emoji)) emojiArray.push(emoji);
    }
  }
  return inverted
}

invertToFile = async (path) => {
  let handle
  try {
    handle = await fsPromises.open(path, 'w')
    const inverted = invert()
    await handle.writeFile(JSON.stringify(inverted))
  } finally {
    if (handle != undefined)
      await handle.close()
  }
}

const start = async () => {
  await invertToFile('./emojis.json');
}

start();
