
export interface Pledge {
  id: number;
  text: string;
  explanation: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  pledges: Pledge[];
}

export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  photo?: string;
  customPledge?: string;
}

export enum Step {
  Hero,
  Selection,
  Form,
  Preview,
  Success
}
