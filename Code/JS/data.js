export class RegisterFile {
	regs = [
		["zero", 0],
		["ra", 0],
		["sp", 0],
		["gp", 0],
		["tp", 0],
		["t0", 0],
		["t1", 0],
		["t2", 0],
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

	regNames =
		"zero ra sp gp tp t0 t1 t2 s0 s1 a0 a1 a2 a3 a4 a5 a6 a7 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 t3 t4 t5 t6".split(
			" "
		);

	getIndex(regName) {
		if (typeof regName === "string") {
			regName = regName.toLowerCase();
			let i = this.regNames.indexOf(regName);

			if (i !== -1) {
				return i;
			} else if (regName.length <= 3 && regName[0] === "x") {
				regName = regName.slice(1);

				if (isNaN(regName)) {
					throw new Error("Invalid register name");
				}

				i = parseInt(regName);
				if (i < 0 || i >= this.regs.length) {
					throw new Error("Invalid register index");
				}
				return i;
			}

			throw new Error("Invalid register name");
		} else if (typeof regName === "number") {
			if (regName < 0 || regName >= this.regs.length) {
				throw new Error("Invalid register index");
			}
			return regName;
		}

		throw new Error("Invalid register name");
	}

	read(regName) {
		let i = this.getIndex(regName);
		return this.regs[i][1];
	}

	write(regName, value) {
		let i = this.getIndex(regName);
		if (i == 0) {
			return;
		}

		value = value & 0xffffffff;
		this.regs[i][1] = value;
	}

	init() {
		for (let i = 0; i < this.regs.length; i++) {
			this.write(i, 0);
		}
	}
}
export class Memory {
	mem = {};
	memorySizeUpper = 0x7fffffff;
	memorySizeLower = 0xffffffff;
	constructor() {}

	read1(address) {
		return this.mem[address] || 0;
	}
	write1(address, value) {
		if (this.isInBounds(address)) {
			throw new Error("Address out of bounds");
		}

		value = value & 0xff;

		this.mem[address] = value;
	}
	read2(address) {
		let lower8Bits = this.read1(address);
		let higher8Bits = this.read1(address + 1);
		return (higher8Bits << 8) | lower8Bits;
	}
	write2(address, value) {
		if (this.isInBounds(address)) {
			throw new Error("Address out of bounds");
		}
		value = value & 0xffff;
		let lower8Bits = value & 0xff;
		let higher8Bits = value >> 8;

		this.write1(address, lower8Bits);
		this.write1(address + 1, higher8Bits);
	}
	read4(address) {
		let lower16Bits = this.read2(address);
		let higher16Bits = this.read2(address + 1);
		return (higher16Bits << 16) | lower16Bits;
	}
	write4(address, value) {
		if (this.isInBounds(address)) {
			throw new Error("Address out of bounds");
		}
		value = value & 0xffffffff;

		let lower16Bits = value & 0xffff;
		let higher16Bits = value >> 16;

		this.write2(address, lower16Bits);
		this.write2(address + 1, higher16Bits);
	}

	isInBounds(address) {
		return address >= this.memorySizeLower && address <= this.memorySizeUpper;
	}

	init() {
		this.mem = {};
	}
}

export class ProgramCounter {
	pc = 0;
	initial = 0;
	constructor() {}

	getPC() {
		return this.pc;
	}

	setPC(value) {
		value = value & 0xffffffff;
		this.pc = value;
	}

	setInitial(newInitial) {
		this.initial = newInitial;
	}

	incrementPC(jumpValue = 4) {
		this.pc += jumpValue;
	}

	decrementPC(jumpValue = 4) {
		this.pc -= jumpValue;
	}

	setPCOffset(offset) {
		this.setPC(this.initial + offset * 4);
	}

	getPCOffset(address) {
		return (address - this.initial) / 4;
	}
}
export const regs = new RegisterFile();
export const RAM = new Memory();
export const PC = new ProgramCounter();
