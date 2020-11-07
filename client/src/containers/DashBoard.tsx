import React from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import  GoogleMaps from '../components/charts/GoogleMaps'
import DaysGraph from '../components/charts/DaysGraph'
import HoursGraph from '../components/charts/HoursGraph'

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const DashBoard: React.FC = () => {
  return (
    <>
    <GoogleMaps/>
    <DaysGraph />
    <HoursGraph />
    </>
  );
};

export default DashBoard;
