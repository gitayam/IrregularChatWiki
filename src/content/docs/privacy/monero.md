---
title: "Monero"
---

# Monero

Monero (XMR) is a secure, private, and untraceable cryptocurrency that allows users to make anonymous transactions. Unlike many cryptocurrencies that are derivatives of Bitcoin, Monero is based on the CryptoNote protocol and possesses significant algorithmic differences related to blockchain obfuscation.

## Monero vs Other Cryptocurrencies

Monero distinguishes itself from other cryptocurrencies like Bitcoin through enhanced privacy features. While Bitcoin transactions are transparent and traceable on the blockchain, Monero uses stealth addresses and ring signatures to obscure the sender's identity, making it a preferred choice for users prioritizing privacy.

## Buying Monero

Buying Monero (XMR) involves a few key steps to ensure both security and ease of transaction. Unlike more mainstream cryptocurrencies, Monero's focus on privacy sometimes means it can be a bit more complex to purchase. Here's how you can buy Monero safely:

### Choose a Reliable Exchange

Not all cryptocurrency exchanges offer Monero due to its privacy features. Here are a few reputable exchanges where you can purchase Monero:

- **Kraken**: Offers direct purchases of Monero with fiat currencies like USD and EUR.
- **Binance**: Provides options to trade Monero against other cryptocurrencies.
- **LocalMonero**: A peer-to-peer platform that allows users to buy Monero directly from sellers using various payment methods.

### Set Up a Monero Wallet

Before purchasing Monero, set up a secure wallet to store your XMR. This ensures that you retain full control over your coins following the purchase. Refer to the [Wallet Guide](https://www.getmonero.org/resources/user-guides/securely_purchase.html) for detailed instructions on setting up your wallet.

Download the wallet and extract:

```bash
# Extract tar archive
tar -xvjf filename.tar.bz2

# Move into directory
mv monero-gui-* ~/monero/

# Run the AppImage
./monero-wallet-gui.AppImage
```

### Purchase Process

1. **Register and Verify Your Account**: Sign up at your chosen exchange and complete any necessary identity verification processes.
2. **Deposit Funds**: Transfer fiat or cryptocurrencies into your exchange account. You can use bank transfers, credit cards, or other cryptocurrencies depending on your location and the exchange.
3. **Buy Monero**: Navigate to the XMR trading section of the exchange and place an order to buy XMR at either a specified limit price or the current market price.

### Transfer Monero to Your Wallet

After purchasing Monero, transfer it from the exchange to your private Monero wallet. It is advisable to do this immediately to avoid the risk of hacking or exchange outages affecting your investment.

```bash
# Example of transferring Monero to your wallet
wallet-cli --wallet-address 'YourMoneroAddressHere' --tx-amount 'AmountOfXMRtoTransfer'
```

### Secure Your Purchase

- **Backup Your Wallet**: Ensure you have reliable backups of your wallet data.
- **Keep Your Private Keys Secure**: Never share your private keys or wallet seed with anyone.
- **Enable Two-Factor Authentication (2FA)**: For additional security, enable 2FA on any platform involved in your Monero transactions.

## Mining Monero

Monero mining can be performed using CPUs and GPUs, though it is optimized for consumer-grade hardware, making it accessible for individual miners. For detailed guidance on GPU mining, visit [How to Mine Monero with GPU](https://www.monero.how/how-to-mine-monero-with-gpu).

### Solo vs. Pooled Mining

- **Solo Mining**: This involves mining alone, where the rewards are entirely yours if you discover a block. However, the chances of solving a block alone can be lower, depending on your hardware's capabilities.
- **Pooled Mining**: By joining a mining pool, you combine your hash power with others, increasing the chances of earning mining rewards, though you will share these rewards with other pool members. Pooled mining is recommended for most users due to its consistent payout structure.

### How Much Could I Earn?

Use this [Mining Calculator](https://www.monero.how/monero-mining-calculator) to estimate potential earnings based on your hardware's hash rate and network conditions.

## Mining Setup Guide

### Prerequisites

To begin mining Monero, you'll need:

- **MONERO_POOL_ADDRESS**: Choose a mining pool from trusted sources and obtain the pool address.
- **MONERO_WALLET_ADDRESS**: Securely create a Monero wallet at [getmonero.org](https://www.getmonero.org/resources/user-guides/securely_purchase.html). Also, consider setting up a [view-only wallet](https://www.getmonero.org/resources/user-guides/view_only.html).

### Install Ubuntu on the System

1. Download the [Ubuntu ISO](https://ubuntu.com/download).
2. Use the [Flash Guide](/general/booting-os-from-usb) to create a bootable USB drive and install Ubuntu on your system.

### Download and Install the CUDA Toolkit

1. Download the CUDA Toolkit for Ubuntu from the [official site](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_local).
2. Move the downloaded toolkit to the `/tmp` directory.
3. Complete the instructions from the NVIDIA page:

```bash
# Commands from NVIDIA website (as of 2024-04-21)
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.4.1/local_installers/cuda-repo-ubuntu2204-12-4-local_12.4.1-550.54.15-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-4-local_12.4.1-550.54.15-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-4-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-4
```

### Download Drivers

Search for "Additional Drivers" in Ubuntu and ensure that your NVIDIA driver is installed and up to date.

### Install xmr-stak Mining Software

```bash
# Setup system and install dependencies
sudo apt install sudo
sudo apt update
sudo apt install -y git curl

# Install xmr-stak (supports both CPU and/or GPU mining)
sudo apt install libmicrohttpd-dev libssl-dev cmake build-essential libhwloc-dev -y
git clone https://github.com/fireice-uk/xmr-stak.git
mkdir xmr-stak/build
cd xmr-stak/build
cmake ..
make install

# Configure xmr-stak
cd ./bin
./xmr-stak
```

:::caution[Known Issue]
`make install` compilation may fail due to invalid conversion. See [xmr-stak issue #2731](https://github.com/fireice-uk/xmr-stak/issues/2731) for updates.
:::

### Enable Both GPU and CPU Mining

```bash
# To use both CPU and GPU mining, enable hugepages
sudo sysctl -w vm.nr_hugepages=128
echo "* soft memlock 262144" | sudo tee -a /etc/security/limits.conf
echo "* hard memlock 262144" | sudo tee -a /etc/security/limits.conf

# Run the miner
./xmr-stak
```
