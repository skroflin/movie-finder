import React from "react";

export const NavBar = () => {
    return (
        <nav>
            <div className="nav-wrapper teal">
                <a href="#" className="brand-logo center">
                <p className="material-icons">camera_roll</p>
                Movie Finder
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <a href="https://developer.themoviedb.org/docs" target="_blank">API Used</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}