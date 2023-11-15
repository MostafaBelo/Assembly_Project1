export function convertToHexAndBinary(decimalValue, valueSize = 32) {
  const hexValue = "0x" + decimalValue.toString(16).toUpperCase().padStart(valueSize/4, '0');
  const binaryValue = "0b" + decimalValue.toString(2).padStart(valueSize, '0');
  return [decimalValue, hexValue, binaryValue];

  /*let binaryStr = value.toString(2); // Convert value to binary
  binaryStr = binaryStr.padStart(8, '0'); // Pad with leading zeros

  // Convert to padded binary strings
  let lower8BitsStr = lower8Bits.toString(2).padStart(8, '0');
  let higher8BitsStr = higher8Bits.toString(2).padStart(8, '0');

  // Convert to padded binary strings
  let lower16BitsStr = lower16Bits.toString(2).padStart(16, '0');
  let higher16BitsStr = higher16Bits.toString(2).padStart(16, '0');*/


  // padding happens here
}
