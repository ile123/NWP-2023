import styles from "./Filter.module.css";

export default function Filter(props) {
  const changeTypeHandler = async (type) => {
    if (type === "") {
      await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => props.onTypeChange(data))
        .catch((error) => console.log(error));
    } else {
      await fetch("http://localhost:5000/api/products/type/" + type, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => props.onTypeChange(data))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <select
        name="type"
        className="form-select"
        onChange={(e) => changeTypeHandler(e.target.value)}
        id={styles.select}
      >
        <option value="">All</option>
        <option value="Ale">Ale</option>
        <option value="Mead">Mead</option>
        <option value="Lager">Lager</option>
        <option value="Darkel">Darkel</option>
        <option value="IPA">IPA</option>
      </select>
    </>
  );
}
