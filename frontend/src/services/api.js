
const fetchStockPrediction = async (ticker) => {
    // Dynamically pull the URL from the .env file
    const baseUrl = import.meta.env.VITE_API_URL;
    
    const response = await fetch(`${baseUrl}/predict?ticker=${ticker}`);
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    
    return await response.json();
};

export default fetchStockPrediction