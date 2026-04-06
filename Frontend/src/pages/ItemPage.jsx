import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import styled from 'styled-components';


const ItemPageContainer = styled.section`
    /* min-height: 80vh; */
    /* background-color: ${({ theme }) => theme.light.bgColor2}; */
    padding: 1.5rem;
`

const ItemPageCard = styled.div`
    background-color: ${({ theme }) => theme.light.color3};
    border-radius: 10px;
    padding: 3rem 2rem;

    .backIcon {
        cursor: pointer;
        margin-bottom: 1.5rem;

        svg {
            font-size: 2rem;
        }
    }

    .cardContentMain {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;


        .image {
            height: 100%;
            width: 100%;
            border-radius: 10px;
            object-fit: cover;
            object-position: center;

        }

        .contentContainer {
            display: grid;
            grid-template-rows: 1fr;
            padding: 1rem;
            padding-left: 2rem;

            h4 {
                font-weight: 700;
            }
            
            .content{
                .title {
                    font-size: 3rem;
                    font-weight: 700;
                }
                
                p {
                    font-size: 1.3rem;
                    line-height: 1.1;
                }
                .description {
                    margin-top: 20px;
                    
                }
            }

        }
    }   
`

function ItemPage() {
    const { cartData, setCartData } = useOutletContext();
    const { itemId } = useParams();
    const [itemData, setItemData] = useState({});
    const [itemQuantity, setItemQuantity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getItem() {
            const response = await axios.get(`http://localhost:8080/api/getitem/${itemId}`);
            setItemData(response.data)
        }
        getItem();
    }, [])
    return (
        <ItemPageContainer>
            <ItemPageCard>
                <div className='backIcon'>
                    <ArrowBackIcon onClick={()=> navigate(-1)}/> 
                </div>
                <div className="cardContentMain">
                    <img src={`data:image/jpeg;base64,${itemData.imageData}`} alt="img" className='image'/>
                    <div className='contentContainer'>
                        <div className='content'>
                            <h1 className='title'>{itemData.itemName}</h1>

                            <div className='description'>
                                <h4>Description:</h4>
                                <p >{itemData.description}</p>
                                <p>
                                    <span style={{ fontWeight: "600" }}>Price:</span> {itemData.price} ₹
                                </p>
                                <p>
                                    <span style={{ fontWeight: "600" }}>Available:</span> {itemData.quantity} Pcs
                                </p>
                            </div>


                            {/* <div className="actionControllers">
                                <EditIcon />
                                <DeleteIcon />
                            </div> */}
                        </div>
                        <div className='d-flex jsutify-content-between align-items-center'>
                            {/* <h4>Quantity</h4> */}
                            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                                <InputLabel id="quantityIDLabel">Quantity</InputLabel>
                                <Select
                                    labelId='quantityIDLabel'
                                    value={itemQuantity}
                                    onChange={(e) => {
                                        setItemQuantity(e.target.value);
                                    }}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>

                            </FormControl>
                        </div>
                        <Button
                            variant='contained'
                            onClick={() => {
                                setCartData([
                                    ...cartData,
                                    {
                                        itemId: itemId,
                                        itemName: itemData.itemName,
                                        quantity: itemQuantity,
                                        price: Number(itemQuantity) * itemData.price
                                    }
                                ]);

                                setItemData({
                                    ...itemData,
                                    quantity: itemData.quantity - itemQuantity
                                });
                            }}
                        >Add to Cart</Button>
                    </div>
                </div>
            </ItemPageCard>
        </ItemPageContainer>
    )
}

export default ItemPage