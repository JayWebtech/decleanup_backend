import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

function getImpactLevel(level: number): "NEWBIE" | "PRO" | "HERO" | "GUARDIAN" {
  if (level <= 3) return "NEWBIE";
  if (level <= 6) return "PRO";
  if (level <= 9) return "HERO";
  return "GUARDIAN";
}

function getCongratulatoryMessage(level: number): string {
  if (level === 1) {
    return "Congratulations! You've just received the first level of DeCleanup Impact Product. Come back for more! Share your referral with friends and earn more DCU Points.";
  } else if (level === 10) {
    return "Congratulations! You've successfully completed all levels of DeCleanup journey at this phase! Stay updated for new level updates.";
  } else {
    return "Congratulations! You've just upgraded to a higher level of DeCleanup Impact Product. Come back for more!";
  }
}

export const claimReward = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { impactLevel } = req.body;

    if (!userId || !impactLevel) {
      res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
      return;
    }

    const level = parseInt(impactLevel);
    if (isNaN(level) || level < 1 || level > 10) {
      res.status(400).json({
        success: false,
        message: "Invalid impact level. Must be between 1 and 10.",
      });
      return;
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const hasTwitter = !!user.twitterHandle;

    await db
      .update(users)
      .set({
        impactLevel: getImpactLevel(level),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    const congratulatoryMessage = getCongratulatoryMessage(level);

    res.status(200).json({
      success: true,
      data: {
        numericLevel: level,
        impactLevel: getImpactLevel(level),
        shouldConnectTwitter: !hasTwitter,
        twitterShareUrl: hasTwitter ? `/api/social/share-x` : null,
        message: congratulatoryMessage,
      },
    });
  } catch (error) {
    console.error("Error claiming reward:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
