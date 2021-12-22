import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
  "0x9346cfc2F9aAE39799702756678D8d36101efFd7",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // Give your governance contract a name.
      name: "DinnerDAO Voting Contract",

      // This is the location of our governance token, our ERC-20 contract!
      votingTokenAddress: "0x4B07F617641304FdaAD8987bD425f1ab95aaB212",

    // set delay from deploy to time when they can deploy
    // 0, once its up u can immediatly vote
      proposalStartWaitTimeInSeconds: 0,

      // how long can you vote before closing?
      proposalVotingTimeInSeconds: 300,

      
      votingQuorumFraction: 0,

      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
