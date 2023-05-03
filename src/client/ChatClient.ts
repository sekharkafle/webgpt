
import axios from 'axios'
const url = """;
export const sendMessage = async (message) => {
    const body = { domain:"wiki", question:message.text } ;
    const response = await axios.post(url, body);
    return response.data.text;
}