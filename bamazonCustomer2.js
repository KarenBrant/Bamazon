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


var productArr = [];

productArr = listItems();

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to buy?",
        choices: 
    })
    .then(function(answer) {
    });
} 
connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < results.length; i++) {
        array.push("ID: " + results[i].id + 
        "  Product Name: " + results[i].product_name +
        "  Price: " + results[i].price + "\n"); 
        
    }          
});

runSearch();
//   function artistSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT position, song, year FROM top5000 WHERE ?";
//         connection.query(query, { artist: answer.artist }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }
  
//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }
  