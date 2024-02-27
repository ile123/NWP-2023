import { useEffect, useState } from "react";
import styles from "./MyFilter.module.css";

export default function MyFilter({ listValues, filterName, isDisabled, onOptionSelect }) {
  useEffect(() => {
    setList(listValues);
  }, [listValues]);

  const optionSelectedHandler = (e) => {
    setSelectedValue(e.target.value);
    onOptionSelect(e.target.value, filterName);
  }

  const [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <div id={styles.filter}>
        <h4 id={styles.name}>{filterName}</h4>
        <select defaultValue={selectedValue} id={styles.select} disabled={isDisabled} onChange={optionSelectedHandler}>
          <option value="" disabled hidden>Select an option</option>
          {list.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
