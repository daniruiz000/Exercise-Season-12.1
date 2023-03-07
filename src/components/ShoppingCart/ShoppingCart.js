import './ShoppingCart.css';
import React from 'react';
import Product from '../Product/Product';


const initialArg = {
    productList: [{
        id: 0,
        productName: 'Platanos',
        amount: 5,
        price: 3
    }],
    lastProductCreated: 0,
};

const reducer = (state, action) => {

    const newState = { ...state }

    switch (action.type) {

        case 'CREATE PRODUCT':
            const newProduct = {
                id: state.lastProductCreated + 1,
                productName: action.payload.productName,
                amount: action.payload.amount,
                price: action.payload.price
            }
       
            newState.productList = [...newState.productList, newProduct];
            newState.lastProductCreated = newProduct.id;
         
            break;

        case 'DELETE PRODUCT':
         
            newState.productList = [...newState.productList.filter(product => product.id !== action.payload.id)]

            break;

        default:
            console.error('Action type not supported')
            break;
    }

    return newState;

}

const ShoppingCart = () => {
    console.log('Renderiza ShoppingCart')
    const [state, dispatch] = React.useReducer(reducer, initialArg);

    const inputNameRef = React.useRef(null);
    const inputAmountRef = React.useRef(null);
    const inputPriceRef = React.useRef(null);

    const additionPrices = (list)=>{
        console.log('sumando precio total')
        const totalPriceArray =[]
        list.map(product =>{
            const totalPrice =  product.price * product.amount
            totalPriceArray.push(totalPrice)
            return totalPriceArray
        })
        const totalPrice = totalPriceArray.reduce((acc, element)=>{          
            return acc + element ;
        }, 0);
     
        return totalPrice
    }

    const memoizedValue = React.useMemo(() => additionPrices(state.productList), [state.productList]);

    const onSubmit = React.useCallback((event) => {
        console.log('Añade producto a la lista')
        event.preventDefault();

        const payload = {
            productName: inputNameRef.current.value,
            amount: inputAmountRef.current.value,
            price: inputPriceRef.current.value
        }

        dispatch({ type: 'CREATE PRODUCT', payload: payload })

        inputNameRef.current.value = ''
        inputAmountRef.current.value = ''
        inputPriceRef.current.value = ''

    }, [])

    const deleteProduct = React.useCallback((productId) => {
        console.log('Elimina producto de la lista')
        const payload = {
            id: productId
        }

        dispatch({ type: 'DELETE PRODUCT', payload: payload })
    }, [])



    return (

        <div className='shopping-cart'>
            <h2>Carrito de la compra</h2>
            <form onSubmit={onSubmit} className='shopping-cart__form'>
                <input ref={inputNameRef} type='text' placeholder='Introduce el producto'></input>
                <input ref={inputAmountRef} type='number' placeholder='Introduce la cantidad'></input>
                <input ref={inputPriceRef} type='number' placeholder='Introduce el precio'></input>
                <button type='submit'>Añadir al carrito</button>
            </form>
            <div className='shopping-cart__container'>
                <h4>Productos</h4>
                <ul className='shopping-cart__list'>

                    {state.productList.map((product) =><Product key={product.id} product={product} handleClick={deleteProduct}/>)}

                </ul>
                <p className='shopping-cart__addition'>Total: {memoizedValue}€</p>
            </div>
        </div>
    )
}

export default ShoppingCart;