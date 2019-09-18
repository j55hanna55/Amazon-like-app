require("dotenv").config();
const keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var inStock = 0;
var totalPrice = 0;


/* Create the Connection to the DB */

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});


/*var connection = mysql.createConnection(keys.data);*/



 /*Connect to SQL server and SQL DB*/
connection.connect(function (err) {
    if (err) throw err;
    
    showProducts();
});
/* end Connection to the DB */




function showProducts() {
    connection.query('SELECT * FROM products', function(error, results, fields) {
        if (error) throw error;
        console.log('---------')
        console.log('---------')
        console.log('---------')
        console.log('---------ITEMS FOR SALE---------')
        console.table(results);
        console.log('---------')
        console.log('---------')
        console.log('---------')
        console.log('---------')

        start();
    });
}



function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw console.log("connection error:" + err);
    inquirer
        .prompt([
                {
                type: "list",
                message: "what do you want to do?",
                choices: ["continue", "quit"],
                name: "what_to_do"
            },
                {
                    name: 'selectId',
                    type: 'input',
                    message: 'Enter ITEM ID for product you wish to purchase:',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }

        },

                {
                    name: 'amountBought',
                    type: 'input',
                    message: 'How many would you like?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                   
                }
            ]).then (function (answers) {


                if (answers.what_to_do === 'quit') {
                    console.log(connection.end());
                }
                
                else{
                    var query = "SELECT * FROM products WHERE ?";
                    connection.query(query, {
                        id: answers.selectId
                    }, function (err, res) {


                        
                        var inStock = res[0].stock_quantity;
                        var itemBought = answers.amountBought;

                        if (inStock >= itemBought) {
                            var leftInStock = inStock - itemBought;
                            
                            
                            
                            var totalPrice = res[0].product_price * itemBought;
                            var itemPurchased = res[0].product_name;
                            
                            console.log(totalPrice + "  total price of items bought");
                            
                            connection.query(
                                "UPDATE products SET ? WHERE ?", [
                                    {
                                        stock_quantity: leftInStock
                                        
                                },
                                    {
                                        id: answers.selectId
                                }

                            ],
                                function (error) {
                                   
                                    if (error) throw err;
                                    console.table("==============================================");
                                    console.table("\n\r");
                                    console.table("Order details:");
                                    console.table("Item(s) purchased: " + itemPurchased);
                                    console.table("Quanity purchased: " + itemBought + " @ $" + res[0].product_price);
                                    console.table("Total Cost: $" + totalPrice);
                                    console.table("\n\r");
                                    console.table("-----THANK YOU FOR SHOPPING WITH US-----");
                                    console.table("==============================================");
                                    showProducts();

                                }
                            );
                        } else {
                            console.table("==============================================");
                            console.table("\n\r");
                            console.table("Not enough available, please choose a different quantity");
                            console.table("\n\r");
                            console.table("==============================================");
                           showProducts();

                        }

                        

                    });
                }

                
            
        
        });   
        });


    }












