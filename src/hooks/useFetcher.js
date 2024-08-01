// Call the API from passed URL (trying to get Dad Jokes here)
// Returns: 
// - isLoading (boolean): sets if the API is still awaiting data and loading
// - [{jokes}]: The actual API data, which returns the following setup.
//      - Array of objects, which is 5 jokes with data
//      jokes.id - Joke ID provided by the API
//      jokes.joke - Dad joke provided by API
//      jokes.votes - This is set by the user
// - serverError: if the fetch returns an error
// - refetch: used when the user wants to get more Dad Jokes

import axios from "axios";
import {useEffect, useState} from "react";

const useFetcher = (url, jokesToFetch) => {

  const initialValue = [];

  const [isLoading, setIsLoading] = useState(false);
  const [jokes, setJokes] = useState(initialValue);
  const [serverError, setServerError] = useState(null);
  const [shouldRefetch, refetch] = useState({});

  // Called when user clicks on a vote button
  // Will map out a new array of joke objects, and only
  // change the one clicked. 
  //
  // id - Joke ID to change
  // val - increase or decrease votes value by val
  const setVotes = (id, val) => {
    setJokes(jokes.map(j => {
      if(j.id === id) {
        return {...j, votes: j.votes + val};
      } else {
        return j;
      }
    }));
  }

  // Call once when page first loads
  useEffect((initialValue) => {
    setIsLoading(true);
    setJokes(initialValue);
    const fetchData = async () => {
      try {
      // load jokes one at a time, adding not-yet-seen jokes
        let jokes = [];
        let seenJokes = new Set();

        while (jokes.length < jokesToFetch) {
          let res = await axios.get(url, {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
        
        setJokes(jokes);
        setIsLoading(false);
      } catch (e) {
        setServerError(e);
        setIsLoading(false);
      }
    };

    fetchData();

    // Refetch if url changes, if refetch is called, or if setJokes is called
  }, [url, shouldRefetch, setJokes])

  return { isLoading, jokes, setVotes, serverError, refetch };
};

export default useFetcher;