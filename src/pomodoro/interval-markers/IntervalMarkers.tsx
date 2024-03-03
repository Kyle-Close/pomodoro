import { IntervalStack } from '../usePomodoro';
import { EmptyFocusInterval } from './EmptyFocusInterval';
import { FilledFocusInterval } from './FilledFocusInterval';
import { EmptyBreakInterval } from './EmptyBreakInterval';
import { FilledBreakInterval } from './FilledBreakInterval';

interface IntervalMarkersProps {
  intervalStack: IntervalStack;
}

export function IntervalMarkers({ intervalStack }: IntervalMarkersProps) {
  const Markers = (): React.ReactNode[] => {
    let temp: React.ReactNode[] = [];
    intervalStack.forEach((interval, key) => {
      if (!interval.isBreak) {
        if (interval.isCompleted) temp.push(<FilledFocusInterval key={key} />);
        else temp.push(<EmptyFocusInterval key={key} />);
      } else {
        if (interval.isCompleted) temp.push(<FilledBreakInterval key={key} />);
        else temp.push(<EmptyBreakInterval key={key} />);
      }
    });
    return temp;
  };

  const markerElements = Markers();

  return <div className='interval-container'>{markerElements && markerElements}</div>;
}
