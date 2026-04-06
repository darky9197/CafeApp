import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import AddForm from "./components/AddForm/AddForm";
import CartMenu from "./components/CartMenu";

const AppContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.light.bgColor2};
  min-height: 100vh;
`;

const OutletContainer = styled.div`
  /* border: 1px solid red; */
  display: grid;
  place-items: center;
  min-height: 100vh;
  max-width: 1024px;
  margin: auto;
`;

function App() {
  const formRef = useRef(null);
  const cartRef = useRef(null);
  const [formOpener, setFormOpener] = useState(false);
  const [cartOpener, setCartOpener] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [items, setItems] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    quantity: 0,
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (formOpener) {
      formRef.current.style.display = "block";
    } else {
      formRef.current.style.display = "none";
    }
  }, [formOpener]);

  useEffect(() => {
    if (cartOpener) {
      cartRef.current.style.display = "block";
    } else {
      cartRef.current.style.display = "none";
    }
  }, [cartOpener]);

  return (
    <AppContainer>
      <div style={{ display: "none" }} ref={formRef}>
        <AddForm
          formData={formData}
          setFormData={setFormData}
          setFormOpener={setFormOpener}
          formOpener={formOpener}
          setReloadTrigger={setReloadTrigger}
        />
      </div>

      <div style={{ display: "none" }} ref={cartRef}>
        <CartMenu
          cartData={cartData}
          setCartData={setCartData}
          setCartOpener={setCartOpener}
          cartOpener={cartOpener}
        />
      </div>

      <Navbar
        setFormOpener={setFormOpener}
        setCartOpener={setCartOpener}
        formOpener={formOpener}
        cartOpener={cartOpener}
        formData={formData}
        setFormData={setFormData}
      />

      <OutletContainer>
        <Outlet
          context={{
            setReloadTrigger,
            reloadTrigger,
            cartData,
            setCartData,
            setFormOpener, 
            formOpener,
            items, 
            setItems
          }}
        />
        {/* <h1>hello</h1> */}
      </OutletContainer>
    </AppContainer>
  );
}

export default App;
