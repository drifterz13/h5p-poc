import * as fs from 'node:fs';
import { argv } from 'node:process';


function checkMP4Optimization() {
  const [, , mp4Path] = argv

  if (!fs.existsSync(mp4Path)) {
    throw new Error("File not found")
  }

  console.log(`mp4 path = ${mp4Path}`)

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(mp4Path, { start: 0, end: 1000 });
    let data = '';

    stream.on('data', (chunk) => {
      data += chunk.toString('hex');
    });

    stream.on('end', () => {
      const moovIndex = data.indexOf('6d6f6f76'); // hex for 'moov'
      const ftypIndex = data.indexOf('66747970'); // hex for 'ftyp'

      if (moovIndex !== -1 && ftypIndex !== -1 && moovIndex > ftypIndex) {
        resolve('The MP4 file appears to be optimized for progressive download.');
      } else {
        resolve('The MP4 file does not appear to be optimized for progressive download.');
      }
    });

    stream.on('error', reject);
  });
}

// Usage
checkMP4Optimization()
  .then(console.log)
  .catch(console.error);
