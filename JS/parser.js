export class Parser {
	code = "";
	data = "";
	labels = {};
	instructions = [];
	data_input = [];
	constructor(codeFile, dataFile) {
		if (codeFile !== undefined) this.takeCode(codeFile);
		if (dataFile !== undefined) this.takeData(dataFile);
	}
	takeCode(code) {
		this.code = code;
	}
	takeData(data) {
		this.data = data;
	}

	validate_data() {
		let data_file = this.data;
		if (typeof data_file !== "string") {
			return false;
		}

		const lines = data_file.trim().split("\n");
		const regex = /^\s*\d+\s*:\s*\d+\s*$/;

		for (const line of lines) {
			const match = line.match(regex);
			if (!match) {
				return false;
			}
		}
		return true;
	}
	validate_code() {
		let code = this.code;
		if (typeof code !== "string") {
			return false;
		}

		const lines = code.trim().split("\n");
		const rTypeRegex =
			/^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*$/; // Matches instructions like "ADD rd, rs1, rs2"
		const iTypeRegex =
			/^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*(\d+)\s*$/; // Matches instructions like "ADDI rd, rs, immediate"
		const jTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)s*,\s*(\d+)\s*$/; // Matches instructions like "JAL rd, immediate"
		const uTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)\s*,\s*(\d+)\s*$/; // Matches instructions like "LUI rd, immediate"
		const sbTypeRegex =
			/^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)s*,\s*(\d+)\s*$/; // Matches instructions like "BEQ rs1, rs2, immediate"
		const ujTypeRegex =
			/^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*)s*,\s*([a-zA-Z]\w*|[\w:]+)\s*$/; // Matches instructions like "JAL rd, immediate"
		const labelRegex = /^\s*([a-zA-Z]\w*)\s*:\s*$/; // Matches labels like "L1:"

		const regexArr = [
			rTypeRegex,
			iTypeRegex,
			jTypeRegex,
			uTypeRegex,
			sbTypeRegex,
			ujTypeRegex,
			labelRegex,
		];

		for (const line of lines) {
			let isValid = false;
			for (const regex of regexArr) {
				if (line.match(regex)) {
					isValid = true;
					break;
				}
			}

			if (!isValid) {
				console.log("Line is not valid", line);
				// return false; // TODO: uncomment this line after fixing the bugs in validation
			} else {
				console.log("Line is valid", line);
			}
		}
		return true;
	}

	seperate_code() {
		this.labels = {};
		this.instructions = [];

		this.code = this.code.toLowerCase();
		let arr = this.code.split("\n");
		arr = arr.filter(function (elem) {
			return elem !== "";
		});

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === "ecall" || arr[i] === "ebreak" || arr[i] === "fence") {
				this.instructions.push([arr[i]]);
				continue;
			}

			if (arr[i].includes(":")) {
				let arr2 = arr[i].split(":");
				arr2[0] = arr2[0].replaceAll(" ", "");
				if (arr2[1] == "") arr.splice(i, 1);
				else {
					arr2[1] = arr2[1].trim();
					arr[i] = arr2[1];
				}
				this.labels[arr2[0]] = i;
			}

			let index = arr[i].indexOf(" ");
			let command = arr[i].slice(0, index);
			let rest = arr[i].slice(index);
			rest = rest.replaceAll(" ", "");
			let registers = rest.split(",");
			if (registers[1].includes("(")) {
				registers[1] = registers[1].replaceAll(")", "");
				let temp = registers[1].split("(");
				registers[1] = temp[1];
				registers.push(temp[0]);
			}
			this.instructions.push([command, ...registers]);
		}
	}

	seperate_data() {
		this.data_input = [];

		let arr = this.data.split("\n");
		arr = arr.filter(function (elem) {
			return elem !== "";
		});
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].replaceAll(" ", "");
			let line = arr[i].split(":");
			this.data_input.push([parseInt(line[0]), parseInt(line[1])]);
		}
	}
}
