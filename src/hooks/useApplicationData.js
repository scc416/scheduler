import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const { appointments, day, days } = state;

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

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (num) => {
    const daysInfo = [...days];
    const newDaysInfo = daysInfo.map((dayInfo) => {
      const { name } = dayInfo;
      const dayFound = name === day;
      if (!dayFound) return dayInfo;
      const newDayInfo = { ...dayInfo };
      newDayInfo.spots += num;
      return newDayInfo;
    });
    setState(prev => ({...prev, days: newDaysInfo}));
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...appointments[id],
      interview: { ...interview },
    };
    const newAppointments = {
      ...appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments: newAppointments }));
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...appointments[id],
      interview: null,
    };
    const newAppointments = {
      ...appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({ ...prev, appointments: newAppointments }));
    });
  };
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  };
};

export default useApplicationData;
