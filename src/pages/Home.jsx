import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);

            } catch (err) {
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        }
        loadPopularMovies()
    }, []);

    const handlesearch = async (e) => {
        e.preventDefault()
        if (loading) return;
        setLoading(true);
        try {
            if (!searchQuery.trim()) {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                setError(null);
                return;
            }
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            setError("Failed to search movies...");
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <div className="home">
            <form onSubmit={handlesearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="search-button">Search</button>
            </form>
            {
                error && <div className="error-message">{error}</div>
            }
            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        (<MovieCard movie={movie} key={movie.id} />)
                    ))}
                </div>}
        </div>
    )
}

export default Home