function wrapSVGText(text, maxCharsPerLine = 25, lineHeight = 16) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let w of words) {
    if ((line + w).length > maxCharsPerLine) {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line += w + " ";
    }
  }
  if (line) lines.push(line.trim());

  return lines.map((l, i) =>
    `<tspan x="300" dy="${i === 0 ? 0 : lineHeight}">${l}</tspan>`
  ).join("");
}


function capitalize(str = "") {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1);
}



module.exports = { wrapSVGText, capitalize };
