import { useReducer } from "react";

const SET_INTERVIEWER = "SET_INTERVIEWER";
const SET_ERROR = "SET_ERROR";
const SET_STUDENT = "SET_STUDENT";

const useFormData = ({
  student: studentName,
  interviewer: interviewerInfo,
  onSave,
  onCancel,
}) => {
  const reducers = {
    [SET_INTERVIEWER](state, { interviewer }) {
      return { ...state, interviewer };
    },
    [SET_ERROR](state, { studentError, interviewerError }) {
      return { ...state, studentError, interviewerError };
    },
    [SET_STUDENT](state, { student }) {
      return { ...state, student };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    student: studentName || "",
    interviewer: interviewerInfo ? interviewerInfo.id : null,
    studentError: null,
    interviewerError: null,
  });

  const { student, interviewer } = state;

  const onChangeHandler = (event) => {
    const student = event.target.value;
    dispatch({ type: SET_STUDENT, student });
  };

  const reset = () => {
    dispatch({ type: SET_ERROR, studentError: "", interviewerError: "" });
    dispatch({ type: SET_STUDENT, student: "" });
    dispatch({ type: SET_INTERVIEWER, interviewer: null });
    onCancel();
  };

  const validate = () => {
    if (!student && !interviewer) {
      return dispatch({
        type: SET_ERROR,
        studentError: "Student name cannot be blank",
        interviewerError: "Pick an interviewer",
      });
    }

    if (!student) {
      return dispatch({
        type: SET_ERROR,
        studentError: "Student name cannot be blank",
      });
    }

    if (!interviewer) {
      return dispatch({
        type: SET_ERROR,
        interviewerError: "Pick an interviewer",
      });
    }

    dispatch({ type: SET_ERROR, studentError: "" });
    onSave(student, interviewer);
  };

  const setInterviewer = (interviewer) => {
    dispatch({ type: SET_INTERVIEWER, interviewer });
  };

  return {
    state,
    onChangeHandler,
    validate,
    setInterviewer,
    reset,
  };
};

export default useFormData;
