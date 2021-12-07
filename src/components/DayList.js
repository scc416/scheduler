import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const list = days.map((dayInfo) => {
    return (
      <DayListItem
        key={dayInfo.id}
        name={dayInfo.name}
        spots={day.spots}
        selected={dayInfo.name === day}
        setDay={setDay}
      />
    );
  });
  return (
    <ul>
      {list}
    </ul>
  );
}
