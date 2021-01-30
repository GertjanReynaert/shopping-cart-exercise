import React from "react";
import ProductItem from "./components/ProductItem";

import shirtImg from "./img/shirt.png";
import mugImg from "./img/mug.png";
import capImg from "./img/cap.png";

const ProductList = [
  {
    code: "X7R2OPX",
    name: "Shirt",
    photo: shirtImg,
    price: 20,
    allowBulkDiscount: true,
    allowTwoForOneDiscount: false
  },
  {
    code: "X2G2OPZ",
    name: "Mug",
    photo: mugImg,
    price: 7.5,
    allowBulkDiscount: false,
    allowTwoForOneDiscount: true
  },
  {
    code: "X3W2OPY",
    name: "Cap",
    photo: capImg,
    price: 5,
    allowBulkDiscount: false,
    allowTwoForOneDiscount: false
  }
];

function App() {
  const [cart, updateCart] = React.useState(
    ProductList.map((product) => ({ product, amount: 0 }))
  );

  const updateAmount = (productCode, newAmount) => {
    updateCart(
      cart.map((row) =>
        row.product.code === productCode
          ? { product: row.product, amount: newAmount }
          : row
      )
    );
  };

  const totalItems = cart.reduce(
    (totalCount, row) => totalCount + row.amount,
    0
  );

  const totalItemPrice = cart.reduce(
    (totalCount, row) => totalCount + row.product.price * row.amount,
    0
  );

  const pricingRules = [
    {
      ruleType: "twoForOne",
      calculateDiscount: (product, amount) => {
        if (product.allowTwoForOneDiscount === false) return 0;
        if (amount < 3) return 0;

        return ((amount - (amount % 3)) / 3) * product.price * -1;
      },
      printPresentationText: (product) => `2x1 ${product.name} offer`
    },
    {
      ruleType: "bulk",
      calculateDiscount: (product, amount) => {
        if (product.allowBulkDiscount === false) return 0;
        if (amount < 3) return 0;

        return amount * (product.price * 0.05) * -1;
      },
      printPresentationText: (product) => `x3 ${product.name} offer`
    }
  ];

  const discounts = pricingRules
    .map((rule) =>
      cart.map((row) => ({
        id: `${rule.ruleType}-${row.product.code}`,
        presentationText: rule.printPresentationText(row.product),
        discount: rule.calculateDiscount(row.product, row.amount)
      }))
    )
    .reduce(
      //FlatMap
      (discounts, discountsForRules) => [...discounts, ...discountsForRules],
      []
    )
    .filter((discount) => discount.discount !== 0);

  const totalCost =
    totalItemPrice +
    discounts.reduce(
      (totalDiscount, discountItem) => totalDiscount + discountItem.discount,
      0
    );

  return (
    <main className="App">
      <section className="products">
        <h1 className="main">Shopping cart</h1>
        <ul className="products-list tableHead">
          <li className="products-list-title row">
            <div className="col-product">Product details</div>
            <div className="col-quantity">Quantity</div>
            <div className="col-price">Price</div>
            <div className="col-total">Total</div>
          </li>
        </ul>
        <ul className="products-list">
          {cart.map((row) => (
            <ProductItem
              key={row.product.code}
              item={row.product}
              count={row.amount}
              updateCount={(newAmount) =>
                updateAmount(row.product.code, newAmount)
              }
            />
          ))}
        </ul>
      </section>
      <aside className="summary">
        <h1 className="main">Order Summary</h1>
        <ul className="summary-items wrapper border">
          <li>
            <span className="summary-items-number">{totalItems} Items</span>
            <span className="summary-items-price">
              {totalItemPrice}
              <span className="currency">€</span>
            </span>
          </li>
        </ul>
        <div className="summary-discounts wrapper-half border">
          <h2>Discounts</h2>
          <ul>
            {discounts.map((discountItem) => (
              <li key={discountItem.id}>
                <span>{discountItem.presentationText}</span>
                <span>{discountItem.discount}€</span>
              </li>
            ))}
            <li>
              <span>Promo code</span>
              <span>0€</span>
            </li>
          </ul>
        </div>
        <div className="summary-total wrapper">
          <ul>
            <li>
              <span className="summary-total-cost">Total cost</span>
              <span className="summary-total-price">{totalCost}€</span>
            </li>
          </ul>
          <button type="submit">Checkout</button>
        </div>
      </aside>
    </main>
  );
}

export default App;
