class UI {
	codeAreaWrapper = document.getElementById("codeArea");
	codeLineNumbersArea = document.getElementById("codeLineNumbers");
	codeArea = document.getElementById("code");
	regsArea = document.getElementById("regs");
	memArea = document.getElementById("mem");

	play_btn = document.getElementById("play-btn");
	stop_btn = document.getElementById("stop-btn");

	isPlaying = false;

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

		this.play_btn.onclick = (e) => {
			this.setIsPlaying(true);
		};

		this.stop_btn.onclick = (e) => {
			this.setIsPlaying(false);
		};

		this.updateCode();
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

	updateCode() {
		if (this.isPlaying) {
			this.play_btn.style.display = "none";
			this.stop_btn.style.display = "flex";
		} else {
			this.play_btn.style.display = "flex";
			this.stop_btn.style.display = "none";
		}
	}
	updateRegisters(regs) {
		// generate regs ui
		let regsText = `<tr class="register">
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						<th class="registerName">Register</th>
						<th class="registerValue">Value</th>
						</tr>`;
		for (let i = 0; i < regs.length; i += 2) {
			regsText += `<tr class="register">
							<td class="registerName">${regs[i][0]} [${i}]</td>
							<td class="registerValue">${regs[i][1]}</td>
							<td class="registerName">${regs[i + 1][0]} [${i + 1}]</td>
							<td class="registerValue">${regs[i + 1][1]}</td>
							</tr>`;
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

	setIsPlaying(newIsPlaying) {
		this.isPlaying = newIsPlaying;
		this.update();
	}
}

export default new UI();
