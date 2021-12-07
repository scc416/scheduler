import React from 'react';
import "components/Appointment/styles.scss";

const Appointment = (props) => {
  const { time } = props;
  return (<article className="appointment">
    {!time&&'No appointments'}
    {time&&`Appointment at ${time}`}</article>);
};

export default Appointment;