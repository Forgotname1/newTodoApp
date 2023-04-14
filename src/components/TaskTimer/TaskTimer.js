import React, { useState, useEffect } from 'react';

function TaskTimer({ time }) {
  const [timer, setTimer] = useState(time);
  const [play, setPlay] = useState(true);
  let secondTimer = null;
  useEffect(() => {
    isPlay();
  }, [timer]);
  const isPlay = () => {
    if (timer > 0) {
      secondTimer = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };
  const isPause = () => {
    setPlay(false);
    clearTimeout(secondTimer);
  };
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (timer <= 0) {
    clearInterval(secondTimer);
  }
  return (
    <>
      {timer ? (
        !play ? (
          <button
            className="icon icon-play"
            onClick={() => {
              isPlay();
              setPlay(true);
            }}
          />
        ) : (
          <button className="icon icon-pause" onClick={isPause} />
        )
      ) : (
        ''
      )}
      <span style={{ marginLeft: '20px' }}>{`${minutes}:${seconds}`}</span>
    </>
  );
}

export default TaskTimer;
