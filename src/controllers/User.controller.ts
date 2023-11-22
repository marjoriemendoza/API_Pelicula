import { User } from './../models/User.1';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { error } from "console";
import { paginate } from '../pagination';
const salround = 10;
class UserController {
  //List
  static listUsers = async (req: Request, res: Response) => {
    const repoUsers = AppDataSource.getRepository(User);

    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.per_page as string) || 10;

      const paginatedResult = await paginate(repoUsers, page, perPage, { state: true });

      return paginatedResult.data.length > 0
        ? res.json({ ...paginatedResult, ok: true })
        : res.json({ ok: false, message: 'Not found' });
    } catch (e) {
      return res.json({
        ok: false,
        msg: `ERROR => ${e}`,
      });
    }
  };

  //CREATE
  static createUser = async (req: Request, res: Response) => {
    const {name, email, password } = req.body;
    const repoUsers = AppDataSource.getRepository(User);

    try {
      const userExist = await repoUsers.findOne({ where: { email } });
      if (userExist) {
        return res.json({ ok: false, msg: `Email '${email}' already exists` });
      }
      const users = new User();
      users.name = name;
      users.email = email;
      users.password = password;
      users.hashPassword();
      const savedUser = await repoUsers.save(users);
      savedUser.password = undefined;

      await repoUsers.save(users);
      return res.json({
        ok: true,
        msg: "User WAS CREATE",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: ` ERROR => ${e}`,
      });
    }
  };

  //UPDATE
  static updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {name, email, password } = req.body;
    const repoUsers = AppDataSource.getRepository(User);
    let users: User;
    try {
      users = await repoUsers.findOne({
        where: { id, state: true },
      });
      if (!users) {
        throw new Error("User dont exist in data base");
      }
      users.name = name;
      users.email = email;
      users.password = password;
      await repoUsers.save(users);
      return res.json({
        ok: true,
        msg: "User was update",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: "Server error",
      });
    }
  };

  //SEARCH BYID
  static byIdUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoUser = AppDataSource.getRepository(User);
    try {
      const user = await repoUser.findOne({
        where: { id, state: true },
      });
      return user
        ? res.json({ ok: true, user, msg: "success" })
        : res.json({ ok: false, msg: "The id dont exist" });
    } catch (e) {
      return res.json({
        ok: false,
        msg: "Server error",
      });
    }
  };

  //DELETE
  static deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const repoUser = AppDataSource.getRepository(User);

    try {
      const user = await repoUser.findOne({
        where: { id, state: true },
      });

      if (!user) {
        throw new Error("User DONT EXIST IN DATA BASE");
      }
      user.state = false;
      await repoUser.save(user);
      return res.json({
        ok: true,
        msg: "User WAS DELETE",
      });
    } catch (e) {
      return res.json({
        ok: false,
        msg: `SERVER ERROR => ${e}`,
      });
    }
  };
}
export default UserController;
