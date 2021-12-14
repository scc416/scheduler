import React from "react";
import DayList from "components/DayList";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const { day, days } = state;

  const appointmentsForDay = getAppointmentsForDay(state, day);
  const interviewersForDay = getInterviewersForDay(state, day);

  // map day's appointment into React elements
  const schedule = appointmentsForDay.map(({ id, time, interview }) => {
    const interviewInfo = getInterview(state, interview);
    return (
      <Appointment
        key={id}
        time={time}
        interview={interviewInfo}
        interviewers={interviewersForDay}
        bookInterview={(interview) => bookInterview(id, interview)}
        deleteInterview={() => cancelInterview(id)}
      />
    );
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
      <section className="schedule">
        {schedule}
        {/* for the last appointment, only the time is shown */}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
