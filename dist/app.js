const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
app.use(express.static(__dirname+'../src'));
var fs = require("fs");


app.get("/", function (req, res) {
    res.sendFile(__dirname +'/dist/index.html');
});

app.get("/api/expense", function (req, res) {
    var content = fs.readFileSync("data.json", "utf8");
    var expenses = JSON.parse(content).expense.data;
    let values = expenses.map(i=>i.value);
    summ = values.length>0? values.reduce((accumulator, currentValue) => accumulator + currentValue): 0;
    res.send({data:expenses,total:summ});
   
});

app.post("/api/expense", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const date = req.body.date;
    const person = req.body.person;
    const type = req.body.type;
    const title = req.body.title;
    const value = req.body.value;
    var arr = JSON.parse(fs.readFileSync("data.json", "utf8"));
    const expense = { "date":date, "type":type, "person":person, "title":title, "value":value };
    arr.expense.data.push(expense);
    console.log(expense);
    fs.writeFileSync("data.json", JSON.stringify(arr));
    res.send(expense);
});

app.get("/api/income", function (req, res) {
    var content = fs.readFileSync("data.json", "utf8");
    var incomes = JSON.parse(content).income.data;
    let values = incomes.map(i=>i.value);
    summ = values.length>0? values.reduce((accumulator, currentValue) => accumulator + currentValue): 0;
    res.send({data:incomes,total:summ});
});

app.post("/api/income", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const date = req.body.date;
    const person = req.body.person;
    const value = req.body.value;
    var arr = JSON.parse(fs.readFileSync("data.json", "utf8"));
    const income = { "date":date,  "person":person, "value":value };
    arr.income.data.push(income);
    console.log(income);
    fs.writeFileSync("data.json", JSON.stringify(arr));
    res.send(income);
});


app.listen(8080, function(){
    console.log("Сервер ожидает подключения...");
});