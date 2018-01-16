const Stars = (props) => {
  //react knows to render this array similar to for-each b/c elements are 								//react html elements
	return(
  	<div className="col-5">
    	{_.range(props.numberOfStars).map(i => 
      	<i key={i} class="fa fa-star"></i>
      )} 
    </div>
  );
}

const Button = (props) => {
	return(
  	<div className="col-2">
    	<button className="btn" disabled={props.selectedNumbers.length === 0}>
      =
      </button>
    </div>
  );
}

const Answer = (props) => {
	return(
  	<div className="col-5">
    	{props.selectedNumbers.map((number, i) => 
      	<span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
      )}
    </div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if (props.selectedNumbers.indexOf(number) >= 0)
    	return 'selected';
  }
	return(
  	<div className="card text-center">
    	<div>
      	{Numbers.list.map((number,i) => 
        	<span key={i} className={numberClassName(number)} onClick={() => 			props.selectNumber(number)}>
          	{number}
          </span>
        )}
    	</div>
    </div>
  );
}

//REM: this creates a static property that all instances of Numbers will share
Numbers.list =  _.range(1, 10); //lodash util -> array between 1 & 9

class Game extends React.Component {
	state = {
  	selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random()*9)
  }

  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0)
    	return;
  
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }
  unselectNumber = (clickedNumber) => {
    	this.setState(prevState => ({
        selectedNumbers: prevState.selectedNumbers
          .filter(number => number !== clickedNumber)
      }));
  }
  render() {
  	const selectedNumbers = this.state.selectedNumbers;
    const numberOfStars = this.state.numberOfStars;
  	return(
    	<div className="container">
     		<h3>Play Nine</h3> 
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button  selectedNumbers={selectedNumbers} />
          <Answer selectedNumbers={selectedNumbers}
         				  unselectNumber={this.unselectNumber}
         	/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
        	selectNumber={this.selectNumber}
          
        />
      </div>
    );
  }

}

class App extends React.Component {
	
  render() {
  	return(
    	<div>
    	  <Game />
    	</div>
    );
  }

}



ReactDOM.render(<App />, mountNode);