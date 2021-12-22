import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x32E2D1C0440a11619cd817Cb330714587c7543d9",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "DinnerDAO Membership",
        description: "This NFT will give you access to DinnerDAO!",
        image: readFileSync("scripts/assets/dinnerdao.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
