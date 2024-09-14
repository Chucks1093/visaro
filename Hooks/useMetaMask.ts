import { ethers, Contract } from "ethers";
import { useEffect, useState } from "react";
import ContractABI from "../src/Constants/ContractAbi";
import toast from "react-hot-toast";
import { useAppSelector } from "../src/redux/store";
import { selectCartTotalPrice } from "../src/redux/cart/cart.slice";

export const useMetaMask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState<Contract | null>(null);
  //   const [amount, setamount] = useState(0);

  const BASE_SEPOLIA_CHAIN_ID = "0x14A34";
  const CONTRACT_ADDRESS = "0x8aD3fA67Ad83D75242D6e821530711a267B9E200";
  const amount = useAppSelector(selectCartTotalPrice);

  useEffect(() => {
    if (account) {
      checkNetwork();
      initializeContract();
    }
  }, [account]);

  const checkNetwork = async () => {
    if (window.ethereum) {
      //THis variable checks if there exist metamask extension in a browser
      try {
        const chainId = await window?.ethereum.request({
          method: "eth_chainId",
        }); //This give use of access to the users account

        if (chainId !== BASE_SEPOLIA_CHAIN_ID) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: BASE_SEPOLIA_CHAIN_ID,
                      chainName: "Base Sepolia",
                      nativeCurrency: {
                        name: "Sepolia ETH",
                        symbol: "ETH",
                        decimals: 18,
                      },
                      rpcUrls: ["https://sepolia.base.org"],
                      blockExplorerUrls: ["https://sepolia.basescan.org"],
                    },
                  ],
                });
              } catch (addError) {
                console.error("Failed to add network:", addError);
                toast.error("Failed to add Base Sepolia network to MetaMask");
              }
            } else {
              console.error("Failed to switch network:", switchError);
              toast.error("Failed to switch to Base Sepolia network");
            }
          }
        }
      } catch (error) {
        console.error("Error checking network:", error);
        toast.error(
          "Error checking network. Please check your MetaMask connection."
        );
      }
    } else {
      console.error("MetaMask is not installed");
      toast.error(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      setIsConnecting(true);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        setIsOpen(false);
        toast.success("Wallet connected successfully");
      } catch (error) {
        console.error("Error connecting wallet:", error);
        toast.error("Failed to connect wallet. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast.error(
        "MetaMask is not installed. Please install it to use this feature."
      );
    }
  };

  const initializeContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const newContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI,
        signer
      );
      setContract(newContract);
    }
  };




  const handleDeposit = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      toast.error("Contract not initialized. Please connect your wallet.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      console.error("Invalid deposit amount");
      toast.error("Please enter a valid deposit amount.");
      return;
    }

    try {
      console.log("Attempting deposit of", amount, "ETH");
      const amountWei = ethers.parseEther(amount);

      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the signer
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();

      // Create a new instance of the contract with the signer
      // const contractWithSigner = contract.connect(signer);
      // Estimate gas
      const gasEstimate = await contract.deposit.estimateGas({
        value: amountWei,
      });
      console.log("Estimated gas:", gasEstimate.toString());

      // Calculate gas limit (120% of the estimate)
      // const gasLimit = gasEstimate.mul(120).div(100);

      // Send the transaction
      const tx = await contract.deposit({
        value: amountWei,
      });
      console.log("Transaction sent:", tx.hash);
      toast.success("Transaction sent. Waiting for confirmation...");

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt.transactionHash);
      toast.success("Deposit successful!", { position: "bottom-right" });

      // Reset deposit amount
    } catch (error: any) {
      console.error("Error during deposit:", error);
      if (error.reason) {
        toast.error("Deposit failed: " + error.reason);
      } else if (error.data && error.data.message) {
        toast.error("Deposit failed: " + error.data.message);
      } else {
        toast.error("Deposit failed. Check console for details.");
      }
    }
  };

  return {
    checkNetwork,
    connectToMetaMask,
    isOpen,
    account,
    initializeContract,
    handleDeposit,
    isConnecting,
  };
};
