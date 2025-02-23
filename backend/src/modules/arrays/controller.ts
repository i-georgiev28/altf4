import { NextFunction, Request, Response } from "express";
import { ArraysService } from "./service";
import { ForbiddenException, NotFoundException } from "../../utils";
import { User, UsersService } from "../users";
import { Array } from "./types";

export class ArraysController {
  static async index(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.userId ? +req.query.userId : undefined;

    const arrays = await ArraysService.index({ userId });

    res.json(arrays);
  }

  static async show(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;

    const array = await ArraysService.show(id);

    res.json(array);
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    const payload = { data: "", ...req.body };
    const userId = req.user!.id;

    const array = await ArraysService.store({ ...payload, userId });

    res.json(array);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    console.log("Called update");

    const arrayId = +req.params.id;
    const userId = req.user!.id;

    await checkIfAllowedToModify(userId, arrayId);

    const payload = req.body;
    const updatedArray = await ArraysService.update(arrayId, payload);

    console.log("Updated array:", updatedArray);

    res.json(updatedArray);
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    const arrayId = +req.params.id;
    const userId = req.user!.id;

    await checkIfAllowedToModify(userId, arrayId);

    const isDeleted = await ArraysService.destroy(arrayId);

    if (!isDeleted) {
      throw new NotFoundException("Array not found");
    }

    res.json({ message: "Array deleted" });
  }
}

async function checkIfAllowedToModify(userId: number, arrayId: number) {
  const [user, array]: [User, Array] = await Promise.all([
    UsersService.show(userId),
    ArraysService.show(arrayId),
  ]);

  const allowed = user.id === array.userId;

  if (!allowed) {
    throw new ForbiddenException();
  }
}
