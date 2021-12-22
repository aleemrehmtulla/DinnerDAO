import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// put your contract address here
const app = sdk.getAppModule("0x9346cfc2F9aAE39799702756678D8d36101efFd7");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // what we're calling it (like CryptoKitties)
      name: "DinnerDAO Membership",
      // quick description for opensea
      description: "Decentralize dinner decisions 🤟",
      // corresponding icon for opensea
      image: readFileSync("scripts/assets/dinnerdao.png"),
      // address for who gets paid when bought, set to 0x0 since it's free
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()