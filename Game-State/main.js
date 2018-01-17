var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; } //if given number in array
  if (arr[0] > n) { return false; } //if 1 greater than n -> no combinations
  if (arr[arr.length - 1] > n) { 
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
  		let button; //ui to return
      switch(props.answerIsCorrect)
      {
      	case true:
          button =           
            <button className="btn btn-success" onClick={props.acceptAnswer}>
              <i className="fa fa-check"></i>
            </button>;
        	break;
        case false:
          button =           
            <button className="btn btn-danger" >
              <i className="fa fa-times"></i>
            </button>;
        	break;
        default:
        	button =           
            <button className="btn" 
            	onClick={props.checkAnswer}
            	disabled={props.selectedNumbers.length === 0}>
              =
            </button>;
        	break;
      }
      
      return(
        <div className="col-2 text-center">
        	{button}  
          <br /><br />
          <button className="btn btn-warning btn-sm" onClick={props.redraw}
          				disabled={props.redraw === 0}>
          	Refresh -> {props.redraws}
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
        else if (props.usedNumbers.indexOf(number) >= 0)
        	return 'used';
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
  
  const DoneFrame = (props) => {
  	return(
    	<div className="text-center">
      	<h2>{props.doneStatus}</h2>
        <button className="btn btn-secondary" onClick={props.resetGame}>
        	Play Again
        </button>
      </div>
    );
  }
  
  const Timer = (props) => {
  	return(
    	<div>
      	<h5>Time Remaining - 00:{props.secondsRemaining > 10 
        														? props.secondsRemaining 
                                    : '0' + props.secondsRemaining } 
        </h5>
      </div>
    );
  }
  
  //REM: this creates a static property that all instances of Numbers will share
  Numbers.list =  _.range(1, 10); //lodash util -> array between 1 & 9
  
  class Game extends React.Component {
    static randomNumber = () => {
      return 1 + Math.floor(Math.random()*9);
    }
    initState = () => {
    	const startSeconds = 60;
    	const newState = {
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null, //null -> no answer being checked
        redraws: 5, 
        doneStatus: null,
        timeInterval: startSeconds,
        timeRemaining: startSeconds
     };

//      	setTimeout(() => {
//       	if (this.state.doneStatus)
//         	return; //skip if doneStatus already set
          
//        	this.setState({ doneStatus: 'Time is up!!!' })
//       }, newState.timeInterval * 1000);

      setInterval(() => {
      	if (this.state.timeRemaining < 1)
        	return;
      
				this.setState(prevState => ({
        	timeRemaining: prevState.timeRemaining - 1,
          doneStatus: (prevState.timeRemaining - 1) > 0 ? prevState.doneStatus : 'Time is up!'
        }));
      }, 1000); //every second

    	return newState;
    }
    state = this.initState();
    
    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0)
          return;
      	else if (this.state.usedNumbers.indexOf(clickedNumber) >= 0)
        	return;
    
        this.setState(prevState => ({
        	answerIsCorrect: null,
          selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    }
    unselectNumber = (clickedNumber) => {
          this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers
              .filter(number => number !== clickedNumber),
            answerIsCorrect: null,
        }));
    }
    checkAnswer = () => {
    	this.setState(prevState => ({
      	//if number of stars === sum of numbers selected
        //reduce() sums an array of objs (int, float, etc)
      	answerIsCorrect: prevState.numberOfStars === 
        	prevState.selectedNumbers.reduce((acc, n) => acc + n, 0) 
      }));
    }
    acceptAnswer = () => {
    	this.setState(prevState => ({
      	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: Game.randomNumber(),
      }), this.updateDoneStatus);
    }
    redraw = () => {
    	if (this.state.redraws === 0) 
      	return;
        
    	this.setState(prevState => ({
      	numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws - 1
      }), this.updateDoneStatus);
    }
    //destructored needed vars from state object (same as render)
    possibleSolutions = ({numberOfStars, usedNumbers}) => { 
    
    	//filter out used numbers
    	const possibleNumbers = _.range(1, 10).filter(number => 
      	usedNumbers.indexOf(number) === -1 
      );
      
      return possibleCombinationSum(possibleNumbers, numberOfStars);
    }
    updateDoneStatus = () => {
    	this.setState(prevState => {
      	if (prevState.usedNumbers.length === 9)
        	return {
          	doneStatus: 'Done, Nice!!!'
          }
        
        if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        	return {
          	doneStatus: 'Game Over!'
          }
        }
      })
    }
    resetState = () => {
    	this.setState(this.initState());
    }
    render() {
    		const {
        	selectedNumbers,
          numberOfStars,
          answerIsCorrect,
          usedNumbers,
          redraws,
          doneStatus,
          timeRemaining
        } = this.state;
        return(
          <div className="container">
               <h3>Play Nine</h3> 
               <Timer  secondsRemaining={timeRemaining}/>
          <hr />
          <div className="row">
            <Stars numberOfStars={numberOfStars}/>
            <Button  redraw={this.redraw}
            				 redraws={redraws}
            				 acceptAnswer={this.acceptAnswer}
            				 selectedNumbers={selectedNumbers} 
            				 checkAnswer={this.checkAnswer} 
                     answerIsCorrect={answerIsCorrect}/>
            <Answer selectedNumbers={selectedNumbers}
                             unselectNumber={this.unselectNumber}
               />
          </div>
          <br />
          {doneStatus ? 
          	<DoneFrame doneStatus={doneStatus} resetGame={this.resetState} /> :
            <Numbers selectedNumbers={selectedNumbers}
          	  usedNumbers={usedNumbers}
              selectNumber={this.selectNumber} />	
          }
          <br />
          
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