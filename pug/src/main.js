const express = require("express")
const app = express();
const router = express.Router();

const Container = require("./container")
const container1 = new Container("productos.txt");
//container1.createFile()

app.use('/productos', router)
router.use(express.json())
router.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.set("views", "./views");
app.set("view engine", "pug");

router.get('/', async (req, res) => {
    let data = await container1.getAll()
    res.render("vista", { data })
})

router.post("/", async (req, res) => {
    await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    console.log("post", req)
    res.redirect("/")
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error!', err => console.log(`Error en servidor ${err}`))

