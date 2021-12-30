import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import useFormData from "hooks/useFormData";

const Form = (props) => {
  const { interviewers } = props;
  const {
    state: { student, interviewer, studentError, interviewerError },
    onChangeHandler,
    validate,
    setInterviewer,
    reset,
  } = useFormData(props);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={onChangeHandler}
            value={student}
            data-testid="input"
          />
          <section className="appointment__validation">{studentError}</section>
        </form>
        <InterviewerList
          {...{ interviewers }}
          onChange={setInterviewer}
          value={interviewer}
        />
        <section className="appointment__validation">{interviewerError}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
