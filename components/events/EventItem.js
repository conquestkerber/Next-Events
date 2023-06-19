import React from "react";
import classes from "./EventItem.module.css";
import Button from "../ui/button";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  /*   const humanReadableDate = new Date(date).toLocaleDateString("en-US,", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }); */

  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title}></img>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{date}</time>
          </div>
          <div className={classes.address}>
            <address>{location}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}> Explore Events </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
