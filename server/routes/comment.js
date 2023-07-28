const router = require('express').Router();
const Comment = require('../models/Comment');

// Comment CRUD
//CREATE
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Comment!
router.get('/', async (req, res) => {
    try {
        const comment = await Comment.find({});
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE Comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.username === req.body.username) {
            try {
                const updatedComment = await Comment.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedComment);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You can update only your Comment!');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



//DELETE Comment
router.delete('/:id', async (req, res) => {
    const commentId = req.params.id;
    const userId = req.body.userId;
    const commentIdsToDelete = req.body.commentIds;

    try {

    // commentIdsToDelete이 request body에 존재하면,여러개 comments들을 삭제.
 
        if (commenrIdsToDelete && Array.isArray(commentIdsToDelete)) {
            //삭제 전 모든 댓글이 존재하는지 확인
            const commentIdsToDelete = await Comment.find({
                _id: { $in: commentIdsToDelete },
                userId: userId,
            });

            if (commentIdsToDelete.length == commentIdsToDelete.length) {
                try {
                    //d여러개 댓글 삭제
                    await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });
                    res.status(200).json('Comments has been deleted successfully');
                } catch (err) {
                    res.status(500).json(err);
                }
             } else {
                res.status(401).json('You can delete only your Comments!');
             }
        } else {
      // commentIdsToDelete 이 존재하지 않으면, comment 하나를 삭제.
            try {
                const comment = await Comment.findById(commentId);
                if ( comment && comment.userId === userId ) {
            
                    try {
                        //댓글 하나 삭제
                        await comment.deleteOne(); 
                        res.status(200).json('Comment has been deleted successfully');
                        } catch (err) {
                        res.status(500).json(err);
                        }
                    } else {
                      res.status(401).json('You can delete only your Comment!');
                    }
                } catch (err) {
                  res.status(500).json(err);
                }
         }
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;