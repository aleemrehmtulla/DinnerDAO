import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// governace contract address
const voteModule = sdk.getVoteModule(
    "0x00712369be05f35Db355f0912E8F3dfc08cF0D7d",
  );
  
  // erc20 contract address
  const tokenModule = sdk.getTokenModule(
    "0x4B07F617641304FdaAD8987bD425f1ab95aaB212",
  );
  
(async () => {


  try {
    const amount = 1000;
    const address = "0xEc089F77D84f930559B3Af949aEc3013b16874Fe"
    // create proposal to pay me
    await voteModule.propose(
      "Should we have steak for dinner?"
      ,
      [
        {
          // 0 eth sent
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // set as transfer
            "transfer",
            [
              address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create first proposal", error);
  }

  try {
    const amount = 1000;
    const address = "0xEc089F77D84f930559B3Af949aEc3013b16874Fe"
    // create proposal to pay me
    await voteModule.propose(
      "Should we have lasangna for dinner?"
      ,
      [
        {
          // 0 eth sent
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // set as transfer
            "transfer",
            [
              address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create first proposal", error);
  }


})();
