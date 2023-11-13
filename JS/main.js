import { regs } from "./data.js";
import ui from "./gui.js";
import { convertToHexAndBinary } from "./dataConversions.js";

ui.setup(regs, undefined);
console.log(convertToHexAndBinary(21));
