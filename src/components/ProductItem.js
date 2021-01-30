import ProductCounter from './ProductCounter';

const ProductItem = ({ item, totalPrice }) => {
  return (
    <li className="product row">
      <div className="col-product">
        <figure className="product-image">
          <img src={item.photo} alt={item.name} />
          <div className="product-description">
            <h1>{item.name}</h1>
            <p className="product-code">Product code {item.code}</p>
          </div>
        </figure>
      </div>
      <ProductCounter />
      <div className="col-price">
        <span className="product-price">{item.price}</span><span className="product-currency currency">€</span>
      </div>
      <div className="col-total">
        {/* <span className="product-price">{totalPrice}</span><span className="product-currency currency">€</span> */}
      </div>
    </li>
  );
}

export default ProductItem;