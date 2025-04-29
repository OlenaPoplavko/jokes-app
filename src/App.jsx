import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Component for the main page where random jokes are shown
function Home({ jokes, shown, handleShow, handleSave, handleRefresh }) {
  return (
    <div>
      <h1>Jokes App</h1>
      <nav>
        <Link to="/library">Go to saved Jokes</Link>
      </nav>

      <button onClick={handleRefresh}>Refresh</button>

      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>
            <strong>{joke.setup}</strong> <br />
            {shown.includes(joke.id) && <em>{joke.punchline}</em>} <br />
            {/* Show punchline and save button */}
            <button onClick={() => handleShow(joke.id)}>Show</button>{' '}
            <button onClick={() => handleSave(joke)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component for the saved jokes page
function Library({ saved }) {
  return (
    <div>
      <h1>Saved Jokes</h1>

      <nav>
        <Link to="/">Back to Home</Link>
      </nav>

      <ul>
        {saved.map((joke) => (
          <li key={joke.id}>
            <strong>{joke.setup}</strong> <br />
            <em>{joke.punchline}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [jokes, setJokes] = useState([]); // All loaded jokes
  const [shown, setShown] = useState([]); // IDs of jokes where punchline was shown
  const [saved, setSaved] = useState([]); // Favorite jokes

  // Fetch 10 random jokes from the API
  async function fetchJokes() {
    try {
      const res = await fetch(
        'https://official-joke-api.appspot.com/random_ten'
      );

      if (!res.ok) {
        throw new Error('Failed to fetch jokes');
      }
      const data = await res.json();
      setJokes(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching jokes. Please try again later.');
    }
  }

  // Initial joke fetch when component mounts
  useEffect(() => {
    fetchJokes();
  }, []);

  // Mark a joke as "shown" so the punchline is displayed
  function handleShow(id) {
    setShown([...shown, id]);
  }

  // Add joke to favorites if it hasn't been saved yet
  function handleSave(joke) {
    if (!saved.find((item) => item.id === joke.id)) {
      setSaved([...saved, joke]);
    }
  }

  // Load new jokes and reset the "shown" state
  function handleRefresh() {
    fetchJokes();
    setShown([]);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Main page with random jokes */}
        <Route
          path="/"
          element={
            <Home
              jokes={jokes}
              shown={shown}
              handleShow={handleShow}
              handleSave={handleSave}
              handleRefresh={handleRefresh}
            />
          }
        />
        {/* Page with saved jokes */}
        <Route path="/library" element={<Library saved={saved} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
