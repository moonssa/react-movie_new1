// 나중에 app.js로 바꾸어서 다시 해보기
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);

  const onChange = (event) => {
    setMoney(event.target.value);
  };

  const onSelectedCoin = (event) => {
    setSelectedCoin(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Coins {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onChange}
        value={money}
        type="number"
        placeholder="How mach?? "
      />

      {loading ? (
        <strong>Loading....</strong>
      ) : (
        <select onChange={onSelectedCoin}>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol} : ${coin.quotes.USD.price})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
export default App;
