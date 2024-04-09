const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function EditProduct(props) {
  const { product } = props;
  return (
    <Layout {...props}>
      <main className="add-product-main">
        <SideBar {...props} />
        <div className="add-product-div">
          <form className="add-product-form" name="productEditForm" data-id={product.id}>
            {/* <select name="parentproductName">
              {allCategories.map((category) => (
                <option>{category.name}</option>
              ))}
            </select> */}
            <input name="name" className="product-name-form" type="text" value={product.name} />
            <input name="img" className="img-add" type="file" />
            <input
              name="code"
              className="product-name-form"
              type="text"
              value={product.productCode}
            />
            <input
              name="manufacturer"
              className="product-name-form"
              type="text"
              value={product.Manufacturer.name}
            />
            <input name="price" className="product-name-form" type="text" value={product.price} />
            <input
              name="inStock"
              className="product-name-form"
              type="text"
              value={product.quantityInStock}
            />
            <button type="submit">Изменить</button>
          </form>
        </div>
      </main>
    </Layout>
  );
};
