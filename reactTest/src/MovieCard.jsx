import './MovieCard.css'

function MovieCard({ title, posterUrl, rating }) {
  return (
    <div className="movie-card">
      <img 
        src={posterUrl} 
        alt={`${title} 포스터`} 
        className="movie-poster"
        onError={(e) => {
          e.target.src = 'https://dummyimage.com/300x450/1a1a1a/ffffff&text=Movie+Poster'
        }}
      />
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-rating">별점 {rating}점</p>
      </div>
    </div>
  )
}

export default MovieCard
