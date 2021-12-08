import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const { day, days } = state;

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  const appointmentsForDay = getAppointmentsForDay(state, day);

  
  const schedule = appointmentsForDay.map((appointment) => {
    const { id, time, interview } = appointment;
    const interviewInfo = getInterview(state, interview);
    return <Appointment key={id} id={id} time={time} interview={interviewInfo} />;
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={(day) => setDay(day)} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
