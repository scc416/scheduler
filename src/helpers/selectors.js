const getIdArr = (days, dayToBeFound, key) => {
  for (const day of days) {
    const { name, [key]: info } = day;
    if (name === dayToBeFound) return info;
  }
  return [];
};

export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const appointmentId = getIdArr(days, day, "appointments");
  const appointmentArr = appointmentId.map((id) => appointments[id]);
  return appointmentArr;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const { interviewers } = state;
  const { interviewer } = interview;
  const interviewerInfo = interviewers[interviewer];
  return { ...interview, interviewer: interviewerInfo };
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const interviewersId = getIdArr(days, day, "interviewers");
  const interviewersInfo = interviewersId.map(id => interviewers[id]);
  return interviewersInfo;
}
