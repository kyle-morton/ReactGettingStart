const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img src={props.avatar_url}
      style={{ width: '75px'}}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}

//sample data -> eventually will come from API
let data = [
	{ 
  	name: 'Kyle Morton',  
    avatar_url: 'https://avatars2.githubusercontent.com/u/6462572?v=4',
    company: 'Dassault Falcon Jet'
  },
  { 
  	name: 'Tom Preston-Werner',  
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    company: ''
  }
]

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card {...card} />)}
      
    </div>
  );
}

ReactDOM.render(<CardList cards={data} />, mountNode);