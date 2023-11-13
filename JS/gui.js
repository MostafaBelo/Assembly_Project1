class UI {
	codeAreaWrapper = document.getElementById("codeArea");
	codeLineNumbersArea = document.getElementById("codeLineNumbers");
	codeArea = document.getElementById("code");
	regsArea = document.getElementById("regs");
	memArea = document.getElementById("mem");

	constructor() {
		// this.setup();
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
	}
	setupRegisters(regs) {
		this.updateRegisters(regs);
	}
	setupMemory(mem) {
		this.updateMemory(mem);
	}
	setup(regs, mem) {
		this.setupCode();
		this.setupRegisters(regs);
		this.setupMemory(mem);
	}

	updateCode() {}
	updateRegisters(regs) {
		// generate regs ui
		let regsText = `<tr class="register">
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						</tr>`;
		for (let i = 0; i < regs.length; i++) {
			regsText += `<tr class="register">
							<td class="registerName">${regs[i][0]} [${i}]</td>
							<td class="registerValue">${regs[i][1]}</td>
							<td class="registerName">${regs[i + 1][0]} [${i + 1}]</td>
							<td class="registerValue">${regs[i + 1][1]}</td>
							</tr>`;
			i++;
		}
		this.regsArea.innerHTML = `<tbody>${regsText}</tbody>`;
	}
	updateMemory(mem) {
		// generate memory ui
		let memText = `<tr>
							<td class="memoryAddress">Address</td>
							<td class="memoryValue">+3</td>
							<td class="memoryValue">+2</td>
							<td class="memoryValue">+1</td>
							<td class="memoryValue">+0</td>
						</tr>`;
		for (let i = 0; i < 6; i++) {
			memText += `<tr>
							<td class="memoryAddress">${i * 4 + 8000}</td>
							<td class="memoryValue">0</td>
							<td class="memoryValue">0</td>
							<td class="memoryValue">0</td>
							<td class="memoryValue">0</td>
						</tr>`;
		}
		this.memArea.innerHTML = `<tbody>${memText}</tbody>`;
	}
	update(regs, mem) {
		this.updateCode();
		this.updateRegisters(regs);
		this.updateMemory(mem);
	}
}

export default new UI();