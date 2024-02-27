import { useEffect, useState } from "react";
import styles from "./MyFilter.module.css";

export default function MyFilter({ listValues, filterName, onOptionSelect }) {

  const [label, setLabel] = useState('');

  useEffect(() => {
    setList(listValues);
  }, [listValues]);

  const optionSelectedHandler = (e) => {
    setLabel(e.target.value);
    setSelectedValue(e.target.value);
    onOptionSelect(e.target.value, filterName);
  }

  const [list, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <div id={styles.filter}>
        {(label != '' && filterName == 'genres') && <h4 id={styles.name}>{label}</h4>}
        <select defaultValue={selectedValue} id={styles.select} onChange={optionSelectedHandler}>
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
