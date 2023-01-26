import  express  from "express";
import {getUser, update, deleteUser, follow, unfollow} from "../controllers/user.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();


//Update user
router.put('/:id',verifyToken, update );

//Get user
router.get('/find/:id',getUser);

//Delete user
router.delete('/:id' ,verifyToken, deleteUser);

//Follow 
router.put('/follow/:id' ,verifyToken, follow);

//unfollow
router.put('/unfollow/:id' ,verifyToken, unfollow);

export default router;