const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
app.use(express.static(__dirname+'../src'));
var fs = require("fs");

mongoose.connect("mongodb://localhost:27017/money", { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(8080, function () {
        console.log("Сервер ожидает подключения...");
    });
});
const incomeScheme = new Schema({
    date: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    value: {
        type: Number,
        required: true
    },
    person: {
        type: String,
        required: true
    },
})
const expenseScheme = new Schema({
    date: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    type: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});
const Expense = mongoose.model("Expense", expenseScheme);
const Income = mongoose.model("Income", incomeScheme);
// User.create( {date:1580570318070,type:"Еда",person:"Люба",title:"sccccs",value:1111}, function(err, doc){
//     mongoose.disconnect();
//       
//     if(err) return console.log(err);
//       
//     console.log("Сохранен объект user", doc);
// });

app.get("/", function (req, res) {
    res.sendFile(__dirname +'/index.html');
});
app.get("/api/expense", function (req, res) {
    let content = [];
    let summ = 0;
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Expense.find({}, function (err, expenses) {
        content=expenses.map(i=>i);
        let values = expenses.map(i=>i.value);
        summ = values.length>0? values.reduce((accumulator, currentValue) => accumulator + currentValue): 0;
        if (err) return console.log(err);
        res.send({data:content,total:summ});
    });
});

app.post("/api/expense", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const date = req.body.date;
    const person = req.body.person;
    const type = req.body.type;
    const title = req.body.title;
    const value = req.body.value;

    const user = new Expense({ date, type, person, title, value });
    console.log(user)
    user.save(function (err) {
        if (err) return console.log(err);
        res.send(user);
    });
});

app.get("/api/income", function (req, res) {
    let content = [];
    let summ = 0;
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Income.find({}, function (err, data) {
        content=data.map(i=>i);
        let values = data.map(i=>i.value);
        summ = values.length>0? values.reduce((accumulator, currentValue) => accumulator + currentValue): 0;
        if (err) return console.log(err);
        res.send({data:content,total:summ});
    });
});

app.post("/api/income", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const date = req.body.date;
    const person = req.body.person;
    const value = req.body.value;
    const income = new Income({ date, person, value });
    income.save(function (err) {
        if (err) return console.log(err);
        res.send(income);
    });
});