import React from "react";
import Joke from "./Joke";
import useFetcher from "./hooks/useFetcher";
import "./JokeList.css"

function JokeList() {

  const dataUrl = `https://icanhazdadjoke.com`;
  const jokesToFetch = 5;

  // Call useFetcher to fill in the data for Madlib.
  // See useFetcher custom hook for details about data form.
  const {isLoading, jokes, setVotes, serverError, refetch} = useFetcher(dataUrl, jokesToFetch);  

  const vote = (id, val) => {
    setVotes(id, val);
  }

  const sortedJokes = (jokes) => {
    return jokes.sort((a, b) => b.votes - a.votes);
  }

  return(
    <div>
      {
        serverError && 
        alert(serverError)
      }
      
      {
        isLoading && 
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
      }  

      {
        jokes && sortedJokes(jokes).map(
          j => (
          <Joke 
            text={j.joke}
            key={j.id}
            id={j.id}
            vote={vote}
            votes={j.votes}
          />        
        ))
      } 
      <button
        className="JokeList-getmore"
        onClick={refetch}
      >
        Get New Jokes
      </button>       
    </div>
  )
}

export default JokeList;