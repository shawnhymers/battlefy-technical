import { propTypes } from "react-bootstrap/esm/Image"
import {  Row, Col, Container,Button, Form} from 'react-bootstrap';
import { ChildProcess } from "child_process";
import lolItems from './items'
const StatsPage = (props:any)=>{

  return(
    <>
  <Row className='centered-children small-bottom-border fill-width'>

    <Col className='centered-children 'style={{padding:'3em'}}>
      <Row>
    {props.data.map((data:any)=>{
      return <StatsBlock component ={data.component}
                         value={data.value}
                         key={data.value+data.component}/>})}
     </Row>
    </Col>
  </Row>
    </>
  )
}
const StatsBlock =(props:any)=>{

  return(
    <>
        {props.component==='match_duration'?<MatchDuration duration={props.value}/>:null}
        {props.component==='match_type'?<MatchType type={props.value}/>:null}   
        {props.component==='KDA'?<KDA kda={props.value}/>:null}
        {props.component==='items_purchased'?<Items items={props.value}/>:null}
        {props.component==='champ_name'?<Champ champ={props.value}/>:null}
        {props.component==='player_name'?<Player player={props.value}/>:null}
        {props.component==='win'?<Win win={props.value}/>:null}
        {props.component==='champ_level'?<ChampLevel level={props.value}/>:null}
        {props.component==='item_ids'? <ItemsList items={props.value}/>:null}
        {props.component ==='perks'?<Perks perks={props.value}/>:null}
   </>
  )
}
 
const MatchDuration = (props:any) =>{
  const minutes = Math.floor(props.duration / 60);
  const seconds = props.duration - minutes * 60;
return(
  <>
    <p>Game duration:</p>
    <p>{minutes}</p>
    <p>Minutes</p>
    <p>{seconds}</p>
    <p>Seconds</p>
  </>
)
}

const MatchType=(props:any)=>{
  return(
    <>
      <p>Game type:</p>
      <p>{props.type}</p>
    </>
  )
}

const KDA=(props:any)=>{

  return(
    <>
      <p>KDA:</p>
      <p>Kills:</p>
      <p>{props.kda[0]}</p>
      <p>Deaths:</p>
      <p>{props.kda[1]}</p>
      <p>Assists:</p>
      <p>{props.kda[2]}</p>
    </>
  )
}

const Items=(props:any)=>{
  return(
    <>
      <p>Number of Items:</p>
      <p>{props.items}</p>
    </>
  )
}
const Champ=(props:any)=>{
  return(
    <>
      <p>Champ:</p>
      <p>{props.champ}</p>
    </>
  )
}

const Player=(props:any)=>{
  return(
    <>
      <p>Summoner:</p>
      <p>{props.player}</p>
    </>
  )
}

const Win=(props:any)=>{
  return(
    <>
      <p>Outcome:</p>
      {props.win?
      <p>Victory!</p>:
      <p>Defeat!</p>}
 
    </>
  )
}

const ChampLevel=(props:any)=>{
  return(
    <>
      <p>Champ Level:</p>
      <p>{props.level}</p>
    </>
  )
}

const Perks = (props:any)=>{
  return(
    <>
      <p>Perks:</p>
      <p>Defense:</p>
      <p>{props.perks.defense}</p>
      <p>Flex:</p>
      <p>{props.perks.flex}</p>
      <p>Offense:</p>
      <p>{props.perks.offense}</p>

    </>
  )
}
const ItemsList=(props:any)=>{
  
  return(
    <>
    <p>Items used:</p>
    {props.items.map((item:any, i:number)=>{
      return <ItemDisp itemId ={item}
                       key={i}/>})}
    </>
  )
}

const ItemDisp=(props:any)=>{

  const itemObj = lolItems.filter((el:any)=>{
    if(props.itemId==el.id){
        return true
    }
    return false
  })[0]
  return(
    <>
    {itemObj!=undefined?
      <p>{itemObj.name}</p>:null}
  </>
  )
}
export default StatsPage