### Key Features

1. **Lexical Analysis**: Tokenizes the input source code.
2. **Syntax Analysis**: Parses the tokens and verifies the grammar.
3. **Intermediate Code Generation**: Produces 3AC.
4. **Memory Address Mapping**: Assigns memory locations to variables.
5. **Final Code Generation**: Converts to ISA machine instructions.
6. **Frontend UI (React.js)**: Displays the compiler output in an interactive web interface.

### How to Use

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/NiranjanPrabakar/Compiler-Design-DA3.git
    cd Compiler-Design-DA3
    ```

2. **Backend Setup (Python)**:
    Ensure you have Python 3.10+, then run:
    ```bash
    pip install -r requirements.txt
    python src/main.py
    ```

3. **Frontend Setup (React.js)**:
    ```bash
    cd frontend
    npm install
    npm start
    ```
    This will start the frontend on `http://localhost:3000/`.

### Example Input Code

```c
int a = 5;
int b = a + 10;
```

#### Three Address Code (3AC)
```
t1 = 5
t2 = t1 + 10
```

#### Memory Address Code
```
MOV R1, #5
MOV R2, R1
ADD R2, #10
```

#### Final ISA Code
```css
LOAD R1, [addr_a]
ADD R1, 10
STORE R1, [addr_b]
```

### Output Tables

#### Three Address Code (3AC) Output Table

| Step | Operation | Operand 1 | Operand 2 | Result |
|------|-----------|-----------|-----------|--------|
| 1    | =         | 5         |           | t1     |
| 2    | +         | t1        | 10        | t2     |

#### Memory Address Code Output Table

| Step | Instruction | Register | Value |
|------|-------------|----------|-------|
| 1    | MOV         | R1       | 5     |
| 2    | MOV         | R2       | R1    |
| 3    | ADD         | R2       | 10    |

#### Final ISA Code Output Table

| Step | Instruction | Address  |
|------|-------------|----------|
| 1    | LOAD        | [addr_a] |
| 2    | ADD         | 10       |
| 3    | STORE       | [addr_b] |

### Output

#### Frontend Matrix Multiplication with Address Code Visualization
![Frontend Matrix Multiplication with Address Code Visualization](https://github.com/user-attachments/assets/1f4b73f1-746c-4454-a5d8-32343e6d0823)

#### ISA Code Generation
![ISA Code Generation](https://github.com/user-attachments/assets/41be80df-aece-455c-ad08-010f2bc923d5)

#### LLVM-Based Matrix Code Generation
![LLVM-Based Matrix Code Generation](https://github.com/user-attachments/assets/b11f1a57-d7a6-4d73-9972-ab67796cd591)

#### ISA Code Generation in Linux Terminal
![ISA Code Generation in Linux Terminal](https://github.com/user-attachments/assets/ac69a727-c8f3-4a41-baa5-c60c4a2a4791)

### License
This project is open-source and available under the MIT License.

### Author
Niranjan Prabakar

[GitHub Profile](https://github.com/NiranjanPrabakar)
