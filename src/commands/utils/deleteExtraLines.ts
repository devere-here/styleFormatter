export const deleteExtraLines = (currentLine:number, lineCount:number, replaceLine:function) => {
  for (let i = currentLine; i < lineCount; i++) {
    replaceLine('', i, 0)
  }
}
