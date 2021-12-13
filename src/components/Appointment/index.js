import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  deleteInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    if (!name || !interviewer) return;
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(interview).then(() => {
      transition(SHOW);
    });
  }

  const deleteFunc = () => {
    transition(SAVING);
    deleteInterview().then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} onDelete={deleteFunc} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;
