import "./test.js";

import { regs, RAM } from "./data.js";
import { flow } from "./flow.js";
import ui from "./gui.js";

regs.write("x5", 21);
regs.write("t1", 22);
regs.write(7, 21);
regs.write("x0", 21);
regs.write("zero", 21);

RAM.write1(8001, 21);
RAM.write1(8017, 4);
RAM.write1(8008, 106);

flow.setupUI(ui);
ui.setup(regs, RAM, flow);
