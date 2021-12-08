import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  const {
    student: studentName,
    interviewers,
    interviewer: interviewerName,
    onSave,
    onCancel,
  } = props;
  const [student, setStudent] = useState(studentName);
  const [interviewer, setInterviewer] = useState(interviewerName);
  const onChangeHandler = (event) => {
    setStudent(event.target.value);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={onChangeHandler}
            value={student}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
