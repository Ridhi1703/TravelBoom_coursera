const button = document.getElementById("find");
const resetButton = document.getElementById("reset");
const input = document.getElementById("textsearch");

function getInfo() {
    const inputValue = input.value.trim().toLowerCase(); // Convert input to lowercase

    fetch('https://ridhi1703.github.io/travelboom_json/travel_recommendation_api.json') // Adjust URL for your local server
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let results = [];
            if (inputValue === 'countries') {
            
                data.countries.forEach(country => {
                    let countCountries = 0;
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(inputValue) && countCountries < 2) {
                            results.push(`
                                <div class=" border-b-4 flex flex-col bg-white ">
                                <div class="rounded-lg p-2 item-center justify-center w-60 h-45"> <img src="${city.imageUrl}" alt="${city.name}" class=""></div>
                                    <h2 class="   text-md font-bold">${city.name}</h2>
                                    <p class="tex-sm">${city.description}</p>
                                </div>
                            `);
                            countCountries++;
                        }
                    });
                });
            }
            // Search for beaches
            else if (inputValue === 'beaches') {
                data.beaches.slice(0, 2).forEach(beach => {
                    results.push(`
                        <div class="my-0 border-b-2 border-blue-400 bg-white">
                            <img src="${beach.imageUrl}" alt="${beach.name}" class="rounded-lg p-2 w-30 h-20">
                            <h2 class=" text-md font-bold">${beach.name}</h2>
                            <p class="tex-sm">${beach.description}</p>
                        </div>
                    `);
                });
            }
            // Search in countries
            else if (inputValue === 'temples'){
                data.temples.slice(0, 2).forEach(temple => {
                    results.push(`
                        <div class="my-0 border-b-2 border-blue-400 bg-white">
                            <img src="${temple.imageUrl}" alt="${temple.name}" class="rounded-lg p-2 w-30 h-20">
                            <h2 class=" text-md font-bold">${temple.name}</h2>
                            <p class="tex-sm">${temple.description}</p>
                        </div>
                    `);
                });
            }

            // Search in countries, temples, and beaches
           else{
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(inputValue)) {
                        results.push(`
                            <div class="my-0 border-b-2 border-blue-400 bg-white">
                                <img src="${city.imageUrl}" alt="${city.name}" class="rounded-lg p-2 w-30 h-20">
                                <h2 class=" text-md font-bold">${city.name}</h2>
                                <p class="tex-sm">${city.description}</p>
                            </div>
                        `);
                    }
                });
            });

            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(inputValue)) {
                    results.push(`
                        <div class="my-0 border-b-2 border-blue-400 bg-white">
                            <img src="${temple.imageUrl}" alt="${temple.name}" class="rounded-lg p-2 w-30 h-20">
                            <h2 class=" text-md font-bold">${temple.name}</h2>
                            <p class="tex-sm">${temple.description}</p>
                        </div>
                    `);
                }
            });

            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(inputValue)) {
                    results.push(`
                        <div class="my-0 border-b-2 border-blue-400 bg-white">
                            <img src="${beach.imageUrl}" alt="${beach.name}" class="rounded-lg p-2 w-30 h-20">
                            <h2 class=" text-md font-bold">${beach.name}</h2>
                            <p class="tex-sm">${beach.description}</p>
                        </div>
                    `);
                }
            });



           } 
            // Display results in the result div
            const resultDiv = document.getElementById('result');
            if (results.length > 0) {
                resultDiv.innerHTML = results.join('');
            } else {
                resultDiv.innerHTML = '<p class="tex-sm">No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error display if needed
        });
}

// Event listeners
button.addEventListener('click', getInfo);
resetButton.addEventListener('click', function() {
    input.value = '';
    document.getElementById('result').innerHTML = '';
});
