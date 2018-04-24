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
    // orderItem(listArray);
});


var array = [];
var chgArray = [];
// var amt = 0;
// var prodID = 0;

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

    // return array;           
}

listItems();
// console.log("listarray: " + listArray);
var amt = 0;
var prodID = 0;
var getAmt = 0;
var getID = 0;

// function idSearch() {
//         inquirer
//           .prompt({
//             name: "idNum",
//             type: "input",
//             message: "What product (by id) do you want to buy?"
//           })
//           .then(function(answer) {
//             var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
//             connection.query(query, { id: answer.idNum }, function(err, res) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Quantity: " + res[i].stock_quantity);
//                 }
//             prodID = res.id;
//             getAmount(prodID);
//             });
//           });
//       }

    //   idSearch();


    // function getAmount(idNum) {
    //         inquirer
    //       .prompt({
    //         name: "quant",
    //         type: "input",
    //         message: "How many would you like to buy?"
    //       })
    //       .then(function(answer) {
    //         // Log all results of the SELECT statement
    //         amt = answer.quant;
    //         var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
    //         connection.query(query, { id: idNum }, function(err, results) {
    //             if (err) throw err;
    //             console.log("amt: " + amt);
    //             // for (var i = 0; i < results.length; i++) {
                    
    //             // }    
    //             if (amt > results.stock_quantity) {
    //                 console.log ("Insufficent quantity");
    //             } else {
    //                 for (var i = 0; i < results.length; i++) {
    //                     console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + " || Amount to purchase: " + results[i].stock_quantity);
    //                 }
    //             amt -= results.stock_quantity;
    //             }
    //             console.log("amt in getAmount: " + amt);
    //             console.log("prodID in getAmount: " + prodID);
    //             confirmOrder(amt, idNum);
    //         });  
    //     }); 
    //     // console.log ("amt: " + amt);
    //     // console.log ("id: " + prodID);
    //     // return amt, prodID;
        
    // }

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
              }
              amt = answer.quant;
              if (amt > res.stock_quantity){
                  console.log ("Insufficient quantity");
                } else {
                    getAmt = res.stock_quantity - amt;
                    confirmOrder();
              }
            //   confirmOrder();
            //   updateProd();

            //   console.log ("amt: " + amt);
            //   console.log ("prodID: " + prodID);
            //   return amt, prodID;
            });
          });
      }

    function confirmOrder() {
        console.log("amt in confirm: " + amt);
        console.log("prodID in confirm: " + prodID);
        
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
                    // console.log("amt in updateProd: " + amt);
                    // console.log("prodID in updateProd: " + prodID);
                updateProd();
                }
        });
    }


function updateProd() {
    console.log("amt in update function: " + amt);
    console.log("prodID in update function" + prodID);
    console.log("Updating an item...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [{
        stock_quantity: amt
      },
      {
          id: prodID
      }],

      function(err, results) {
        if (err) throw err;
        // for (var i = 0; i < results.length; i++) {
        //     console.log(results[i].product_name + " item updated!\n");

        // }
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
        "  Stock Quantity" + results[i].stock_quantity +
        "  Price: " + results[i].price + "\n"); 
        
    }
    console.log(chgArray);
    });

    // return array;           
}
// connection.end();