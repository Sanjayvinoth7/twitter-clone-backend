import { handleError } from '../error.js';
import User from '../models/User.js';
import Tweet from '../models/Tweet.js';


export const getUser = async (req, res, next) => {

    try{
       const  user = await User.findById(req.params.id);
       res.status(200).json(user);
    } catch(err){
        next(err)
    }

};

export const update = async (req, res, next) => {
       if(req.params.id === req.user.id){
          try{
            const updatedUser =await User.findByIdAndUpdate(req.params.id,
                {
                $set : req.body,    
                },
                {
                 new : true,
                }
            );
            res.status(200).json(updatedUser);
          } catch (err) {
            next(err);
          }
          
       } else {
            return next(handleError(404,"you can only update your own account"))
       }
    
};

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id){
       try{
         await User.findByIdAndDelete(req.params.id);
         await Tweet.remove({userId : req.params.id});
         
         res.status(200).json('User deleted');
       } catch (err) {
         next(err);
       }
       
    } else {
         return next(handleError(404,"you can only delete your own account"))
    }
 
};

export const follow = async (req, res, next) => {
    
       try{
        
        //User
        const user = await User.findById(req.params.id);

        // Current User
        const currentUser = await User.findById(req.body.id);


        if(!user.followers.includes(req.body.id)){
            await user.updateOne({
                $push: {followers : req.body.id},
            });


            await currentUser.updateOne({$push: { following: req.params.id } });
        } else {
              res.status(403).json('you already follow this Id');
        }
              res.status(200).json('Following the Id')
         res.status(200).json('User deleted');
       }catch (err) {
         next(err);
       }
 
};


export const unfollow = async (req, res, next) => {
    
    try{
     
     //User
     const user = await User.findById(req.params.id);

     // Current User
     const currentUser = await User.findById(req.body.id);


     if(currentUser.followers.includes(req.params.id)){
         await user.updateOne({
             $pull: {followers : req.body.id},
         });


         await currentUser.updateOne({$pull: { following: req.params.id } });
     } else {
           res.status(403).json('you are not following this Id');
     }
           res.status(200).json('Unfollowing the id')
      res.status(200).json('User deleted');
    }catch (err) {
      next(err);
    }

};