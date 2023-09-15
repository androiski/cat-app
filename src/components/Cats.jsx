import { useEffect, useState } from "react";
import '../styles/cats.css'


function CatBreedDropdown() {
    const [breed, setBreed] = useState([]); //state variable to store JSON data
    const [selectedOption, setSelectedOption] = useState('');  // State variable for selected option

    useEffect(() => {
        // Make an API request to fetch JSON data
        fetch('https://api.thecatapi.com/v1/breeds').then((res) => res.json()).then((jsonData) => {
            setBreed(jsonData) // Update the state with the fetched data
            console.log('Data from JSON:', jsonData);
        })
            .catch((error) => {
                console.error('Error fetching breed:', error);

            });
    }, []);

    const handleSelectBreedChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option state
    };

    return (
        <div>
            <label htmlFor="mySelect">Select a breed:</label>
            <select id="mySelect" value={selectedOption} onChange={handleSelectBreedChange}>
                <option value="">Select an option</option>
                {breed.map((item) => (
                    <option key={item.id} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
        <p>Selected Option: {selectedOption}</p>
        </div>
    );

}



const Cats = () => {
    const loadCats = () => {
        setLoading(true)
        fetch("https://api.thecatapi.com/v1/images/search?breed_ids=")
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
                        <CatBreedDropdown />
                    <div><button onClick={loadCats}>Find cat! </button></div>
                    <p className="info">
                        Andrew made this website for fun, cause he was trying to learn things.</p>
                    <a href = "https://github.com/androiski/cat-app://www.tutorialspoint." target = "_self" className="hyperlink">https://github.com/androiski/cat-app</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Cats;
