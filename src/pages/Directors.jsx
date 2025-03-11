import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Directors() {
  const [directors, setDirectors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDirectors(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return (
      <>
        <NavBar />
        <header>
          <h1>Directors Page</h1>
        </header>
        <main>
          <p>Error: {error}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <header>
        <h1>Directors Page</h1>
      </header>
      <main>
        {directors.length > 0 ? (
          directors.map((director) => (
            <article key={director.id}>
              <h2>{director.name}</h2>
              <ul>
                {director.movies.map((movie) => (
                  <li key={movie}>{movie}</li>
                ))}
              </ul>
            </article>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}

export default Directors;
