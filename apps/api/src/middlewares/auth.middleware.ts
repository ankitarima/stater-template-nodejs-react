import { NextFunction, Request, Response } from "express";
import asyncHandler from "@middlewares/async.middleware";
import ErrorResponse from "@utils/error.util";
import { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "@services/jwt.service";
import { db } from "@config/db";

/**
 * protect middleware to a authenticate user
 */
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Not authorized", 401));
    }

    try {
      //verify token
      const decoded = <JwtPayload>verifyJwt(token, "accessTokenPublicKey");

      if (!decoded) {
        return next(new ErrorResponse("Not authorized", 401));
      }

      const user = await db.adminUser.findFirst({
        where: {
          id: decoded["id"],
        },
      });

      /**
       * !important
       * session type is extended from Request in util.d.ts and included in tsconfig
       */
      req.session = user;

      next();
    } catch (err) {
      console.log("error", err);

      return next(new ErrorResponse("Not authorized", 401));
    }
  }
);

/**
 * RBAC authorize middleware
 * @param roles
 * @returns
 */
export const authorize = (...roles: string[]) => {
  //TODO: make it work with multiple roles
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.session.roles) && req.session.roles != "admin") {
      return next(
        new ErrorResponse(`${req.session.roles} is not authorized`, 401)
      );
    }

    next();
  };
};
