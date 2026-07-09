import { signJwt } from "@services/jwt.service";

/**
 * Sign in Refresh Token
 * @param userId
 * @returns
 */
export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const refreshToken = signJwt(
    {
      session: userId,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
};

/**
 * Sign in Access Token
 * @param user
 * @returns
 */
export const signAccessToken = async (user: any) => {
  const accessToken = signJwt(user, "accessTokenPrivateKey", {
    expiresIn: "30d",
  });

  return accessToken;
};
