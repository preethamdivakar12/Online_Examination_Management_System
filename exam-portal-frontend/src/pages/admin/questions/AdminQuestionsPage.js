import React, { useEffect, useState } from "react";
import "./AdminQuestionsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchQuestionsByQuiz } from "../../../actions/questionsActions";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";

const AdminQuestionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");
  const quizTitle = urlParams.get("quizTitle");

  const questionsReducer = useSelector((state) => state.questionsReducer);
  const [questions, setQuestions] = useState(questionsReducer.questions);
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const addNewQuestionHandler = () => {
    navigate(`/adminAddQuestion/?quizId=${quizId}`);
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    fetchQuestionsByQuiz(dispatch, quizId, token).then((data) =>
      setQuestions(data.payload)
    );
  }, [dispatch, quizId, token]);

  return (
    <div className="adminQuestionsPage__container">
      <div className="adminQuestionsPage__sidebar">
        <Sidebar />
      </div>

      <div className="adminQuestionsPage__content">
        <h2>{`Questions : ${quizTitle}`}</h2>

        <Button
          className="adminQuestionsPage__content--button"
          onClick={addNewQuestionHandler}
        >
          Add Question
        </Button>

        {questions ? (
          <div className="adminQuestionsPage__questionsList">
            {questions.map((q, index) => (
              <div key={index} className="adminQuestionsPage__questionCard">
                <h5>{`Q${index + 1}. ${q.content}`}</h5>
                <p><strong>Option 1:</strong> {q.option1}</p>
                <p><strong>Option 2:</strong> {q.option2}</p>
                <p><strong>Option 3:</strong> {q.option3}</p>
                <p><strong>Option 4:</strong> {q.option4}</p>
                <p><strong>Answer:</strong> {q[q.answer]}</p>
                <p><strong>Difficulty:</strong> {q.difficulty}</p>
                <p><strong>Marks:</strong> {q.marks}</p>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AdminQuestionsPage;
