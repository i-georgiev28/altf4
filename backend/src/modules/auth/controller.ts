import { NextFunction, Request, Response } from "express";
import { Users } from "../../database";
import { AuthService } from "./service";
import { UsersService } from "../users";
import { RtPayload } from "./types";
import { BadRequestException } from "../../utils";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const lang = req.acceptsLanguages()[0].replace("*", "") || "en";

    const email = req.body.email.toLocaleLowerCase(lang);

    const existingUser = await Users().where("email", email).first();

    if (existingUser) {
      throw new BadRequestException("Email already taken");
    }

    const user = await UsersService.store(req.body, lang);

    const { accessToken, refreshToken } = await AuthService.generateAuthTokens(
      user
    );

    const response = {
      user,
      accessToken,
      refreshToken,
    };

    res.json(response);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const user = req.user!;
    const { accessToken, refreshToken } = await AuthService.generateAuthTokens(
      user
    );
    const response = {
      user,
      accessToken,
      refreshToken,
    };

    res.json(response);
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    res.json(user);
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    const user = req.user!;
    const rtPayload: RtPayload = (req as any).jwtPayload;

    const { accessToken, refreshToken } = await AuthService.generateAuthTokens(
      user,
      rtPayload
    );

    res.json({ user, accessToken, refreshToken });
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    const rtPayload: RtPayload = (req as any).jwtPayload;

    await AuthService.revokeRefreshToken(rtPayload.jti);

    res.json({ message: "Logged out" });
  }

  static async logoutAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user!;

    const revokedTokensCount = await AuthService.revokeAllRefreshTokensOfUser(
      user.id
    );

    if (revokedTokensCount === 0) {
      throw new BadRequestException("No active sessions to logout");
    }

    res.json({ message: "Logged out all sessions" });
  }
}
