import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  // Try to get the stats for the requested game
  try {
    // Getting game name from request
    const game = event?.queryStringParameters?.game
    // This switch case chain call a function for the requested game
    // All functions return an array of stats in similar format
    switch(game) { 
        // Leauge of Legends
        case "LOL": { 
          // Getting the match limit and summoner from the request
          const limit = event?.queryStringParameters?.matchLimit
          const summoner = event?.queryStringParameters?.summoner
            // If the inputs are defined- run the get stats function
            if (summoner !== undefined && limit!==undefined){
                let stats= await getLOLStats(summoner,limit)
                // Sedning back results
                return ({
                    statusCode: 200,
                    body: JSON.stringify({stats})
                })
            }
            // Sending back error if the inputs are bad
            else{
                return ({
                    statusCode: 500,
                    body: 'Inputs are undefined'
                })
            }
        } 
        // This is here as a sample of how other functions would be called
        case "Fifa": { 
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'fifa stats',
                }),
            };
        } 
        // If the game didn't match any case-- return a message saying we dont have that game
        default: { 
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'dont have that game yet!',
                }),
            };
        } 
     } 
  }
//  Error catch-- needs better handling
 catch (err) {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'some error happened',
        }),
      };
    }
  };

// This function calls the riot api and puts together some leauge of legends stats
let getLOLStats = async function(summoner:string|undefined,limit:string|undefined){

  const axios = require('axios');

    // Defining api key from env variables
    let api_key=process.env.api_key

    // Getting the summoner to get their ID
    let summonerUrl='https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+summoner+'?api_key='+api_key
    let res = await axios.get(summonerUrl)

    // Getting list of match ids of recent matches
    let matchListUrl:string = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/'+res.data.puuid+'/ids?start=0&count='+limit+'&api_key='+api_key
    let matchListRes = await axios.get(matchListUrl)

  //  Creating a url for each match
    let matchUrlsList:any=[]
    await matchListRes.data.forEach((matchId:string) => {
      var matchUrl ='https://americas.api.riotgames.com/lol/match/v5/matches/'+matchId+'?api_key='+api_key
      matchUrlsList.push(matchUrl)
    });
    
    // Calling api for each match
    let matchList = await axios.all(matchUrlsList.map((url:string) => axios.get(url)))
    
    // Looping over all the match data to build out just want needs to be sent to front end
    let stats:any=[]
    await matchList.forEach((match:any)=>{

      // Getting the participant dto for just our summoner
      const rightParticipant = match.data.info.participants.filter((el:any)=>{
        if(el.summonerName.toLowerCase()==summoner){
            return true
          }
          return false
      })[0]

      // Compiling data
      // Component value determines what component to use on front end
      // Value has the info for the stat
      var data=[
        {
          component:'match_duration',
          value:match.data.info.gameDuration,
        },
        {
          component:'match_type',
          value:match.data.info.gameType
        },
        {
          component:'KDA',
          value:[rightParticipant.kills,rightParticipant.deaths,rightParticipant.assists]
        },
        {
          component:'items_purchased',
          value:rightParticipant.itemsPurchased
        },
        {
          component:'champ_name',
          value:rightParticipant.championName
        },
        {
          component:'player_name',
          value:rightParticipant.summonerName
        },
        {
          component:'win',
          value:rightParticipant.win
        },
        {
          component:'champ_level',
          value:rightParticipant.champLevel
        },
        {
          component:'item_ids',
          value:[rightParticipant.item0,rightParticipant.item1,rightParticipant.item2,
                 rightParticipant.item3,rightParticipant.item4,rightParticipant.item5,
                 rightParticipant.item6]
        },
        {
          component:'perks',
          value:rightParticipant.perks.statPerks
        }
      ]
      // Adding data to the collector array
      stats.push(data)
    })
  // Returning stats
  return (stats)
  }  
