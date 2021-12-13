import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_STATE = "SET_STATE";
const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPOINTMENTS = "SET_APPOINTMENTS";

const useApplicationData = () => {
  const reducers = {
    [SET_STATE](state, action) {
      return { ...state, ...action.value };
    },
    [SET_DAY](state, action) {
      return { ...state, day: action.value };
    },
    [SET_DAYS](state, action) {
      return { ...state, days: action.value };
    },
    [SET_APPOINTMENTS](state, action) {
      return { ...state, appointments: action.value };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };
  const [state, dispatch] = useReducer(reducer, {
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

      dispatch({
        type: SET_STATE,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

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
    dispatch({ type: SET_DAYS, value: newDaysInfo });
  };

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
      dispatch({ type: SET_APPOINTMENTS, value: newAppointments });
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
      dispatch({ type: SET_APPOINTMENTS, value: newAppointments });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots,
  };
};

export default useApplicationData;
