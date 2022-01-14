import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: 'ik moet boodschappen doen', done: false },
    { id: 2, description: 'ik moet tandarts bellen', done: false },
    { id: 3, description: 'ik moet afwassen', done: false },
    { id: 4, description: 'ik moet stofzuigen', done: true },
  ]);
  const [counter, setCounter] = useState(5);
  let textInput = React.createRef();
  let doItem = (id) => {
    let itemsCopy = [...items];
    itemsCopy.map((item) => {
      if (item.id == id) {
        item.done = !item.done;
      }
    });
    itemsCopy = sortItems(itemsCopy);
    setItems(itemsCopy);
  };
  let deleteItem = (id) => {
    setItems([...items].filter((item) => item.id != id));
  };
  let addItem = () => {
    if (textInput.current.value != '') {
      let itemsCopy = [...items];
      itemsCopy.push({
        id: counter,
        description: textInput.current.value,
        done: false,
      });
      setCounter(counter + 1);
      itemsCopy = sortItems(itemsCopy);
      setItems(itemsCopy);
      textInput.current.value = '';
    }
  };
  let sortItems = (items) => {
    items.sort(function (x, y) {
      return x.done - y.done;
    });
    return items;
  };
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      {items.map((item) => (
        <ToDoItem
          id={item.id}
          key={item.id}
          description={item.description}
          done={item.done}
          doItem={doItem}
          deleteItem={deleteItem}
        />
      ))}
      <hr />
      <input ref={textInput} type="text" />
      <button onClick={addItem}>+</button>
    </div>
  );
}

function ToDoItem(props) {
  let doItem = () => {
    props.doItem(props.id);
  };
  let deleteItem = () => {
    props.deleteItem(props.id);
  };
  return (
    <div className={props.done ? 'do' : 'done'}>
      {props.description}
      <button onClick={doItem}>{props.done ? 'do' : 'done'}</button>
      <button onClick={deleteItem}>delete</button>
    </div>
  );
}

/*
const ToDoItem = ({ id, description, done, doItem, deleteItem }) => {
  let doClick = () => {
    doItem(id);
  };
  let deleteClick = () => {
    deleteItem(id);
  };
  return (
    <div className={done ? 'do' : 'done'}>
      {description}
      <button onClick={doClick}>{done ? 'do' : 'done'}</button>
      <button onClick={deleteClick}>delete</button>
    </div>
  );
};
*/
