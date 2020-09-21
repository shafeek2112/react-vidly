import React from 'react';

const ListGroup = (props) => {

    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;

    const classNames = (val) => {
        let classNames = "list-group-item list-group-item-action ";
        classNames += (selectedItem === val) ? " active" : "";
        return classNames;
    }

    return (
        // <div className="list-group">
        //     <a  onClick={() => onItemSelect(0)}  className="list-group-item list-group-item-action active" style={{"cursor":"pointer"}} >All Genres</a>

            items.map( item => (<a key={item[valueProperty]} onClick={() => onItemSelect(item[valueProperty])} className={classNames(item[valueProperty])} style={{"cursor":"pointer"}}>{item[textProperty]}</a> ))

        // </div>
    );
}

ListGroup.defaultProps = {

    'valueProperty' : '_id',
    'textProperty' : 'name',
}

export default ListGroup;