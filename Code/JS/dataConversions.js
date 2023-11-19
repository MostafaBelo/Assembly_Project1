export function convertToHexAndBinary(decimalValue, valueSize = 32) {
	// Convert to 2's complement
	let sign = decimalValue >> (valueSize - 1);
	if (sign == 1) {
		let temp = 1;
		for (let i = 0; i < 32 - valueSize - 1; i++) {
			temp = temp << 1;
			temp = temp | 1;
		}
		temp = temp << valueSize;
		decimalValue = decimalValue | temp;
	}
	
	
	const hexValue =
		"0x" +
		decimalValue
			.toString(16)
			.toUpperCase()
			.padStart(valueSize / 4, "0");
	const binaryValue = "0b" + decimalValue.toString(2).padStart(valueSize, "0");
	return [decimalValue, hexValue, binaryValue];

}
