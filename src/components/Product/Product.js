import React from 'react';
import './Product.css';

const Product = React.memo((props) => {
    console.log('Renderiza Product '+ props.product.productName)
    return (
        <div className= 'shopping-cart__product' key={props.product.id}>
            <li >{props.product.productName} / {props.product.amount} unidades / a {props.product.price}€ cada unidad</li>
            <button onClick={() => props.handleClick(props.product.id)}>Eliminar</button>
        </div>
    )
})

export default Product;