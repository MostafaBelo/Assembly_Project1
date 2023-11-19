import { Memory } from "./data.js";
import { Parser } from "./parser.js";

// for testing the write1, write2, and write4 functions:
// Create a new Memory object with a size of 10
let memInstance = new Memory(10);

// Test write1
memInstance.write1(0, 5); // Writes 00000101 to address 0
// console.log(memInstance.read1(0)); // Should output 00000101

// Test write2
memInstance.write2(1, 259); // Writes 00000001 to address 1 and 00000011 to address 2
// console.log(memInstance.read1(2)); // Should output 00000001
// console.log(memInstance.read1(1)); // Should output 00000011

// Test write4
memInstance.write4(3, 16843009); // Writes 00000001 to addresses 3, 4, 5, and 6
// console.log(memInstance.read1(3)); // Should output 00000001
// console.log(memInstance.read1(4)); // Should output 00000001
// console.log(memInstance.read1(5)); // Should output 00000001
// console.log(memInstance.read1(6)); // Should output 00000000

// Test write 1 again
memInstance.write1(0, 259); // Writes 00000101 to address 0
// console.log(memInstance.read1(0)); // Should output 00000101

let par = new Parser(
	`L1: add x1,x2,x3
subi  t0,  x3 , 5
L2:
jal ra, L1
beq t0, t1,  L2
JALR zero, 0(x1)
lui t5 , 34
L3 : addi xo,t1,5
ecall
end: Ecall`,
	`8000: 5
8024:87
21 :93
0 : 15`
);

par.validate_code();
par.validate_data();

par.seperate_code();
par.seperate_data();
// console.log(par.labels);
// console.log(par.instructions);
// console.log(par.data_input);
