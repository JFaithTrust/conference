import $auth  from '@/http/auth';
import { DirectionType } from "@/types";


export const getDirectionByConferenceId = async (
  id: number
): Promise<DirectionType[]> => {
 
  const { data } = await $auth.get(`/direction/byConference/${id}`);
  return data;
};

export const getAllDirections = async (): Promise<DirectionType[]> => {
  const { data } = await $auth.get(`/direction/all`);
  return data;
};
