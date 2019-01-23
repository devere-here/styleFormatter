export const insertIndent = (text:string, indent:number) => {
  let str = ''

  for (let i = 0; i < indent; i++){
    str += ' '
  }

  return str.concat(text)
}
