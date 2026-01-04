
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Eye, 
  MapPin, 
  Send, 
  Mic, 
  Video, 
  StopCircle, 
  Share2,
  Settings
} from 'lucide-react';

const IncidentTab: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isVisualAlertActive, setIsVisualAlertActive] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isRecording, setIsRecording] = useState<'none' | 'audio' | 'video'>('none');
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Use a stable reference for the alarm audio object to prevent redundant fetches
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    // Pre-load the audio object on mount
    const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
    audio.loop = true;
    // We don't set src to empty on cleanup, we just pause it. 
    // This avoids "aborted by user agent" errors when the element is disposed during a fetch.
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear source on unmount to release resources
        audioRef.current.load();
        audioRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
      document.body.classList.remove('visual-alert-active');
    };
  }, []);

  useEffect(() => {
    if (isRecording !== 'none') {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingTime(0);
    }
  }, [isRecording]);

  const toggleAlarm = async () => {
    if (!audioRef.current) return;

    if (!isAlarmActive) {
      try {
        // Track the play promise to avoid interrupting it before it resolves
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        setIsAlarmActive(true);
      } catch (err) {
        console.error("Audio playback failed or was interrupted:", err);
        // This catch handles the "play() request was interrupted" error 
        // which often manifests as the "aborted" error in some browsers.
      }
    } else {
      // If a play request is still pending, we wait for it before pausing 
      // or simply rely on the fact that pause() is safe once play() resolves.
      if (playPromiseRef.current) {
        await playPromiseRef.current.catch(() => {});
      }
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAlarmActive(false);
    }
  };

  const toggleVisualAlert = () => {
    const newState = !isVisualAlertActive;
    setIsVisualAlertActive(newState);
    if (newState) {
      document.body.classList.add('visual-alert-active');
    } else {
      document.body.classList.remove('visual-alert-active');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 flex flex-col gap-6 animate-in zoom-in duration-300">
      {/* Panic Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={toggleAlarm}
          className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all shadow-2xl outline-none ${
            isAlarmActive 
              ? 'bg-red-600 border-white animate-pulse' 
              : 'bg-slate-900 border-red-900 text-red-500'
          }`}
        >
          <Bell className={`w-12 h-12 mb-2 ${isAlarmActive ? 'text-white' : 'text-red-500'}`} />
          <span className="font-black uppercase tracking-widest text-sm">Loud Alarm</span>
          <span className="text-[10px] opacity-70 mt-1">{isAlarmActive ? 'DEACTIVATE' : 'ACTIVATE'}</span>
        </button>

        <button 
          onClick={toggleVisualAlert}
          className={`flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all shadow-2xl outline-none ${
            isVisualAlertActive 
              ? 'bg-yellow-500 border-white' 
              : 'bg-slate-900 border-yellow-900 text-yellow-500'
          }`}
        >
          <Eye className={`w-12 h-12 mb-2 ${isVisualAlertActive ? 'text-white' : 'text-yellow-500'}`} />
          <span className="font-black uppercase tracking-widest text-sm">Visual Alert</span>
          <span className="text-[10px] opacity-70 mt-1">{isVisualAlertActive ? 'OFF' : 'ON'}</span>
        </button>
      </div>

      {/* Report Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-500" />
            Report Incident
          </h3>
          <button className="text-slate-500 hover:text-slate-300">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <textarea 
          placeholder="Describe the ongoing situation..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm h-32 focus:outline-none focus:border-blue-500 transition-colors resize-none text-white"
        />

        <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>Location: [A] Office Building A, 4th Floor</span>
        </div>

        <div className="flex items-center justify-between text-xs text-blue-400 px-1">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="notify-ert" defaultChecked className="rounded bg-slate-900 border-slate-700" />
            <label htmlFor="notify-ert" className="cursor-pointer">Notify: ERT Team / Admin</label>
          </div>
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex justify-around items-center min-h-[84px]">
          {isRecording === 'none' ? (
            <>
              <button 
                onClick={() => setIsRecording('audio')}
                className="flex flex-col items-center gap-1 group outline-none"
              >
                <div className="p-3 bg-slate-800 rounded-full group-hover:bg-blue-600/20 transition-colors">
                  <Mic className="w-6 h-6 text-slate-300" />
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Audio</span>
              </button>
              <div className="w-px h-8 bg-slate-800" />
              <button 
                onClick={() => setIsRecording('video')}
                className="flex flex-col items-center gap-1 group outline-none"
              >
                <div className="p-3 bg-slate-800 rounded-full group-hover:bg-blue-600/20 transition-colors">
                  <Video className="w-6 h-6 text-slate-300" />
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Video</span>
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full px-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm text-white">{formatTime(recordingTime)}</span>
                <span className="text-xs text-slate-500 uppercase font-black">Recording {isRecording}</span>
              </div>
              <button 
                onClick={() => setIsRecording('none')}
                className="p-2 bg-red-600 rounded-full text-white shadow-lg active:scale-90 transition-transform"
              >
                <StopCircle className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <button className="bg-blue-600 p-6 rounded-3xl shadow-lg shadow-blue-900/30 active:scale-90 transition-transform outline-none">
          <Share2 className="w-6 h-6 text-white" />
        </button>
      </div>

      <button 
        className={`w-full py-5 rounded-2xl font-black text-lg tracking-widest shadow-xl transition-all outline-none ${
          description.trim().length > 5 ? 'bg-blue-600 text-white shadow-blue-900/40 active:scale-[0.98]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
        disabled={description.trim().length <= 5}
      >
        SEND URGENT REPORT
      </button>
    </div>
  );
};

export default IncidentTab;
