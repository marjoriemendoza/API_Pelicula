import { User } from './../models/User.1';
import { Router } from "express";
import UserController from "../controllers/User.controller";
import bcrypt from 'bcrypt'
const salround =10;


const router = Router()
const user = UserController

router.get('/', user.listUsers)
router.post('/', user.createUser)
router.get('/:id', user.byIdUser)
router.put('/:id', user.updateUser)
router.delete('/:id', user.deleteUser)


export default router
