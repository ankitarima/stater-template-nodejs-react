import jwt from "jsonwebtoken";
import config from "@config/config";

/**
 * Creating JWT Token
 * @param object
 * @param keyName
 * @param options
 * @returns
 */
export const signJwt = (
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  let privateKey = "";
  if (keyName === "accessTokenPrivateKey") {
    privateKey = config.ACCESS_TOKEN_PRIVATE_KEY;
  } else {
    privateKey = config.REFRESH_PRIVATE_KEY;
  }

  try {
    /**
     * We are using RS256, which require a pair of public and private keys
     * Generate new keys: https://travistidwell.com/jsencrypt/demo/
     */
    return jwt.sign(object, config.ACCESS_TOKEN_PRIVATE_KEY, {
      ...(options && options),
      allowInsecureKeySizes: true,
      algorithm: "RS256",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * Verify JWT Token
 * @param token
 * @param keyName
 * @returns
 */
export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  let publicKey = "";

  if (keyName === "accessTokenPublicKey") {
    publicKey = config.ACCESS_TOKEN_PUBLIC_KEY;
  } else {
    publicKey = config.REFRESH_PUBLIC_KEY;
  }

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
