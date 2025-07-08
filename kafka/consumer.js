const { kafkaClient } = require("./");

const consumer = kafkaClient.consumer({ groupId: "kafka_test_group" });
let isConsumerConnected = false;

const connectConsumer = async () => {
  if (!isConsumerConnected) {
    await consumer.connect();
    isConsumerConnected = true;
    console.log("Consumer is connected...");
  }
};

const startConsumer = async () => {
  await connectConsumer();
  await consumer.subscribe({ topic: "test_topic", fromBeginning: false });
  await consumer.run({
    eachMessage: ({ topic, message }) => {
      console.log(
        `[KAFKA] - Received message on topic - ${topic}: `,
        JSON.parse(message.value.toString())
      );
    },
  });
};

module.exports = { startConsumer };
