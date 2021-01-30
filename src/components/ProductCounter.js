import React from "react";

function ProductCounter({ count, updateCount }) {
  function IncrementItem() {
    updateCount(count + 1);
  }

  function DecreaseItem() {
    if (count) {
      updateCount(count - 1);
    }
  }

  return (
    <div className="col-quantity">
      <button className="count" onClick={DecreaseItem}>
        -
      </button>
      <input min="0" type="text" className="product-quantity" value={count} />
      <button className="count" onClick={IncrementItem}>
        +
      </button>
    </div>
  );
}

export default ProductCounter;
