const getIdArr = (days, dayToBeFound, key) => {
  for (const day of days) {
    const { name, [key]: info } = day;
    const dayFound = name === dayToBeFound;
    if (dayFound) return info;
  }
  return [];
};

export function getAppointmentsForDay({ days, appointments }, day) {
  const appointmentId = getIdArr(days, day, "appointments");
  const appointmentsInfo = appointmentId.map((id) => appointments[id]);
  return appointmentsInfo;
}

export function getInterview({ interviewers }, interview) {
  if (!interview) return null;
  const { interviewer } = interview;
  const interviewerInfo = interviewers[interviewer];
  return { ...interview, interviewer: interviewerInfo };
}

export function getInterviewersForDay({ days, interviewers }, day) {
  const interviewersId = getIdArr(days, day, "interviewers");
  const interviewersInfo = interviewersId.map((id) => interviewers[id]);
  return interviewersInfo;
}
