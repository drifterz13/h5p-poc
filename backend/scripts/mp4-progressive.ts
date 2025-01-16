import { argv } from "node:process";
import * as fs from "node:fs";
import { execSync } from "node:child_process";


function convertMp4Progressive() {
  const [, , mp4Path] = argv
  if (!fs.existsSync(mp4Path)) {
    throw new Error("File not found")
  }

  console.log(`mp4 path = ${mp4Path}`)

  const outputFile = mp4Path.replace(".mp4", "-prog.mp4")
  if (fs.existsSync(outputFile)) {
    console.log('Removing existing file = ', outputFile)
    fs.unlinkSync(outputFile)
  }

  const cmd = `
    ffmpeg -i "${mp4Path}" -movflags faststart -acodec copy -vcodec copy "${outputFile}"
  `

  try {
    console.log('Converting file...')
    execSync(cmd)
    console.log('File converted successfully = ', outputFile)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

convertMp4Progressive()
