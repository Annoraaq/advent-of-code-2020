module.exports = { parseCommands };

function parseCommands(lines) {
  return lines.map(line => {
    const [type, param] = line.split(' ');
    return { type, param: Number(param) };
  });
}
