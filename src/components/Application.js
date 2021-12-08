import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";

import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = [];

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const { day, days, appointments } = state;

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      
      setState(prev => ({...prev, days: days.data, appointments: appointments.data}));

    });
  }, []);

  const appointmentElms = getAppointmentsForDay(state, day).map((appointment) => {
    const { id } = appointment;
    return <Appointment key={id} {...appointment} />;
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
      <section className="schedule">{appointmentElms}</section>
    </main>
  );
}
