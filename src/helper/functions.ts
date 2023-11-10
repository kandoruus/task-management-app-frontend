import { Task } from 'app/types';
import axios from 'axios';
import { GET_ALL_TASKS_API } from 'helper/constants';

export const fetchTasklistFromDB = async (): Promise<Task[]> => {
  return (await axios.get(GET_ALL_TASKS_API)).data || [];
};
