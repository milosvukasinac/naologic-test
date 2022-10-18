// Interface for the Person
export interface Person {
  name: string;
  type: string;
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
  selected?: boolean;
  expandChildren?: boolean;
  children?: Person[]
}
