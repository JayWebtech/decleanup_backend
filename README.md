## 🔹 Overview  
This repository contains the backend infrastructure for **DeCleanup Network**, powering **Proof of Impact (PoI) submissions, reward allocation, leaderboard tracking, and referral validation**.  

The backend is designed for **scalability**, supporting **manual PoI verification in Phase 1**, with a roadmap to transition into **decentralized, on-chain validation, staking, and governance** in later phases.  

---

## 🛠 Tech Stack  
- **Framework:** Node.js (Express.js)  
- **Language:** TypeScript  
- **Database:** MongoDB/PostgreSQL (TBD based on scalability needs)  
- **Web3 Integrations:** wagmi, viem, ethers.js  
- **Storage:** IPFS (for metadata & NFT storage)  
- **Authentication:** Web3 (MetaMask, WalletConnect)  

---

## 📌 Phase 1 – Current Development Focus 
✅ **User Authentication** – Wallet-based login with ENS support.  
✅ **PoI Submission System** – Image upload & geotag validation.  
✅ **Team Verification** – Team-based approval/rejection for PoI.  
✅ **Dynamic NFT Claim** – Claim-based Impact Product distribution.  
✅ **Leaderboard System** – Real-time ranking based on total $DCU, earned from Impact Product levels (verified cleanup PoI), streaks & referrals.  
✅ **Chain Indexer Integration** – Events emitted to update blockchain indexers.  
✅ **Gas Optimization** – Users cover gas fees. 

---

## 🔄 Phase 2 – Decentralization & Expansion  
🔹 **Decentralized Verification** – Smart contract-based validation by verifiers.  
🔹 **Impact Circles & Group Cleanups** – Collaborative cleanups, build on separate smart contracts with additional $DCU.  
🔹 **Staking System** – Lock $DCU for verifier roles & impact multipliers.  
🔹 **Modular API Design** – Expand without breaking existing logic.  

---

## 🚀 Phase 3 – Scaling & Governance  
🌍 **Cross-Chain Deployment** – Support build for EVM compatible L2s.   
🤖 **AI-Powered Verification** – Automate PoI validation using ML models.  
🏛 **DAO Governance** – Community-driven policy adjustments for rewards.  
📊 **Advanced Analytics API** – Track impact, trends & performance reports.  

---

## ⚡ Scalability Considerations  
✅ **Modular API Architecture** – Separate core functions into **auth, PoI, rewards, leaderboard, and chain indexer** services.  
✅ **Event-Driven Design** – Use **WebSockets or message queues (RabbitMQ, Kafka)** for efficient **real-time updates**.  
✅ **Database Optimization** – Index high-query fields (wallet, PoI status, DCU Points) for faster lookups.  
✅ **API Versioning** – Maintain **backward compatibility** for future reward models.  
✅ **Caching Strategy** – Use **Redis** for **leaderboard & frequently accessed user data** to reduce DB load.  

---

## 👨‍💻 Contributor Guidelines  
- **Start with Phase 1 issues** before implementing **staking, verifications & cross-chain expansions**.  
- Ensure **backend code remains modular** for seamless upgrades in **Phases 2 & 3**.  
- Focus on **gas efficiency & L2 compatibility** when designing reward and claim systems.  
- Discuss API structure & optimizations via **GitHub Issues** before merging major changes.

