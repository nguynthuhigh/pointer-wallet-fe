import axios from "axios";

const transactionInstance = axios.create({
    baseURL: 'https://api-presspay.azurewebsites.net/api/v1/user/',
    headers: {
        "Content-Type": 'application/json',
    },
});

export default transactionInstance