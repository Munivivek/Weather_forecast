const BASE="https://api.openweathermap.org/data/2.5";
async function get(endpoint,params){
 const key=process.env.OPENWEATHER_API_KEY;
 if(!key||key==="your_openweather_api_key"){const e=new Error("Set OPENWEATHER_API_KEY in your .env file.");e.status=503;throw e;}
 const url=new URL(`${BASE}/${endpoint}`);
 Object.entries({...params,appid:key}).forEach(([k,v])=>url.searchParams.set(k,v));
 const response=await fetch(url);const data=await response.json().catch(()=>({}));
 if(!response.ok){const e=new Error(data.message||"Weather provider error");e.status=response.status===404?404:502;throw e;}
 return data;
}
async function lookup(params){
 const [current,forecast]=await Promise.all([get("weather",{...params,units:"metric"}),get("forecast",{...params,units:"metric"})]);
 return {current,forecast};
}
exports.city=city=>{city=String(city||"").trim();if(!city||city.length>80){const e=new Error("Enter a city name (maximum 80 characters).");e.status=400;throw e;}return lookup({q:city});};
exports.coords=(lat,lon)=>{lat=Number(lat);lon=Number(lon);if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat < -90||lat>90||lon < -180||lon>180){const e=new Error("Valid latitude and longitude are required.");e.status=400;throw e;}return lookup({lat,lon});};
