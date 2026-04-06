import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';


const CartMenuContainer = styled.div`
    background-color: ${({ theme }) => theme.light.color3};
    border-left:1px solid #afafaf;
    position: fixed;
    z-index: 4;
    top: 0;
    right: 0;
    bottom: 0;
    width: 310px;
    overflow-x: scroll;
    padding: 1rem;
    

    .nav_controller{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .title {
            margin: 0;
            font-weight: 700;
        }
        .closeIcon {
            cursor: pointer;
        }
    }

    .total {
        position: absolute;
        border-top:1px solid #afafaf;
        background-color: ${({ theme }) => theme.light.color3};
        bottom: 0;
        right: 0;
        left: 0;
        padding: 1rem;
        padding-bottom: 0px;
        display: flex;
        justify-content: space-between;
    }
`
const CartItemsContainer = styled.div`
    padding-bottom: 100px;
    .cartItem {
        display: grid;
        border:1px solid #afafaf;
        border-radius: 10px;
        grid-template-columns: 4fr 1fr;
        margin-bottom: 10px;

        .item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            min-width: 90%;

            p {
                margin: 0;
            }

            .name {
                font-weight: 700;
            }

            .price {
                font-weight: 500;
            }
        }

        .deleteIcon {
            cursor: pointer;
            place-self: center;
        }
    }
`
function CartMenu(props) {
    const { setCartOpener, cartOpener, cartData, setCartData } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cartData.reduce((acc, data) => {
            return acc + Number(data.price);
        }, 0)
        setTotalPrice(total)

    }, [cartData]);

    return (
        <CartMenuContainer>
            <div style={{ position: "relative", minHeight: "100%" }}>
                <div className="nav_controller">
                    <h2 className='title'>Cart</h2>
                    <CloseIcon
                        className='closeIcon'
                        onClick={() => {
                            if (cartOpener) setCartOpener(false);
                            else setCartOpener(ture);
                        }}
                    />
                </div>

                <CartItemsContainer>
                    {cartData.map((cartItem, index) => {
                        return (
                            <div className='cartItem' key={index}>
                                <div className='item'>
                                    <div>
                                        <p className='name'>{cartItem.itemName}</p>
                                        <p className='quantity'>{cartItem.quantity} pcs</p>
                                    </div>
                                    <p className='price'>{cartItem.price} ₹</p>
                                </div>
                                <DeleteIcon
                                    className='deleteIcon'
                                    onClick={() => {
                                        setCartData(cartData.filter(data => data.itemId != cartItem.itemId));
                                    }}
                                />
                            </div>
                        )
                    })}
                </CartItemsContainer>

                <div className='total'>
                    <h3 >Total </h3>
                    <p>{totalPrice} ₹</p>
                </div>
            </div>

        </CartMenuContainer>
    )
}

export default CartMenu;





// const sampleData = [
//     { itemName: "samosa", quantity: 23, price: 230 },
//     { itemName: "bajji", quantity: 23, price: 230 },
//     { itemName: "water", quantity: 23, price: 230 },

// ]