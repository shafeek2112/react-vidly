import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { getMovies,deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

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
        // console.log(movies[index].liked);
        this.setState({ movies : movies});
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
                            <th>Like</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.movies.map(movie => <tr key={movie._id}>
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
		    </main>
        );
    }

}

export default Movies;