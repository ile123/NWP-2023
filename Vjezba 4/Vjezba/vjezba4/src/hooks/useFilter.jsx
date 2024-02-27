import { useState, useEffect } from 'react';

const useFilter = (initialData) => {
  const [data, setData] = useState(initialData);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const optionSelectedHandler = (optionValue, filterName) => {
    if (filterName === "First Filter") {
      setOptions([]);
      setSelectedOption(optionValue);
      setIsDisabled(false);
    } else {
      setSelectedOption(optionValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://demo7777620.mockable.io/";
      if (selectedOption !== "") {
        url += selectedOption;
      }
      const response = await fetch(url);
      const result = await response.json();
      setOptions(result.data);
    };
    fetchData();
  }, [selectedOption]);

  return {
    options,
    isDisabled,
    optionSelectedHandler,
    data,
  };
};

export default useFilter;
