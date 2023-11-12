const regsArea = document.getElementById("regs");

const regs = [
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

let regsText = `<tr class="register">
                    <th class="registerName">Register</th>
                    <th class="registerValue">Value</th>
                    <th class="registerName">Register</th>
                    <th class="registerValue">Value</th>
                </tr>`;
for (let i = 0; i < regs.length; i++) {
	regsText += `<tr class="register">
                    <td class="registerName">${regs[i][0]}</td>
                    <td class="registerValue">${regs[i][1]}</td>
                    <td class="registerName">${regs[i + 1][0]}</td>
                    <td class="registerValue">${regs[i + 1][1]}</td>
                </tr>`;
	i++;
}

regsArea.innerHTML = `<tbody>${regsText}</tbody>`;
