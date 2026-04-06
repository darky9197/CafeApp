import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavContainer = styled.nav`
  background-image: ${({ theme }) => theme.light.bgColor1} !important;
  a {
    text-decoration: none;
  }
  .cartIcon {
    cursor: pointer;
  }
`;

function Navbar(props) {
  const {
    setFormOpener,
    setCartOpener,
    formOpener,
    cartOpener,
    formData,
    setFormData,
  } = props;

  // async function handleGetMax() {
  //   const maxIdResponse = await axios.get("http://localhost:8080/api/findmaxid");
  //   const maxIdData = maxIdResponse.data;
  //   // const maxId = 121 + 1;

  //   // setFormData({
  //   //   ...formData,
  //   //   itemId: maxIdData + 1
  //   // });

  //   // console.log(formData);
  //   // console.log(maxIdData);
  // }
  const navigate = useNavigate();
  return (
    <NavContainer className="navbar bg-dark text-white p-3 ">
      <h1
        className="navbar-brand text-success fs-2 fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        CafeApp
      </h1>

      <div className="d-flex align-items-center gap-3">
        {/* <Button className="text-black p-2 gap-1 bg-white"
          sx={{ textTransform: "none" }}
          variant='contained'
          onClick={() => {
            if (formOpener) setFormOpener(false);
            else setFormOpener(true);
            // handleGetMax();
          }}
        >
          Add Item
          <AddCircleOutlineIcon />
        </Button> */}

        <Link to={`manage`}>
          <Button
            className="text-black p-2 gap-2 bg-white"
            sx={{ textTransform: "none" }}
            variant="contained"
          >
            Manage
            <DriveFileRenameOutlineIcon className="fs-5" />
          </Button>
        </Link>

        <ShoppingCartIcon
          className="cartIcon"
          onClick={() => {
            if (cartOpener) setCartOpener(false);
            else setCartOpener(true);
          }}
        />
      </div>
    </NavContainer>
  );
}

export default Navbar;
