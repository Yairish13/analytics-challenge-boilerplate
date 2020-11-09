import React,{useEffect, useState} from "react";
import axios from 'axios'
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import  GoogleMaps from '../components/charts/GoogleMaps'
import DaysGraph from '../components/charts/DaysGraph'
import HoursGraph from '../components/charts/HoursGraph'
import OsChart from '../components/charts/OsChart'
import EventsChart from "components/charts/EventsChart";



export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}
const DashBoard: React.FC = () => {

  return (
    <>
    <GoogleMaps/>
    <DaysGraph />
    <HoursGraph />
    <OsChart/>
    <EventsChart/>
    </>
  );
};

export default DashBoard;
