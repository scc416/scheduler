import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EDIT = "ERROR_EDIT";

const Appointment = ({
  time,
  interview,
  interviewers,
  bookInterview,
  deleteInterview,
}) => {
  const { mode, transition, back, lastMode } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (!name || !interviewer) return;

    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        if (lastMode === SHOW) {
          transition(ERROR_EDIT, true);
        }
        if (lastMode === EMPTY) transition(ERROR_SAVE, true);
      });
  }

  const destroy = () => {
    transition(DELETING, true);

    deleteInterview()
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          {...interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          {...{ ...interview, interviewers }}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={destroy}
          message="Are you sure you would like to delete?"
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === CREATE && (
        <Form
          {...{ interviewers }}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer, true)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not create appointment." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={() => back()} />
      )}
      {mode === ERROR_EDIT && (
        <Error message="Could not edit appointment." onClose={() => back()} />
      )}
    </article>
  );
};

export default Appointment;
