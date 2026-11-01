const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 city:{type:String,required:true,trim:true,maxlength:80},
 country:{type:String,default:"",maxlength:5},
 searchedAt:{type:Date,default:Date.now}
});
schema.index({searchedAt:-1});
module.exports=mongoose.model("SearchHistory",schema);
