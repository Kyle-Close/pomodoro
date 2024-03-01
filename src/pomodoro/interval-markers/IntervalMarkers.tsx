interface IntervalMarkersProps {
  count: number;
  completed: number;
}

export function IntervalMarkers({ count, completed }: IntervalMarkersProps) {
  console.log(`count: ${count}, completed: ${completed}`);

  const Markers = () => {
    let temp = [];
    for (let i = 0; i < count; i++) {
      if (i >= completed) temp.push(<div key={i} className='empty-interval-marker'></div>);
      else temp.push(<div key={i} className='filled-interval-marker'></div>);
    }
    return temp;
  };

  return <div className='interval-container'>{Markers()}</div>;
}
