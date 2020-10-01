import React from 'react';
import Like from './common/like';

const MoviesTable = (props) => {

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
}

export default MoviesTable;