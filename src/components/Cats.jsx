import { useEffect, useState } from "react";
import '../styles/cats.css'

const Cats = () => {
    const loadCats = () => {
        setLoading(true)
        fetch("https://api.thecatapi.com/v1/images/search")
            .then((res) => res.json())
            .then((data) => {
                setCat(data[0].url)
                setLoading(false)
            });
    }
    const [cat,setCat] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {loadCats()}, []);

    if(loading) {
       return <h1>Getting cat...</h1>
    }

    return (
        <div>
            <div className="cat-app-container">
                <h2>Get random cat images</h2>
                <div className="image-container">
                    <img src={cat} alt="Cat"/>
                </div>
                <button onClick={loadCats}>Fetch cat! </button>
            </div>
        </div>
    );

}

export default Cats;
