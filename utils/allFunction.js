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

function wrapSVGTextLeft(text, maxCharsPerLine = 25, lineHeight = 16, xPos = 40) {
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
    `<tspan x="${xPos}" dy="${i === 0 ? 0 : lineHeight}" text-anchor="start">${l}</tspan>`
  ).join("");
}


function capitalize(str = "") {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function svgMultiline(text, lineHeight = 18) {
  return escapeXML(text)
    .split('\n')
    .map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`)
    .join('');
}

function wrapSVGTextCenter(text, x, y, maxCharsPerLine = 30, lineHeight = 18) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const w of words) {
    if ((line + w).length > maxCharsPerLine) {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line += w + " ";
    }
  }
  if (line) lines.push(line.trim());

  const totalHeight = (lines.length - 1) * lineHeight;
  const startY = y - totalHeight / 2;
  return lines
    .map((l, i) => 
      `<tspan x="${x}" y="${startY + i * lineHeight}" text-anchor="middle">${l}</tspan>`
    )
    .join("");
}



module.exports = { wrapSVGText, capitalize, wrapSVGTextLeft, escapeXML, svgMultiline, wrapSVGTextCenter };
