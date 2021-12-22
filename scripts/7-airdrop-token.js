import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// nft membership address
const bundleDropModule = sdk.getBundleDropModule(
  "0x32E2D1C0440a11619cd817Cb330714587c7543d9",
);

// erc20 contract address
const tokenModule = sdk.getTokenModule(
  "0x4B07F617641304FdaAD8987bD425f1ab95aaB212",
);

(async () => {
  try {
    // grab address of nft holders
    // 0 is coz that toke id of nft 
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
  
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }
    
    // loop through all nft holders
    const airdropTargets = walletAddresses.map((address) => {
      // set amount to airdop
      const amount = 1000;
      console.log("✅ Going to airdrop", amount, "tokens to", address);
      
      // set up the target
      const airdropTarget = {
        address,
        // rmbr 18 decimals
        amount: ethers.utils.parseUnits(amount.toString(), 18),
      };
  
      return airdropTarget;
    });
    
    // call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();