import InfoContractABI from "@/abis/InfoContract.json";
import { InfoContract, InfoContract__factory } from "@/types/ethers-contracts";
import { BrowserProvider } from "ethers";
// import { Contract } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = InfoContractABI.networks['5777'].address;

console.log('CONTRACT_ADDRESS: ', CONTRACT_ADDRESS);

const DappPage = () => {
  const [contract, setContract] = useState<InfoContract | null>(null);
  // const contractInstance = new Contract(
  //   CONTRACT_ADDRESS,
  //   InfoContractABI.abi,
  //   signer
  // ) as unknown as InfoContract;

  useEffect(() => {
    // 暂时先粗暴的签名，真实上线不能这么搞
    const provider = new BrowserProvider(window.ethereum);
    provider
      .getSigner()
      .then(signer => {
        const contractInstance = InfoContract__factory.connect(CONTRACT_ADDRESS, signer);
        setContract(contractInstance);
      })
      .catch(error => {
        console.log('Error connecting to contract:', error);
      });
  }, []);
  useEffect(() => {
    if (contract) {
      contract.setInfo("Helle DappTest!", 2);
    }
  }, [contract]);

  return (
    <>
      <h1>DappTest</h1>
    </>
  );
};
export default DappPage;