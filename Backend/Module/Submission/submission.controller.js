import Submission from "./submission.model.js"

export const getMySubmissions = async(req,res,next)=>{
    try {
        const {_id} = req.user

        const submissions = await Submission.find({
            createdBy:_id
        }).populate('tracks');

        res.status(200).json({
            status:'Success',
            message:'Successfully fetched',
            data:submissions
        })
    } catch (error) {
        next(error)
    }
}