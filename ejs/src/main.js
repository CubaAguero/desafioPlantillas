const express = require("express")
const app = express();
const router = express.Router();

const Container = require("./container")
let container1 = new Container("productos.txt")

app.use("/productos", router)
router.use(express.json())
router.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("views", "./views")
app.set("view engine", "ejs")

router.get("/", async (req, res) => {
    let datos = await container1.getAll()
    res.render("vista", { datos })
})

router.post("/", async (req, res) => {
    await container1.save(req.body.title, req.body.price, req.body.thumbnail)
    res.redirect("/")
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express en el puerto ${server.address().port}`)
})
server.on("error!", err => console.log(`Error en servidor ${err}`))