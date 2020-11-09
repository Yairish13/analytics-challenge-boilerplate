import React,{useState,useEffect} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Event } from "../../models/event";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function EventsChart() {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [offset, setOffset] = useState<number>(10);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        sorting: "none",
        type: "all",
        browser: "all",
        search: "",
      });


    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:3001/events/all')
            setAllEvents(data);
            console.log(data);
        })()
    }, []);

  const classes = useStyles();

  const fetchMoreData = () => {
    if (allEvents[allEvents.length - 1]) {
      setHasMore(false);
      return;
    }}
  return (
    <div className={classes.root} >
         <InfiniteScroll
                   height={400}
            dataLength={allEvents.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget={"eventsWraper"}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more events to display!</b>
              </p>
            }
          >
        {allEvents?.map((event:Event)=>{
            return (
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="ca">User : {event.distinct_user_id}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  name: {event.name}<br></br>
               Browser: {event.browser} <br></br>
               Os: {event.os}  
              </Typography>
            </AccordionDetails>
          </Accordion>
            )
        })}
      
      </InfiniteScroll>
    </div>
  );
}