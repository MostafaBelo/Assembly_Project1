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
		this.ui.setCurrentTab("execution"); // implicitly calls update

		regs.init();
		RAM.init();
		this.currentInstruction = 0;

		let AssemblyCode = this.ui.codeContent;
		let DataCode = this.ui.dataContent;

		let instructionAddress = this.ui.instructionAddress;
		PC.setPC(instructionAddress);

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

		this.ui.update();
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

	executeCommand() {
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
				rs1Value = regs.read(instruction[2])
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
			case "subi":
				rs1Value = regs.read(instruction[2])
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
			case "jal":
				// execute jal command
				break;
			case "jalr":
				// execute jalr command
				break;
			case "beq":
				// execute beq command
				break;
			case "bne":
				// execute bne command
				break;
			case "blt":
				// execute blt command
				break;
			case "bge":
				// execute bge command
				break;
			default:
				// handle unknown command
				this.isPlaying = false;
				this.currentInstruction++;
				break;
		}

		this.computePC();
	}
}

export const flow = new Flow();
