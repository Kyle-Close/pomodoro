import { usePomodoro } from './usePomodoro';

export function Pomodoro() {
  const { isOn, handleStartPauseClick, reset, minutes, seconds } = usePomodoro();

  const displayTime = (min: string, sec: string) => {
    return <h2>{`${min}:${sec}`}</h2>;
  };

  let containerClass = isOn ? 'pomodoro-container-on' : 'pomodoro-container-off';
  containerClass += ' pomodoro-container';

  return (
    <div className={containerClass}>
      <div className='pomodoro-btn-container'>
        <button onClick={handleStartPauseClick}>{isOn ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div>{displayTime(minutes, seconds)}</div>
    </div>
  );
}
