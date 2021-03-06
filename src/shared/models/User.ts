export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  streetNumber: string;
  phone: string;
  postalCode: number;
  email: string;
  gender: string;
  image: string;
  password?: string;
}
