import React from "react";
import EventSummary from "@/components/EventDetail/EventSummary";
import EventLogistics from "@/components/EventDetail/EventLogistics";
import EventContent from "@/components/EventDetail/EventContent";
import { getEventById, getFeaturedEvents } from "@/helpers/ApiService";
import Comments from "@/components/inputs/Comments";

const EventDetail = (props) => {
  const events = props.selectedEvent;
  const event = events[0];

  if (!event) {
    return (
      <div className="center">
        <p>No event found</p>
      </div>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

//because we dont know what user enter in this placeholder eventId
//this function will tell nextjs for which parameter value(events ids) it should pre-render this page
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetail;
