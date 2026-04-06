import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button, FormControl, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddForm(props) {
  const { formData, setFormData, formOpener, setFormOpener, setReloadTrigger } =
    props;

  const [imageData, setImageData] = useState(null);

  async function submitData() {
    try {
      // console.log(formData);
      const postData = new FormData();
      postData.append("imageFile", imageData);
      postData.append(
        "item",
        new Blob([JSON.stringify(formData)], { type: "application/json" }),
      );

      const formResponse = await axios.post(
        "http://localhost:8080/api/additem",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
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
              if (formOpener) setFormOpener(false);
              else setFormOpener(true);
            }}
          />
        </div>
        <form className="formContent">
          <h1>Add an Item</h1>
          <TextField
            label="Enter Item Name"
            required
            value={formData.itemName}
            onChange={(e) => {
              setFormData({
                ...formData,
                itemName: e.target.value,
              });
            }}
          />

          <TextField
            label="Enter Item Quantity"
            required
            value={formData.quantity}
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                quantity: e.target.value,
              });
            }}
          />

          <TextField
            label="Enter Price"
            value={formData.price}
            type="number"
            onChange={(e) => {
              setFormData({
                ...formData,
                price: e.target.value,
              });
            }}
          />

          <TextField
            label="Enter Description"
            required
            multiline
            value={formData.description}
            onChange={(e) => {
              setFormData({
                ...formData,
                description: e.target.value,
              });
            }}
          />

          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.startsWith("image/")) {
                  setImageData(file);
                } else {
                  setImageData(null);
                  alert("Please select a valid image file.");
                }
              }}
              accept="image/**"
            />
          </Button>

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

export default AddForm;
