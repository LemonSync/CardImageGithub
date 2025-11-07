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

function wrapSVGTextCentered(text, maxCharsPerLine = 25, lineHeight = 16, svgHeight = 400, svgWidth = 600) {
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

  const totalHeight = lines.length * lineHeight;
  const startY = (svgHeight - totalHeight) / 2;

  return lines.map((l, i) =>
    `<tspan x="${svgWidth / 2}" dy="${i === 0 ? startY : lineHeight}" text-anchor="middle">${l}</tspan>`
  ).join("");
}



function capitalize(str = "") {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1);
}



module.exports = { wrapSVGText, wrapSVGTextCentered, capitalize };

