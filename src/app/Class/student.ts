import { Address } from "./address";
import { Department } from "./department";
import { MobileNumber } from "./mobile-number";
import { Teacher } from "./teacher";

export class Student {
  "id": number;
  "name": string;
  "age": number;
  "department": Department; // Add this line to include the department relationship
  "mobileNumbers":MobileNumber[];
  "teachers":Teacher[];
  "addresses":Address[];
}
