import * as functions from "firebase-functions";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const REGION = "europe-west3";
const TIMEZONE = "Europe/Madrid";

const runCounterSync = async () => {
  console.log(`syncCounter is running at ${Date.now()}`);
  const params = new URLSearchParams({
    apiKey: String(process.env.COUNTER_API_KEY),
  });
  const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/counters?${params}`,
      {method: "POST"},
  );
  console.log(
      `syncCounter finished at ${Date.now()}`,
      {response: res.status}
  );
};

const runCreateRatings = async () => {
  console.log(`createRatings is running at ${Date.now()}`);
  const params = new URLSearchParams({
    apiKey: String(process.env.COUNTER_API_KEY),
  });
  const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/ratings?${params}`,
      {method: "POST"},
  );
  console.log(
      `createRatings finished at ${Date.now()}`,
      {response: res.status}
  );
};

// runs at 14, 17, 20 and 23 each day
export const syncCounter = functions
    .region(REGION)
    .pubsub
    .schedule("0 14,17,20,23 * * *")
    .timeZone(TIMEZONE)
    .onRun(runCounterSync);

// runs at 23:30 each day
export const createRatings = functions
    .region(REGION)
    .pubsub
    .schedule("30 23 * * *")
    .timeZone(TIMEZONE)
    .onRun(runCreateRatings);
