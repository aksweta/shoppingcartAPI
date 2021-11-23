import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Button from "./component/Button";

const App = () => {
  const config = {
    method: "get",
    url: "http://localhost:8080/products",
    headers: {},
  };

  const [pro, setPro] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios(config).then((response) => {
      console.log(response.data.products);
      setPro(response.data.products);
    });
  }, [cart]);

  const addcart = (item) => {
    axios.post(`http://localhost:8080/cart/add/${item.id}`);
    const newUpdatedCart = [...cart, item];
    setCart(newUpdatedCart);
  };

  const removecart = (id) => {
    axios.post(`http://localhost:8080/cart/remove/${id}`);
    const newList = cart.filter((item) => item.id !== id);
    setCart(newList);
  };

  const total = cart.reduce((lastValue, cartData) => {
    console.log("LAST: ", lastValue);
    console.log("CURRENT: ", cartData);
    return (lastValue += cartData.price);
  }, 0);

  return (
    <div>
      <div className="row">
        {console.log(pro)}
        <h1> Shopping Cart Example</h1>
        <h3>Products</h3>
        <div className="grid-container">
          <div className="grid-inner">
            {pro.length > 0 &&
              pro.map((item) => {
                return (
                  <div className="products" key={item.id}>
                    <div className="tt">
                      <img
                        src={require(`../public/static/${item.image}`).default}
                        alt="ff"
                      />
                    </div>

                    <div>{item.name}</div>
                    <div>
                      {item.price} <span>{item.currency}</span>
                    </div>

                    <div>
                      {item.isInCart ? (
                        <Button
                          className="remove"
                          handelclick={() => removecart(item.id)}
                        >
                          Remove Cart
                        </Button>
                      ) : (
                        <Button
                          className="add"
                          handelclick={() => addcart(item)}
                        >
                          Add To Cart
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.map((item) => {
              return (
                <>
                  <div>
                    <Button
                      className="remove"
                      handelclick={() => removecart(item.id)}
                    >
                      X
                    </Button>
                    {item.name}
                    {item.price}
                  </div>
                </>
              );
            })}

            <h5>Total:{total}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
