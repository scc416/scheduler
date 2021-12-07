import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const list = days.map((dayInfo) => {
    const { id, name, spots } = dayInfo;
    return (
      <DayListItem
        key={id}
        name={name}
        spots={spots}
        selected={name === day}
        setDay={() => setDay(name)}
      />
    );
  });
  return (
    <ul>
      {list}
    </ul>
  );
}
