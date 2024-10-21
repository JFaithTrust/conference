import { DirectionType } from "../types";
import axios from "axios";
export const getDirectionByConferenceId = async (
  id: number
): Promise<DirectionType[]> => {
  const { data } = await axios.get(`/api/direction/byConference/${id}`);
  return data;
};

export const getAllDirections = async (): Promise<DirectionType[]> => {
  const { data } = await axios.get(`/api/direction/all`);
  return data;
};
