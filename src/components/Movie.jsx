import React from "react";

const Movie = (props) => {
    return (
        <div className="col s12 m6 l3">
            <div className="card z-depth-5 hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                    {
                        props.image == null ? <img src={`https://web.ipca.pt/sap/wp-content/codevision/resources/images/no-image.jpg`} alt="card image" style={{ width: "100%", height: 300 }} ></img> :
                            <img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt="card image" style={{ width: "100%", height: 300 }} />
                    }
                </div>
                <div className="card-content">
                    <a href="#" onClick={() => props.viewMovieInfo(props.movieId)}>
                        <p className="material-icons">zoom_in</p>
                        View Movie Details
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Movie