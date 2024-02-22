"use client";

import React, { useState } from "react";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import Minting from "./Minting";

const Crossmint: React.FC = () => {
  const [orderIdentifier, setOrderIdentifier] = useState<string | null>(null);

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  return (
    <>
      <div className="sm:col-span-3">
        {orderIdentifier === null ? (
          <CrossmintPaymentElement
            projectId={projectId}
            collectionId={collectionId}
            environment={environment}
            emailInputOptions={{
              show: true,
            }}
            mintConfig={{
              totalPrice: "0.01",
              _values: ["0"],
              _recipients: ["0x612090E9f03582eE20aB5466b87cd5f738044Ffe"],
              _referrers: ["0x0000000000000000000000000000000000000000"],
              _keyManagers: ["0x612090E9f03582eE20aB5466b87cd5f738044Ffe"],
              _data: ["0x612090E9f03582eE20aB5466b87cd5f738044Ffe"],
            }}
            onEvent={(event) => {
              switch (event.type) {
                case "payment:process.succeeded":
                  console.log(event);
                  setOrderIdentifier(event.payload.orderIdentifier);
                  break;
                default:
                  console.log(event);
                  break;
              }
            }}
          />
        ) : (
          <Minting orderIdentifier={orderIdentifier} />
        )}
      </div>
    </>
  );
};

export default Crossmint;
