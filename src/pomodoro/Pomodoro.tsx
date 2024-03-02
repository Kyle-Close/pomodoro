import { IntervalMarkers } from './interval-markers/IntervalMarkers';
import { usePomodoro } from './usePomodoro';

export function Pomodoro() {
  const pomodoro = usePomodoro();

  let containerClass = pomodoro.isOn ? 'pomodoro-container-on' : 'pomodoro-container-off';
  containerClass += ' pomodoro-container';

  return (
    <div className={containerClass}>
      <div className='pomodoro-btn-container'>
        <button onClick={pomodoro.handleStartPauseClick}>{pomodoro.isOn ? 'Pause' : 'Start'}</button>
        <button onClick={pomodoro.resetFull}>Reset</button>
      </div>
      <div>
        <h2>{`${pomodoro.minutes}:${pomodoro.seconds}`}</h2>
      </div>
      <IntervalMarkers count={pomodoro.intervalCount} completed={pomodoro.completedInvervals} />
    </div>
  );
}
