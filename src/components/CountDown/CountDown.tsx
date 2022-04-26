import "./CountDown.scss";

interface CountDownInterface {
  count: number
}

export default function CountDown( { count }: CountDownInterface ) {

  return (
    <div className="countdown-timer">
      <h3 className="countdown-timer__title">Refreshing In:</h3>
      <p className="countdown-timer__text">{count} seconds</p>
    </div>
  );
}
