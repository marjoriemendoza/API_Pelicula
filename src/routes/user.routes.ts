import { User } from './../models/User.1';
import { Router } from "express";
import UserController from "../controllers/User.controller";
import bcrypt from 'bcrypt'
// import { checkToken } from '../jwtvalidation/jwt.validation';



const router = Router()
const user = UserController

// router.get('/', checkToken, user.listUsers)
// router.post('/', checkToken, user.createUser)
// router.get('/:id', checkToken, user.byIdUser)
// router.put('/:id', checkToken, user.updateUser)
// router.delete('/:id',checkToken, user.deleteUser)

 router.post('/',  user.createUser)
 router.put('/:id',  user.updateUser)
 router.get('/',  user.listUsers)
 router.delete('/:id', user.deleteUser)
 router.get('/:id',  user.byIdUser)





export default router
