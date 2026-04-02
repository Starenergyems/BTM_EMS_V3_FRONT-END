import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Typography from '@/components/units/typography';

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(null);

  const updateTime = () => {
    const now = new Date();
    const timeString = format(now, 'yyyy/MM/dd HH:mm:ss');
    setCurrentTime(timeString);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <Typography size="sm">{currentTime}</Typography>;
}

export default CurrentTime;
