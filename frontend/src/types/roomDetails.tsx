export type roomDetails = {
  uuid: string;
  users: {
    uuid: string;
    name: string;
    slicesEaten: number;
  }[];
  totalSlices: number;
};
