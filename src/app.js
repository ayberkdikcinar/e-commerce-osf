const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

const { addParamsToResponse, addSignedInfo } = require('./middlewares/helper.middleware')
const { authCheck } = require('./middlewares/auth.middleware');
const error = require('./middlewares/errorHandler.middleware');

const mainRouter = require('./routes/main.router')
const productRouter = require('./routes/product/product.router')
const authRouter = require('./routes/auth/auth.router')
const categoryRouter = require('./routes/category/category.router')
const orderRouter = require('./routes/order/order.router')
const userRouter = require('./routes/user/user.router')
const cartRouter = require('./routes/cart/cart.router')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '..', 'public')));;
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayout);
app.use(addParamsToResponse);
app.use(addSignedInfo);

app.use(expressSession({
    secret: 'test',
    resave: false,
    cookie: { maxAge: 3600000 },
    saveUninitialized: true,
}));


app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', authCheck, userRouter);
app.use('/order', authCheck, orderRouter);
app.use('/cart', authCheck, cartRouter);
app.use(error.errorHandling);
app.use(error.notFoundPage);

module.exports = app;