import React from "react";
import { useParams } from 'react-router-dom';

const CarDetail = props => {
    const params = useParams();
    console.log('param: ', params);
    return (
        <div style={{textAlign: 'center'}}>
            <h1>{params.name}</h1>
        </div>
    )
}

export default CarDetail;