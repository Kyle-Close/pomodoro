import { IntervalMarkers } from './interval-markers/IntervalMarkers';
import { usePomodoro } from './usePomodoro';

export function Pomodoro() {
  const pomodoro = usePomodoro();

  const displayTime = (min: string, sec: string) => {
    return <h2>{`${min}:${sec}`}</h2>;
  };

  let containerClass = pomodoro.isOn ? 'pomodoro-container-on' : 'pomodoro-container-off';
  containerClass += ' pomodoro-container';

  console.log(pomodoro.isOn);

  return (
    <div className={containerClass}>
      <div className='pomodoro-btn-container'>
        <button onClick={pomodoro.handleStartPauseClick}>{pomodoro.isOn ? 'Pause' : 'Start'}</button>
        <button onClick={pomodoro.reset}>Reset</button>
      </div>
      <div>{displayTime(pomodoro.minutes, pomodoro.seconds)}</div>
      <IntervalMarkers count={pomodoro.intervalCount} completed={pomodoro.completedInvervals} />
    </div>
  );
}
