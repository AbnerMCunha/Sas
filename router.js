import {Router} from 'express';
const router = Router();
import { createUsersTable, insertUser, selectUserByName, selectUserByType, selectUserId, selectUsers, updateUser } from "./userController.js";

createUsersTable();

console.log("router");

router.get('/', (req,res)=>{ res.send( console.log({"statusCode":200 , message:`Bem Vindo a Raiz do SAS`}) )})
router.get('/user', selectUsers);
router.get('/user/:id', selectUserId);
router.get('/userName', selectUserByName);
router.get('/userType', selectUserByType);
router.post('/user', insertUser);
router.put('/user/:id', updateUser);

export default router;