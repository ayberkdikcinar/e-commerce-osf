const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing")

const { addEnabledCategoryInfo, addSignedInfo } = require('./middlewares/helper.middleware')
const { authCheck } = require('./middlewares/auth.middleware');
const error = require('./middlewares/errorHandler.middleware');

const mainRouter = require('./routes/main.router')
const productRouter = require('./routes/product/product.router')
const authRouter = require('./routes/auth/auth.router')
const categoryRouter = require('./routes/category/category.router')
const orderRouter = require('./routes/order/order.router')
const userRouter = require('./routes/user/user.router')
const cartRouter = require('./routes/cart/cart.router')
const wishListRouter = require('./routes/wishlist/wishlist.router')

require('dotenv').config();
const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayout);
app.use(addEnabledCategoryInfo);
app.use(addSignedInfo);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', authCheck, userRouter);
app.use('/order', authCheck, orderRouter);
app.use('/cart', authCheck, cartRouter);
app.use('/wishlist', authCheck, wishListRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(error.errorHandling);
app.use(error.notFoundPage);

module.exports = app;