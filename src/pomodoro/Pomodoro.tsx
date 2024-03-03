import { IntervalMarkers } from './interval-markers/IntervalMarkers';
import { usePomodoro } from './usePomodoro';

export function Pomodoro() {
  const pomodoro = usePomodoro(3);

  let containerClass = pomodoro.isOn ? 'pomodoro-container-on' : 'pomodoro-container-off';
  containerClass += ' pomodoro-container';

  console.log('seconds from Pomodoro: ', pomodoro.seconds);
  return (
    <div className={containerClass}>
      <div className='pomodoro-btn-container'>
        <button disabled={pomodoro.isCompletedIntervals} onClick={pomodoro.handleStartPauseClick}>
          {pomodoro.isOn ? 'Pause' : 'Start'}
        </button>
        <button onClick={pomodoro.reset}>Reset</button>
      </div>
      <div>
        <h2>{`${pomodoro.minutes}:${pomodoro.seconds}`}</h2>
      </div>
      <IntervalMarkers intervalStack={pomodoro.intervalStack} />
    </div>
  );
}
