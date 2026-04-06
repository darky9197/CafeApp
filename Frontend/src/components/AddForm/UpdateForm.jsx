import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const FormLayout = styled.div`
  position: fixed;
  background-color: #4b4b4b6a;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  padding: 1rem;
  min-width: 500px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.light.color3};

  .closeIcon {
    cursor: pointer;
  }

  .formContent {
    display: grid;
    gap: 10px;
  }
`;


function UpdateForm(props) {
  const { editOpener, setEditOpener, setReloadTrigger } = props;

  const [updatedFormData, setUpdatedFormData] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
  })

  async function submitData() {
    try {
     
      setReloadTrigger(prev + 1);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <FormLayout>
      <FormContainer>
        <div className="d-flex justify-content-end">
          <CloseIcon
            className="closeIcon"
            onClick={() => {
              console.log("Clicked", formOpener);
              if (editOpener) setEditOpener(false);
              else setEditOpener(true);
            }}
          />
        </div>
        <form className="formContent">
          <h1>Update Item</h1>
          <TextField
            label="Enter Item Name"
            required
            value={updatedFormData.itemName}
            onChange={(e) => {
              setUpdatedFormData({
                ...updatedFormData,
                itemName: e.target.value,
              });
            }}
          />

          <TextField
            label="Enter Item Quantity"
            required
            value={updatedFormData.quantity}
            type="number"
            onChange={(e) => {
              setUpdatedFormData({
                ...updatedFormData,
                quantity: e.target.value,
              });
            }}
          />

          <TextField
            label="Enter Price"
            value={updatedFormData.price}
            type="number"
            onChange={(e) => {
              setUpdatedFormData({
                ...updatedFormData,
                price: e.target.value,
              });
            }}
          />

          <Button
            variant="contained"
            sx={{ marginTop: "10px", padding: "1rem" }}
            type="submit"
            onClick={(e) => {
              submitData();
            }}
          >
            add
          </Button>
        </form>
      </FormContainer>
    </FormLayout>
  );
}

export default UpdateForm;
