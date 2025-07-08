const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  brokers: [process.env.KAFKA_BROKER],
  clientId: process.env.KAFKA_CLIENT_ID,
  ssl: {
    rejectUnauthorized: false,
  },
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});

module.exports = { kafkaClient };
