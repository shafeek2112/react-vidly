import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class MoviesTable extends Component {

    movieHeaderColumns = [
        { 'path' : 'title', 'label' : 'Title'},
        { 'path' : 'genre.name', 'label' : 'Genre'},
        { 'path' : 'numberInStock', 'label' : 'Stock'},
        { 'path' : 'dailyRentalRate', 'label' : 'Rate'},
        { 'path' : '','label' : 'Like'},
        { 'path' : '','label' : 'Delete'},
    ];

    render() {

        const { sortColumn, movies, onDelete, onLike, onSort } = this.props;

        return (
            <table className={ movies.length === 0 ? 'table d-none' : 'table' }>
                
                <TableHeader 
                    tableHeaderColumns={this.movieHeaderColumns} 
                    sortColumn={ sortColumn } 
                    onSort={onSort} 
                />

                <tbody>
                    { movies.map(movie => <tr key={movie._id}>
                            <td> { movie.title } </td>
                            <td> { movie.genre.name } </td>
                            <td> { movie.numberInStock } </td>
                            <td> { movie.dailyRentalRate } </td>
                            <td> <Like onLike={() => { onLike(movie) }} key={movie._id} id={movie._id} liked={movie.liked} /> </td>
                            <td> <button type="button" onClick={ () => { onDelete(movie._id) } } className="btn btn-danger">Delete</button> </td>
                        </tr>
                    ) }
                </tbody>
            </table>
        );
    };
}


//Change this functional component into class component becas we need to add the onSort function here. so we dont need to duplicate this function
// if we use this component in other component.
/* const MoviesTable = (props) => {

    const { movies, onDelete, onLike, onSort } = props;

    return (
        <table className={ movies.length === 0 ? 'table d-none' : 'table' }>
            <thead className="thead-dark">
                <tr>
                    <th onClick={() => { onSort('title')} }>Title</th>
                    <th onClick={() => { onSort('genre.name')} }>Genre</th>
                    <th onClick={() => { onSort('numberInStock')} }>Stock</th>
                    <th onClick={() => { onSort('dailyRentalRate')} }>Rate</th>
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
                        <td> <Like onLike={() => { onLike(movie) }} key={movie._id} id={movie._id} liked={movie.liked} /> </td>
                        <td> <button type="button" onClick={ () => { onDelete(movie._id) } } className="btn btn-danger">Delete</button> </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
} */

export default MoviesTable;