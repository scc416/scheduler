import { useReducer, useEffect, useState } from "react";

const useFormData = ({
  student: studentName,
  interviewers,
  interviewer: interviewerInfo,
  onSave,
  onCancel,
}) => {
  const interviewerId = interviewerInfo ? interviewerInfo.id : null;
  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    setStudent(event.target.value);
  };

  const reset = () => {
    setError("");
    setStudent("");
    setInterviewer(null);
    onCancel();
  };

  const validate = () => {
    if (!student) {
      return setError("Student name cannot be blank");
    }
    setError("");
    onSave(student, interviewer);
  };

  return {
    onChangeHandler,
    student,
    validate,
    error,
    setInterviewer,
    interviewer,
    reset,
  };
};

export default useFormData;
