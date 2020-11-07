///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";

// some useful database functions in here:
import {getAllEvents,createEvent, sessionsByDay, sessionsByHours, retentionActivity} from "./database";
import { Event, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";

import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
import { filter } from "bluebird";
const router = express.Router();

// Routes

interface Filter {
  sorting: string;
  type?: string;
  browser?: string;
  search?: string;
  offset?: number;
}

router.post("/", (req: Request, res: Response) => {
  try {
    const event: Event = req.body;
    createEvent(event);
    res.json({ message: "Event added" });
  } catch (error) {
    res.json({ message: error.message });
  }
});
router.get('/all', (req: Request, res: Response) => {
  res.json(getAllEvents())
});

router.get('/all-filtered', (req: Request, res: Response) => {
const filters: Filter = req.query;
let filteredEvents :any[]=  getAllEvents()
if(filters.type){
  filteredEvents = filteredEvents.filter((event: Event) => event.name === filters.type)
}
if(filters.browser){
  filteredEvents = filteredEvents.filter((event: Event) => event.browser === filters.browser)
}
if(filters.search){
  const reg: RegExp = new RegExp(filters.search, "i");
  filteredEvents = filteredEvents.filter((event)=>{
    let bool = false;
    for(const key in event){
      if(reg.test(event[key])){
        bool=true;
      }
    }
    return bool;
  })
}
if (filters.sorting) {
  filteredEvents.sort((firstEvent: Event, secondEvent: Event) =>
    filters.sorting === "+date"
      ? firstEvent.date - secondEvent.date
      : secondEvent.date - firstEvent.date
  );
}
res.json({
  events: filteredEvents.slice(0, filters.offset || filteredEvents.length)
})
});

router.get('/by-days/:offset', (req: Request, res: Response) => {
  const offset: number = parseInt(req.params.offset) || 0;
  const sessions = sessionsByDay(offset)
  res.send(sessions)
});

router.get('/by-hours/:offset', (req: Request, res: Response) => {
  const offset: number = parseInt(req.params.offset) || 0;
  const sessions = sessionsByHours(offset)
  res.send(sessions)
});

router.get('/today', (req: Request, res: Response) => {
  res.send('/today')
});

router.get('/week', (req: Request, res: Response) => {
  res.send('/week')
});

router.get('/retention', (req: Request, res: Response) => {
  const dayZero:number = parseInt(req.query.dayZero);
  const retention: weeklyRetentionObject[] = retentionActivity(dayZero);
  res.send(retention);
});
router.get('/:eventId',(req : Request, res : Response) => {
  res.send('/:eventId')
});

router.post('/', (req: Request, res: Response) => {
  res.send('/')
});

router.get('/chart/os/:time',(req: Request, res: Response) => {
  res.send('/chart/os/:time')
})

  
router.get('/chart/pageview/:time',(req: Request, res: Response) => {
  res.send('/chart/pageview/:time')
})

router.get('/chart/timeonurl/:time',(req: Request, res: Response) => {
  res.send('/chart/timeonurl/:time')
})

router.get('/chart/geolocation/:time',(req: Request, res: Response) => {
  res.send('/chart/geolocation/:time')
})


export default router;
