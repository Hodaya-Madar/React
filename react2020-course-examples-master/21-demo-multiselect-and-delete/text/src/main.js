import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useRef } from 'react';

const MultiSelectAndDeleteList = (props) => {
  const { items } = props;
  const [ visibleItems, setVisibleItems ] = useState(items);  
  const root = useRef(null);

  function reset() {
    setVisibleItems(items);
  }

  function deleteSelected() {
    const el = root.current;
    const checkedInputs = el.querySelectorAll('input:checked');
    const selectedItems = new Set();
    for (let checkedInput of checkedInputs) {
      const name = checkedInput.parentElement.textContent;
      selectedItems.add(name);
    }

    setVisibleItems(visibleItems.filter(item => !selectedItems.has(item)));
  }

  return (
    <div>
      <button onClick={reset}>Reset</button>
      <button onClick={deleteSelected}>Delete</button>
      <ul ref={root}>
        {visibleItems.map(item => (
          <li key={item}>
            <label>
              <input type="checkbox" />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

}


const App = () => {
  const items = ['one', 'two', 'three', 'four', 'five'];
  return (
    <div>
      <MultiSelectAndDeleteList items={items} />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
