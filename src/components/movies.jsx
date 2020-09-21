import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { getMovies,deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination'
import paginate from '../utils/pagination' 
import ListGroup from './common/listGroup'

class Movies extends Component {

    state = {
        movies : [],
        genres : [],
        pageLimit: 4,
        currentPage : 1,
        selectedGenre : 0,
    }

    //Better place for AJAX call.
    componentDidMount() {

        this.setState({ movies : getMovies(), genres : getGenres() })
    }

    handleDelete = (id) => {

        deleteMovie(id);
        this.setState({movies : getMovies()});
    }

    showCount = () => {
        
        return this.state.movies.length === 0 ? "There are no movies to show :(" 
            : "Showing "+ this.state.movies.length + ((this.state.movies.length === 1) ? " movie " : " movies ") + "in the database";
    }

    getTableClass = () => {

        let tableClass = "table ";
        return tableClass += this.state.movies.length === 0 ? ' d-none' : '';
    }

    handleLike = (movie) => {

        // const movies = this.state.movies.filter(movie => { 
        //     if(movie.id === id)
        //     {
        //         movie.liked = (movie.liked === false) ? true : false;
        //         return movies;
        //     }
        // });
        
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

    handleGenreChange = (genreId) => {

        let movies = getMovies();
        if (genreId !== 0) movies = movies.filter(movie => (movie.genre._id === genreId));
        this.setState({movies : movies, selectedGenre : genreId});
    }

    render() {

        const { pageLimit, currentPage, movies:allMovies, genres, selectedGenre } = this.state;

        const movies = paginate(allMovies,currentPage,pageLimit);

        let classNames = "list-group-item list-group-item-action ";
        classNames += (selectedGenre === 0) ? " active" : "";

        return (
            <main className="container">
                <h1 className="text-center">Heloooo Shafeeek</h1>
                <br/>

                <div className="row">

                    <div className="col-3">
                        <div className="list-group">

                            <a  onClick={() => this.handleGenreChange(0)}  className={classNames} style={{"cursor":"pointer"}} >All Genres</a>
                            {/* Below textProperty and valueProperty are just for making that ListGroup component more flexible. so we can use this for other pages/projects */}
                            <ListGroup onItemSelect={this.handleGenreChange} items={genres} textProperty={"name"} valueProperty={"_id"} selectedProperty={selectedGenre} />
                        
                        </div>
                    </div>

                    <div className="col">
                            <h4>{ this.showCount() }</h4>
                            <table className={ this.getTableClass() }>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th>Like</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                { movies.map(movie => <tr key={movie._id}>
                                        <td> { movie.title } </td>
                                        <td> { movie.genre.name } </td>
                                        <td> { movie.numberInStock } </td>
                                        <td> { movie.dailyRentalRate } </td>
                                        <td> <Like onLike={() => { this.handleLike(movie) }} key={movie._id} id={movie._id} liked={movie.liked} /> </td>
                                        <td> <button type="button" onClick={ () => { this.handleDelete(movie._id) } } className="btn btn-danger">Delete</button> </td>
                                    </tr>
                                ) }
                            </tbody>
                        </table>

                        {/* Pagination Component */}
                        <Pagination totalCount={ this.state.movies.length } pageSize={ pageLimit } currentPage={ currentPage } onPageChange={this.handlePageChange} />
                    </div>
                </div>

		    </main>
        );
    }

}

export default Movies;