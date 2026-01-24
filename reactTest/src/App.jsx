import './App.css'
import MovieCard from './MovieCard'

function App() {
  const movies = [
    {
      title: '아바타',
      posterUrl: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
      rating: 4.5
    },
    {
      title: 'Cast Away',
      posterUrl: 'https://image.tmdb.org/t/p/w500/qvykQ6UoXZ4f4U3V6V9j9j9j9j9j.jpg',
      rating: 4.2
    },
    {
      title: 'God Father',
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      rating: 4.8
    },
    {
      title: 'Parasite',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      rating: 4.6
    }
  ]

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Movie Collection</h1>
        <div className="movies-grid">
          {movies.map((movie, index) => (
            <MovieCard 
              key={index}
              title={movie.title}
              posterUrl={movie.posterUrl}
              rating={movie.rating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
