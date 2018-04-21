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
    console.log("connected as id " + connection.threadId + "\n");
    
});
listItems();

function listItems() {
    console.log("Selecting all items...\n");
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].id + 
            "  Product Name: " + results[i].product_name +
            "  Price: " + results[i].price + "\n"); 

        }
    });
}

    
// function orderItem() {

//     inquirer.prompt([
                
//             {
//               type: "input",
//               name: "idReply",
//               message: "What is the ID of the product you want to buy?"
//             },
        
//             {
//                 type: "input",
//                 name: "amount",
//                 message: "How many do you want to buy?"
//             }
        
//             ]).then(function(id) {
//                 console.log("ID: " + id.idReply);
//                 console.log("Amount: " + id.amount);
//                 prodID = id.idReply;
//                 prodAmount = id.amount
        
//                 inquirer.prompt([
//                     {
//                         type: "confirm",
//                         name: "orderPlace",
//                         message: "Please confirm the order above?",
//                         default: false
//                     }
        
//                 ]).then(function(order) {
//                     getAmount(prodID, prodAmount);
//             });
    
//             function getAmount(idNum, amt) {
                
//                 // Log all results of the SELECT statement
//                 var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?";
//                 connection.query(query, { id: idNum }, function(err, results) {
//                     if (err) throw err;
//                     for (var i = 0; i < results.length; i++) {
//                         if (amt > results.stock_quantity) {
//                             console.log ("Insufficent quantity");
//                         } else {
//                             console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + " || Stock Quantity: " + results[i].stock_quantity);
//                         }
                        
//                     }
//                 });  
//             } 
//     });
// }

// orderItem();


// function updateProd(id, amt) {
//     console.log("Updating an item...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [{
//         id: id.id,
//         product_name: id.product_name,
//         stock_quantity: id.stock_quantity,
//       },
//       {
//           stock_quantity: amt
//       }],

//       function(err, results) {
//         if (err) throw err;
//         console.log(results.affectedRows + " item updated!\n");
//       }
//     );
// }
connection.end();