import { useEffect, useState } from "react";
import "./App.css";
import MyFilter from "./components/Filter/MyFilter";
import useFilter from "./hooks/useFilter";

const App = () => {
  const { options: dataFirstFilter, isDisabled: isSecondFilterDisabled, optionSelectedHandler: handleOptionSelectFirstFilter } = useFilter([]);
  const { options: dataSecondFilter, isDisabled: isDisabledSecondFilter, optionSelectedHandler: handleOptionSelectSecondFilter } = useFilter([]);

  const [list, setList] = useState([]);

  const handleListFetch = async () => {
    if (isSecondFilterDisabled) {
      const response = await fetch(`http://demo7777620.mockable.io/${dataFirstFilter}`);
      const result = await response.json();
      setList(result.data);
    } else {
      const response = await fetch(`http://demo7777620.mockable.io/${dataFirstFilter}/${dataSecondFilter}`);
      const result = await response.json();
      setList(result.data);
    }
  };

  const handleFirstFilterSelect = (value) => {
    handleOptionSelectFirstFilter(value, 'First Filter');
    setList([]);
  };

  const handleSecondFilterSelect = (value) => {
    handleOptionSelectSecondFilter(value, 'Second Filter');
    setList([]);
  };

  return (
    <>
      <div id="container">
        <div id="topSection">
          <MyFilter
            filterName="First Filter"
            isDisabled={false}
            listValues={dataFirstFilter}
            onOptionSelect={handleFirstFilterSelect}
          />
          <MyFilter
            filterName="Second Filter"
            isDisabled={isDisabledSecondFilter}
            listValues={dataSecondFilter}
            onOptionSelect={handleSecondFilterSelect}
          />
        </div>
        <div id="middleSection">
          <ul>
            {list.length !== 0 && list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;