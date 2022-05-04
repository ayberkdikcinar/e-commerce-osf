const app = require('./app')

const PORT = process.env.PORT || 8000;

function start() {
    app.listen(PORT, () => {
        console.log(`Application starts on PORT:${PORT}`)
    });
}

start();
