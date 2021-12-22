import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// imports .env file, DO NOT PUSH TO GIT!!!!
import dotenv from "dotenv";
dotenv.config();

// error checking .env
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("Ensure PRIVATE_KEY is in .env file")
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("Ensure ALCHEMY_API_URL is in .env file")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("Ensure WALLET_ADDRESS is in .env file")
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // remeber not to push private to git lol
    process.env.PRIVATE_KEY,
    // rpc provide | we're using alchemy
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
  ),
);

(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address is:", apps[0].address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})()

// exporting thirdweb sdk for us to use it elsewhere
export default sdk;