import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [equation, setEquation] = React.useState('');
  const handleClick = e => {};

  return (
    <>
      <div id="calculator">
        <div onClick={handleClick} className="result" id="equal">
          =
        </div>
        <div onClick={handleClick} className="digitZero" id="zero">
          0
        </div>
        <div onClick={handleClick} className="digit" id="one">
          1
        </div>
        <div onClick={handleClick} className="digit" id="two">
          2
        </div>
        <div onClick={handleClick} className="digit" id="three">
          3
        </div>
        <div onClick={handleClick} className="digit" id="four">
          4
        </div>
        <div onClick={handleClick} className="digit" id="five">
          5
        </div>
        <div onClick={handleClick} className="digit" id="six">
          6
        </div>
        <div onClick={handleClick} className="digit" id="seven">
          7
        </div>
        <div onClick={handleClick} className="digit" id="eight">
          8
        </div>
        <div onClick={handleClick} className="digit" id="nine">
          9
        </div>
        <div onClick={handleClick} className="operation" id="add">
          +
        </div>
        <div onClick={handleClick} className="operation" id="subtract">
          -
        </div>
        <div onClick={handleClick} className="operation" id="multiply">
          X
        </div>
        <div onClick={handleClick} className="operation" id="divide">
          /
        </div>
        <div onClick={handleClick} className="dot" id="decimal">
          .
        </div>
        <div onClick={handleClick} className="ac" id="clear">
          AC
        </div>
        <div id="display" className="output">
          Display
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
