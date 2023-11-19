import "./test.js";
import { regs, RAM, PC } from "./data.js";
import { flow } from "./flow.js";
import ui from "./gui.js";
import { Parser } from "./parser.js";
//import { validate } from "webpack";

// regs.write("x5", 21);
// regs.write("t1", 22);
// regs.write(7, 21);
// regs.write("x0", 21);
// regs.write("zero", 21);

// RAM.write1(8001, 21);
// RAM.write1(8017, 4);
// RAM.write1(8008, 106);

flow.setupUI(ui);
flow.setParser(new Parser());
ui.setup(regs, RAM, PC, flow);
