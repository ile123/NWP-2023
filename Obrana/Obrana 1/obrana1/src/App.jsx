import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyFilter from "./components/Filter/MyFilter";

function App() {
  const [data, setData] = useState({});
  const [genres, setGenres] = useState("");
  const [subGenres, setSubGenres] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const temp = {
        SF: ["Super Hero SF", "Fantazy SF", "Action SF"],
        Action: [
          "British Action",
          "Car chase Action",
          "SF Action",
          "Crime Action",
        ],
        Horror: [
          "Thriller horror",
          "Zombie horror",
          "Psychological horror",
          "Comedy horror",
        ],
        Comedy: ["Romantic Comedy", "Black Comedy", "Satiric Comedy"],
        Drama: ["Melodrama", "Family Drama"],
        British: ["Action British", "Cpmedy British"],
        Tragedy: ["Familiy", "War Tragedy", "Psychological Tragedy"],
    };
    setData(temp);
    setGenres(Object.keys(temp));
    
  }, []);

  const handleFilter = (value, name) => {
    if (name === "genres") {
      switch (value) {
        case "Action":
          setSubGenres(data.Action);
          break;
        case "SF":
          setSubGenres(data.SF);
          break;
        case "Horror":
          setSubGenres(data.Horror);
          break;
        case "Comedy":
          setSubGenres(data.Comedy);
          break;
        case "Drama":
          setSubGenres(data.Drama);
          break;
        case "British":
          setSubGenres(data.British);
          break;
        case "Tragedy":
          setSubGenres(data.Tragedy);
          break;
      }
    } else if (name === "subgenres") {
      setResult(value);
    }
  };

  return (
    <>
      {genres.length > 0 && (
        <MyFilter
          isDisabled={false}
          filterName={"genres"}
          listValues={genres}
          onOptionSelect={handleFilter}
        />
      )}
      {subGenres.length > 0 && (
        <MyFilter
          isDisabled={false}
          filterName={"subgenres"}
          listValues={subGenres}
          onOptionSelect={handleFilter}
        />
      )}
      {result != "" && <h3>{result}</h3>}
    </>
  );
}

export default App;
