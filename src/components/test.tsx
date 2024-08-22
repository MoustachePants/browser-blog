import { useState } from "react";

const Test = () => {
  const [counter, setCounter] = useState<number>(0);

  const buttonHandler = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      test
      <button onClick={buttonHandler}>+</button>
      {counter}
    </>
  );
};

export default Test;
