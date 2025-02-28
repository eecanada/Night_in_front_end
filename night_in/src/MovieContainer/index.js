import React, { Component } from 'react';
import MovieSelectors from '../MovieSelectors'
import MovieRender from '../MovieRender'

class MovieContainer extends Component {
  constructor(props){
    super(props);
      this.state = {
        movies: [],
        selectedGenre : undefined,
        selectedMovie : undefined
      }
  }

  componentDidMount(){
    this.getMovies();
  }

  getMovies = async () => {
    try{
      const movies = await fetch(process.env.REACT_APP_API_URL + '/movie/');
      const parsedMovies = await movies.json();
      this.setState({
        movies: parsedMovies.data
      })
    } catch(err){
      console.log(err)
    }
  }

  changeGenre = (e) => {
    this.setState({
      selectedGenre : e.target.value
    })
  }

  pickMovie = (e) => {
    e.preventDefault()
    const moviesInGenre = this.state.movies.filter(movie => movie.genre === this.state.selectedGenre)
    const randomMovieNumber = Math.floor(Math.random() * moviesInGenre.length)
    this.setState({
      selectedMovie : moviesInGenre[randomMovieNumber]
    })
  }

  render(){
    return(
      <div>
        <MovieSelectors 
        changeGenre = {this.changeGenre}
        pickMovie = {this.pickMovie}
        />
        <MovieRender 
        selectedMovie = {this.state.selectedMovie}
        />
      </div>
    )
  }
}
 

export default MovieContainer