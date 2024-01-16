import React from 'react';
import Image from "next/image";

const Pending: React.FC = () => {
  return (
    <>
      <h3>Minting your NFT...</h3>
      <Image
        src="/assets/sphere.gif"
        width={256}
        height={256}
        className="shrink mx-auto mt-10"
        alt="processing animation"
      />
      This may take up to a few minutes
    </>
  );
}

export default Pending;