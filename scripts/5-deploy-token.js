import sdk from "./1-initialize-sdk.js";

// contract address (in file 1)
const app = sdk.getAppModule("0x9346cfc2F9aAE39799702756678D8d36101efFd7");

(async () => {
  try {
    // deploy erc20
    const tokenModule = await app.deployTokenModule({
      // token name "Ethereum"
      name: "DinnerDAO Voting Token",
      // symbol of the token ($ETH)
      symbol: "DinnerDAO",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();