// Loading the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Setting the region and endpoint
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

// Creating DynamoDB service object w/ latest LTS
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Create parameters for the table
const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },  // Partition key
        { AttributeName: "createdAt", KeyType: "RANGE" }  // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" }, // String
        { AttributeName: "createdAt", AttributeType: "N" } // Number
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});