import { Router } from 'express';
const router = Router();
import { postItem, getItems, updateItem, deleteItem } from '../controller/itemController.js';
import protect from '../middleware/authMiddleware.js'


router
.route('/')
.post(protect, postItem)
.get(getItems);


router
.route('/:id')
.delete(protect, deleteItem)
.put(protect, updateItem);



export default router;