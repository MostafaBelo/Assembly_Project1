export class Flow {
	ui = undefined;
	isPlaying = false;

	constructor() {}

	setUI(ui) {
		this.ui = ui;
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

	startExecution() {
		if (this.isPlaying) return;

		this.isPlaying = true;
		this.ui.setCurrentTab("execution"); // implicitly calls update

		let AssemblyCode = this.ui.codeContent;
		let DataCode = this.ui.dataContent;

		let instructionAddress = this.ui.instructionAddress;
		// load value into PC

		// call parser and save its outcome for later execution (maybe as it is already saved in the parser)

		// initialize registers with zeros, sp with max memory, and look into gp and tp
	}

	executeNext() {
		if (!this.isPlaying) return;

		this.executeCommand();
		this.ui.update();
	}

	executeAll() {
		if (!this.isPlaying) return;

		// while running, keep executing commands

		// after execution of all commands update ui
		this.ui.update();
	}

	stopExecution() {
		if (!this.isPlaying) return;

		this.isPlaying = false;
		this.ui.setCurrentTab("code"); // implicitly calls update
	}

	executeCommand() {
		for (const instruction of this.instructions) {
			const [command] = instruction;
			switch (command) {
				case "add":
					this.registers[rd] = this.registers[rs1] + this.registers[rs2];
					break;
				case "addi":
					// execute addi command
					break;
				case "sub":
					// execute sub command
					break;
				case "mul":
					// execute mul command
					break;
				case "div":
					// execute div command
					break;
				case "and":
					// execute and command
					break;
				case "or":
					// execute or command
					break;
				case "xor":
					// execute xor command
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
					break;
			}
		}
	}
}

export const flow = new Flow();
