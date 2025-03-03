# DeCleanup Network Backend

Backend API for the DeCleanup Network application, providing wallet-based
authentication and dashboard data for users.

## Features

- Web3 wallet authentication (MetaMask, WalletConnect) using viem and wagmi
- JWT-based authentication for API requests
- User profile management with ENS name support
- Impact Product level tracking
- DCU points tracking from various sources (submissions, referrals, streaks)
- Dashboard data API

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [JWT](https://jwt.io/), [SIWE](https://login.xyz/)
- **Ethereum**: [viem](https://viem.sh/), [wagmi](https://wagmi.sh/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/decleanup
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=30d
   NODE_ENV=development
   ```

### Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE decleanup;
   ```

2. Generate migrations:
   ```bash
   bun generate
   ```

3. Run migrations:
   ```bash
   bun migrate
   ```

### Development

Start the development server:

```bash
bun dev
```

### Production

Build and start the production server:

```bash
bun build
bun start
```

## API Endpoints

### Authentication

- `POST /api/auth/nonce` - Request a nonce for wallet authentication
  - Request: `{ walletAddress: string }`
  - Response: `{ success: true, data: { nonce: string, message: string } }`

- `POST /api/auth/verify` - Verify wallet signature and login
  - Request: `{ walletAddress: string, signature: string, ensName?: string }`
  - Response: `{ success: true, data: { token: string, user: { ... } } }`

### Dashboard

- `GET /api/dashboard/data` - Get user dashboard data (requires authentication)
  - Response: `{ success: true, data: { ... } }`

## License

MIT

## 🔹 Overview

This repository contains the backend infrastructure for **DeCleanup Network**,
powering **Proof of Impact (PoI) submissions, reward allocation, leaderboard
tracking, and referral validation**.

The backend is designed for **scalability**, supporting **manual PoI
verification in Phase 1**, with a roadmap to transition into **decentralized,
on-chain validation, staking, and governance** in later phases.

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

✅ **User Authentication** – Wallet-based login with ENS support.\
✅ **PoI Submission System** – Image upload & geotag validation.\
✅ **Team Verification** – Team-based approval/rejection for PoI.\
✅ **Dynamic NFT Claim** – Claim-based Impact Product distribution.\
✅ **Leaderboard System** – Real-time ranking based on total $DCU, earned from
Impact Product levels (verified cleanup PoI), streaks & referrals.\
✅ **Chain Indexer Integration** – Events emitted to update blockchain
indexers.\
✅ **Gas Optimization** – Users cover gas fees.

---

## 🔄 Phase 2 – Decentralization & Expansion

🔹 **Decentralized Verification** – Smart contract-based validation by
verifiers.\
🔹 **Impact Circles & Group Cleanups** – Collaborative cleanups, build on
separate smart contracts with additional $DCU.\
🔹 **Staking System** – Lock $DCU for verifier roles & impact multipliers.\
🔹 **Modular API Design** – Expand without breaking existing logic.

---

## 🚀 Phase 3 – Scaling & Governance

🌍 **Cross-Chain Deployment** – Support build for EVM compatible L2s.\
🤖 **AI-Powered Verification** – Automate PoI validation using ML models.\
🏛 **DAO Governance** – Community-driven policy adjustments for rewards.\
📊 **Advanced Analytics API** – Track impact, trends & performance reports.

---

## ⚡ Scalability Considerations

✅ **Modular API Architecture** – Separate core functions into **auth, PoI,
rewards, leaderboard, and chain indexer** services.\
✅ **Event-Driven Design** – Use **WebSockets or message queues (RabbitMQ,
Kafka)** for efficient **real-time updates**.\
✅ **Database Optimization** – Index high-query fields (wallet, PoI status, DCU
Points) for faster lookups.\
✅ **API Versioning** – Maintain **backward compatibility** for future reward
models.\
✅ **Caching Strategy** – Use **Redis** for **leaderboard & frequently accessed
user data** to reduce DB load.

---

## 👨‍💻 Contributor Guidelines

- **Start with Phase 1 issues** before implementing **staking, verifications &
  cross-chain expansions**.
- Ensure **backend code remains modular** for seamless upgrades in **Phases 2 &
  3**.
- Focus on **gas efficiency & L2 compatibility** when designing reward and claim
  systems.
- Discuss API structure & optimizations via **GitHub Issues** before merging
  major changes.
