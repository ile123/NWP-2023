import { useEffect, useState } from "react";
import "./App.css";
import MyFilter from "./components/Filter/MyFilter";

export default function App() {

  const [dataFirstFilter, setDataFirstFilter] = useState([]);
  const [dataSecondFilter, setDataSecondFilter] = useState([]);
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [list, setList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://demo7777620.mockable.io/");
      const result = await response.json();
      setDataFirstFilter(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (secondOption == "") {
        const response = await fetch(
          "http://demo7777620.mockable.io/" + firstOption
        );
        const result = await response.json();
        setDataSecondFilter(result.data);
      } else {
        const response = await fetch(
          "http://demo7777620.mockable.io/" + firstOption + "/" + secondOption
        );
        const result = await response.json();
        setList(result.data);
      }
    };
    fetchData();
  }, [firstOption, secondOption]);

  const optionSelectedHandler = (optionValue, filterName) => {
    if (filterName == "First Filter") {
      setList([]);
      setFirstOption(optionValue);
      setSecondOption("");
      setIsDisabled(false);
    } else {
      setSecondOption(optionValue);
    }
  };

  return (
    <>
      <div id="container">
        <div id="topSection">
          <MyFilter
            filterName="First Filter"
            isDisabled={false}
            listValues={dataFirstFilter}
            onOptionSelect={optionSelectedHandler}
          />
          <MyFilter
            filterName="Second Filter"
            isDisabled={isDisabled}
            listValues={dataSecondFilter}
            onOptionSelect={optionSelectedHandler}
          />
        </div>
        <div id="middleSection">
          <ul>
            {list.length != 0 && list.map((item, key) => <li key={key} id="listItem">{item}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}
