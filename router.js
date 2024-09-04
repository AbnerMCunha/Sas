import {Router} from 'express';
const router = Router();
import { createUsersTable, insertUser, selectUserByName, selectUserByType, selectUserId, selectUsers, updateUser } from "./userController.js";
import { createMessageCategoryTable, insertMessageCategory, selectMessageCategory, selectMessageCategoryByText, selectMessageCategoryById, updateMessageCategory } from "./messageCategoryController.js";
import { createMessageTable, insertMessage, selectMessage, selectMessageByText, selectMessageById, updateMessage } from "./messageController.js";

createUsersTable();
createMessageCategoryTable();
createMessageTable();

router.get('/', (req,res)=>{ res.send( console.log({"statusCode":200 , message:`Bem Vindo a Raiz do SAS`}) )})

// Rotas de Usuarios
router.get('/user', selectUsers);
router.get('/user/:id', selectUserId);
router.get('/userName', selectUserByName);
router.get('/userType', selectUserByType);
router.post('/user', insertUser);
router.put('/user/:id', updateUser);

// Rotas de Categorias de Mensagens
router.get('/MessageCategory', selectMessageCategory);
router.get('/MessageCategory/:id', selectMessageCategoryById);
router.get('/MessageCategoryText', selectMessageCategoryByText);
router.post('/MessageCategory', insertMessageCategory);
router.put('/MessageCategory/:id', updateMessageCategory);

// Rotas de Categorias de Mensagens
router.get('/Message', selectMessage);
router.get('/Message/:id', selectMessageById);
router.get('/MessageText', selectMessageByText);
router.post('/Message', insertMessage);
router.put('/Message/:id', updateMessage);

export default router;