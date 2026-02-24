import axios from "axios";

const url="http://127.0.0.1:8000/predict_churn"
const HandleApi = async (data) =>{
    try{
        const response= await axios.post(url,data);
        console.log(response.data)
        return response.data
    } catch(error){
        console.log("Error during prediction:",error);
        throw(error)
    }
};


export default HandleApi;
