import CategoryProps from "./CategoryProps";

export default interface UserProps {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  categories: CategoryProps[];
}
