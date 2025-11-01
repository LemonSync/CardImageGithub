const Canvas = require("canvas");

function drawCenteredText(ctx, text = String, y = Number, font = String, color = String, width = Number) {
  ctx.font = font;
  ctx.fillStyle = color;
  const textWidth = ctx.measureText(text).width;
  const x = (width - textWidth) / 2;
  ctx.fillText(text, x, y);
}

function drawTextBlock(ctx, text = String, x = Number, y = Number, font = String, color = String) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function wrapText(ctx, text = String, startY = Number, centerX = Number, font = String, color = String, maxWidth = Number, lineHeight = Number) {
  ctx.font = font;
  ctx.fillStyle = color;
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let word of words) {
    const testLine = line + (line ? " " : "") + word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const limitedLines = lines.slice(0, 5);
  for (let i = 0; i < limitedLines.length; i++) {
    const lineWidth = ctx.measureText(limitedLines[i]).width;
    const x = centerX - lineWidth / 2;
    const y = startY + i * lineHeight;
    ctx.fillText(limitedLines[i], x, y);
  }
}

function leftWrapText(ctx, text = String, startY = Number, centerX = Number, font = String, color = String, maxWidth = Number, lineHeight = Number) {
  ctx.font = font;
  ctx.fillStyle = color;
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let word of words) {
    const testLine = line + (line ? " " : "") + word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const limitedLines = lines.slice(0, 5);
  for (let i = 0; i < limitedLines.length; i++) {
    const lineWidth = ctx.measureText(limitedLines[i]).width;
    const x = centerX;
    const y = startY + i * lineHeight;
    ctx.fillText(limitedLines[i], x, y);
  }
}

function rightWrapText(ctx, text = String, startY = Number, rightX = Number, font = String, color = String, maxWidth = Number, lineHeight = Number) {
  ctx.font = font;
  ctx.fillStyle = color;

  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let word of words) {
    const testLine = line + (line ? " " : "") + word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const limitedLines = lines.slice(0, 5);

  for (let i = 0; i < limitedLines.length; i++) {
    const lineWidth = ctx.measureText(limitedLines[i]).width;
    const x = rightX - lineWidth;
    const y = startY + i * lineHeight;
    ctx.fillText(limitedLines[i], x, y);
  }
}

function drawHexagonLancip(ctx, x, y, size) {
  const radius = size / 2;
  const centerX = x + radius;
  const centerY = y + radius;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i - Math.PI / 6; 
    const px = centerX + radius * Math.cos(angle);
    const py = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.clip();
}

function drawHexagonTumpul(ctx, x, y, size) {
  const radius = size / 2;
  const centerX = x + radius;
  const centerY = y + radius;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i; // flat-top
    const px = centerX + radius * Math.cos(angle);
    const py = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.clip();
}

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
    `<tspan x="200" dy="${i === 0 ? 0 : lineHeight}">${l}</tspan>`
  ).join("");
}



module.exports = { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText, drawHexagonLancip, drawHexagonTumpul, wrapSVGText };
