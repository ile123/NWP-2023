import React, { useEffect, useState } from "react";

const useDropdown = (o, initialValue) => {
    const [selectedState, setSelectedState] = useState(initialValue)
    const [options, setOptions] = useState([])

    useEffect(() => {
        setOptions(o);
      }, [o]);

   const Dropdown = () => (
        <div>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">"----"</option>
            {options.map((option)=> (
                <option key={option} value={option}>{option}</option>)
            )}
        </select>
        </div>
    )
    return [Dropdown, selectedState, setOptions]

}

export default useDropdown;