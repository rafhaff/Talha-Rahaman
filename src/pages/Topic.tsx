import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Common/Breadcrumb';
import { TopicData, Question, QuizState, Chapter } from '../types';
import { Clock, FileDown, Upload, Play, SkipForward, RotateCcw, CheckCircle } from 'lucide-react';

const Topic: React.FC = () => {
  const { topicId, chapterId } = useParams();
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'assignment' | 'test'>('lesson');
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isCompleted: false
  });

  // All chapters data for lookup
  const allChapters = [
    // Math Chapters
    {
      id: 1,
      title: "Basic Algebra",
      description: "Master the fundamentals of algebraic expressions and equations",
      icon: "📊",
      progress: 100,
      isUnlocked: true,
      isCompleted: true,
      topics: ["Variables & Constants", "Linear Equations", "Factorization", "Polynomials"],
      studyTime: 8,
      quizzes: 5
    },
    // Physics Chapters
    {
      id: 7,
      title: "Mechanics",
      description: "Study motion, forces, and energy in physical systems",
      icon: "⚙️",
      progress: 80,
      isUnlocked: true,
      isCompleted: false,
      topics: ["Kinematics", "Newton's Laws", "Work & Energy", "Momentum"],
      studyTime: 12,
      quizzes: 6
    },
    {
      id: 8,
      title: "Thermodynamics",
      description: "Explore heat, temperature, and energy transfer",
      icon: "🌡️",
      progress: 60,
      isUnlocked: true,
      isCompleted: false,
      topics: ["Heat Transfer", "Laws of Thermodynamics", "Entropy", "Heat Engines"],
      studyTime: 8,
      quizzes: 4
    },
    // Chemistry Chapters
    {
      id: 12,
      title: "Atomic Structure",
      description: "Understanding atoms, electrons, and chemical bonding",
      icon: "⚛️",
      progress: 100,
      isUnlocked: true,
      isCompleted: true,
      topics: ["Electron Configuration", "Periodic Table", "Chemical Bonding", "Molecular Geometry"],
      studyTime: 10,
      quizzes: 5
    }
  ];

  // Sample topic data based on chapter
  const getTopicDataForChapter = (chapterId: number): TopicData => {
    const chapter = allChapters.find(c => c.id === chapterId);
    
    if (chapterId === 7) { // Mechanics
      return {
        id: 7,
        title: "Kinematics",
        chapter: "Mechanics",
        description: "Study of motion without considering the forces that cause it",
        progress: 80,
        lessonContent: `
          <h3>Introduction to Kinematics</h3>
          <p>Kinematics is the branch of mechanics that describes the motion of objects without considering the forces that cause the motion.</p>
          <div class="math-display">v = u + at</div>
          <p>Where <em>v</em> is final velocity, <em>u</em> is initial velocity, <em>a</em> is acceleration, and <em>t</em> is time.</p>
        `,
        questions: [
          {
            id: 1,
            question: "A car accelerates from rest at 2 m/s² for 5 seconds. What is its final velocity?",
            options: ["8 m/s", "10 m/s", "12 m/s", "15 m/s"],
            correct: 1,
            explanation: "Using v = u + at: v = 0 + (2)(5) = 10 m/s"
          }
        ]
      };
    }
    
    // Default to algebra content for other chapters
    return sampleTopicData;
  };

  // Sample topic data - replace with API call
  const sampleTopicData: TopicData = {
    id: 1,
    title: "Quadratic Equations",
    chapter: "Algebra",
    description: "Learn to solve quadratic equations using various methods",
    progress: 60,
    lessonContent: `
      <h3>Introduction to Quadratic Equations</h3>
      <p>A quadratic equation is a second-degree polynomial equation in a single variable x with the general form:</p>
      <div class="math-display">ax² + bx + c = 0</div>
      <p>Where <em>a</em>, <em>b</em>, and <em>c</em> are constants and <em>a ≠ 0</em>.</p>
    `,
    questions: [
      {
        id: 1,
        question: "Solve for x: 2x + 5 = 13",
        options: ["x = 4", "x = 6", "x = 8", "x = 9"],
        correct: 0,
        explanation: "Subtract 5 from both sides: 2x = 8. Then divide by 2: x = 4."
      },
      {
        id: 2,
        question: "What is the discriminant of 3x² - 5x + 2 = 0?",
        options: ["1", "7", "25", "-7"],
        correct: 0,
        explanation: "Using b² - 4ac: (-5)² - 4(3)(2) = 25 - 24 = 1."
      },
      {
        id: 3,
        question: "Factor: x² - 9",
        options: ["(x-3)(x-3)", "(x+3)(x+3)", "(x-3)(x+3)", "Cannot be factored"],
        correct: 2,
        explanation: "This is a difference of squares: x² - 9 = x² - 3² = (x-3)(x+3)."
      }
    ]
  };

  useEffect(() => {
    if (chapterId) {
      // Load chapter data
      const chapter = allChapters.find(c => c.id === parseInt(chapterId));
      setChapterData(chapter || null);
      
      // Load topic data based on chapter
      setTopicData(getTopicDataForChapter(parseInt(chapterId)));
    } else {
      // Fallback for direct topic access
      setTopicData(sampleTopicData);
    }
  }, [topicId]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Chapters', path: '/chapters' },
    { label: topicData?.title || 'Topic' }
  ];

  const tabs = [
    { id: 'lesson', label: '📖 Lesson', icon: '📖' },
    { id: 'quiz', label: '🧮 Quiz', icon: '🧮' },
    { id: 'assignment', label: '📝 Assignment', icon: '📝' },
    { id: 'test', label: '🎯 Final Test', icon: '🎯' }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    
    const newScore = newAnswers.reduce((score, answer, index) => {
      if (answer === topicData!.questions[index]?.correct) {
        return score + 1;
      }
      return score;
    }, 0);

    setQuizState({
      ...quizState,
      answers: newAnswers,
      score: newScore
    });
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < topicData!.questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1
      });
    } else {
      setQuizState({
        ...quizState,
        isCompleted: true
      });
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion - 1
      });
    }
  };

  if (!topicData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Topic Header */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide mb-3">
                {chapterData?.title || topicData.chapter}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {topicData.title}
              </h1>
              <p className="text-lg text-gray-600">
                {topicData.description}
              </p>
            </div>
            
            <div className="text-center lg:text-right min-w-48">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-teal-600 rounded-full transition-all duration-1000"
                  style={{ width: `${topicData.progress}%` }}
                />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {topicData.progress}% Complete
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation & Content */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Nav */}
          <div className="flex bg-gray-100 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 min-h-96">
            {/* Lesson Tab */}
            {activeTab === 'lesson' && (
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                    Introduction to Quadratic Equations
                  </h3>
                  
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    A quadratic equation is a second-degree polynomial equation in a single variable x with the general form:
                  </p>
                  
                  <div className="bg-gray-100 border-2 border-gray-200 rounded-xl p-6 text-center text-xl font-mono my-8 hover:border-blue-300 transition-colors">
                    ax² + bx + c = 0
                  </div>
                  
                  <p className="text-lg leading-relaxed text-gray-700 mb-8">
                    Where <em>a</em>, <em>b</em>, and <em>c</em> are constants and <em>a ≠ 0</em>.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Methods of Solution</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                      <h5 className="text-lg font-semibold text-blue-600 mb-3">1. Factoring Method</h5>
                      <p className="text-gray-600 mb-4">When the quadratic can be factored into two binomials.</p>
                      <div className="bg-white rounded-lg p-3 text-sm font-mono text-center">
                        x² - 5x + 6 = (x-2)(x-3) = 0
                      </div>
                    </div>

                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                      <h5 className="text-lg font-semibold text-blue-600 mb-3">2. Quadratic Formula</h5>
                      <p className="text-gray-600 mb-4">The universal method that works for all quadratics.</p>
                      <div className="bg-white rounded-lg p-3 text-sm font-mono text-center">
                        x = (-b ± √(b²-4ac)) / 2a
                      </div>
                    </div>

                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                      <h5 className="text-lg font-semibold text-blue-600 mb-3">3. Completing the Square</h5>
                      <p className="text-gray-600 mb-4">Transform the equation into a perfect square trinomial.</p>
                      <div className="bg-white rounded-lg p-3 text-sm font-mono text-center">
                        x² + 6x + 9 = (x+3)²
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    ← Previous Lesson
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Next Lesson →
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="max-w-2xl mx-auto">
                {!quizState.isCompleted ? (
                  <>
                    {/* Quiz Header */}
                    <div className="flex justify-between items-center bg-gray-100 rounded-xl p-6 mb-8">
                      <h3 className="text-xl font-semibold text-gray-900">Practice Quiz</h3>
                      <div className="flex gap-6 text-sm font-medium text-gray-600">
                        <span>Question {quizState.currentQuestion + 1} of {topicData.questions.length}</span>
                        <span className="text-blue-600">Score: {quizState.score}</span>
                      </div>
                    </div>

                    {/* Question */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {quizState.currentQuestion + 1}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {topicData.questions[quizState.currentQuestion]?.question}
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {topicData.questions[quizState.currentQuestion]?.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              className={`w-full p-4 text-left border-2 rounded-lg font-medium transition-all duration-200 ${
                                quizState.answers[quizState.currentQuestion] === index
                                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between gap-4">
                      <button
                        onClick={prevQuestion}
                        disabled={quizState.currentQuestion === 0}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={nextQuestion}
                        disabled={quizState.answers[quizState.currentQuestion] === undefined}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {quizState.currentQuestion === topicData.questions.length - 1 ? 'Finish' : 'Next'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      You scored {quizState.score} out of {topicData.questions.length}
                    </p>
                    <button
                      onClick={() => setQuizState({ currentQuestion: 0, score: 0, answers: [], isCompleted: false })}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Assignment Tab */}
            {activeTab === 'assignment' && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6">Practice Assignment</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                  <p className="text-blue-800">
                    Download the worksheet below, solve the problems, and upload your solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Download Section */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileDown className="w-5 h-5" />
                      Download Worksheet
                    </h4>
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <FileDown className="w-4 h-4" />
                      Download PDF Worksheet
                    </button>
                  </div>

                  {/* Upload Section */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Submit Your Work
                    </h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors mb-4">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="font-medium text-gray-700">Choose files or drag them here</div>
                      <div className="text-sm text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG</div>
                      <input type="file" multiple className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Submit Assignment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Test Tab */}
            {activeTab === 'test' && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">Final Test</h3>
                  <div className="flex justify-center items-center gap-8">
                    <div>
                      <div className="text-sm opacity-90 mb-1">Time Remaining:</div>
                      <div className="text-2xl font-bold font-mono">30:00</div>
                    </div>
                    <div className="text-sm opacity-90">
                      Question 1 of 10
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 mb-8">
                  <h4 className="text-xl font-semibold mb-6">Test Instructions</h4>
                  <ul className="text-left space-y-3 text-gray-700 mb-8">
                    <li>• This test contains 10 questions</li>
                    <li>• You have 30 minutes to complete</li>
                    <li>• Each question carries equal marks</li>
                    <li>• You can review answers before submitting</li>
                    <li>• Once started, the timer cannot be paused</li>
                  </ul>
                  
                  <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
                    <Play className="w-5 h-5" />
                    Start Test
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic;