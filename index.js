const express = require("express");
const cors = require("cors");
const data = require("./restaurant-list.json");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5001, () => console.log("this stuff works"));


app.get("/", (req, res) => res.status(200).send(data));

app.post("/", (req, res) => {
  data.push(req.body)
  const dataJSON = JSON.stringify(data)

  fs.writeFile('restaurant-list.json', dataJSON, err => console.error(err))
  res.send(data)
});

app.patch("/update-restaurant", (req, res) => {
    let { name } = req.query
    const itemFound = data.find(elem => elem.name === name)
    console.log(itemFound)
    const indexOfitem = data.indexOf(itemFound)
    data[indexOfitem] = req.body
    res.send(data)
    const dataJSON = JSON.stringify(data)
    fs.writeFile('restaurant-list.json', dataJSON, err => console.error(err))
    res.send(data)
})
