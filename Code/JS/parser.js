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

		if (data_file === "") return true;
		const lines = data_file.trim().split("\n");
		const regex = /^\s*\d+\s*:\s*-?\d+\s*$/;

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

		const lines = code.replaceAll("\t", " ").trim().split("\n");
		const rTypeRegex =
			/^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*$/; // Matches instructions like "ADD rd, rs1, rs2"
		const iTypeRegex =
			/^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*(-?\d+)\s*$/; // Matches instructions like "ADDI rd, rs, immediate"
		const sTypeRegex =
			/^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)s*,\s*(-?\d+)\(([a-zA-Z]\w*)\)\s*$/; // Matches instructions like "SW rs1, immediate(rs2)"
		const uTypeRegex = /^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*(-?\d+)\s*$/; // Matches instructions like "LUI rd, immediate"
		const sbTypeRegex =
			/^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)s*,\s*(\w+)\s*$/; // Matches instructions like "BEQ rs1, rs2, lbl"
		const ujTypeRegex = /^\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)s*,\s*(\w+)\s*$/; // Matches instructions like "JAL rd, lbl"
		const pauseTypeRegex = /^\s*(ecall|ebreak|fence)\s*$/i;

		const labelRegex = /^\s*([a-zA-Z]\w*)\s*:\s*$/; // Matches labels like "L1:"
		const labelrTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*$/;
		const labeliTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)\s*,\s*(-?\d+)\s*$/;
		const labelsTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)s*,\s*(-?\d+)\(([a-zA-Z]\w*)\)\s*$/;
		const labeluTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*(-?\d+)\s*$/;
		const labelsbTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)\s*,\s*([a-zA-Z]\w*)s*,\s*(\w+)\s*$/;
		const labelujTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*([a-zA-Z]+)\s+([a-zA-Z]\w*)s*,\s*(\w+)\s*$/;
		const labelpauseTypeRegex =
			/^\s*([a-zA-Z]\w*)\s*:\s*(ecall|ebreak|fence)\s*$/i;

		const regexArr = [
			rTypeRegex,
			iTypeRegex,
			sTypeRegex,
			uTypeRegex,
			sbTypeRegex,
			ujTypeRegex,
			pauseTypeRegex,
			labelRegex,
			labelrTypeRegex,
			labeliTypeRegex,
			labelsTypeRegex,
			labeluTypeRegex,
			labelsbTypeRegex,
			labelujTypeRegex,
			labelpauseTypeRegex,
		];

		for (let line of lines) {
			let isValid = false;
			line = line.trim();
			if (line === "") continue;
			for (const regex of regexArr) {
				if (line.match(regex)) {
					isValid = true;
					break;
				}
			}

			if (!isValid) {
				console.log("fail", line);
				return false;
			}
		}
		return true;
	}

	seperate_code() {
		this.labels = {};
		this.instructions = [];

		let arr = this.code.replaceAll("\t", " ").split("\n");
		arr = arr.filter(function (elem) {
			elem = elem.replaceAll(" ", "");
			return elem !== "";
		});

		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].trim();
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
		}

		for (let i = 0; i < arr.length; i++) {
			let tmp = arr[i].trim().toLowerCase();
			if (tmp === "ecall" || tmp === "ebreak" || tmp === "fence") {
				this.instructions.push([arr[i]]);
				continue;
			}

			arr[i] = arr[i].trim();
			let index = arr[i].indexOf(" ");
			let command = arr[i].slice(0, index);
			command = command.toLowerCase();

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
