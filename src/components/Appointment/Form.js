import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  const {
    student: studentName,
    interviewers,
    interviewer: interviewerInfo,
    onSave,
    onCancel,
  } = props;
  const interviewerId = interviewerInfo ? interviewerInfo.id : null;
  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    setStudent(event.target.value);
  };
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    onCancel();
  };

  const validate = () => {
    if (student === "") {
      return setError("Student name cannot be blank");
    }

    props.onSave(student, interviewer);
  };

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
        </form>
        <InterviewerList
          {...{ interviewers }}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => reset()}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
