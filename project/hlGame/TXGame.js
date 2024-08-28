const CountDown = ({ time }) => {
  const [count, setCount] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return <div>{count}</div>;
}

module.exports = CountDown;