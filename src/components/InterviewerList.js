import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;
  const items = interviewers.map((interviewerInfo) => {
    const { id, name, avatar } = interviewerInfo;
    return (
      <InterviewerListItem
        name={name}
        avatar={avatar}
        setInterviewer={() => setInterviewer(id)}
        selected={id === interviewer}
        key={id}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{items}</ul>
    </section>
  );
}
