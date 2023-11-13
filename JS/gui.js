import { convertToHexAndBinary } from "./dataConversions";

class UI {
	codeAreaWrapper = document.getElementById("codeArea");
	codeLineNumbersArea = document.getElementById("codeLineNumbers");
	codeArea = document.getElementById("code");
	regsArea = document.getElementById("regs");
	memArea = document.getElementById("mem");

	play_btn = document.getElementById("play-btn");
	stop_btn = document.getElementById("stop-btn");

	dec_format_btn = document.getElementById("format-btn-dec");
	hex_format_btn = document.getElementById("format-btn-hex");
	bin_format_btn = document.getElementById("format-btn-bin");

	regs = undefined;
	mem = undefined;

	isPlaying = false;

	firstAddress = 8000;
	visibleFormat = "decimal";

	constructor() {
		// this.setup();
	}

	setRegs(regs) {
		this.regs = regs;
	}
	setMem(mem) {
		this.mem = mem;
	}

	setupCode() {
		// auto focus
		this.codeAreaWrapper.onclick = (e) => {
			this.codeArea.focus();
		};
		// line numbering
		this.codeArea.addEventListener(
			"input",
			(e) => {
				const numberOfLines = e.target.value.split("\n").length;

				this.codeLineNumbersArea.innerHTML = Array(numberOfLines)
					.fill("<span></span>")
					.join("");
			},
			false
		);

		// setting playing mode with button click
		this.play_btn.onclick = (e) => {
			this.setIsPlaying(true);
		};
		this.stop_btn.onclick = (e) => {
			this.setIsPlaying(false);
		};

		// format buttons
		this.dec_format_btn.onclick = (e) => {
			this.removeAllFormatButtonSelections();
			this.dec_format_btn.classList.add("selected");
			this.setFormat("decimal");
		};
		this.hex_format_btn.onclick = (e) => {
			this.removeAllFormatButtonSelections();
			this.hex_format_btn.classList.add("selected");
			this.setFormat("hexadecimal");
		};
		this.bin_format_btn.onclick = (e) => {
			this.removeAllFormatButtonSelections();
			this.bin_format_btn.classList.add("selected");
			this.setFormat("binary");
		};

		this.updateCode();
	}
	setupRegisters() {
		this.updateRegisters();
	}
	setupMemory() {
		this.updateMemory();
	}
	setup(regs, mem) {
		if (regs !== undefined) this.setRegs(regs);
		if (mem !== undefined) this.setMem(mem);
		this.setupCode();
		this.setupRegisters();
		this.setupMemory();
	}

	updateCode() {
		if (this.isPlaying) {
			this.play_btn.style.display = "none";
			this.stop_btn.style.display = "flex";
		} else {
			this.play_btn.style.display = "flex";
			this.stop_btn.style.display = "none";
		}
	}
	updateRegisters() {
		let regs = this.regs;
		let format = ["decimal", "hexadecimal", "binary"].indexOf(
			this.visibleFormat
		);
		if (format == -1) format = 0;
		// generate regs ui
		let regsText = `<tr class="register">
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						</tr>`;
		for (let i = 0; i < regs.length; i += 2) {
			let vals = [
				convertToHexAndBinary(regs[i][1]),
				convertToHexAndBinary(regs[i + 1][1]),
			];
			regsText += `<tr class="register">
							<td class="registerName">${regs[i][0]} [${i}]</td>
							<td class="registerValue">${vals[0][format]}</td>
							<td class="registerName">${regs[i + 1][0]} [${i + 1}]</td>
							<td class="registerValue">${vals[1][format]}</td>
							</tr>`;
		}
		this.regsArea.innerHTML = `<tbody>${regsText}</tbody>`;
	}
	updateMemory() {
		let mem = this.mem;
		let address = this.firstAddress;
		let format = ["decimal", "hexadecimal", "binary"].indexOf(
			this.visibleFormat
		);
		if (format == -1) format = 0;
		// generate memory ui
		let memText = `<tr>
							<td class="memoryAddress">Address</td>
							<td class="memoryValue">+3</td>
							<td class="memoryValue">+2</td>
							<td class="memoryValue">+1</td>
							<td class="memoryValue">+0</td>
						</tr>`;
		for (let i = 0; i < 6; i++) {
			let vals = [
				mem.read1(address),
				mem.read1(address + 1),
				mem.read1(address + 2),
				mem.read1(address + 3),
			];
			vals = [
				convertToHexAndBinary(vals[0]),
				convertToHexAndBinary(vals[1]),
				convertToHexAndBinary(vals[2]),
				convertToHexAndBinary(vals[3]),
			];
			memText += `<tr>
							<td class="memoryAddress">${address}</td>
							<td class="memoryValue">${vals[3][format]}</td>
							<td class="memoryValue">${vals[2][format]}</td>
							<td class="memoryValue">${vals[1][format]}</td>
							<td class="memoryValue">${vals[0][format]}</td>
						</tr>`;

			address += 4;
		}
		this.memArea.innerHTML = `<tbody>${memText}</tbody>`;
	}
	update() {
		this.updateCode();
		this.updateRegisters();
		this.updateMemory();
	}

	removeAllFormatButtonSelections() {
		this.dec_format_btn.classList.remove("selected");
		this.hex_format_btn.classList.remove("selected");
		this.bin_format_btn.classList.remove("selected");
	}

	setIsPlaying(newIsPlaying) {
		this.isPlaying = newIsPlaying;
		this.update();
	}
	setFormat(newFormat) {
		if (["decimal", "hexadecimal", "binary"].includes(newFormat)) {
			this.visibleFormat = newFormat;
		} else {
			this.visibleFormat = "decimal";
		}

		this.update();
	}
}

export default new UI();
