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

    render() {

        const { tableHeaderColumns } = this.props;
        
        return (
            <thead className="thead-dark">
                <tr>
                    { tableHeaderColumns.map(column => <th key={column.label} onClick={() => { this.onRaiseSort(column.path)} }>{column.label}</th>) }
                </tr>
            </thead>
        )

    }
}

export default TableHeader;