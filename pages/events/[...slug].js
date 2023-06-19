import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvent } from "../../helpers/ApiService";
import EventList from "@/components/events/EventList";

const FilteredEvents = (props) => {
  const router = useRouter();

  /* const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
 */
  /* to setup string into number without parse */
  /* const numberYear = +filteredYear;
  const numberMonth = +filteredMonth; */

  if (props.hasError) {
    return <p>Invalid value</p>;
  }

  const filteredEvent = props.events;

  if (!filteredEvent || filteredEvent.length === 0) {
    return <p>No events found</p>;
  }

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <div>
      <EventList items={filteredEvent} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  /* to setup string into number without parse */
  const numberYear = +filteredYear;
  const numberMonth = +filteredMonth;

  if (isNaN(numberYear) || isNaN(numberMonth) || numberYear > 2023) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvent = await getFilteredEvent({
    year: numberYear,
    month: numberMonth,
  });

  return {
    props: {
      events: filteredEvent,
      date: { year: numberYear, month: numberMonth },
    },
  };
}

export default FilteredEvents;
