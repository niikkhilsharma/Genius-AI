import prisma from "./dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function updateRuntimeUsed(
  additionalRuntime: number,
  price: number,
) {
  const session = await getServerSession(authOptions);

  try {
    // Retrieve the profile record by ID
    const userProfile = await prisma.profile.findUnique({
      where: { email: session?.user?.email },
    });
    console.log(userProfile);

    if (!userProfile) {
      throw new Error("Profile not found");
    } else if (userProfile) {
      // Update the profile record with the new runtime used
      const updateUserProfile = await prisma.profile.update({
        where: { email: session?.user?.email },
        data: {
          runTimeUsed: Math.round(userProfile.runTimeUsed + additionalRuntime),
          apiCallCount: userProfile.apiCallCount + 1,
          totalAmountUsed:
            userProfile.totalAmountUsed + price * additionalRuntime,
        },
      });
      console.log(updateUserProfile);
    }
  } catch (error) {
    console.error("Error updating runtime used:", error);
  }
}
