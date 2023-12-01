import { NavBar } from './components/NavBar';
import { Search } from './components/Search';
import { Component } from 'react';
import { MovieLists } from './components/MovieLists';
import { Pagination } from './components/Pagination';
import { MovieInfo } from './components/MovieInfo';

class App extends Component{
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
    // console.log('API Key:', process.env.REACT_APP_API_KEY)
    this.apiKey = process.env.REACT_APP_API_KEY
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      console.log('API response:', data)

      if (data.results && Array.isArray(data.results)) {
        this.setState({ movies: [...data.results], totalResults: data.total_results})
      } else {
        console.error('Unexpected API response format:', data)
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
}

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data)
      this.setState({ movies: [...data.results], currentPage: pageNumber})
    })
  }

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id)

    const newCurrenMovie = filteredMovie.length > 0 ? filteredMovie[0] : null

    this.setState({ currentMovie: newCurrenMovie })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render() {
    const numberPages = Math.floor(this.state.totalResults / 30)
    return (
      <div className="App">
        <NavBar />
        { this.state.currentMovie == null ? <div>
          <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
          <MovieLists viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/>
        </div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>}
        
        { this.state.totalResults > 30 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>: ''}
      </div>
    )
  }
}

export default App;