import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MathQuiz = (props) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [CuponCode, setCuponCode] = useState('');

  const generateQuestion = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;


    const getCuponCode = async () => {

      try {
        const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/miscellaneous/get-cupon-code`);

        if (response.status === 200) {
          toast.success('Cupon code fetched successfully');
          console.log('Response cuppon',response.data);

          setCuponCode(response.data.data.cuponCode);

         }
     } catch (error) {
        toast.error("Cant't generate Cupon Code");

      }


    }


    if(score==100){

       getCuponCode();
    }

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25;
        num2 = Math.floor(Math.random() * 25) + 1;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    }

    let answer;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }

    return {
      question: `${num1} ${operation} ${num2} = ?`,
      answer: answer
    };
  };

  const startNewGame = () => {
    setScore(0);
    setQuestionCount(0);
    setShowResult(false);
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnswerCorrect = parseInt(userAnswer) === currentQuestion.answer;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(prev => prev + 10);
    }

    setQuestionCount(prev => prev + 1);
  };

  const nextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4  flex flex-col justify-center">
        <h1 className='font-bold text-2xl text-center mb-4 text-green-600'>Play Game and Win a Cuppon</h1>
        <ArrowLeft className='mb-2' onClick={()=>props.setGamePanelOpen(false)}/>
      <div className="relative w-full max-w-md mx-auto">
        {/* Background design */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>

        {/* Main content */}
        <div className="relative bg-white shadow-lg rounded-3xl p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-2 sm:mb-0">Math Quiz</h2>
            <div className="text-lg sm:text-xl font-bold text-green-600">Score: {score}</div>
          </div>

          {/* Question Area */}
          {currentQuestion && (
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">
                {currentQuestion.question}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your answer"
                  disabled={showResult}
                  required
                />

                {!showResult && (
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-600
                             active:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit Answer
                  </button>
                )}
              </form>

              {/* Result & Next Question */}
              {showResult && (
                <div className="space-y-4">
                  <div className={`text-center text-lg font-bold p-3 rounded-lg ${
                    isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isCorrect
                      ? '✨ Correct! Great job! ✨'
                      : `Wrong! The answer was ${currentQuestion.answer}`
                    }
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-green-500 text-white p-3 rounded-lg text-lg font-semibold
                             hover:bg-green-600 active:bg-green-700 transition duration-200"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer Area */}
          <div className="mt-6 space-y-4">
            <div className="text-center text-gray-600">
              Questions Attempted: {questionCount}
            </div>
            <button
              onClick={startNewGame}
              className="w-full bg-gray-500 text-white p-3 rounded-lg text-lg font-semibold
                       hover:bg-gray-600 active:bg-gray-700 transition duration-200"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathQuiz;