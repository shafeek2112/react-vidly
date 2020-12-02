import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    renderCell = (item, column) => {

        if(column.content) return column.content(item); //content is the function in columns obj, so we need to call like this 
        
        return _.get(item,column.path);
    };

    renderCellKey = (item, column) => {

        return item+(column.path || column.label) // For the Like n Delete content, there is no path, so using label
    }

    render() {

        const { items, columns } = this.props;

        return (
            <tbody>
            { 
                items.map(item => 
                    <tr key={item._id} >
                        { 
                            columns.map (column => <td key={this.renderCellKey(item,column)} >{this.renderCell(item,column)}</td>)
                        }
                    </tr>
                )
            }
            </tbody>
        );
    }
}
export default TableBody;