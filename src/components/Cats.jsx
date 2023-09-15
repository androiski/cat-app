import React, { useEffect, useState } from "react";
import '../styles/cats.css'

function CatBreedDropdown({ onSelectBreed }) {
    const [breeds, setBreeds] = useState([]); // State variable to store JSON data
    const [selectedBreedId, setSelectedBreedId] = useState('');  // State variable for selected breed ID
    const [selectedBreedName, setSelectedBreedName] = useState('');  // State variable for selected breed name

    useEffect(() => {
        // Make an API request to fetch JSON data
        fetch('https://api.thecatapi.com/v1/breeds')
            .then((res) => res.json())
            .then((jsonData) => {
                setBreeds(jsonData); // Update the state with the fetched data
            })
            .catch((error) => {
                console.error('Error fetching breeds:', error);
            });
    }, []);

    const handleSelectBreedChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedBreedId(selectedValue); // Update the selected breed ID state
        if (selectedValue === 'random') {
            onSelectBreed(''); // Set the breed ID to an empty string for "Random" option
            setSelectedBreedName('Random'); // Set the breed name to "Random"
        } else {
            const selectedBreed = breeds.find((breed) => breed.id === selectedValue);
            if (selectedBreed) {
                setSelectedBreedName(selectedBreed.name); // Update the selected breed name state
                onSelectBreed(selectedValue); // Call the callback function to update the selected breed ID in the parent component
            }
        }
    };

    return (
        <div>
            <label htmlFor="mySelect">Select a breed: </label>
            <select id="mySelect" value={selectedBreedId} onChange={handleSelectBreedChange}>
                <option value="random">Random</option> {/* "Random" option with an empty value */}
                {breeds.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

const Cats = () => {
    const [cat, setCat] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedBreedId, setSelectedBreedId] = useState('');

    const loadCats = () => {
        setLoading(true);
        // Use the selectedBreedId in the API request URL
        const url = selectedBreedId === 'random' ?
            'https://api.thecatapi.com/v1/images/search' :
            `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCat(data[0].url);
                setLoading(false);
            });
    }

    useEffect(() => {
        loadCats();
    }, [selectedBreedId]);

    return (
        <div>
            <div className="cat-app-container">
                <h2>Get random cat images</h2>
                <div className="image-container">
                    <img src={cat} alt="Cat" />
                    <div className="bottom-section">
                        <CatBreedDropdown onSelectBreed={setSelectedBreedId} />
                        <div><button onClick={loadCats}>Find cat! </button></div>
                        <p className="info">
                            Andrew made this website for fun, cause he was trying to learn things.</p>
                        <a href="https://github.com/androiski/cat-app" target="_self" className="hyperlink">https://github.com/androiski/cat-app</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cats;
