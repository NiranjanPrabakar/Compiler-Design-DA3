import re

# Read LLVM IR
with open("matrix.ll", "r") as file:
    llvm_ir = file.readlines()

# Custom ISA translation function
def translate_to_ISA(llvm_ir):
    isa_code = []
    for line in llvm_ir:
        if "mul" in line:
            isa_code.append("MUL R1, R2, R3")  # Custom ISA format
        elif "add" in line:
            isa_code.append("ADD R3, R4, R5")
        elif "load" in line:
            isa_code.append("LOAD R1, MEM1")
        elif "store" in line:
            isa_code.append("STORE R3, MEM2")
    return "\n".join(isa_code)

# Convert LLVM IR to Custom ISA
isa_code = translate_to_ISA(llvm_ir)

# Save output
with open("output.isa", "w") as file:
    file.write(isa_code)

print("✅ Custom ISA Generated! Check output.isa")
