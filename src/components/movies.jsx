import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { getMovies,deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import paginate from '../utils/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {

    state = {
        movies : [],
        genres : [],
        pageLimit: 4,
        currentPage : 1,
        selectedGenre : 0,
        sortColumn : {'path' : 'title', 'order' : 'asc'}
    }

    //Better place for AJAX call.
    componentDidMount() {

        //Add default All Genre into the array.\
        const genres = [{'name' : 'All Genre', '_id' : 0},...getGenres()];
        this.setState({ movies : getMovies(), genres })
    }

    handleDelete = (id) => {

        const movies = this.state.movies.filter(movie => (movie._id !== id));
        this.setState({ movies }); 
    }

    showCount = () => {
        
        return this.state.movies.length === 0 ? "There are no movies to show :(" 
            : "Showing "+ this.state.movies.length + ((this.state.movies.length === 1) ? " movie " : " movies ") + "in the database";
    }

    handleLike = (movie) => {

        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movies[index] = {...movie};
        console.log(movies[index].liked);
        movies[index].liked = (movies[index].liked === false) ? true : false;
        this.setState({ movies : movies});
    }

    handlePageChange = (page) => {
        
        this.setState({currentPage : page});
    }

    handleGenreChange = (genre) => {

        this.setState({selectedGenre : genre._id, currentPage : 1});
    }

    handleSort = (sortColumn) => {

        this.setState({ sortColumn });
    }

    getPagedData = () => {

        const { pageLimit, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

        // Filter the movies using genre. Check whether the genre has id otherwise its All Genre.
        const filteredMovies = (selectedGenre !== 0) ? allMovies.filter(movie => (movie.genre._id === selectedGenre)) : allMovies;
        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted,currentPage,pageLimit);
        return { totalCount : filteredMovies.length, movies : movies};
    }

    render() {

        const { pageLimit, currentPage, genres, selectedGenre, sortColumn } = this.state;
       
        let classNames = "list-group-item list-group-item-action ";
        classNames += (selectedGenre === 0) ? " active" : "";

        const { totalCount, movies} = this.getPagedData();

        return (
            <main className="container">
                <h1 className="text-center">Heloooo Shafeeek</h1>
                <br/>

                <div className="row">

                    <div className="col-3">
                        <div className="list-group">
                            {/* List  Component */}
                            <ListGroup onItemSelect={this.handleGenreChange} items={genres} selectedItem={selectedGenre} />
                        </div>
                    </div>

                    <div className="col">
                        <h4>{ totalCount === 0 ? "There are no movies to show :(" : "Showing "+ totalCount + ((totalCount === 1) ? " movie " : " movies ") + "in the database" }</h4>

                        {/* MoviesTable Component */}
                        <MoviesTable movies={movies} sortColumn={sortColumn} onSort={this.handleSort} onDelete={this.handleDelete} onLike={this.handleLike} />

                        {/* Pagination Component */}
                        <Pagination totalCount={ totalCount } pageSize={ pageLimit } currentPage={ currentPage } onPageChange={this.handlePageChange} />
                    </div>
                </div>

		    </main>
        );
    }

}

export default Movies;