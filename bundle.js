(()=>{"use strict";const t=[["zero",0],["ra",0],["sp",0],["gp",0],["tp",0],["t0",0],["t1",0],["t2",0],["s0",0],["s1",0],["a0",0],["a1",0],["a2",0],["a3",0],["a4",0],["a5",0],["a6",0],["a7",0],["s2",0],["s3",0],["s4",0],["s5",0],["s6",0],["s7",0],["s8",0],["s9",0],["s10",0],["s11",0],["t3",0],["t4",0],["t5",0],["t6",0]],e=new class{mem={};constructor(){}read1(t){return this.mem[t]||0}write1(t,e){this.mem[t]=e}read2(t){let e=this.read1(t);return this.read1(t+1)<<8|e}write2(t,e){var s=255&e,i=e>>8;this.write1(t,s),this.write1(t+1,i)}read4(t){let e=this.read2(t);return this.read2(t+1)<<16|e}write4(t,e){let s=65535&e,i=e>>16;this.write2(t,s),this.write2(t+1,i)}};function s(t){const e="0x"+t.toString(16).toUpperCase(),s="0b"+t.toString(2);return[t,e,s]}const i=new class{codeAreaWrapper=document.getElementById("codeArea");codeLineNumbersArea=document.getElementById("codeLineNumbers");codeArea=document.getElementById("code");regsArea=document.getElementById("regs");memArea=document.getElementById("mem");play_btn=document.getElementById("play-btn");stop_btn=document.getElementById("stop-btn");format_btns={dec_format_btn:document.getElementById("format-btn-dec"),hex_format_btn:document.getElementById("format-btn-hex"),bin_format_btn:document.getElementById("format-btn-bin")};details_inputs={pc:document.getElementById("pc-input"),instruction_address:document.getElementById("instruction-address-input"),first_memory_address:document.getElementById("first-memory-address-input")};regs=void 0;mem=void 0;isPlaying=!1;firstAddress=8e3;visibleFormat="decimal";constructor(){}setRegs(t){this.regs=t}setMem(t){this.mem=t}setupCode(){this.codeAreaWrapper.onclick=t=>{this.codeArea.focus()},this.codeArea.addEventListener("input",(t=>{const e=t.target.value.split("\n").length;this.codeLineNumbersArea.innerHTML=Array(e).fill("<span></span>").join("")}),!1),this.play_btn.onclick=t=>{this.setIsPlaying(!0)},this.stop_btn.onclick=t=>{this.setIsPlaying(!1)},this.format_btns.dec_format_btn.onclick=t=>{this.removeAllFormatButtonSelections(),this.format_btns.dec_format_btn.classList.add("selected"),this.setFormat("decimal")},this.format_btns.hex_format_btn.onclick=t=>{this.removeAllFormatButtonSelections(),this.format_btns.hex_format_btn.classList.add("selected"),this.setFormat("hexadecimal")},this.format_btns.bin_format_btn.onclick=t=>{this.removeAllFormatButtonSelections(),this.format_btns.bin_format_btn.classList.add("selected"),this.setFormat("binary")},this.updateCode()}setupRegisters(){this.updateRegisters()}setupMemory(){this.updateMemory()}setupDetails(){this.details_inputs.first_memory_address.value=this.firstAddress.toString(),this.details_inputs.first_memory_address.oninput=t=>{let e=this.details_inputs.first_memory_address.value;console.log(typeof e),this.firstAddress=parseInt(e),this.update()},this.updateDetails()}setup(t,e){void 0!==t&&this.setRegs(t),void 0!==e&&this.setMem(e),this.setupCode(),this.setupRegisters(),this.setupMemory(),this.setupDetails()}updateCode(){this.isPlaying?(this.play_btn.style.display="none",this.stop_btn.style.display="flex"):(this.play_btn.style.display="flex",this.stop_btn.style.display="none")}updateRegisters(){let t=this.regs,e=["decimal","hexadecimal","binary"].indexOf(this.visibleFormat);-1==e&&(e=0);let i='<tr class="register">\n\t\t\t\t\t\t<th class="registerName">Register</th>\n\t\t\t\t\t\t<th class="registerValue">Value</th>\n\t\t\t\t\t\t<th class="registerName">Register</th>\n\t\t\t\t\t\t<th class="registerValue">Value</th>\n\t\t\t\t\t\t</tr>';for(let r=0;r<t.length;r+=2){let a=[s(t[r][1]),s(t[r+1][1])];i+=`<tr class="register">\n\t\t\t\t\t\t\t<td class="registerName">${t[r][0]} [${r}]</td>\n\t\t\t\t\t\t\t<td class="registerValue">${a[0][e]}</td>\n\t\t\t\t\t\t\t<td class="registerName">${t[r+1][0]} [${r+1}]</td>\n\t\t\t\t\t\t\t<td class="registerValue">${a[1][e]}</td>\n\t\t\t\t\t\t\t</tr>`}this.regsArea.innerHTML=`<tbody>${i}</tbody>`}updateMemory(){let t=this.mem,e=this.firstAddress,i=["decimal","hexadecimal","binary"].indexOf(this.visibleFormat);-1==i&&(i=0);let r='<tr>\n\t\t\t\t\t\t\t<td class="memoryAddress">Address</td>\n\t\t\t\t\t\t\t<td class="memoryValue">+3</td>\n\t\t\t\t\t\t\t<td class="memoryValue">+2</td>\n\t\t\t\t\t\t\t<td class="memoryValue">+1</td>\n\t\t\t\t\t\t\t<td class="memoryValue">+0</td>\n\t\t\t\t\t\t</tr>';for(let a=0;a<6;a++){let a=[t.read1(e),t.read1(e+1),t.read1(e+2),t.read1(e+3)];a=[s(a[0]),s(a[1]),s(a[2]),s(a[3])],r+=`<tr>\n\t\t\t\t\t\t\t<td class="memoryAddress">${e}</td>\n\t\t\t\t\t\t\t<td class="memoryValue">${a[3][i]}</td>\n\t\t\t\t\t\t\t<td class="memoryValue">${a[2][i]}</td>\n\t\t\t\t\t\t\t<td class="memoryValue">${a[1][i]}</td>\n\t\t\t\t\t\t\t<td class="memoryValue">${a[0][i]}</td>\n\t\t\t\t\t\t</tr>`,e+=4}this.memArea.innerHTML=`<tbody>${r}</tbody>`}updateDetails(){}update(){this.updateCode(),this.updateRegisters(),this.updateMemory(),this.updateDetails()}removeAllFormatButtonSelections(){this.format_btns.dec_format_btn.classList.remove("selected"),this.format_btns.hex_format_btn.classList.remove("selected"),this.format_btns.bin_format_btn.classList.remove("selected")}setIsPlaying(t){this.isPlaying=t,this.update()}setFormat(t){["decimal","hexadecimal","binary"].includes(t)?this.visibleFormat=t:this.visibleFormat="decimal",this.update()}};t[5][1]=21,t[6][1]=22,t[7][1]=23,e.write1(8001,21),e.write1(8017,4),e.write1(8008,106),i.setup(t,e),console.log(s(21))})();