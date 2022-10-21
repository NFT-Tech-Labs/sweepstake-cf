import * as functions from "firebase-functions";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const REGION = "europe-west3";

export const syncSweepstakePoints = functions
    .region(REGION)
    .pubsub
    .schedule("30 * * * *")
    .timeZone("Europe/Madrid")
    .onRun(async () => {
      console.log(`syncSweepstakePoints is running at ${Date.now()}`);
      const res = await axios.post(
          `${process.env.API_BASE_URL}/api/v1/counters`,
          null,
          {
            params: {apiKey: process.env.COUNTER_API_KEY},
          }
      );
      console.log(
          `syncSweepstakePoints finished at ${Date.now()}`,
          {response: res.status}
      );
    });
