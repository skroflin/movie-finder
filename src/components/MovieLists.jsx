import React from "react";
import Movie from './Movie'

export const MovieLists = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {
                        props.movies.map((movie, i) => (
                            <Movie key={i} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} image={movie.poster_path} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}