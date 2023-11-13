export const regs = [
	["zero", 0],
	["ra", 0],
	["sp", 0],
	["gp", 0],
	["tp", 0],
	["t0", 21],
	["t1", 22],
	["t2", 23],
	["s0", 0],
	["s1", 0],
	["a0", 0],
	["a1", 0],
	["a2", 0],
	["a3", 0],
	["a4", 0],
	["a5", 0],
	["a6", 0],
	["a7", 0],
	["s2", 0],
	["s3", 0],
	["s4", 0],
	["s5", 0],
	["s6", 0],
	["s7", 0],
	["s8", 0],
	["s9", 0],
	["s10", 0],
	["s11", 0],
	["t3", 0],
	["t4", 0],
	["t5", 0],
	["t6", 0],
];
class Memory {
	mem = {};
	constructor() {}
	read1(address) {
		return this.mem[address] || 0;
	}
	write1(address, value) {
		this.mem[address] = value;
	}
	read2(address) {
		let lower8Bits = this.read1(address);
		let higher8Bits = this.read1(address + 1);
		return (higher8Bits << 8) | lower8Bits;
	}
	write2(address, value) {
		var lower8Bits = value & 0xff; // bitwise AND to get lower 8 bits
		var higher8Bits = value >> 8; // right shift to get higher 8 bits
		this.write1(address, lower8Bits);
		this.write1(address + 1, higher8Bits);
	}
	read4(address) {
		let lower16Bits = this.read2(address);
		let higher16Bits = this.read2(address + 1);
		return (higher16Bits << 16) | lower16Bits;
	}
	write4(address, value) {
		let lower16Bits = value & 0xffff; // bitwise AND to get lower 8 bits
		let higher16Bits = value >> 16; // right shift to get higher 8 bits
		this.write2(address, lower16Bits);
		this.write2(address + 1, higher16Bits);
	}
}
export const RAM = new Memory();
