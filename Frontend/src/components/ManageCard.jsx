import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import axios from "axios";

function ManageCard(props) {
  const { item, setReloadTrigger } = props;

  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
  });
  const FormRef = useRef(null);

  useEffect(() => {
    if (openUpdate) {
      FormRef.current.style.display = "block";
    } else {
      FormRef.current.style.display = "none";
    }
  }, [openUpdate]);

  async function handleUpdate(){
    try{
      const response = await axios.put(`http://localhost:8080/api/updateitem/${item.itemId}`, updatedFormData);
      setReloadTrigger(prev + 1);
    }catch(e) {
      console.log(e);
    }
  }
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{item.itemName}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell className="actionControllers">
          <EditIcon
            className="actionIcon"
            onClick={() => {
              if (openUpdate) setOpenUpdate(false);
              else setOpenUpdate(true);
            }}
          />
          <DeleteIcon
            className="actionIcon"
            onClick={() => handleDelete(item.itemId)}
          />
        </TableCell>
      </TableRow>

      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        ref={FormRef}
      >
        <TableCell>
          <TextField 
            label="Enter Item Name" 
            required 
            value={updatedFormData.itemName}
            onChange={(e)=>{
              setUpdatedFormData({
                ...updatedFormData,
                itemName: e.target.value
              })
            }}
          />
        </TableCell>
        <TableCell>
          <TextField 
            label="Enter Quantity" 
            value={updatedFormData.quantity}
            type="number"
            onChange={(e)=>{
              setUpdatedFormData({
                ...updatedFormData,
                quantity: e.target.value
              })
            }}
          />
        </TableCell>
        <TableCell>
          <TextField 
            label="Enter Price" 
            type="number"
            value={updatedFormData.price}
            onChange={(e)=>{
              setUpdatedFormData({
                ...updatedFormData,
                price: e.target.value
              })
            }}
          />
        </TableCell>
        <TableCell>
          <Button 
            variant="contained"
            onClick={() => handleUpdate()}
          >Update</Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ManageCard;
