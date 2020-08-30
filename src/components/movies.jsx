import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { getMovies,deleteMovie } from '../services/fakeMovieService';


class Movies extends Component {

    state = {
        movies : getMovies()
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

    render() {
        return (
            <main className="container">
                <h1 className="text-center">Heloooo Shafeeek</h1>
                <br/>
                <h4>{ this.showCount() }</h4>
			    <table className={ this.getTableClass() }>
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.movies.map(movie => <tr key={movie._id}>
                                <td> { movie.title } </td>
                                <td> { movie.genre.name } </td>
                                <td> { movie.numberInStock } </td>
                                <td> { movie.dailyRentalRate } </td>
                                <td> <button type="button" onClick={ () => { this.handleDelete(movie._id) } } className="btn btn-danger">Delete</button> </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
		    </main>
        );
    }

}

export default Movies;