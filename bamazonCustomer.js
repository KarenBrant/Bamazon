var mysql = require("mysql");
var inquirer = require('inquirer');

var prodID = "";
var prodAmount = 0;

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
    // orderItem(listArray);
});


var productArr = [];
// var amt = 0;
// var prodID = 0;

function listItems(array) {

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

    // return array;           
}

var listArray = listItems(productArr);
// console.log("listarray: " + listArray);
var amt = 0;
var prodID = 0;
var getAmt = 0;
var getID = 0;

function idSearch() {
        inquirer
          .prompt({
            name: "idNum",
            type: "input",
            message: "What product (by id) do you want to buy?"
          })
          .then(function(answer) {
            var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
            connection.query(query, { id: answer.idNum }, function(err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Quantity: " + res[i].stock_quantity);
                }
            prodID = res.id;
            getAmount();
            });
          });
      }

    //   idSearch();


    function getAmount() {
            inquirer
          .prompt({
            name: "quant",
            type: "input",
            message: "How many would you like to buy?"
          })
          .then(function(answer) {
            // Log all results of the SELECT statement
            var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
            connection.query(query, { stock_quantity: answer.quant }, function(err, results) {
                if (err) throw err;
                console.log("amt: " + amt);
                for (var i = 0; i < results.length; i++) {
                    console.log("prodID: " + prodID);
                }    
                if (amt > results.stock_quantity) {
                    console.log ("Insufficent quantity");
                } else {
                    console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + " || Amount to purchase: " + results[i].stock_quantity);
                }
                
                amt = answer.quant;
                confirmOrder();
            });  
        }); 
        // console.log ("amt: " + amt);
        // console.log ("id: " + prodID);
        return amt, prodID;
        
    }



    function confirmOrder(amt, prodID) {

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
                    updateProd(amt, prodID);
                }
        });
    }



function updateProd(amt, prodID) {
    console.log("prodID in update function" + prodID);
    console.log("Updating an item...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quantity: stock_quantity - amt
      },
      {
          id: prodID
      }],

      function(err, results) {
        if (err) throw err;
        // console.log("New qty: " + results.affectedrows);
        console.log(results.product_name + " item updated!\n");
      }
    );
}
// connection.end();