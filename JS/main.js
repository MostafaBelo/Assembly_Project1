import { regs, RAM } from "./data.js";
import ui from "./gui.js";
import { convertToHexAndBinary } from "./dataConversions.js";

regs[5][1] = 21;
regs[6][1] = 22;
regs[7][1] = 23;
RAM.write1(8001, 21);
RAM.write1(8017, 4);
RAM.write1(8008, 106);
ui.setup(regs, RAM);
