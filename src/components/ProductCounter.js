import React, { useState } from "react";

function ProductCounter() {
  const [count, setState] = useState(0);

  function IncrementItem() {
    setState(count + 1);
  }

  function DecreaseItem() {
    if (count) {
      setState(count - 1);
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
