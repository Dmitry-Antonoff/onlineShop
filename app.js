require('dotenv').config();
require('@babel/register');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const administratorRouter = require('./src/routes/administrator');
const categoriesRouter = require('./src/routes/categories');
const productRouter = require('./src/routes/product');
const basketRouter = require('./src/routes/basket');
const ordersRouter = require('./src/routes/orders');

const addRender = require('./src/middleware/addRender');

const app = express();
const PORT = 3000;

const sessionConfig = {
  name: 'UserAuth',
  store: new FileStore(), // добавить после установки session-file-store
  secret: process.env.COOKIE_SEKRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 60 * 24 * 1000, // устанавливаем сколько живет кука
    httpOnly: false,
  },
};

app.use(expressSession(sessionConfig));
app.use(addRender);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', administratorRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productRouter);
app.use('/basket', basketRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
