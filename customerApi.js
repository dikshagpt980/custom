let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
// const port = 2410;
var  port = process.env.PORT||2410;
 
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let {customerData}  = require("./customerData.js");

app.get("/svr/customers", function(req, res){
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sort = req.query.sortBy;
    let arr = customerData;
    console.log(req.query);
    if(city){
        arr = arr.filter((s1)=> s1.city === city)
    }
    if(gender){
        arr = arr.filter((s1)=> s1.gender == gender)
    }
    if(payment){
        arr = arr.filter((s1)=> s1.payment === payment)
    }
    if(sort === "id"){
        arr.sort((s1,s2)=> s1.id.localeCompare(s2.id))
    }
    if(sort === "name"){
        arr.sort((s1,s2)=> s1.name.localeCompare(s2.name))
    }
    if(sort === "city"){
        arr.sort((s1,s2)=> s1.city.localeCompare(s2.city))
    }
    if(sort === "age"){
        arr.sort((s1,s2)=> (s1.age)-(s2.age))
    }
    if(sort === "gender"){
        arr.sort((s1,s2)=> s1.gender.localeCompare(s2.gender))
    }
    if(sort === "payment"){
        arr.sort((s1,s2)=> s1.payment.localeCompare(s2.payment))
    }
    res.send(arr);
});

app.get("/svr/customers/:id", function(req, res){
    let id = req.params.id;
    let customer = customerData.find((s1) => s1.id === id);
    if(customer){
         res.send(customer)
    }
    else {
        res.status(404).send("No student found");
    }
});

app.post("/svr/customers", function(req, res){
    console.log("req",req.body);
    let body = {...req.body};
    let newcustomer = {...body};
    customerData.push(newcustomer);
    res.send(newcustomer);
});

app.put("/svr/customers/:id", function(req, res){
    let id = req.params.id;
    let body = req.body;
    let index = customerData.findIndex((s1) => s1.id=== id);
    if(index>=0){
        let updateCustomer = {...body}
        customerData[index] = updateCustomer
        res.send(updateCustomer);
    }
    else{
        res.status(404).send("No customer found");
    }
});

app.delete("/svr/customers/:id", function(req, res){
    let id = req.params.id;
    let index = customerData.findIndex((s1) => s1.id === id);
    if(index>=0){
        let deleteCustomer = customerData.splice(index,1);
        res.send(deleteCustomer);
    }
});
