import React, { Component } from 'react';
import ReactDom from 'react-dom';

class TableHeader extends Component {

    onRaiseSort = (path) => {

        if(!path) return;

        const sortColumn = {...this.props.sortColumn};

        if(sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc'
        }

        this.props.onSort(sortColumn);
    }

    renderSortIcon = (path) => {

        const { sortColumn } = this.props;

        //If the path is empty for Like n delete column and column is not currently sorting then return.
        if(!path || sortColumn.path !== path) return;

        if(sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i> 

        return <i className='fa fa-sort-desc'></i> 
    }

    render() {

        const { tableHeaderColumns } = this.props;

        return (
            <thead className="thead-dark">
                <tr>
                    { tableHeaderColumns.map(column => 
                        <th className={ (column.path) ? "clickable" : ''} key={column.label} onClick={() => { this.onRaiseSort(column.path)} }>
                            {column.label} {this.renderSortIcon(column.path)}
                        </th>) 
                    }
                </tr>
            </thead>
        );
    }
}

export default TableHeader;