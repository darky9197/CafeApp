import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.light.color3};
  max-height: 500px;

  p {
    margin: 0px;
  }

  .imageSection {
    border: 1px solid #e0e0e0;
    border-radius: 5px;

    img {
      border-radius: 5px;
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: center;
    }
  }

  .contentSection {
    display: grid;
    padding-top: 1rem;

    a {
      width: 100%;
      color: ${({ theme }) => theme.light.color3};
      text-decoration: none;
    }

    .title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .buyButton {
      width: 100%;
    }
  }
`;

function ItemCard(props) {
  const { itemId, itemName, quantity, price, imageData } = props.item;
  return (
    <CardContainer>
      <div className="imageSection">
        <img
          src={`data:image/jpeg;base64,${imageData}`}
          alt="image"
          className="image"
        />
      </div>
      <div className="contentSection">
        <p className="title">{itemName}</p>
        <p className="quantity">{quantity} items left!!</p>
        <p className="price">{price}₹</p>

        <Link to={`itemdesciption/${itemId}`}>
          <Button
            className="buyButton"
            variant="contained"
            sx={{
              textTransform: "none",
              marginTop: "15px",
            }}
          >
            View More
          </Button>
        </Link>
      </div>
    </CardContainer>
  );
}

export default ItemCard;
