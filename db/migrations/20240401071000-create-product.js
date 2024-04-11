/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Categories',
          },
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      manufacturerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Manufacturers',
          },
          key: 'id',
        },
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantityInStock: {
        type: Sequelize.INTEGER,
      },
      characteristics: {
        type: Sequelize.JSONB,
      },
      description: {
        type: Sequelize.TEXT,
      },
      imgPath: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  },
};
