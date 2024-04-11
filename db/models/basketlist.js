const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BasketList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
      this.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  BasketList.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'BasketList',
    },
  );
  return BasketList;
};
