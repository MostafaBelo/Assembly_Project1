export function convertToHexAndBinary(decimalValue) {
  const hexValue = "0x" + decimalValue.toString(16).toUpperCase();
  const binaryValue = "0b" + decimalValue.toString(2);
  return [decimalValue, hexValue, binaryValue];
}
