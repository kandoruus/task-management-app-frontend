export type Task = {
  _id: string;
  data: { name: string; description: string; status: string; priority: string };
};

export type Tasklist = Task[];
