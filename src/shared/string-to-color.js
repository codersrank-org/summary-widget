/* eslint-disable no-bitwise */

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

function stringToColor(str) {
  const hashedHexNumber = intToRGB(hashCode(str));
  return `#${hashedHexNumber}`.toLowerCase();
}

export { stringToColor };
