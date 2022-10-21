import * as functions from "firebase-functions";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const REGION = "europe-west3";

const runCounterSync = async () => {
  console.log(`syncSweepstakePoints is running at ${Date.now()}`);
  const params = new URLSearchParams({
    apiKey: String(process.env.COUNTER_API_KEY),
  });
  const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/counters?${params}`,
      {method: "POST"},
  );
  console.log(
      `syncSweepstakePoints finished at ${Date.now()}`,
      {response: res.status}
  );
};

export const syncCounter = functions
    .region(REGION)
    .pubsub
    .schedule("55 * * * *")
    .timeZone("Europe/Madrid")
    .onRun(runCounterSync);
