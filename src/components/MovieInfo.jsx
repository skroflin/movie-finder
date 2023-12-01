import React, { useState, useEffect } from "react"
import axios from "axios"

export const MovieInfo = (props) => {
    const [movieDetails, setMovieDetails] = useState(null)

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${props.currentMovie.id}?api_key=${apiKey}&append_to_response=credits`
                );
                setMovieDetails(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [props.currentMovie.id]);

    return (
        <div className="container">
            <div className="row" onClick={props.closeMovieInfo} style={{ cursor: "pointer", paddingTop: 50 }}>
                <i className="material-icons">
                    keyboard_backspace
                </i>
                <span style={{ marginLeft: 20 }}>
                    Go back
                </span>
            </div>
            <div className="row card-panel z-depth-3">
                <div className="col s12 m4">
                    {props.currentMovie.poster_path == null ? <img src={`https://web.ipca.pt/sap/wp-content/codevision/resources/images/no-image.jpg`} className="hoverable" alt="card image" style={{ width: "100%", height: 420, marginTop: 10 }} /> :
                        <img src={`https://image.tmdb.org/t/p/w185${props.currentMovie.poster_path}`} className="hoverable" alt="card image" style={{ width: "100%", height: 420, marginTop: 10 }} />}
                </div>
                <h4></h4>
                <div className="col s12 m8">
                    <div className="info-container">
                        <h5>Title:</h5>
                        <p>{props.currentMovie.title}</p>
                        <hr />
                        <h5>Release date:</h5>
                        <p>{props.currentMovie.release_date.substring(5).split("-")
                            .concat(props.currentMovie.release_date.substring(0, 4)).join("/")}</p>
                        <hr />
                        <h5>Movie Overview:</h5>
                        <p>{props.currentMovie.overview}</p>
                        <hr />
                    </div>
                    {movieDetails && (
                        <>
                            <h5>Actors:</h5>
                            <ul>
                                {movieDetails.credits.cast.slice(0, 5).map((actor) => (
                                    <li key={actor.id}>{actor.name}</li>
                                ))}
                            </ul>
                            <hr />
                            <h5>Director:</h5>
                            <p>
                                {movieDetails.credits.crew
                                    .filter((crewMember) => crewMember.job === "Director")
                                    .map((director) => director.name)
                                    .join(", ")}
                            </p>
                            <hr />
                            <h5>Genre:</h5>
                            <p>
                                {movieDetails.genres.map((genre) => genre.name).join(", ")}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}