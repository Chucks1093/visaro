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

  const BASE_MAINNET_CHAIN_ID = "0x2105";
  const CONTRACT_ADDRESS = "0x0b5c0017B8ca9300E51710Dc1160879d9fD77587";
  const amount = useAppSelector(selectCartTotalPrice);

  useEffect(() => {
    if (account) {
      checkNetwork();
      initializeContract();
    }
  }, [account]);

  const checkNetwork = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window?.ethereum.request({
          method: "eth_chainId",
        });

        if (chainId !== BASE_MAINNET_CHAIN_ID) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: BASE_MAINNET_CHAIN_ID }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: BASE_MAINNET_CHAIN_ID,
                      chainName: "Base Mainnet",
                      nativeCurrency: {
                        name: "Ethereum",
                        symbol: "ETH",
                        decimals: 18,
                      },
                      rpcUrls: ["https://mainnet.base.org"],
                      blockExplorerUrls: ["https://basescan.org/"],
                    },
                  ],
                });
              } catch (addError) {
                console.error("Failed to add network:", addError);
                toast.error("Failed to add Base Mainnet network to MetaMask");
              }
            } else {
              console.error("Failed to switch network:", switchError);
              toast.error("Failed to switch to Base Mainnet network");
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

      if (error.code === 8453) {
        toast.error("You rejected the transaction.");
      }

      if (error.reason) {
        toast.error("Deposit failed: " + error.reason);
      } else if (error.data && error.data.message) {
        toast.error("Deposit failed: " + error.data.message);
      } else {
        toast.error("Deposit failed. Insufficient funds.");
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
