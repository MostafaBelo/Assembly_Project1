main:
    lui a1, 0xFFFFF 
    auipc a2, 0x111
    jal ra, label_jump

label_jump:

    beq a1, a2, label_beq
    bne a1, a2, label_bne

label_beq:
    blt a1, a2, label_blt
    bge a1, a2, label_bge
    bltu a1, a2, label_bltu
    bgeu a1, a2, label_bgeu

label_blt:
    lb t1, 0(a1)
    lh t2, 2(a1)
    lw t3, 4(a1)
    lbu t4, 6(a1)
    lhu t5, 8(a1)

    sb t1, 12(a1)
    sh t2, 14(a1)
    sw t3, 16(a1)

    addi t6, a1, 10
    slti t6, a2, 20
    sltiu t6, a2, 30
    xori t6, a1, 40
    ori t6, a2, 50
    andi t6, a2, 60

    slli t6, a1, 2
    srli t6, a2, 3
    srai t6, a2, 4

    add t6, a1, a2
    sub t6, a1, a2
    sll t6, a1, a2
    slt t6, a1, a2
    sltu t6, a1, a2
    xor t6, a1, a2
    srl t6, a1, a2
    sra t6, a1, a2
    or t6, a1, a2
    and t6, a1, a2

    ebreak


label_bne:
    lb t1, 0(a1)
    lh t2, 2(a1)
    lw t3, 4(a1)
    lbu t4, 6(a1)
    lhu t5, 8(a1)

    sb t1, 12(a1)
    sh t2, 14(a1)
    sw t3, 16(a1)

    addi t6, a1, 10
    slti t6, a2, 20
    sltiu t6, a2, 30
    xori t6, a1, 40
    ori t6, a2, 50
    andi t6, a2, 60

    slli t6, a1, 2
    srli t6, a2, 3
    srai t6, a2, 4

    add t6, a1, a2
    sub t6, a1, a2
    sll t6, a1, a2
    slt t6, a1, a2
    sltu t6, a1, a2
    xor t6, a1, a2
    srl t6, a1, a2
    sra t6, a1, a2
    or t6, a1, a2
    and t6, a1, a2

    ebreak