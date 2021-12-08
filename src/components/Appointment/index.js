import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

const Appointment = (props) => {
  const { id, time, interview } = props;
  console.log(interview);
  return (
    <article className="appointment">
      <Header time={time} />
      {interview && <Show {...interview} />}
      {!interview && <Empty />}
    </article>
  );
};

export default Appointment;
