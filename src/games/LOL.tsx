import React from "react";
import {useSelector, useDispatch } from "react-redux";
import {  Button, Form} from 'react-bootstrap';
import type { RootState } from '../store/store'
import {AppDispatch} from "../store/store"
import {updateLOLMatches} from "../store/features/LOL"
import StatsPage from "../statsPage"
import { getLOLStats } from "../store/creators/LOL";

const LOL = () => {

  const dispatch: AppDispatch = useDispatch()

  // Getting state from redux-- stats from backend will be available here after search
  const LOLMatches = useSelector((state: RootState) => state.LOL)
  
  // handles form submit- collects input calls lambda and then updates state
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // Getting summoner name from form
    const target = e.target as typeof e.target & {
      summoner: { value: string };
    };
    const summoner = target.summoner.value;
    // Compiling data to query back end
    let data={summoner:summoner,
              matchLimit:5,
              game:"LOL"}
    // Dispatching update-- will query back end and update global state
    dispatch(getLOLStats(data))
  }
  return(
      <>      
      <Form onSubmit={handleSubmit} >
        <Form.Control size="lg" type="text" placeholder="Summoner Name" name='summoner' />
        <Button variant="primary" type="submit" >
          Get Stats
        </Button>
      </Form>
      {LOLMatches.stats.map((data:any, i:number)=>{
        return <StatsPage data ={data}
                           key={i}/>})}
    </>
  )
}

export default LOL;
