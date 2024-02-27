import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import useDropdown from "./CustomDropdown";

const MyFilter = () =>{
    const [model, setModel] = useState("---")
    const [models, setModels] = useState([])
    const [carList, setCarList] = useState([])
    const [car, setCar] = useState("-----")
    const [modelsDropdown, selectedModel, setOptions] = useDropdown(models, "----")
    const [carsDropdown, selectedCar, setCars] = useDropdown(carList, "----")

    const fetchModels = () => {
        const response = fetch(
            `https://demo1817734.mockable.io/types`
          ).then((value) => value.json().then(({ model }) => setModels(model)));
    }
    function fetchCarsByModel(){
        if (selectedModel != "----"){
        const response = fetch(
            `https://demo1817734.mockable.io/types/${selectedModel}`
            ).then((value) => value.json().then(({ cars }) => setCars(cars)));
        }
    }
    useEffect(() => {
        fetchModels()
    }, [])

    useEffect(() => {
        fetchCarsByModel()
    }, [selectedModel])

   
   return (
    <div>
    <h1>Ovo radi</h1>
    {selectedModel}
    {modelsDropdown()}
    <br></br>
    <br></br>
    <br></br>
    {carsDropdown()}
    </div>
   )
}


export default MyFilter