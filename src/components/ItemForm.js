import React, { useState } from "react";

function ItemForm({ onAddNewObj }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  //submit button handler
  const submitBtnHandler = (event) => {
    event.preventDefault();
    //create new Obj
    const newObj = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((r) => r.json())
      // call the onAddItem prop with the newItem
      .then((newItem) => onAddNewObj(newItem));
  };

  return (
    <form className="NewItem">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit" onClick={submitBtnHandler}>
        Add to List
      </button>
    </form>
  );
}

export default ItemForm;
