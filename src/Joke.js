import React from "react";
import "./Joke.css"

function Joke({text, id, vote, votes}) {

  const handleIncrease = (e) => {
    const {id} = e.target;
    vote(id, 1)
  }

  const handleDecrease = (e) => {
    const {id} = e.target;
    vote(id, -1)
  }  

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button 
          onClick={handleIncrease}>
          <i
            id={id} 
            className="fas fa-thumbs-up"
          />
        </button>
        <button 
          onClick={handleDecrease}>
          <i
            id={id} 
            className="fas fa-thumbs-down"
          />
        </button>        
        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;