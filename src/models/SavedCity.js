const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true,maxlength:80},
 country:{type:String,default:"",maxlength:5},
 lat:{type:Number,required:true,min:-90,max:90},
 lon:{type:Number,required:true,min:-180,max:180},
 createdAt:{type:Date,default:Date.now}
});
schema.index({lat:1,lon:1},{unique:true});
module.exports=mongoose.model("SavedCity",schema);
