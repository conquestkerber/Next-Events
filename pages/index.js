import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/inputs/NewsletterRegistration";
import { getFeaturedEvents, getAllEvents } from "@/helpers/ApiService";

const Home = (props) => {
  return (
    <>
      <div>
        <NewsletterRegistration />
        <EventList items={props.events} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getAllEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
