const express = require("express");
const handlebars = require('express-handlebars');
const app = express();
const router = express.Router();

const Container = require("./container")
const container = new Container("productos.txt");

app.use('/productos', router)
router.use(express.json())
router.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.engine(
    "handlebars",
    handlebars.engine({
        extname: ".handlebars",
        layoutsDir: "views/layouts",
        defaultLayout: 'index.handlebars'
    })
);
app.set("view engine", "handlebars");
app.set("views", "./views");


router.get("/", async (req, res) => {
    let datos = await container.getAll()
    res.render( "vista", { datos })
})

router.post("/", async (req, res) => {
    await container.save(req.body.title, req.body.price, req.body.thumbnail)
    res.redirect("/")
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error!', err => console.log(`Error en servidor ${err}`))