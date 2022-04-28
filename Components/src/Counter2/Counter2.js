import React from "react";
import {ClickedContext} from '../App'

export default props => {
    return (
        <div style={{border: '1px solid black', margin: '0 auto', width: '200px'}}>
            <h3>Counter 2</h3>
            {props.clicked ? <p>Clicked</p> : null}
            <ClickedContext.Consumer>
                {clicked2 => clicked2 ? <p>Clicked2</p> : null}
            </ClickedContext.Consumer>
            //allow to share context through application
        </div>
    )
}