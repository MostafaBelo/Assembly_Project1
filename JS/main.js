import { regs, RAM } from "./data.js";
import ui from "./gui.js";
import { convertToHexAndBinary } from "./dataConversions.js";

RAM.write1(8001, 21);
RAM.write1(8017, 4);
RAM.write1(8008, 106);
ui.setup(regs, RAM);
console.log(convertToHexAndBinary(21));
