import React, { useState, useEffect } from "react";
import '../styles/cats.css'

function CatBreedDropdown({ onSelectBreed }) {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreedId, setSelectedBreedId] = useState('');

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds')
            .then((res) => res.json())
            .then((jsonData) => {
                setBreeds(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching breeds:', error);
            });
    }, []);

    const handleSelectBreedChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedBreedId(selectedValue);
        if (selectedValue === 'random') {
            onSelectBreed('');
        } else {
            const selectedBreed = breeds.find((breed) => breed.id === selectedValue);
            if (selectedBreed) {
                onSelectBreed(selectedValue);
            }
        }
    };

    return (
        <div>
            <label htmlFor="catSelect">Select a breed: </label>
            <select id="catSelect" value={selectedBreedId} onChange={handleSelectBreedChange}>
                <option value="random">Random</option>
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

    // Call loadCats only when the button is clicked
    const handleFindCatClick = () => {
        loadCats();
    };

    return (
        <div>
            <div className="cat-app-container">
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                        <p>Please wait while we fetch your cat!</p>
                    </div>
                ) : (
                    <>
                        <h2>Get random cat images</h2>
                        <div className="image-container">
                            <img src={cat} alt="" />
                        </div>
                    </>
                )}

                    <div className="bottom-section">
                        <CatBreedDropdown onSelectBreed={setSelectedBreedId} />
                        <div><button onClick={handleFindCatClick}>
                                {loading ? "Loading..." : "Find cat!"}
                            </button></div>
                        <p className="info">
                            Andrew made this website for fun, cause he was trying to learn things.</p>
                        <a href="https://github.com/androiski/cat-app" target="_self" className="hyperlink">https://github.com/androiski/cat-app</a>
                    </div>
                </div>
            </div>

    );
}

export default Cats;
