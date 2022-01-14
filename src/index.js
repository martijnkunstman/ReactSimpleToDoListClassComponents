import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class App extends Component {
  textInput = React.createRef();
  counter = 6;
  items = [
    {
      id: 1,
      description: 'do this 1',
      done: false,
    },
    {
      id: 2,
      description: 'do this 2',
      done: false,
    },
    {
      id: 3,
      description: 'do this 3',
      done: true,
    },
    {
      id: 4,
      description: 'do this 4',
      done: true,
    },
    {
      id: 5,
      description: 'do this 5',
      done: true,
    },
  ];

  constructor(props) {
    super(props);
    this.items = this.sortArray(this.items);
    this.state = {
      items: this.items,
    };
  }

  addItem = () => {
    if (this.textInput.current.value != '') {
      let items = [...this.state.items];
      items.push({
        description: this.textInput.current.value,
        done: false,
        id: this.counter,
      });
      this.counter++;
      items = this.sortArray(items);
      this.setState(
        { items: items },
        () => (this.textInput.current.value = '')
      );
    }
  };

  deleteItem = (id) => {
    this.setState({
      items: this.state.items.filter((item) => item.id != id),
    });
  };

  doItem = (id) => {
    let items = [...this.state.items];
    items.map((item) => {
      if (item.id == id) {
        item.done = !item.done;
      }
    });
    items = this.sortArray(items);
    this.setState({ items: items });
  };

  sortArray = (items) => {
    let itemscopy = [...items];
    itemscopy.sort(function (x, y) {
      return x.done - y.done;
    });
    return itemscopy;
  };

  render() {
    return (
      <div>
        ToDoList
        <hr />
        {this.state.items.map(
          (item) =>
            item.listId == this.state.listSelected && (
              <Item
                id={item.id}
                key={item.id}
                description={item.description}
                done={item.done}
                deleteItem={this.deleteItem}
                doItem={this.doItem}
              />
            )
        )}
        <hr />
        <input ref={this.textInput} type="text" />
        <button onClick={this.addItem}>+</button>
      </div>
    );
  }
}

class Item extends Component {
  doItem = () => {
    this.props.doItem(this.props.id);
  };
  deleteItem = () => {
    this.props.deleteItem(this.props.id);
  };
  starItem = () => {
    this.props.starItem(this.props.id);
  };
  render() {
    return (
      <div className={!this.props.done ? '' : 'done'}>
        {this.props.description}
        <button onClick={this.doItem}>{this.props.done ? 'do' : 'done'}</button>
        <button onClick={this.deleteItem}>delete</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
