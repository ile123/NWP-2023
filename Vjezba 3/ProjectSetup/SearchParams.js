import React, { useState, useEffect } from "react";

const SearchParams = () => {

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(["All"]);
    const [models, setModels] = useState([]);
    const [model, setModel] = useState(["All"]);

    function getBrands() {
        const brands = [
            "Audi", "BMW", "Volkswagen"
        ];
        setBrands(brands);
    }

    function getModels(brand) {
        const models = {
            "All": "All",
            "Audi": [
                "A3", "A4", "A5", "A6"
            ],
            "BMW": [
                "E46", "E90", "E92", "E60"
            ],
            "Volkswagen": [
                "Golf", "Polo", "Passat"
            ]
        };

        setModels(models[brand]);
    }

    useEffect(() => {
        getBrands();
    }, []);


    return (
        <form>
            <label>
                {brand}
                <br />
                <select onChange={(e) => {
                    setBrand(e.target.value);
                    getModels(e.target.value);
                    }}>
                    <option> All </option>
                    {brands.map((item) => (
                        <option value={item}> {item} </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                {model}
                <br />
                <select onChange={(e) => setModel(e.target.value)}>
                    <option> All </option>
                    {models.map((item) => (
                        <option> {item} </option>
                    ))}
                </select>
            </label>
        </form>
    );

};

export default SearchParams;