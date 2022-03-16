const fs = require('fs');

export async function saveJsonFile(data, path = 'data/db.json') {
  fs.writeFileSync(path, JSON.stringify(data, null));
}