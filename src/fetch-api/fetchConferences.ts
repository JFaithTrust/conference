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

export const deleteDirection = async (id: string) => {
  const response = await fetch(`/api/directions/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete the direction');
  }

  return response.json();
};