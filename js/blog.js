fetch("./blogData.json")  // ✅ Corrected Path
    .then(response => response.json())
    .then(data => { 
        // Rest of the code...
    })
    .catch(error => console.error("Error loading blog posts:", error));
