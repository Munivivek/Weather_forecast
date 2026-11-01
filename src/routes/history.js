const router=require("express").Router();const History=require("../models/SearchHistory");
router.get("/",async(_req,res,next)=>{try{res.json(await History.find().sort({searchedAt:-1}).limit(12).lean());}catch(e){next(e);}});
router.delete("/",async(_req,res,next)=>{try{await History.deleteMany({});res.json({message:"History cleared"});}catch(e){next(e);}});
module.exports=router;
