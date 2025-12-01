import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle, User, BarChart2, Info, ChevronRight, Sun, Snowflake, Smile, Frown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Mock Data from PDF ---
const MOCK_DATA_RATINGS = [
  { name: 'Instructor Voice', warm: 6.2, cold: 3.5 },
  { name: 'Platform UI', warm: 5.8, cold: 4.2 },
  { name: 'AI Trust', warm: 6.5, cold: 2.8 },
];

const MOCK_DATA_PERCENTAGE = [
  { name: 'Warm', Appealing: 80, Neutral: 10, Irritating: 10 },
  { name: 'Cold', Appealing: 15, Neutral: 15, Irritating: 70 },
];

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-8 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", className = "" }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    warm: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/30",
    cold: "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- Screens ---

const LandingScreen = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full text-center space-y-8"
    >
      <div className="space-y-4">
        <div className="inline-block p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
          <User size={32} />
        </div>
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
          AI Instructor Evaluation
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Help us shape the future of digital education.
          <br/>
          We are studying the effectiveness of AI-generated instructors in explaining complex psychological concepts.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
        <Card className="space-y-3 hover:border-indigo-200 transition-colors">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <Info size={20} />
          </div>
          <h3 className="font-semibold text-slate-900">The Task</h3>
          <p className="text-sm text-slate-500">
            You will watch a short lecture segment delivered by an experimental AI instructor and answer a few questions.
          </p>
        </Card>
        <Card className="space-y-3 hover:border-purple-200 transition-colors">
           <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            <BarChart2 size={20} />
          </div>
          <h3 className="font-semibold text-slate-900">Goal</h3>
          <p className="text-sm text-slate-500">
            Your feedback will help improve the design, mannerisms, and clarity of virtual educators.
          </p>
        </Card>
        <Card className="space-y-3 hover:border-pink-200 transition-colors">
           <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
            <User size={20} />
          </div>
          <h3 className="font-semibold text-slate-900">Team</h3>
          <p className="text-sm text-slate-500">
            Yadong Hou<br/>Yifei Hu<br/>Zhihao Mo
          </p>
        </Card>
      </div>

      <div className="pt-8">
        <Button onClick={onStart} className="w-64 mx-auto text-lg">
          Begin Session <ChevronRight size={20} />
        </Button>
        <p className="mt-4 text-sm text-slate-400">
          Please ensure your audio is turned on.
        </p>
      </div>
    </motion.div>
  </div>
);

const VideoTask = ({ condition, onComplete, notes, setNotes }) => {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const videoRef = React.useRef(null);
  const isWarm = condition === 'warm';

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  // --- Mock UI Components for the "Platform" ---

  const NavHeader = () => (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
          <Sun size={20} strokeWidth={3} />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">EduStream<span className="text-indigo-600">AI</span></span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center text-sm font-medium text-slate-500 gap-6">
          <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer transition-colors bg-slate-50 px-3 py-1.5 rounded-md">
             <BarChart2 size={16} /> Dashboard
          </div>
          <div className="relative hover:text-indigo-600 cursor-pointer transition-colors group">
            <span>Community</span>
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">3</span>
          </div>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Help</span>
        </div>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
           <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-700">Student User</div>
              <div className="text-xs text-slate-500">Psychology Major</div>
           </div>
           <div className="w-10 h-10 bg-indigo-50 rounded-full border-2 border-indigo-100 flex items-center justify-center text-indigo-600 relative">
             <User size={20} />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-slate-200 hidden xl:flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Course Progress</h3>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-800 text-sm">Intro to Behaviorism</h2>
          <span className="text-xs font-bold text-indigo-600">35%</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full w-1/3 rounded-full"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4 space-y-6">
           <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 pl-2">Module 1: Foundations</h4>
              {[
                { title: "1. What is Behaviorism?", status: "completed", time: "12:04" },
                { title: "2. Stimulus & Response", status: "completed", time: "08:32" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer opacity-60">
                  <CheckCircle size={16} className="text-green-500 shrink-0" />
                  <div className="text-sm truncate">{item.title}</div>
                </div>
              ))}
           </div>
           
           <div>
              <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 pl-2">Module 2: Conditioning</h4>
              {[
                { title: "3. Classical Conditioning", status: "active", time: "05:00" },
                { title: "4. Pavlov's Experiments", status: "locked", time: "15:20" },
                { title: "5. Little Albert Study", status: "locked", time: "09:15" },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-all cursor-default
                    ${item.status === 'active' 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                      : 'text-slate-400'}
                  `}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.status === 'active' ? <Play size={16} fill="currentColor" /> : <div className="w-4 h-4 border-2 border-slate-200 rounded-full" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate leading-tight">{item.title}</div>
                    <div className="text-[10px] opacity-70 mt-1">{item.time}</div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Gamification Widget */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Weekly Goals</h4>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-700">Daily Streak</span>
              <span className="text-xs font-bold text-orange-500">🔥 5 Days</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
              <div className="bg-orange-500 h-full w-5/7 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-700">XP Gained</span>
              <span className="text-xs font-bold text-indigo-600">850 / 1000</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full">
              <div className="bg-indigo-600 h-full w-4/5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RightPanel = () => (
     <div className="w-80 bg-slate-50 border-l border-slate-200 hidden lg:flex flex-col h-[calc(100vh-64px)] sticky top-16">
        <div className="p-4 border-b border-slate-200 bg-white">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
             <Info size={18} className="text-indigo-600" /> Instructor System
           </h3>
           <div className="mt-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <BarChart2 size={24} />
              </div>
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  Aura <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200 uppercase tracking-wide">v2.5</span>
                </div>
                <div className="text-xs text-indigo-600 font-medium">Synthetic Instructor</div>
              </div>
           </div>
           <p className="text-xs text-slate-500 mt-3 leading-relaxed border-l-2 border-indigo-100 pl-3">
             "I am powered by the Gemini multimodal engine. My voice, appearance, and lesson plans are entirely AI-generated to optimize your learning experience."
           </p>
           <div className="mt-4 flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">Multilingual</span>
              <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">Adaptive Tone</span>
           </div>
        </div>
        
        {/* AI Personalization Panel */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
           <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             Real-time Adaptation
           </h3>
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                 <span>Pacing</span>
                 <span>Fast</span>
               </div>
               <div className="w-full h-1 bg-slate-200 rounded-full">
                 <div className="w-2/3 h-full bg-slate-400 rounded-full relative">
                    <div className="absolute right-0 -top-1 w-3 h-3 bg-white border-2 border-slate-400 rounded-full shadow-sm" />
                 </div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                 <span>Detail Level</span>
                 <span>Verbose</span>
               </div>
               <div className="w-full h-1 bg-slate-200 rounded-full">
                 <div className="w-1/2 h-full bg-slate-400 rounded-full relative">
                    <div className="absolute right-0 -top-1 w-3 h-3 bg-white border-2 border-slate-400 rounded-full shadow-sm" />
                 </div>
               </div>
             </div>
             <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
               <span className="text-xs font-medium text-slate-600">Socratic Mode</span>
               <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                 <div className="w-4 h-4 bg-white border border-slate-300 rounded-full shadow-sm absolute left-0" />
               </div>
             </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col p-4 overflow-hidden">
           <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
             <BarChart2 size={18} className="text-indigo-600" /> My Notes
           </h3>
           <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-yellow-50 border-b border-yellow-100 p-2 text-[10px] text-yellow-700 text-center">
                Notes are processed by the AI to generate review quizzes.
              </div>
              <textarea 
                className="flex-1 w-full p-3 text-sm resize-none focus:outline-none text-slate-700"
                placeholder="Type your key takeaways here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
           </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-900 text-white">
           <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" /> AI Knowledge Check
           </h3>
           <p className="text-xs opacity-80 mb-3">
             Based on the transcript, the "Neutral Stimulus" is...
           </p>
           <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors">A. The Food</button>
              <button className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors">B. The Bell</button>
           </div>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <NavHeader />
      
      <div className="flex flex-1 max-w-[1920px] mx-auto w-full">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
              <span className="hover:text-indigo-600 cursor-pointer">Courses</span>
              <ChevronRight size={12} />
              <span className="hover:text-indigo-600 cursor-pointer">Behavioral Psychology</span>
              <ChevronRight size={12} />
              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Unit 3: Conditioning</span>
            </div>

            {/* Video Player Area */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative aspect-video ring-1 ring-slate-900/5 group">
              <video
                ref={videoRef}
                src={isWarm ? "/warm.mp4" : "/cold.mp4"}
                className="w-full h-full object-cover"
                controls
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setProgress(100)}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200 uppercase tracking-wider">
                    AI Generated
                  </span>
                  <span className="text-slate-400 text-xs">Lesson 2.1</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Classical Conditioning: The Basics</h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                  <span>Instructor: <strong className="text-slate-700">Aura</strong></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>Model v2.5</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>5 min watch</span>
                </p>
              </div>

              <Button 
                onClick={onComplete} 
                variant={progress >= 99 ? "primary" : "outline"}
                className={progress < 99 ? "opacity-50 cursor-not-allowed" : "animate-pulse bg-green-600 hover:bg-green-700 border-green-600"}
              >
                {progress >= 99 ? (
                  <>Complete & Continue <ChevronRight size={18} /></>
                ) : (
                  <><span className="mr-2">Locked</span> {Math.floor(progress)}% Watched</>
                )}
              </Button>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
              <div className="flex border-b border-slate-200 bg-slate-50/50 px-4">
                {['Overview', 'Transcript', 'Discussion', 'Resources'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-4 text-sm font-bold transition-all relative top-[1px]
                      ${activeTab === tab.toLowerCase() 
                        ? 'text-indigo-600 border-b-2 border-indigo-600 bg-transparent' 
                        : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="prose prose-slate max-w-none">
                    <p className="lead text-lg text-slate-600">
                      Ivan Pavlov discovered that dogs could learn to associate a neutral stimulus (like a bell) with a biologically potent stimulus (like food). This process is now known as <strong>Classical Conditioning</strong>.
                    </p>
                    <div className="grid grid-cols-2 gap-6 my-8">
                       <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                          <h4 className="font-bold text-slate-900 mb-2">Key Terms</h4>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li>• <strong>Unconditioned Stimulus (US):</strong> Food</li>
                            <li>• <strong>Unconditioned Response (UR):</strong> Salivation</li>
                            <li>• <strong>Conditioned Stimulus (CS):</strong> Bell</li>
                          </ul>
                       </div>
                       <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                          <h4 className="font-bold text-indigo-900 mb-2">Learning Objective</h4>
                          <p className="text-sm text-indigo-800">
                            By the end of this lesson, you should be able to diagram the four stages of the classical conditioning process.
                          </p>
                       </div>
                    </div>
                  </div>
                )}
                {activeTab === 'transcript' && (
                   <div className="space-y-4">
                     <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                       <span className="text-indigo-600 font-mono text-xs font-bold pt-1">00:00</span>
                       <p className="text-slate-700 text-sm">Welcome back. Today we're exploring one of the most fundamental concepts in behaviorism: Classical Conditioning.</p>
                     </div>
                     <div className="flex gap-4 p-3 bg-yellow-50 rounded-lg transition-colors cursor-pointer border border-yellow-100">
                       <span className="text-indigo-600 font-mono text-xs font-bold pt-1">00:15</span>
                       <p className="text-slate-700 text-sm">Imagine a dog. When you present food, the dog salivates naturally. This is what we call an unconditioned response.</p>
                     </div>
                     <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                       <span className="text-indigo-600 font-mono text-xs font-bold pt-1">00:35</span>
                       <p className="text-slate-700 text-sm">But what happens if we ring a bell right before the food arrives? Let's watch.</p>
                     </div>
                     <div className="text-center py-4">
                       <button className="text-xs text-slate-400 hover:text-indigo-600 font-medium uppercase tracking-wider">Load full transcript</button>
                     </div>
                   </div>
                )}
                {activeTab === 'discussion' && (
                   <div className="space-y-6">
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold shadow-sm">J</div>
                       <div className="flex-1">
                         <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none">
                           <div className="flex justify-between items-baseline mb-1">
                             <span className="font-bold text-slate-900 text-sm">Jessica M.</span>
                             <span className="text-xs text-slate-400">2 hours ago</span>
                           </div>
                           <p className="text-slate-700 text-sm">Can this happen with humans too? Like feeling hungry when the clock hits 12?</p>
                         </div>
                         <div className="flex gap-4 mt-2 ml-2">
                            <span className="text-xs text-slate-500 font-medium hover:text-indigo-600 cursor-pointer">Like (12)</span>
                            <span className="text-xs text-slate-500 font-medium hover:text-indigo-600 cursor-pointer">Reply</span>
                         </div>
                       </div>
                     </div>
                   </div>
                )}
                 {activeTab === 'resources' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all bg-white">
                       <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center">
                         <Info size={20} />
                       </div>
                       <div>
                         <div className="font-bold text-slate-900 text-sm">Pavlov_1902.pdf</div>
                         <div className="text-xs text-slate-500">Original Research Notes • 2.4 MB</div>
                       </div>
                     </div>
                   </div>
                )}
              </div>
            </div>

            {/* Related Content */}
            <div className="pt-8 border-t border-slate-200">
               <h3 className="text-lg font-bold text-slate-800 mb-4">Recommended AI Modules</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Cognitive Biases", instructor: "LogicBot v1.0", color: "bg-purple-100 text-purple-600" },
                    { title: "Intro to Neural Networks", instructor: "Matrix AI", color: "bg-blue-100 text-blue-600" },
                    { title: "Social Psychology", instructor: "SocBot", color: "bg-orange-100 text-orange-600" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group">
                       <div className={`h-32 rounded-lg mb-4 ${item.color} flex items-center justify-center`}>
                         <BarChart2 size={32} />
                       </div>
                       <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                       <p className="text-xs text-slate-500 mt-1">Instructor: {item.instructor}</p>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </main>
        
        <RightPanel />
      </div>
    </div>
  );
};

const Survey = ({ onSubmit }) => {
  const [ratings, setRatings] = useState({});
  
  const sections = [
    {
      title: "Part 1: The AI Instructor (Aura)",
      description: "Please evaluate the AI agent's performance in the video.",
      questions: [
        { id: 'instructor_likability', label: "Overall, how much did you like the AI instructor?", min: "Dislike Extremely", max: "Like Extremely" },
        { id: 'instructor_voice', label: "How natural did the voice and tone sound?", min: "Robotic / Unnatural", max: "Human-like / Natural" },
        { id: 'instructor_mannerisms', label: "How engaging were the avatar's mannerisms?", min: "Distracting / Stiff", max: "Engaging / Fluid" },
      ]
    },
    {
      title: "Part 2: Platform Experience",
      description: "Evaluate the design and functionality of the learning environment.",
      questions: [
        { id: 'platform_ui', label: "How visually appealing is the platform interface?", min: "Cluttered / Ugly", max: "Modern / Beautiful" },
        { id: 'platform_usability', label: "How easy was it to navigate and use the tools?", min: "Difficult / Confusing", max: "Intuitive / Easy" },
        { id: 'platform_features', label: "How useful were the sidebar tools (Notes, Quiz, Goals)?", min: "Not Useful", max: "Very Useful" },
      ]
    },
    {
      title: "Part 3: AI System Perception",
      description: "Your general impression of the underlying technology.",
      questions: [
        { id: 'ai_intelligence', label: "How intelligent/competent did the AI system appear to be?", min: "Incompetent", max: "Highly Competent" },
        { id: 'ai_trust', label: "How much would you trust this AI system to teach you?", min: "Distrust", max: "Trust Completely" },
      ]
    }
  ];

  const handleRate = (id, val) => {
    setRatings(prev => ({ ...prev, [id]: val }));
  };

  // Flatten all questions to check completion
  const allQuestionIds = sections.flatMap(s => s.questions.map(q => q.id));
  const isComplete = allQuestionIds.every(id => ratings[id]);
  const progress = Math.round((Object.keys(ratings).length / allQuestionIds.length) * 100);

  return (
    <div className="min-h-screen p-4 bg-slate-50 py-12 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">System Evaluation</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Please provide your feedback on the Instructor, the Platform Interface, and the AI Technology itself.
          </p>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">{Object.keys(ratings).length} / {allQuestionIds.length} answered</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <div className="px-2">
                <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
                <p className="text-sm text-slate-500">{section.description}</p>
              </div>
              
              {section.questions.map((q) => (
                <Card key={q.id} className="space-y-4 border-l-4 border-l-indigo-500">
                  <h4 className="font-semibold text-lg text-slate-800">{q.label}</h4>
                  <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wider">
                    <span>{q.min}</span>
                    <span>{q.max}</span>
                  </div>
                  <div className="grid grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRate(q.id, num)}
                        className={`
                          h-12 rounded-lg font-bold transition-all duration-200 border
                          ${ratings[q.id] === num 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105' 
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:border-slate-300'}
                        `}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8 pb-12">
          <Button 
            onClick={() => isComplete && onSubmit(ratings)} 
            variant={isComplete ? "primary" : "outline"}
            className={`w-full md:w-auto text-lg py-4 ${!isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Submit All Feedback
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const ResultsDebrief = ({ userCondition, userRatings, onRestart }) => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
            <CheckCircle size={16} /> Experiment Complete
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Debriefing: The Halo Effect</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Thank you for participating. The purpose of this study was to investigate if your global impression of the AI (based on its "Warm" or "Cold" demeanor) unconsciously influenced your ratings of its specific attributes—traits that were actually identical in both conditions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User's Session Info */}
          <Card className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Your Condition</h3>
                <div className="flex items-center gap-2 text-3xl font-black text-white/90 uppercase tracking-wider">
                  {userCondition === 'warm' ? <Sun /> : <Snowflake />}
                  {userCondition}
                </div>
              </div>
              <div className="h-px md:h-16 w-full md:w-px bg-white/20" />
              <div className="flex-1 w-full">
                 <h3 className="text-xl font-bold mb-4">Your Ratings</h3>
                 <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(userRatings).map(([key, val]) => (
                      <div key={key} className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <div className="text-xs opacity-70 uppercase mb-1">{key}</div>
                        <div className="text-2xl font-bold">{val}/8</div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </Card>

          {/* Chart 1 */}
          <Card className="h-96">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Expected Results: Average Ratings</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={MOCK_DATA_RATINGS} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 8]} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="warm" fill="#f59e0b" name="Warm Condition" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cold" fill="#0ea5e9" name="Cold Condition" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 2 */}
           <Card className="h-96">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Participants Rating "Appealing"</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={MOCK_DATA_PERCENTAGE} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={50} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Appealing" stackId="a" fill="#22c55e" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Neutral" stackId="a" fill="#cbd5e1" />
                <Bar dataKey="Irritating" stackId="a" fill="#ef4444" radius={[4, 0, 0, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="bg-slate-100 rounded-xl p-6 text-slate-600 text-sm leading-relaxed">
           <strong>Interpretation:</strong> As shown in the graphs (based on hypothesis/mock data), participants in the Warm condition consistently rate the instructor's appearance, mannerisms, and accent higher than those in the Cold condition, even though these attributes are identical in the source generation. This confirms the Halo Effect in human-AI interaction.
        </div>

        <div className="flex justify-center pb-8">
          <Button onClick={onRestart} variant="outline">
            Restart Demo
          </Button>
        </div>

      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  const [step, setStep] = useState('landing'); // landing, condition-select, video, survey, debrief
  const [condition, setCondition] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [userNotes, setUserNotes] = useState(""); // Lifted state for notes

  const startExperiment = () => {
    // In a real experiment, this would be random:
    // setCondition(Math.random() > 0.5 ? 'warm' : 'cold');
    // For demo purposes, we let the user choose or show a "loading" state that randomizes.
    setStep('condition-select');
  };

  const selectCondition = (c) => {
    setCondition(c);
    setStep('video');
  };

  const handleVideoComplete = () => {
    setStep('survey');
  };

  const handleSurveySubmit = async (data) => {
    setAnswers(data);
    
    // Save data to local file via Vite middleware
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        condition: condition,
        ratings: data,
        notes: userNotes
      };

      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setStep('debrief');
  };

  const handleRestart = () => {
    setStep('landing');
    setCondition(null);
    setAnswers(null);
    setUserNotes("");
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0 }}>
            <LandingScreen onStart={startExperiment} />
          </motion.div>
        )}

        {step === 'condition-select' && (
           <motion.div 
             key="select" 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="min-h-screen flex flex-col items-center justify-center gap-8 p-4"
           >
             <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Select Condition (Demo Mode)</h2>
                <p className="text-slate-500">In the real experiment, this is assigned randomly.</p>
             </div>
             <div className="flex gap-6">
               <Button variant="warm" onClick={() => selectCondition('warm')} className="w-40 h-32 flex-col gap-4 text-xl">
                 <Sun size={32} /> Warm
               </Button>
               <Button variant="cold" onClick={() => selectCondition('cold')} className="w-40 h-32 flex-col gap-4 text-xl">
                 <Snowflake size={32} /> Cold
               </Button>
             </div>
           </motion.div>
        )}

        {step === 'video' && (
          <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VideoTask 
              condition={condition} 
              onComplete={handleVideoComplete} 
              notes={userNotes}
              setNotes={setUserNotes}
            />
          </motion.div>
        )}

        {step === 'survey' && (
          <motion.div key="survey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Survey onSubmit={handleSurveySubmit} />
          </motion.div>
        )}

        {step === 'debrief' && (
          <motion.div key="debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsDebrief userCondition={condition} userRatings={answers} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;