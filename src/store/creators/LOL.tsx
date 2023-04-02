import axios from "axios";
import { updateLOLMatches } from "../features/LOL";

// This creator calls the api gateway endpoint that invokes a lambda function which puts the LOL stats together
export const getLOLStats = (data:any) => (dispatch:any) => {
  // This needs to be updated once the site is hosted
  let apiGateWayUrl=''
  // Calls our lambda function through apigateway endpoint
  axios.get(apiGateWayUrl,{params: data}).then(
        (res)=>{
          let stats={stats:res.data.stats}
          // If response is 200 update the state with the results
          if(res.status==200){
            dispatch(updateLOLMatches(stats))
          }
        })
}