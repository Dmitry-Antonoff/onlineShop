const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function EditProduct(props) {
  const { product } = props;
  const characteristic = product.characteristics;
  console.log(characteristic);
  const allcharacteristic = [];
  for (const key in characteristic) {
    allcharacteristic.push({ key, value: characteristic[key] });
  }
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
            <div className="product-value-div">
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
              <button className="add-product-form-button" type="submit">
                Изменить
              </button>
            </div>
            <div className="characteristics-add">
              <h2>Характеристики</h2>
              <button type="button" className="edit-btn add-value-characteristics">
                <img className="edit" src="/svg/add.svg" alt="Добавить" />
              </button>
              <div className="characteristics-list">
                {allcharacteristic.map((character) => (
                  <div className="key-value">
                    <input
                      name="key"
                      type="text"
                      placeholder="Ключ"
                      defaultValue={character.key}
                      key={product.id}
                    />
                    <input
                      name="value"
                      type="text"
                      placeholder="Значение"
                      defaultValue={character.value}
                      key={product.id}
                    />
                    <button type="button" className="key-value-delete key-value-edit">
                      <img src="/svg/trash.svg" alt="Удалить" className="key-value-trash" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="description">
              <h2>Описание</h2>
              <textarea value={product.description} name="description" cols="30" rows="10" />
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};
