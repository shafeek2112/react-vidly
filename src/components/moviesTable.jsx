import React from 'react';
import Like from './common/like';

const MoviesTable = (props) => {

    const { movies, onDelete, onLike } = props;

    return (
        <table className={ movies.length === 0 ? 'table d-none' : 'table' }>
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
                        <td> <Like onLike={() => { onLike(movie) }} key={movie._id} id={movie._id} liked={movie.liked} /> </td>
                        <td> <button type="button" onClick={ () => { onDelete(movie._id) } } className="btn btn-danger">Delete</button> </td>
                    </tr>
                ) }
            </tbody>
        </table>
    );
}

export default MoviesTable;