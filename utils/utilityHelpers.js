export const responseLog = (res, message) => {
    console.log("Response:", message);
    return res.json(message);
};

export const capEachWord = (str) => {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};