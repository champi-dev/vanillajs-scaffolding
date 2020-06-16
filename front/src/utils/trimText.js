function trimText(str, max) {
  const strArr = str.split(' ')
  const filtered = strArr.map((s, i) => i < max ? s : '')
  return filtered.join(' ') + '...'
}

export default trimText