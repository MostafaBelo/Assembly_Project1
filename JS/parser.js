export class Parser 
{
	code = "";
	labels = {};
	intsructions = [];
	constructor(code) {
		if (code !== undefined) this.takeCode(code);
	}
	takeCode(code) {
		this.code = code;
	}

	validate_data(data_file){

		if (typeof data_file !== "string") 
		{
			return false;
		}

		const lines = data_file.trim().split("\n");
		const regex = /^\s*\d+:\s*\d+\s*$/;

		for (const line of lines) 
		{
			const match = line.match(regex);
        	if (!match) 
			{
				console.log("Line is not valid");
            	return false;
        	}
			else
			{
				console.log("Line is valid");
				return true;
			}
		}
	}
	validate_code(code)
	{
		if (typeof code !== "string")
		{
			console.log("Code is not a string");
			return false;
		}
		
		const lines = code.trim().split("\n");
		const rTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*([a-zA-Z]\w*),\s*([a-zA-Z]\w*)\s*$/; // Matches instructions like "ADD rd, rs1, rs2"
		const iTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*([a-zA-Z]\w*),\s*(\d+)\s*$/; // Matches instructions like "ADDI rd, rs, immediate"
		const jTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*(\d+)\s*$/; // Matches instructions like "JAL rd, immediate"
		const uTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*(\d+)\s*$/; // Matches instructions like "LUI rd, immediate"
		const sbTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*([a-zA-Z]\w*),\s*(\d+)\s*$/; // Matches instructions like "BEQ rs1, rs2, immediate"
		const ujTypeRegex = /^\s*([a-zA-Z]\w*)\s+([a-zA-Z]\w*),\s*(\d+)\s*$/; // Matches instructions like "JAL rd, immediate"

		const regexArr = [rTypeRegex, iTypeRegex, jTypeRegex, uTypeRegex, sbTypeRegex, ujTypeRegex];
		
		for (const line of lines) 
		{
			let isValid = false;
			for (const regex of regexArr) 
			{
				if (line.match(regex)) 
				{
					isValid = true;
					break;
				}
			}
		
			if (!isValid) 
			{
				console.log("Line is not valid");
				return false;
			} 
		}
		
		console.log("All lines are valid");
		return true;
	}

	seperate_code() 
	{
		let arr = this.code.split("\n");
		arr = arr.filter(function (elem) {
			return elem !== "";
		});

		for (let i = 0; i < arr.length; i++) {
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
			let command = arr[i].slice(0, index).toLowerCase();
			let rest = arr[i].slice(index);
			rest = rest.replaceAll(" ", "");
			let registers = rest.split(",");
			this.intsructions.push([command, ...registers]);
		}
	}
}
