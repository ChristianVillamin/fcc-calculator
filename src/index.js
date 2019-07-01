import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [equation, setEquation] = React.useState('0');
  const [inputs, setInputs] = React.useState({ numbers: [], operations: [] });
  const [current, setCurrent] = React.useState('0');

  const handleClick = e => {
    switch (typeof e) {
      case 'number':
        if (equation === '0') {
          setEquation(`${e}`);
          if (e !== '0') setCurrent(`${e}`);
        } else {
          setEquation(`${equation}${e}`);
          setCurrent(`${current}${e}`);
        }

        break;
      case 'string':
        if (e === '.') {
          if (!current.includes('.')) {
            setEquation(`${equation}${e}`);
            setCurrent(`${current}${e}`);
          }
        } else if (e === 'ac') {
          setEquation('0');
          setInputs({ numbers: [], operations: [] });
          setCurrent('0');
        } else if (e === 'equals') {
          if (current === '0') {
            const newInputs = Object.assign({}, inputs);
            newInputs.numbers.push(Number.parseFloat(current));
            setInputs(newInputs);
            setCurrent('0');
            setEquation('Syntax Error');
          } else {
            const newInputs = Object.assign({}, inputs);
            newInputs.numbers.push(Number.parseFloat(current));
            setInputs(newInputs);
            setCurrent('0');
            setEquation('0');
            calculate();
          }
        } else {
          let eq = equation;
          if (typeof eq !== 'string') eq = eq.toString();

          eq = eq.split('');
          const newInputs = Object.assign({}, inputs);

          if (/[\+\-\x\/]/.test(equation[equation.length - 1])) {
            newInputs.operations.pop();
            eq.pop();
          } else {
            newInputs.numbers.push(Number.parseFloat(current));
          }

          eq = eq.join('');
          newInputs.operations.push(e);

          setCurrent('0');
          setInputs(newInputs);
          setEquation(`${eq}${e}`);
        }

        break;
      default:
        return;
    }
  };

  const reset = () => {};

  const calculate = () => {
    let numbers = [...inputs.numbers];
    let operations = [...inputs.operations];

    let did = 0;

    // MDAS RULE
    // Multiplication || Division
    if (/[x\/]/g.test(operations.join(''))) {
      operations = operations.filter((operation, index) => {
        if (/[x\/]/.test(operation)) {
          const i = index - did;
          let operate;

          if (operation === 'x') {
            operate = numbers[i] * numbers[i + 1];
          } else {
            operate = numbers[i] / numbers[i + 1];
          }

          numbers.splice(i, 2, operate);
          did++;
        }

        return !/[x\/]/.test(operation);
      });
    }

    did = 0;
    // Addition || Subtraction
    operations = operations.filter((operation, index) => {
      const i = index - did;
      let operate;

      if (operation === '+') {
        operate = numbers[i] + numbers[i + 1];
      } else {
        operate = numbers[i] - numbers[i + 1];
      }

      numbers.splice(i, 2, operate);
      did++;
      return false;
    });

    setInputs({ numbers: [], operations: [] });
    setCurrent(numbers[0]);
    setEquation(numbers[0]);
  };

  return (
    <>
      <div id="calculator">
        <div
          onClick={() => handleClick('equals')}
          className="result"
          id="equals"
        >
          =
        </div>
        <div onClick={() => handleClick(0)} className="digitZero" id="zero">
          0
        </div>
        <div
          onClick={() => handleClick(1)}
          className="digit"
          id="one"
          value="1"
        >
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
        <div onClick={() => handleClick('+')} className="operation" id="add">
          +
        </div>
        <div
          onClick={() => handleClick('-')}
          className="operation"
          id="subtract"
        >
          -
        </div>
        <div
          onClick={() => handleClick('x')}
          className="operation"
          id="multiply"
        >
          X
        </div>
        <div onClick={() => handleClick('/')} className="operation" id="divide">
          /
        </div>
        <div onClick={() => handleClick('.')} className="dot" id="decimal">
          .
        </div>
        <div onClick={() => handleClick('ac')} className="ac" id="clear">
          AC
        </div>
        <div id="display" className="output">
          {equation}
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
