import React from "react";

function Item({ item, onUpdatedNewObj, onDeleteItem }) {
  const addToCartBtnHandler = () => {
    // add fetch request
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((newObj) => onUpdatedNewObj(newObj));
  };

  const deleteBtnHandler = () => {
    console.log(item.id);
    //add DELETE fetch request
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  };
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={addToCartBtnHandler}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={deleteBtnHandler}>
        Delete
      </button>
    </li>
  );
}

export default Item;
