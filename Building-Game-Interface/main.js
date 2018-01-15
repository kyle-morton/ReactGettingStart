const Stars = () => {
	return(
  	<div className="col-5">
    	<i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
      <i className="fa fa-star"></i>
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
    ...
    </div>
  );
}

const Numbers = () => {
	return(
  	<div className="card text-center">
    	<div>
    	  <span>1</span>
        <span className="selected">2</span>
        <span className="used">3</span>
        
    	</div>
    </div>
  );
}

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