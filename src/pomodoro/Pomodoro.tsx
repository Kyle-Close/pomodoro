import StartTimer from '../assets/start-timer.svg';
import PauseTimer from '../assets/pause-timer.svg';
import { IntervalMarkers } from './interval-markers/IntervalMarkers';
import { usePomodoro } from './usePomodoro';

export function Pomodoro() {
  const pomodoro = usePomodoro(3);
  const containerClasses = ['pomodoro-container'];
  const startPauseBtnClasses = ['button-primary'];
  const resetBtnClasses = ['button-secondary', 'reset'];
  const titleClasses = ['title'];

  pomodoro.isOn ? containerClasses.push('pomodoro-container-on') : containerClasses.push('pomodoro-container-off');
  pomodoro.isOn ? startPauseBtnClasses.push('on') : startPauseBtnClasses.push('off');
  pomodoro.isBreak ? titleClasses.push('break') : titleClasses.push('focus');

  return (
    <div className={containerClasses.join(' ')}>
      <h2 className={titleClasses.join(' ')}>{pomodoro.isBreak ? 'Break' : 'Focus'}</h2>
      <div className='pomodoro-btn-container'>
        <button
          className={startPauseBtnClasses.join(' ')}
          disabled={pomodoro.isCompletedIntervals}
          onClick={pomodoro.handleStartPauseClick}
        >
          <img className='pomodoro-start-pause-button-img' src={pomodoro.isOn ? PauseTimer : StartTimer} />
          {pomodoro.isOn ? 'Pause' : 'Start'}
        </button>
        <button className={resetBtnClasses.join(' ')} onClick={pomodoro.reset}>
          Reset
        </button>
      </div>
      <div>
        <h1>{`${pomodoro.minutes}:${pomodoro.seconds}`}</h1>
      </div>
      <IntervalMarkers intervalStack={pomodoro.intervalStack} />
    </div>
  );
}
