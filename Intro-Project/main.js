//const? use this for component def b/c
//we don't want them to ever change.
// const Button = (props) => {
// 	return (
//   	<button>5</button>
//   );
// }

const Result = (props) => {
	return(
  	<div>{props.counter}</div>
  );
};

class Button extends React.Component {
	handleClick = () => {
  	this.props.onClickFunction(this.props.incrementValue);
  }
	render() {
    return (
      <button onClick={this.handleClick}>
            +{this.props.incrementValue}
      </button>
    );
  }
}

/*
	REM: React requires a single component in the 
  ReactDOM.render method so you must wrap any 
  adjacent components in a wrapper (App) to satisfy this
*/

class App extends React.Component {
	state = { counter: 0 }
  incrementCounter = (incrementValue) => {
  	//REM: this is used when updating state based on 		       current value
    this.setState((prevState) => {
        return {
          counter: prevState.counter + incrementValue
      };
    });
  };
 	render() {
  	return (
    	<div>
      	<Button incrementValue={1} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
                                
        <Result counter={this.state.counter}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);


