import React, { Component } from 'react';
import ReactDom from 'react-dom';

class TableHeader extends Component {

    onRaiseSort = (path) => {

        if(!path) return;

        const sortColumn = {...this.props.sortColumn};

        if(sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
            sortColumn.icon = (sortColumn.order === 'asc') ? 'down' : 'up';
        }
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc'
            sortColumn.icon = 'down';
        }

        this.props.onSort(sortColumn);
    }

    addIconClass = (path) => {

        const { sortColumn } = this.props;
        return 'ml-2 fa fa-angle-double-'+((sortColumn.path === path) ? sortColumn.icon : 'down');
    }

    render() {

        const { tableHeaderColumns } = this.props;

        return (
            <thead className="thead-dark">
                <tr>
                    { tableHeaderColumns.map(column => <th key={column.label} onClick={() => { this.onRaiseSort(column.path)} }>
                            {column.label}
                            {
                               (column.path) ? <i className={this.addIconClass(column.path)}></i> : ''
                            }
                        </th>) 
                    }
                </tr>
            </thead>
        );
    }
}

export default TableHeader;