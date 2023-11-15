import { regs } from "./data.js";
import ui from "./gui.js";
import { convertToHexAndBinary } from "./dataConversions.js"
import { Memory } from "./data.js";

ui.setup(regs, undefined);
console.log(convertToHexAndBinary(21));

// for testing the write1, write2, and write4 functions:
// Create a new Memory object with a size of 10
let memInstance = new Memory(10);

// Test write1
memInstance.write1(0, 5); // Writes 00000101 to address 0
console.log(memInstance.read1(0)); // Should output 00000101

// Test write2
memInstance.write2(1, 259); // Writes 00000001 to address 1 and 00000011 to address 2
console.log(memInstance.read1(1)); // Should output 00000001
console.log(memInstance.read1(2)); // Should output 00000011

// Test write4
memInstance.write4(3, 16843009); // Writes 00000001 to addresses 3, 4, 5, and 6
console.log(memInstance.read1(3)); // Should output 00000001
console.log(memInstance.read1(4)); // Should output 00000001
console.log(memInstance.read1(5)); // Should output 00000001
console.log(memInstance.read1(6)); // Should output 00000001