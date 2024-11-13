const serverAddress = "http://localhost:5173";

const retrofit = async (path: string) => {
    const response = await fetch(serverAddress + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ SECRET: process.env.OLD_DATABASE_URL })
    });

    return response.json();
};

retrofit("/dev/retrofit").then(response => {
    console.log(response);
});
