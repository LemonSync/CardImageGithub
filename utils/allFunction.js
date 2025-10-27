const Canvas = require("canvas");

/* 
  Fungsi untuk menggambar teks rata tengah
  ctx     → context canvas
  text    → isi teks
  y       → posisi vertikal teks (tengah berdasarkan tinggi huruf)
  font    → gaya font (misal: "bold 32px Arial")
  color   → warna teks (misal: "#ffffff")
  width   → lebar total canvas
*/
function drawCenteredText(ctx, text = String, y = Number, font = String, color = String, width = Number) {
  ctx.font = font;
  ctx.fillStyle = color;
  const textWidth = ctx.measureText(text).width;
  const x = (width - textWidth) / 2;
  ctx.fillText(text, x, y);
}

/*
  Simple canvas text editing
  ctx     → context canvas
  text    → the text
  x, y    → text position
  font    → font style
  color   → text color
*/
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



module.exports = { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText };