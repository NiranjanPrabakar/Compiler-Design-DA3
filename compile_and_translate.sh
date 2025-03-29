#!/bin/bash

echo "🔹 Compiling C++ to LLVM IR..."
clang -S -emit-llvm matrix.cpp -o matrix.ll

echo "🔹 Translating LLVM IR to Custom ISA..."
python3 translate.py

echo "✅ Compilation and Translation Done! Check output.isa"
