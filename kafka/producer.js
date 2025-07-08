const { kafkaClient } = require("./");

const producer = kafkaClient.producer();
let isProducerConnected = false;

const connectProducer = async () => {
  if (!isProducerConnected) {
    await producer.connect();
    isProducerConnected = true;
    console.log("Kafka producer is connected...");
  }
};

const sendMessage = async (topic, payload) => {
  if (!isProducerConnected) {
    console.log("Can't send message, producer is not connected");
  }
  await producer.send({
    topic,
    messages: [payload],
  });
};

module.exports = { connectProducer, sendMessage };
