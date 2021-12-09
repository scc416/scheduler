const getAppointmentId = (days, dayToBeFound) => {
  for (const day of days) {
    const { name, appointments } = day;
    if (name === dayToBeFound) return appointments;
  }
  return [];
};

export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const appointmentId = getAppointmentId(days, day);
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
  const appointmentArr = getAppointmentsForDay(state, day);
  const interviewerId = [];
  for (const appointment of appointmentArr) {
    const { interview } = appointment;
    if (interview !== null) {
      const { interviewer } = interview;
      const interviewerIsNew = !interviewerId.includes(interviewer);
      if (interviewerIsNew) interviewerId.push(interviewer);
    }
  }
  const { interviewers } = state;
  const interviewerArr = interviewerId.map(id => interviewers[id])
  return interviewerArr;
}
