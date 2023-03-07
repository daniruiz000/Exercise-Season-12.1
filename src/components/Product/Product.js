import './Product.css';

const Product = (props) => {

    return (
        <div className= 'shopping-cart__product' key={props.product.id}>
            <li >{props.product.productName} / {props.product.amount} unidades / a {props.product.price}€ cada una</li>
            <button onClick={() => props.handleClick(props.product.id)}>Eliminar</button>
        </div>
    )
}

export default Product;