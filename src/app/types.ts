export type Task = {
  _id: string;
  data: { name: string; description: string; status: string; priority: string };
  __v: number;
};

export type Tasklist = Task[];
