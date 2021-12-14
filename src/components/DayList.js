import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({ days, value, onChange }) {
  const list = days.map(({ id, name, spots }) => {
    return (
      <DayListItem
        key={id}
        {...{ name, spots }}
        selected={name === value}
        setDay={() => onChange(name)}
      />
    );
  });
  return <ul>{list}</ul>;
}
