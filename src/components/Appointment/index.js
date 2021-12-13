import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const Appointment = ({
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
    transition(DELETING);
    deleteInterview().then(() => {
      transition(EMPTY);
    });
  };

  const cancel = () => {
    transition(SHOW);
  };
  const confirm = () => {
    transition(CONFIRM);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...interview}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          {...interview}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteFunc}
          message="Are you sure you would like to delete?"
          onCancel={cancel}
        />
      )}
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
