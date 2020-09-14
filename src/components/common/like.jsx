import React, { Component } from 'react';
import ReactDom from 'react-dom';

//--------- Class component ------------//
/*class Like extends Component {

    render() {
        const { onLike, liked } = this.props;

        console.log(this.props, liked);
        return (

            // <i onClick={() => { onLike(id) }} className={ liked === false ? 'fa fa-heart-o' : 'fa fa-heart'} aria-hidden="true"></i>
            <i onClick={onLike} className={ liked === false ? 'fa fa-heart-o' : 'fa fa-heart'} aria-hidden="true"></i>
        );
    }
}

export default Like;*/


//--------- Stateless functional component ------------//
const Like = (props) => {

    const { onLike, liked } = props;

    let classes = "fa fa-heart";
    if(!liked)
        classes += "-o" ;

    return ( 
        // <i onClick={() => { onLike(id) }} className={ liked === false ? 'fa fa-heart-o' : 'fa fa-heart'} aria-hidden="true"></i>
        <i onClick={onLike} className={ classes } aria-hidden="true"></i>
     );
}
 
export default Like;