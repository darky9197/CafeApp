import React from "react";
import styled from "styled-components";
import axios from "axios";
import ManageCard from "../components/ManageCard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { FormControl, TextField } from "@mui/material";

const ManagePageContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
`;

const ManagerList = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  .actionControllers {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    .actionIcon {
      cursor: pointer;
    }
  }
`;

function ManagePage() {
  const {
    setReloadTrigger,
    reloadTrigger,
    setFormOpener,
    formOpener,
    items,
    setItems,
  } = useOutletContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, [reloadTrigger]);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteitem/${id}`,
      );
      setReloadTrigger(prev + 1);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ManagePageContainer>
      <h1 className="fw-bolder text-center text-success mt-4 mb-4">
        Todays Menu Manager
      </h1>

      <ManagerList>
        <div className="d-flex justify-content-end p-1 mb-3">
          <Button
            sx={{
              backgroundColor: "#00b158",
              padding: "0.7rem 1.5rem",
              fontWeight: "700",
              textTransform: "none",
            }}
            variant="contained"
            onClick={() => {
              if (formOpener) setFormOpener(false);
              else setFormOpener(true);
            }}
          >
            Add
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }} align="left">
                  Item Name
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="left">
                  Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="left">
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!items ? (
                <TableRow>
                  <TableCell>Something went wrong!!</TableCell>
                </TableRow>
              ) : (
                items.map((item) => {
                  return (
                    <ManageCard
                      key={item.itemId}
                      item={item}
                      setReloadTrigger={setReloadTrigger}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ManagerList>
    </ManagePageContainer>
  );
}

export default ManagePage;
