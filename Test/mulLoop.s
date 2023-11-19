addi t0, x0, 8000
lw  t1, 0(t0)
lw t2, 4(t0)
addi t3, x0, 0

Loop:

	beq t1, x0, Exit
	add t3, t2, t3
	addi t1, t1, -1
	beq zero, zero, Loop
	
   
Exit:
       ecall