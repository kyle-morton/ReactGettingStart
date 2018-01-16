const Stars = () => {
	//rand between 0 & 9, add 1 to ensure > 0
	const numberOfStars = 1 + Math.floor(Math.random()*9); 
  
  //react knows to render this array similar to for-each b/c elements are 								//react html elements
	return(
  	<div className="col-5">
    	{_.range(numberOfStars).map(i => 
      	<i key={i} class="fa fa-star"></i>
      )} 
    </div>
  );
}

const Button = () => {
	return(
  	<div className="col-2">
    	<button>
      =
      </button>
    </div>
  );
}

const Answer = () => {
	return(
  	<div className="col-5">
    	<span>5</span>
      <span>6</span>
    </div>
  );
}

const Numbers = () => {
	return(
  	<div className="card text-center">
    	<div>
      	{Numbers.list.map((number,i) => 
        	<span key={i}>{number}</span>
        )}
    	</div>
    </div>
  );
}

//REM: this creates a static property that all instances of Numbers will share
Numbers.list =  _.range(1, 10); //lodash util -> array between 1 & 9

class Game extends React.Component {
	
  render() {
  	return(
    	<div className="container">
     		<h3>Play Nine</h3> 
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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