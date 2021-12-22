import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// governace contract address
const voteModule = sdk.getVoteModule(
  "0xf3a19A636055aBAA7bB14b79284A426651Dd7304",
);

// erc20 contract address
const tokenModule = sdk.getTokenModule(
  "0x4B07F617641304FdaAD8987bD425f1ab95aaB212",
);

(async () => {
  try {
    // give treasuary perms to mint
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // see how much $DINNERDAO creator owns
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // figure out how much 90% is
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // transfer 90% to the dao
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();