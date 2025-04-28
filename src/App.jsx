import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home({ jokes, shown, handleShow, handleSave}) {
  return(
    <div>
<h1>Jokes App</h1>
<nav>
  <Link to="/library">Go to saved Jokes</Link>
</nav>

<ul>
  {jokes.map((joke) =>(
    <li key={joke.id}>
      <strong>{joke.setup}</strong> <br />
      {shown.includes(joke.id) && <em>{joke.punchline}</em>} <br />

      <button onClick={() => handleShow(joke.id)}>Show</button>{""}
      <button onClick={() => handleSave(joke)}>Save</button>
    </li>
  )
)}
</ul>
    </div>
  );
}

function Library({saved}) {
  return(
  <div>
    <h1>Saved Jokes</h1>

    <nav>
      <Link to="/">Back to Home</Link>
    </nav>

    <ul>
      {saved.map((joke)=> (
        <li key={joke.id}>
          <strong>{joke.setup}</strong> <br />
          <em>{joke.punchline}</em>
        </li>
      )
      )}
    </ul>
  </div>
  );
}

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
   <Routes>
    <Route path="/" element={<Home jokes={jokes} shown={shown} handleShow={handleShow} handleSave={handleSave} />} />
    <Route path="/library" element={<Library saved={saved} />} />
   </Routes>
  
    </BrowserRouter>
  );
}

export default App;
