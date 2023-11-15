export class RegisterFile
{
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

	regNames = [	
		"zero",
		"ra",
		"sp",
		"gp",
		"tp",
		"t0",
		"t1",
		"t2",
		"s0",
		"s1",
		"a0",
		"a1",
		"a2",
		"a3",
		"a4",
		"a5",
		"a6",
		"a7",
		"s2",
		"s3",
		"s4",
		"s5",
		"s6",
		"s7",
		"s8",
		"s9",
		"s10",
		"s11",
		"t3",
		"t4",
		"t5",
		"t6",
	];

	getIndex(regName)
	{
		if (typeof regName === "string") 
		{
			regName = regName.toLowerCase();
			let i = this.regNames.indexOf(regName);

		if(i !== -1)
		{
			return i;
		}
		else if(regName.length <= 3 && regName[0] === 'x'  )
		{
			regName = regName.slice(1); // Remove the first character

			if(isNaN(regName))
			{
				throw new Error('Invalid register name');
			}

			i = parseInt(regName);
			if(i < 0 || i >= this.regs.length)
			{
				throw new Error('Invalid register index');
			}
			return i; // the value inside the register
		}
		
			throw new Error('Invalid register name');
		}
		else if(typeof regName === "number")
		{
			if(regName < 0 || regName >= this.regs.length)
			{
				throw new Error('Invalid register index');
			}
			return regName;
		}
		
		throw new Error('Invalid register name');
	}

	read(regName)
	{
		let i = this.getIndex(regName);
		return this.regs[i][1]; // the value inside the register
	}

	write(regName, value)
	{
		let i = this.getIndex(regName);
		if (i == 0)
		{
			return;
		}

		value = value & 0xFFFFFFFF; // bitwise AND to get lower 32 bits
		this.regs[i][1] = value;
	}

}
export class Memory
{
	mem = {};
	memorySize= 0xFFFFFFFF + 1;
	constructor(size)
	{
		if(size !== undefined)
		{
			this.memorySize = size;
		}  

	}

	
	read1(address)
	{
		return this.mem[address] || 0;
	}
	write1(address, value)
	{
		if(address < 0 || address >= this.memorySize)
		{
			throw new Error('Address out of bounds');
		}

		value = value & 0xFF; // bitwise AND to get lower 8 bits

    	this.mem[address] = value; 
	}
	read2(address) {
		let lower8Bits = this.read1(address);
		let higher8Bits = this.read1(address + 1);
		return (higher8Bits << 8) | lower8Bits;
	}
	write2(address, value)
	{
		if(address < 0 || address >= this.memorySize)
		{
			throw new Error('Address out of bounds');
		}
		value = value & 0xFFFF; // bitwise AND to get lower 16 bits
    	let lower8Bits = value & 0xFF; // bitwise AND to get lower 8 bits
    	let higher8Bits = value >> 8; // right shift to get higher 8 bits


    	this.write1(address, lower8Bits);
    	this.write1(address + 1, higher8Bits);
	}
	read4(address) {
		let lower16Bits = this.read2(address);
		let higher16Bits = this.read2(address + 1);
		return (higher16Bits << 16) | lower16Bits;
	}
	write4(address, value)
	{
		if(address < 0 || address >= this.memorySize)
		{
			throw new Error('Address out of bounds');
		}
		value = value & 0xFFFFFFFF; // bitwise AND to get lower 32 bits

    	let lower16Bits = value & 0xFFFF; // bitwise AND to get lower 16 bits
    	let higher16Bits = value >> 16; // right shift to get higher 16 bits

    	this.write2(address, lower16Bits);
    	this.write2(address + 1, higher16Bits);
	}
}

export const regs = new RegisterFile();
export const RAM = new Memory();
