import React from 'react';

interface SuccessProps {
  contractAddress: string;
  tokenIds: string[];
  txId: string;
}

const Success: React.FC<SuccessProps> = ({ contractAddress, tokenIds, txId }) => {
  return (
    <>
      <h3>NFT Minted Successfully!</h3>
      <div className="mt-10">
        <a target="_blank" className="block bg-[#2081e2] rounded-lg mt-3 p-3 text-white" 
          href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenIds[0]}`}>
          View on OpenSea
        </a>
        <a target="_blank" className="block bg-[#663399] rounded-lg mt-3 p-3 text-white" 
          href={`https://mumbai.polygonscan.com/tx/${txId}`}>
          View on Polygonscan
        </a>
        <a target="_blank" className="block bg-[#81feab] rounded-lg mt-3 p-3 text-black" 
          href={`https://staging.crossmint.com/user/collection/poly:${contractAddress}:${tokenIds[0]}`}>
          View in Crossmint
        </a>
      </div>
    </>
  );
}

export default Success;