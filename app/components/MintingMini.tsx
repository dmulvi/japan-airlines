import React from "react";

import { useCrossmintEvents } from "@crossmint/client-sdk-react-ui";

interface MintingProps {
  orderIdentifier: string;
}

const Minting: React.FC<MintingProps> = ({ orderIdentifier }) => {
  const [status, setStatus] = React.useState<string>("pending"); // ["pending", "success", "failure"
  const [result, setResult] = React.useState<any>(null);
  const { listenToMintingEvents } = useCrossmintEvents({
    environment: "staging",
  });

  if (status === "pending") {
    // purposefully not using orderIdentifier here
    listenToMintingEvents({ orderIdentifier }, (event) => {
      switch (event.type) {
        case "transaction:fulfillment.succeeded":
          setStatus("success");
          setResult(event.payload);
          break;
        case "transaction:fulfillment.failed":
          setStatus("failure");
          break;
        default:
          break;
      }
      console.log(event.type, ":", event);
    });
  }

  return (
    <>
      <div className="text-black font-mono p-5 text-center">
        {status === "pending" && (
          <>
            <h3>Minting your NFT...</h3>
            <div className="loading-wrap">
              <div className="loading"></div>
            </div>
            This may take up to a few minutes
          </>
        )}
        {status === "success" && (
          <>
            <h3>NFT Minted Successfully!</h3>
            <a
              target="_blank"
              className="xmint-button"
              href={`https://staging.crossmint.com/user/collection/poly:${result?.contractAddress}:${result?.tokenIds[0]}`}
            >
              View in Crossmint
            </a>
          </>
        )}
        {status === "failure" && (
          <>
            <h3>Failed to Mint NFT</h3>
            <p>
              Something went wrong. You will be refunded if the mint cannot be
              fulfilled successfully.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Minting;
