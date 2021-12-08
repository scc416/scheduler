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
  const appointmentArr = appointmentId.map(id => appointments[id]);
  return appointmentArr;
}
