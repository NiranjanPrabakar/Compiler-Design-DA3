import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState(null);
  const [isaCode, setIsaCode] = useState("");
  const [threeAddressCode, setThreeAddressCode] = useState("");
  const [memoryAddressCode, setMemoryAddressCode] = useState("");

  useEffect(() => {
    initializeMatrices();
  }, [rowsA, colsA, rowsB, colsB]);

  const initializeMatrices = () => {
    setMatrixA(Array(rowsA).fill().map(() => Array(colsA).fill(0)));
    setMatrixB(Array(rowsB).fill().map(() => Array(colsB).fill(0)));
    setResult(null);
    setIsaCode("");
    setThreeAddressCode("");
    setMemoryAddressCode("");
  };

  const handleMatrixChange = (e, matrix, setMatrix, row, col) => {
    const value = parseInt(e.target.value) || 0;
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setMatrix(newMatrix);
  };

  const multiplyMatrices = () => {
    if (colsA !== rowsB) {
      alert("Matrix multiplication not possible. Columns of A must match rows of B.");
      return;
    }

    let resultMatrix = Array(rowsA).fill(0).map(() => Array(colsB).fill(0));

    let isa = "";
    let threeAddr = "";
    let memoryAddr = "";
    let memoryMap = {}; // Store memory addresses for elements

    let memCounter = 0x1000;
    const getMemAddr = (label) => {
      if (!(label in memoryMap)) {
        memoryMap[label] = `0x${memCounter.toString(16)}`;
        memCounter += 4;
      }
      return memoryMap[label];
    };

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        let sumReg = `R${i}${j}`;

        isa += `LOAD ${sumReg}, 0\n`;
        memoryAddr += `STORE ${sumReg}, ${getMemAddr(`R${i}${j}`)}\n`;

        for (let k = 0; k < colsA; k++) {
          let a = matrixA[i][k];
          let b = matrixB[k][j];

          let regA = `R${i}${k}`;
          let regB = `R${k}${j}`;

          isa += `LOAD ${regA}, ${getMemAddr(`A[${i}][${k}]`)}\n`;
          isa += `LOAD ${regB}, ${getMemAddr(`B[${k}][${j}]`)}\n`;
          isa += `MUL ${sumReg}, ${regA}, ${regB}\n`;

          threeAddr += `${sumReg} = ${regA} * ${regB}\n`;
          memoryAddr += `STORE ${sumReg}, ${getMemAddr(`Result[${i}][${j}]`)}\n`;

          sum += a * b;
        }

        resultMatrix[i][j] = sum;
        isa += `STORE ${sumReg}, ${getMemAddr(`Result[${i}][${j}]`)}\n`;
      }
    }

    setResult(resultMatrix);
    setIsaCode(isa);
    setThreeAddressCode(threeAddr);
    setMemoryAddressCode(memoryAddr);
  };

  return (
    <div className="container">
      <h1>Matrix Multiplication & ISA Code</h1>

      <div className="matrix-size">
        <label>Matrix A Size: </label>
        <input type="number" value={rowsA} onChange={(e) => setRowsA(parseInt(e.target.value) || 1)} />
        x
        <input type="number" value={colsA} onChange={(e) => setColsA(parseInt(e.target.value) || 1)} />
      </div>

      <div className="matrix-size">
        <label>Matrix B Size: </label>
        <input type="number" value={rowsB} onChange={(e) => setRowsB(parseInt(e.target.value) || 1)} />
        x
        <input type="number" value={colsB} onChange={(e) => setColsB(parseInt(e.target.value) || 1)} />
      </div>

      <button onClick={initializeMatrices}>Set Matrices</button>

      {matrixA.length > 0 && matrixB.length > 0 && (
        <div className="matrices">
          <div>
            <h3>Matrix A</h3>
            {matrixA.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((cell, j) => (
                  <input key={j} type="number" value={cell} onChange={(e) => handleMatrixChange(e, matrixA, setMatrixA, i, j)} />
                ))}
              </div>
            ))}
          </div>

          <div>
            <h3>Matrix B</h3>
            {matrixB.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((cell, j) => (
                  <input key={j} type="number" value={cell} onChange={(e) => handleMatrixChange(e, matrixB, setMatrixB, i, j)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={multiplyMatrices}>Multiply</button>

      {result && (
        <div>
          <h3>Result Matrix:</h3>
          {result.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((cell, j) => (
                <span key={j} className="cell">{cell}</span>
              ))}
            </div>
          ))}
        </div>
      )}

      {threeAddressCode && (
        <div>
          <h3>3-Address Code:</h3>
          <pre>{threeAddressCode}</pre>
        </div>
      )}

      {memoryAddressCode && (
        <div>
          <h3>Memory Address Code:</h3>
          <pre>{memoryAddressCode}</pre>
        </div>
      )}

      {isaCode && (
        <div>
          <h3>Final ISA Code:</h3>
          <pre>{isaCode}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

