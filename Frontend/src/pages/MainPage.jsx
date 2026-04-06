import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";
import { useOutletContext } from "react-router-dom";

const MainPageContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.light.bgColor2};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .gridContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

function MainPage() {
  const { reloadTrigger, items, setItems } = useOutletContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [reloadTrigger]);


  return (
    <MainPageContainer>
      <h1 className="fw-bolder text-success mt-4 mb-4">Todays Menu</h1>
      <div className="gridContainer">
        {(!items) ? <h1>Something went wrong!!</h1> : items.map((item) => {
          return <ItemCard key={item.itemId} item={item} />;
        })}
      </div>
    </MainPageContainer>
  );
}

export default MainPage;
