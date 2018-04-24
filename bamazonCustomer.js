var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");  
});


var array = [];
var chgArray = [];

function listItems() {

    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < results.length; i++) {
        array.push("ID: " + results[i].id + 
        "  Product Name: " + results[i].product_name +
        "  Price: " + results[i].price + "\n"); 
        
    }
    console.log(array);
    idSearch();
    });
         
}

listItems();

var amt = 0;
var prodID = 0;
var getAmt = 0;

function idSearch() {
    inquirer
        .prompt([
        {
            name: "idNum",
            type: "input",
            message: "What product (by id) do you want to buy?",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        },
        {
            name: "quant",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
        ])
        .then(function(answer) {
        var query = "SELECT id,product_name, stock_quantity FROM products WHERE ?";
        connection.query(query, {id: answer.idNum}, function(err, res) {
            for (var i = 0; i < res.length; i++) {
            console.log(
                "ID: " +
                res[i].id +
                " || Product name: " +
                res[i].product_name +
                " || Stock quantity: " +
                res[i].stock_quantity +
                " || Amount to buy: " +
                answer.quant
            );
            prodID = res[i].id;
            getAmt = res[i].stock_quantity;
            }
            amt = answer.quant;
            if (amt > getAmt){
                console.log ("Insufficient quantity");
                orderAgain();
            } else {
                getAmt -= amt;
                confirmOrder();
            }
        });
        });
}

function confirmOrder() {
    
    inquirer.prompt([
        {
            type: "confirm",
            name: "orderPlace",
            message: "Please confirm the order above.",
            default: false
        }
    
        ]).then(function(order) {
            if (order.orderPlace == false) {
                return false;
            } else {
                
                updateProd();
            }
    });
}


function updateProd() {
    
    console.log("Updating an item...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: getAmt
        },
        {
            id: prodID
        }],

    function(err, results) {
        if (err) throw err;
        
        console.log(results.affectedRows + " products updated");
        listChgs();
    });
}

function listChgs() {

    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < results.length; i++) {
        chgArray.push("ID: " + results[i].id + 
        "  Product Name: " + results[i].product_name +
        "  Stock Quantity: " + results[i].stock_quantity +
        "  Price: " + results[i].price + "\n"); 
        
    }
    console.log(chgArray);
    orderAgain();
    });          
}

function orderAgain() {
    
    inquirer.prompt([
        {
            type: "confirm",
            name: "orderMore",
            message: "Order again?",
            default: false
        }
    
        ]).then(function(order) {
            if (order.orderMore == false) {
                connection.end();
            } else {
                
                listItems();
            }
    });
}
