import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createTweet , deleteTweet, likeOrdislike, getAllTweets, getUserTweets, getExploreTweets} from '../controllers/tweet.js';

const router = express.Router();

//Create Tweet
router.post('/',verifyToken, createTweet);

//Delete Tweet
router.delete('/:id',verifyToken, deleteTweet);

//Like and dislike a tweet
router.put('/:id/like', likeOrdislike);

//get timeline of the tweets
router.get('/timeline/:id', getAllTweets);

//get user tweet
router.get('/user/all/:id', getUserTweets);

//explore
router.get('/explore', getExploreTweets);


export default router;