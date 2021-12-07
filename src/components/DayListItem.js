import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const { value, spots, selected, onChange } = props;
  const classes = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  return (
    <li onClick={onChange} className={classes}>
      <h2 className="text--regular">{value}</h2>
      <h3 className="text--light">
        {spots === 0 && <>{'no spots remaining'}</>}
        {spots === 1 && <>{'1 spot remaining'}</>}
        {spots > 1 && <>{`${spots} spots remaining`}</>}
      </h3>
    </li>
  );
}
