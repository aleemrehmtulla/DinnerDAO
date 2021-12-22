import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  "0x4B07F617641304FdaAD8987bD425f1ab95aaB212",
);

(async () => {
  try {
    // max supply of the token
    const amount = 420_690_000;
    // set decimal
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // mint tokens
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    // print circulation
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$DinnerDAO in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();