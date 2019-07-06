import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Calculator = () => {
  const [equation, setEquation] = React.useState('0');
  const [current, setCurrent] = React.useState('0');
  const [inputs, setInputs] = React.useState({ numbers: [], operations: [] });

  const handleClick = e => {
    let newEQ = equation;
    if (newEQ === 'Syntax Error') newEQ = '0';
    if (/[\d.]/.test(e)) {
      if (e === '.' && current.includes('.')) return;
      if (newEQ.length === 1 && newEQ[0] === '0') newEQ = '';
      setEquation(`${newEQ}${e}`);
      setCurrent(`${current}${e}`);
    } else {
      setCurrent('0');
      if (/[+\-\x/]/.test(e)) {
        const inputsCopy = Object.assign({}, inputs);
        if (/[+\-\x/]/.test(newEQ[newEQ.length - 1])) {
          inputsCopy.operations.pop();
          newEQ = newEQ
            .split('')
            .slice(0, newEQ.length - 1)
            .join('');
        } else {
          inputsCopy.numbers.push(Number.parseFloat(current));
        }
        inputsCopy.operations.push(e);
        setEquation(`${newEQ}${e}`);
        setInputs(inputsCopy);
      } else if (e === 'ac') {
        setEquation('0');
        setInputs({ numbers: [], operations: [] });
      } else if (e === 'equals') {
        if (/[+\-\x/]/.test(newEQ[newEQ.length - 1])) {
          setEquation('Syntax Error');
          setInputs({ numbers: [], operations: [] });
        } else {
          const inputsCopy = Object.assign({}, inputs);
          inputsCopy.numbers.push(Number.parseFloat(current));
          calculate(inputsCopy);
        }
      }
    }
  };

  const calculate = inputsCopy => {
    let numbers = [...inputsCopy.numbers];
    let operations = [...inputsCopy.operations];
    // === MDAS RULE === \\
    // Multiplication || Division
    let did = 0;
    operations = operations.filter((operation, index) => {
      if (/[x/]/.test(operation)) {
        const i = index - did;
        const operate =
          operation === 'x'
            ? numbers[i] * numbers[i + 1]
            : numbers[i] / numbers[i + 1];
        numbers.splice(i, 2, operate);
        did++;
      }
      return !/[x/]/.test(operation);
    });
    // Addition || Subtraction
    did = 0;
    operations = operations.map((operation, index) => {
      const i = index - did;
      const operate =
        operation === '+'
          ? numbers[i] + numbers[i + 1]
          : numbers[i] - numbers[i + 1];
      numbers.splice(i, 2, operate);
      did++;
    });
    setEquation(numbers[0]);
    setCurrent(numbers[0]);
    setInputs({ numbers: [], operations: [] });
  };

  return (
    <div id="calculator">
      <h1 id="title">JavaScript Calculator</h1>
      <div onClick={() => handleClick(0)} className="digitZero" id="zero">
        0
      </div>
      <div onClick={() => handleClick(1)} className="digit" id="one">
        1
      </div>
      <div onClick={() => handleClick(2)} className="digit" id="two">
        2
      </div>
      <div onClick={() => handleClick(3)} className="digit" id="three">
        3
      </div>
      <div onClick={() => handleClick(4)} className="digit" id="four">
        4
      </div>
      <div onClick={() => handleClick(5)} className="digit" id="five">
        5
      </div>
      <div onClick={() => handleClick(6)} className="digit" id="six">
        6
      </div>
      <div onClick={() => handleClick(7)} className="digit" id="seven">
        7
      </div>
      <div onClick={() => handleClick(8)} className="digit" id="eight">
        8
      </div>
      <div onClick={() => handleClick(9)} className="digit" id="nine">
        9
      </div>
      <div onClick={() => handleClick('.')} className="digit" id="decimal">
        .
      </div>
      <div onClick={() => handleClick('+')} className="operation" id="add">
        +
      </div>
      <div onClick={() => handleClick('-')} className="operation" id="subtract">
        -
      </div>
      <div onClick={() => handleClick('x')} className="operation" id="multiply">
        X
      </div>
      <div onClick={() => handleClick('/')} className="operation" id="divide">
        /
      </div>
      <div onClick={() => handleClick('ac')} id="clear">
        AC
      </div>
      <div onClick={() => handleClick('equals')} id="equals">
        =
      </div>
      <div id="display">{equation}</div>
    </div>
  );
};

ReactDOM.render(<Calculator />, document.getElementById('calculator'));
