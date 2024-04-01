const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      this.belongsTo(models.Manufacturer, { foreignKey: 'manufacturerId', onDelete: 'CASCADE' });
      this.hasMany(models.BasketList, { foreignKey: 'productId' });
      this.hasMany(models.OrderProduct, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      productCode: DataTypes.STRING,
      manufacturerId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantityInStock: DataTypes.INTEGER,
      characteristics: DataTypes.JSONB,
      description: DataTypes.TEXT,
      imgPath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
