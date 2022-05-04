const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const app = express();
const { addParamsToResponse } = require('./middlewares/helper.middleware')
const productRouter = require('./routes/product.router')
const authRouter = require('./routes/auth.router')
const categoryRouter = require('./routes/category.router')
const mainRouter = require('./routes/main.router')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '..', 'public')));;
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressLayout);


/*app.get('/', (req, res) => {
    res.render('index.ejs', { query: req.query });
})*/
app.use('/', addParamsToResponse, mainRouter);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

module.exports = app;