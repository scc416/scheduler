import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const useApplicationData = () => {
  const reducers = {
    [SET_DAY](state, action) {
      return { ...state, day: action.value };
    },
    [SET_APPLICATION_DATA](state, action) {
      const info = { ...action };
      delete info.type;
      return { ...state, ...info };
    },
    [SET_INTERVIEW](state, { id, interview }) {
      const { appointments } = state;
      const appointment = {
        ...appointments[id],
        interview,
      };
      const newAppointments = {
        ...appointments,
        [id]: appointment,
      };
      return { ...state, appointments: newAppointments };
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

  const { day, days } = state;

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;

      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
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
    dispatch({ type: SET_APPLICATION_DATA, days: newDaysInfo });
  };

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
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
