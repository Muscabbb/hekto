import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || "https://my-elasticsearch-project-a38744.es.us-central1.gcp.elastic.cloud:443",
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY || "ejA5a1pKZ0JWWnlQQ1V4TUNtZTc6bUdWbVdTR2VEUDdvWGdtRDh1WkQwUQ==",
  },
});

export default client;
