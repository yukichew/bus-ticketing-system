import api from ".";
import { catchError } from "../utils/error";

export const getPassengerList = async (token, busScheduleID) => {
    try {
        const { data } = await api.get(`/Seat/PassengerList`, {
            params: { busScheduleId: busScheduleID },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    } catch (err) {
        return catchError(err);
    }
};