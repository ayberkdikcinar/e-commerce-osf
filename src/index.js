const app = require('./app')
const search = require('./services/search');
const PORT = process.env.PORT || 8000;

async function start() {

    await search.loadAllProducts();
    app.listen(PORT, () => {
        console.log(`Application starts on PORT:${PORT}`)
    });

}

start();
