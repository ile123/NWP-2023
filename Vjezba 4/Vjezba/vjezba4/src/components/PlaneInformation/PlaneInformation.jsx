import { useEffect, useState } from "react";
import styles from './PlaneInformation.module.css'
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export default function PlaneInformation() {

    const [planeInformation, setPlaneInformation] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { plane } = useParams();

    useEffect(() => {
        fetch("https://demo7777620.mockable.io/plane/" + plane)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                setNotFound(true);
                return;
            }
        })
        .then(result => {
            if(result !== undefined) {
                setPlaneInformation(result.data)
            }
        });
    }, [plane]);

    if(notFound) return <NotFound />

    return(
        <>
            <div id={styles.container}>
                <img src={planeInformation.image} alt={planeInformation.name} />
                <h3>{planeInformation.name}</h3>
            </div>
        </>
    );
}