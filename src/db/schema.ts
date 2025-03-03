import { pgTable, text, integer, timestamp, uuid, boolean, pgEnum } from 'drizzle-orm/pg-core';

// Define user impact level enum
export const impactLevelEnum = pgEnum('impact_level', ['NEWBIE', 'PRO', 'HERO', 'GUARDIAN']);

// User table schema
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    walletAddress: text('wallet_address').notNull().unique(),
    ensName: text('ens_name'),
    impactLevel: impactLevelEnum('impact_level').default('NEWBIE').notNull(),
    impactValue: integer('impact_value').default(1).notNull(),
    totalDcuPoints: integer('total_dcu_points').default(0).notNull(),
    dcuFromSubmissions: integer('dcu_from_submissions').default(0).notNull(),
    dcuFromReferrals: integer('dcu_from_referrals').default(0).notNull(),
    dcuFromStreaks: integer('dcu_from_streaks').default(0).notNull(),
    lastSignature: text('last_signature'),
    lastNonce: text('last_nonce'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Authentication sessions table
export const authSessions = pgTable('auth_sessions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    token: text('token').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    active: boolean('active').default(true).notNull(),
});

// Define relationships and types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type AuthSession = typeof authSessions.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert; 