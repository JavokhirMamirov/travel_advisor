import axios from 'axios';


export const getPlacesData = async (type, sw, ne) => {
    try{
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '6974b1f123mshfdc0036caae5a1ap1cdbe2jsn9d5ba8cdad61'
            }
          });
        return data;
    }catch (error) {
        console.log(error)
    }
}