import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = (props) => {

    const { items, tableHeaderColumns, sortColumn, onSort } = props;

    return (
        <table className={ items.length === 0 ? 'table d-none' : 'table' }>  
            <TableHeader 
                tableHeaderColumns={tableHeaderColumns} 
                sortColumn={ sortColumn } 
                onSort={onSort} 
            />
            <TableBody 
                items={items}
                columns={tableHeaderColumns}
            />
        </table>
    );

}

export default Table;