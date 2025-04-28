import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Router, Link } from "react-router-dom";

function App() {
  const [jokes, setJokes] = useState([]);
  const [shown, setShown] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    async function fetchJokes() {
      const res = await fetch("https://official-joke-api.appspot.com/random_ten");
      const data = await res.json();
      setJokes(data);
    }
    fetchJokes();
  }, []);

 
  function handleShow(id) {
    setShown([...shown, id]);
  }

  function handleSave(joke) {
    if (!saved.find((item) => item.id === joke.id)) {
      setSaved([...saved, joke]);
    }
  }

  return (
   <BrowserRouter>
   <div>
      <h1>Jokes App</h1>
      <ul>
  {jokes.map((joke) => (
    <li key={joke.id}>
      <strong>{joke.setup}</strong><br />

      {shown.includes(joke.id) && (
        <em>{joke.punchline}</em>
      )}
      <br />

      <button onClick={() => handleShow(joke.id)}>Show</button>
      <button onClick={() => handleSave(joke)}>Save</button>
    </li>
  ))}
</ul>


      <h2>Saved Jokes</h2>
      <ul>
        {saved.map((joke) => (
          <li key={joke.id}>
            <strong>{joke.setup}</strong><br />
            <em>{joke.punchline}</em>
          </li>
        ))}
      </ul>
    </div>
    </BrowserRouter>
  );
}

export default App;
