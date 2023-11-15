export function convertToHexAndBinary(decimalValue, valueSize = 32) {
	const hexValue =
		"0x" +
		decimalValue
			.toString(16)
			.toUpperCase()
			.padStart(valueSize / 4, "0");
	const binaryValue = "0b" + decimalValue.toString(2).padStart(valueSize, "0");
	return [decimalValue, hexValue, binaryValue];
}
