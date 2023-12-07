// Import the decision-tree module
var DecisionTree = require("decision-tree");
var fs = require("fs");

// Read the course dataset from the JSON file
var courseData = JSON.parse(fs.readFileSync("datasets/courseDatasets.json", "utf-8"));

// Setup Target Class used for prediction
var class_name = "course";

// Setup Features to be used by the decision tree
var features = ["prerequisite", "pass_status"];

// Create a decision tree and train the model
var dt = new DecisionTree(class_name, features);
dt.train(courseData);

// Predict class label for an instance
// var predicted_class = dt.predict({
//  prerequisite: "SSK3101",
//  pass_status: "false",
// });

//console.log("Predicted class:", predicted_class);
