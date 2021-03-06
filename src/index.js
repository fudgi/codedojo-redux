import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const initialState = { count: 0 };

//reducer
function reducer(state = { count: 0 }, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + action.amount };
        case "DECREMENT":
            return { count: state.count - action.amount };
        case "RESET":
            return { count: 0 };
        default:
            return state;
    }
}

//action creators
function increment(amount) {
    return { type: `INCREMENT`, amount };
}
function decrement(amount) {
    return { type: `DECREMENT`, amount };
}
function reset() {
    return { type: `RESET` };
}

const store = createStore(reducer, initialState);

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
        this.amount = React.createRef();
    }
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }
    increment = () => {
        let amount = parseInt(this.amount.current.value || 1);
        store.dispatch(increment(amount));
    };

    decrement = () => {
        let amount = parseInt(this.amount.current.value || 1);
        console.log(amount);
        store.dispatch(decrement(amount));
    };

    reset = () => store.dispatch(reset());

    render() {
        const count = store.getState().count;
        return (
            <div className="counter">
                <span className="count">{count}</span>
                <div className="buttons">
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.reset}>reset</button>
                </div>
                <input type="text" ref={this.amount} defaultValue="1"></input>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
