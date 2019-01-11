
const deleteExtraLines = (currentLine, lineCount, replaceLine) => {
  for (let i = currentLine; i < lineCount; i++) {
    replaceLine('', i, 0)
  }
}
