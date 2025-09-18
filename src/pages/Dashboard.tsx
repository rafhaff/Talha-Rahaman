import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import ProgressRing from '../components/Common/ProgressRing';
import { 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Play,
  HelpCircle
} from 'lucide-react';

interface DashboardProps {
  userData: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [currentQuote, setCurrentQuote] = useState<{text: string; author: string} | null>(null);

  const motivationalQuotes = [
    {
      text: "Mathematics is not about numbers, equations, or algorithms: it is about understanding.",
      author: "William Paul Thurston"
    },
    {
      text: "Pure mathematics is, in its way, the poetry of logical ideas.",
      author: "Albert Einstein"
    },
    {
      text: "The only way to learn mathematics is to do mathematics.",
      author: "Paul Halmos"
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier"
    }
  ];

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const overallProgress = (userData.completedChapters / userData.totalChapters) * 100;

  return (
    <div className="min-h-screen pt-16 bg-primary transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="relative rounded-3xl p-8 text-white overflow-hidden hero-gradient">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full -translate-y-32 translate-x-32 floating"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                  Welcome back, {userData.name.split(' ')[0]}! 👋
                </h2>
                <p className="text-xl text-secondary">
                  Ready to continue your math journey today?
                </p>
              </div>
              
              <div className="flex items-center gap-4 glass rounded-xl p-6 border border-white/20">
                <div className="text-4xl animate-pulse">🔥</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.streak}</div>
                  <div className="text-sm text-secondary">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Progress Ring */}
            <div className="card text-center spotlight">
              <ProgressRing progress={overallProgress} size={140} className="mb-6" />
              <h3 className="text-xl font-semibold mb-2 text-primary">Chapter Progress</h3>
              <p className="text-secondary">Keep up the great work!</p>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-glow rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userData.completedChapters}</div>
                    <div className="text-sm text-secondary">Chapters Completed</div>
                  </div>
                </div>

                <div className="card-glow rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userData.studyTime}</div>
                    <div className="text-sm text-secondary">Hours This Month</div>
                  </div>
                </div>

                <div className="card-glow rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userData.averageScore}%</div>
                    <div className="text-sm text-secondary">Avg Quiz Score</div>
                  </div>
                </div>

                <div className="card-glow rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{userData.achievements}</div>
                    <div className="text-sm text-secondary">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-8">
          <div className="card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center spotlight">
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-primary">Continue Learning</h3>
              <p className="text-secondary mb-4">Pick up where you left off</p>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border border-purple-500/30">
                  {userData.lastTopic.chapter}
                </span>
                <span className="font-medium text-primary">
                  {userData.lastTopic.topic}
                </span>
              </div>

              <Link 
                to={`/chapters/1`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Continue Learning
              </Link>
            </div>

            <div className="text-center lg:text-right">
              <div className="glass rounded-2xl p-8 border border-purple-500/20">
                <div className="text-2xl font-semibold gradient-text font-mono">
                  ax² + bx + c = 0
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Motivational Quote */}
        {currentQuote && (
          <section className="mb-8">
            <div className="relative rounded-3xl p-8 text-white text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full -translate-y-16 translate-x-16 floating"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 opacity-90">💡</div>
                <blockquote className="text-xl font-medium leading-relaxed mb-4 italic">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-sm text-secondary">
                  - {currentQuote.author}
                </cite>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Quick Actions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/chapters"
              className="group card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-purple-500/30 spotlight"
            >
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-lg font-semibold mb-2 text-primary group-hover:text-purple-400">
                Browse Chapters
              </h4>
              <p className="text-sm text-secondary">Explore all available topics</p>
            </Link>

            <div className="group card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-green-500/30 cursor-pointer spotlight">
              <div className="text-4xl mb-4">🧮</div>
              <h4 className="text-lg font-semibold mb-2 text-primary group-hover:text-green-400">
                Practice Quiz
              </h4>
              <p className="text-sm text-secondary">Test your knowledge</p>
            </div>

            <div className="group card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-yellow-500/30 cursor-pointer spotlight">
              <div className="text-4xl mb-4">📈</div>
              <h4 className="text-lg font-semibold mb-2 text-primary group-hover:text-yellow-400">
                View Progress
              </h4>
              <p className="text-sm text-secondary">Track your learning journey</p>
            </div>

            <div className="group card text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-purple-500/30 cursor-pointer spotlight">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-lg font-semibold mb-2 text-primary group-hover:text-purple-400">
                AI Tutor
              </h4>
              <p className="text-sm text-secondary">Get instant help</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;