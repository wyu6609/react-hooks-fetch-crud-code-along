import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //useEffect fetch data

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function onAddNewObj(newObj) {
    setItems([...items, newObj]);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function onUpdatedNewObj(newObj) {
    const updatedItems = items.map((item) => {
      if (item.id === newObj.id) {
        return newObj;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }
  function onDeleteItem(item) {
    const updatedItems = items.filter((el) => el.id !== item.id);
    setItems(updatedItems);
  }
  return (
    <div className="ShoppingList">
      <ItemForm onAddNewObj={onAddNewObj} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdatedNewObj={onUpdatedNewObj}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
