import { regs, RAM, PC } from "./data.js";

export class Flow {
	ui = undefined;
	isPlaying = false;

	parser = undefined;
	currentInstruction = 0; // the one to be executed

	constructor() {}

	setUI(ui) {
		this.ui = ui;
	}
	setParser(par) {
		this.parser = par;
	}

	setupUI(ui) {
		if (ui !== undefined) this.setUI(ui);

		this.ui.onPlay = () => {
			this.startExecution();
		};
		this.ui.onStop = () => {
			this.stopExecution();
		};
		this.ui.onNext = () => {
			this.executeNext();
		};
		this.ui.onFallThrough = () => {
			this.executeAll();
		};
	}

	getInstructions() {
		return this.parser.instructions;
	}
	getLabels() {
		return this.parser.labels;
	}
	// getData() {
	//     return this.parser.dataParsed;
	// }

	computePC() {
		PC.setPCOffset(this.currentInstruction);
	}

	startExecution() {
		if (this.isPlaying) return;

		this.isPlaying = true;

		regs.init();
		RAM.init();
		this.currentInstruction = 0;

		let AssemblyCode = this.ui.codeContent;
		let DataCode = this.ui.dataContent;

		let instructionAddress = this.ui.instructionAddress;
		PC.setPC(instructionAddress);
		PC.setInitial(instructionAddress);

		// call parser and save its outcome for later execution (maybe as it is already saved in the parser)
		this.parser.takeCode(AssemblyCode);
		this.parser.takeData(DataCode);
		if (!this.parser.validate_code()) {
			console.log("Invalid Code");
		}
		if (!this.parser.validate_data()) {
			console.log("Invalid Data file");
		}
		this.parser.seperate_code();
		this.parser.seperate_data();

		// initialize registers with zeros, sp with max memory, and look into gp and tp
		regs.write("sp", 0xffffffff); // this is the last memory address, stack grows up

		// load data file into memory
		this.loadDataInMemory();

		this.ui.setCurrentTab("execution"); // implicitly calls update
		// this.ui.update();
	}

	executeNext() {
		if (!this.isPlaying) return;

		this.executeCommand();
		this.ui.update();
	}

	executeAll() {
		if (!this.isPlaying) return;

		// while running, keep executing commands
		while (this.isPlaying) {
			this.executeCommand();
		}

		// after execution of all commands update ui
		this.ui.update();
	}

	stopExecution() {
		if (!this.isPlaying) return;

		this.isPlaying = false;
		this.ui.setCurrentTab("code"); // implicitly calls update
	}

	loadDataInMemory() {
		console.log("data content", this.parser.data_input);
		for (let i = 0; i < this.parser.data_input.length; i++) {
			RAM.write1(this.parser.data_input[i][0], this.parser.data_input[i][1]);
		}
	}
	executeCommand() {
		if (this.getInstructions().length === this.currentInstruction) {
			this.isPlaying = false;
			return;
		}
		const instruction = this.getInstructions()[this.currentInstruction]; // [command, register1, register2, etc]
		let command = instruction[0];
		let rs1Value;
		let rs2Value;
		let rdValue;
		switch (command) {
			case "add":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value + rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "addi":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value + rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "sub":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value - rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "subi": // not part of the ISA
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value - rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "and":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value & rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "andi":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value & rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "or":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value | rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "ori":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value | rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "xor":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value ^ rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "xori":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value ^ rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "srl":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value >>> rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "srli":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value >>> rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "sra":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value >> rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "srai":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value >> rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "slt":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				if (rs1Value < rs2Value) rdValue = 1;
				else rdValue = 0;

				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "slti":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value < rs2Value ? 1 : 0;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "sltu":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				if (rs2Value < 0 && rs1Value >= 0) rdValue = 1;
				else rdValue = rs1Value < rs2Value ? 1 : 0;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "sltiu":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);

				if (rs2Value < 0 && rs1Value >= 0) rdValue;
				else rdValue = rs1Value < rs2Value ? 1 : 0;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "lui":
				rs1Value = parseInt(instruction[2]);
				rdValue = rs1Value << 12;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "sll":
				rs1Value = regs.read(instruction[2]);
				rs2Value = regs.read(instruction[3]);
				rdValue = rs1Value << rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;
			case "slli":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = rs1Value << rs2Value;
				regs.write(instruction[1], rdValue);

				this.currentInstruction++;
				break;

			case "jal":
				rdValue = PC.getPC() + 4;
				regs.write(instruction[1], rdValue);
				this.currentInstruction = this.getLabels()[instruction[2]];
				break;
			case "jalr":
				rdValue = PC.getPC() + 4;
				regs.write(instruction[1], rdValue);
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				this.currentInstruction = PC.getPCOffset(rs1Value + rs2Value);
				break;
			case "beq":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs1Value == rs2Value)
					this.currentInstruction = this.getLabels()[instruction[3]];
				else this.currentInstruction++;
				break;
			case "bne":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs1Value != rs2Value)
					this.currentInstruction = this.getLabels()[instruction[3]];
				else this.currentInstruction++;
				break;
			case "blt":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs1Value < rs2Value)
					this.currentInstruction = this.getLabels()[instruction[3]];
				else this.currentInstruction++;
				break;
			case "bge":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs1Value >= rs2Value)
					this.currentInstruction = this.getLabels()[instruction[3]];
				else this.currentInstruction++;
				break;
			case "bltu":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs2Value < 0 && rs1Value >= 0)
					this.currentInstruction = this.getLabels(instruction[3]);
				else if (rs1Value < rs2Value)
					this.currentInstruction = this.getLabels(instruction[3]);
				else this.currentInstruction++;
				break;
			case "bgeu":
				rs1Value = regs.read(instruction[1]);
				rs2Value = regs.read(instruction[2]);
				if (rs1Value < 0 && rs2Value >= 0)
					this.currentInstruction = this.getLabels(instruction[3]);
				else if (rs1Value >= rs2Value)
					this.currentInstruction = this.getLabels(instruction[3]);
				else this.currentInstruction++;
				break;
			case "lb":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = RAM.read1(rs1Value + rs2Value);
				regs.write1(instruction[1], rdValue);
				this.currentInstruction++;
				break;	
			case "lh":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = RAM.read2(rs1Value + rs2Value);
				regs.write2(instruction[1], rdValue);
				this.currentInstruction++;
				break;
			case "lw":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rdValue = RAM.read4(rs1Value + rs2Value);
				regs.write4(instruction[1], rdValue);
				this.currentInstruction++;
			case "lbu":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rs1Value = rs1Value >>> 0;
				rs2Value = rs2Value >>> 0;
				rdValue = RAM.read1(rs1Value + rs2Value);
				regs.write1(instruction[1], rdValue);
				this.currentInstruction++;
				break;
			case "lhu":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				rs1Value = rs1Value >>> 0;
				rs2Value = rs2Value >>> 0;
				rdValue = RAM.read2(rs1Value + rs2Value);
				regs.write2(instruction[1], rdValue);
				this.currentInstruction++;
				break;
			case "sb":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				RAM.write1(rs1Value + rs2Value, regs.read1(instruction[1]));
				this.currentInstruction++;
				break;
			case "sh":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				RAM.write2(rs1Value + rs2Value, regs.read2(instruction[1]));
				this.currentInstruction++;
				break;
			case "sw":
				rs1Value = regs.read(instruction[2]);
				rs2Value = parseInt(instruction[3]);
				RAM.write4(rs1Value + rs2Value, regs.read4(instruction[1]));
				this.currentInstruction++;
				break;
			case "ecall": // is this correct?
				this.isPlaying = false;
				this.currentInstruction++;
				break;
			case "ebreak":

				break;
			case "fence":
				
				break;
			


			default:
				// handle unknown command
				this.isPlaying = false;
				// this.currentInstruction++;
				break;
		}

		this.computePC();
	}
}

export const flow = new Flow();
