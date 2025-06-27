import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";

import { useMovieContext } from "../contexts/MovieContext";
function Favorite() {
    const { favorite } = useMovieContext();
    if (favorite) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favorite.map((movie) => (
                        (<MovieCard movie={movie} key={movie.id} />)
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="favorites-empty">
            <h2>No List of Favorites available</h2>
        </div>
    );
}

export default Favorite