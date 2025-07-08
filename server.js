require("dotenv").config();

const express = require("express");
const { sendMessage, connectProducer } = require("./kafka/producer");
const { startConsumer } = require("./kafka/consumer");

const app = express();
startConsumer();

let i = 1;
const NO_OF_MSGS = 500;

app.get("/", async (req, res) => {
  res.write("<h1>Hello</h1>");

  await connectProducer();

  for (let k = i; k <= i + NO_OF_MSGS; k++) {
    sendMessage("test_topic", {
      key: `k-${k}`,
      value: JSON.stringify({
        mydata: `v-${k}`,
      }),
    });
  }

  res.write(`<strong>Sent messages for ${i} - ${i + NO_OF_MSGS} </strong>`);
  i += NO_OF_MSGS;

  return res.end();
});

app.listen(5000, () => {
  console.log("Server is running...");
});
