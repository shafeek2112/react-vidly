import React from 'react';
import PropTypes from 'prop-types';

//Stateless functional component
const Pagination = (props) => {

    const { totalCount, pageSize, currentPage, onPageChange } = props; 
    
    const totalPages = Math.ceil(totalCount/pageSize);
    if(totalPages === 1) return null;
    
    //Change this into array, so we can use map method.
    let pagesArray = [];
    for(let i = 1; i <= totalPages; i++) 
    {
        pagesArray.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { pagesArray.map( page => ( <li key={page} className={ (page === currentPage) ? 'page-item active' : 'page-item' }><a className="page-link" onClick={ () => onPageChange(page)}>{page}</a></li> )) }
            </ul>
        </nav>
    );

}

Pagination.propTypes = {
    totalCount : PropTypes.number.isRequired, 
    pageSize : PropTypes.number.isRequired, 
    currentPage : PropTypes.number.isRequired, 
    onPageChange : PropTypes.func.isRequired
};

export default Pagination;