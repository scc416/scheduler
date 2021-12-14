import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

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
    [SET_SPOTS](state) {
      const { days, appointments } = state;
      const newDays = days.map((day) => {
        const { appointments: dayAppointments } = day;
        const spots = dayAppointments.reduce((totalSpot, id) => {
          const appointmentInfo = appointments[id];
          const { interview } = appointmentInfo;
          if (interview) return totalSpot - 1;
          return totalSpot;
        }, 5);
        return { ...day, spots };
      });
      return { ...state, days: newDays };
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
    socket: null,
  });

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

  useEffect(() => {
    ws.onmessage = (event) => {
      const action = JSON.parse(event.data);
      dispatch(action);
      dispatch({ type: SET_SPOTS });
    };

    return () => ws.close();
  }, []);

  const setDay = (day) => {
    dispatch({ type: SET_DAY, value: day });
  };

  const bookInterview = (id, interview) => {
    const action = {
      type: SET_INTERVIEW,
      id,
      interview,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      ws.send(JSON.stringify(action));
    });
  };

  const cancelInterview = (id) => {
    const action = {
      type: SET_INTERVIEW,
      id,
      interview: null,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      ws.send(JSON.stringify(action));
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
