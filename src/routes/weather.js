const router=require("express").Router();
const service=require("../services/weatherService");
const History=require("../models/SearchHistory");
function shape({current,forecast}){
 const groups=new Map();
 for(const item of forecast.list){const day=new Date(item.dt*1000).toISOString().slice(0,10);if(!groups.has(day))groups.set(day,[]);groups.get(day).push(item);}
 const daily=[...groups.entries()].slice(0,5).map(([date,items])=>{const temps=items.map(x=>x.main.temp);const mid=items[Math.floor(items.length/2)];return {date,min:Math.min(...temps),max:Math.max(...temps),condition:mid.weather[0].description,icon:mid.weather[0].icon};});
 return {current:{city:current.name,country:current.sys.country,coordinates:current.coord,temperature:current.main.temp,feelsLike:current.main.feels_like,condition:current.weather[0].description,icon:current.weather[0].icon,humidity:current.main.humidity,pressure:current.main.pressure,windSpeed:current.wind.speed,visibility:current.visibility},hourly:forecast.list.slice(0,8).map(x=>({time:x.dt,temperature:x.main.temp,condition:x.weather[0].description,icon:x.weather[0].icon,precipitation:x.pop})),daily};
}
async function respond(p,res){const result=await p;const data=shape(result);await History.create({city:data.current.city,country:data.current.country});const keep=await History.find().sort({searchedAt:-1}).limit(12).distinct("_id");await History.deleteMany({_id:{$nin:keep}});res.json(data);}
router.get("/",async(req,res,next)=>{try{await respond(service.city(req.query.city),res);}catch(e){next(e);}});
router.get("/coordinates",async(req,res,next)=>{try{await respond(service.coords(req.query.lat,req.query.lon),res);}catch(e){next(e);}});
module.exports=router;
