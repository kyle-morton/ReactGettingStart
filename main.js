//const? use this for component def b/c
//we don't want them to ever change.
// const Button = (props) => {
// 	return (
//   	<button>5</button>
//   );
// }

class Button extends React.Component {
    //CURRENT WAY OF SETTING STATE
      // constructor(props) {
      // super(props);
      // this.state = {
      // counter: 0 //init at 0 to start
      // };
      // }
    
    //NEW WAY (SOON TO BE PART OF JS LANGUAGE)
    state = { counter: 0 };
    handleClick = () => {
      //this === component instance in DOM
      
          
      //SetState below is async SO it could result
      //in a race condition if multiple calls are 
      //made to it and batched
      // this.setState({
      // 	counter: this.state.counter + 1
      // })
      
      //below method is useful when updating 
      //state depending on it's current state (or value)
      this.setState((prevState) => {
          return {
            counter: prevState.counter + 1
        };
      });
      
    }
      render() {
      return (
        <button onClick={this.handleClick}>
              {this.state.counter}
        </button>
      );
    }
  }
  
  ReactDOM.render(<Button />, mountNode);
  
  
  