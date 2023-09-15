import { useEffect, useState } from "react";
import { Breed, TheCatAPI } from "@thatapicompany/thecatapi";
import '../styles/cats.css'


const theCatAPI = new TheCatAPI(process.env.REACT_APP_CATAPI_KEY);

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
                    <img src={cat} alt="Cat" />
                    <div className="bottom-section">
                    <div><button onClick={loadCats}>Find cat! </button></div>
                    <p className="info">
                        Andrew made this website for fun, cause he was trying to learn things.</p>
                    <a href = "https://github.com/androiski/cat-app" target = "_self" className="hyperlink">https://github.com/androiski/cat-app</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Cats;
