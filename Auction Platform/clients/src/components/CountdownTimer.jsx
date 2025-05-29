import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
	const difference = +new Date(targetDate) - +new Date();
	let timeLeft = {};

	if (difference > 0) {
	  timeLeft = {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / 1000 / 60) % 60),
		seconds: Math.floor((difference / 1000) % 60),
	  };
	} else {
	  timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	  };
	}

	return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
	const timer = setInterval(() => {
	  setTimeLeft(calculateTimeLeft());
	}, 1000);

	return () => clearInterval(timer);
  }, [targetDate]);

  return (
	<div>
	  <span>{timeLeft.days}d </span>
	  <span>{timeLeft.hours}h </span>
	  <span>{timeLeft.minutes}m </span>
	  <span>{timeLeft.seconds}s</span>
	</div>
  );
};

export default CountdownTimer;
