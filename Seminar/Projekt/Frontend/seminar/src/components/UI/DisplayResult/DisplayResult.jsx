import { useEffect, useState } from "react";
import styles from "./DisplayResult.module.css"
import ItemCard from "../../UI/ItemCard/ItemCard";

export default function DisplayResult(props) {

    const [products, setProducts] = useState(props.products);

    return (
        <div id={styles.scrollable}>
                <div id={styles.itemContainer}>
                  {products.map((item, key) => (
                    <div id={styles.item} key={key}>
                      <ItemCard
                        id={item._id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        type="product"
                      />
                    </div>
                  ))}
                </div>
        </div>
    );
}