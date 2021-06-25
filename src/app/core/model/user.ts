export class User {
  fName: string;
  lName: string;
  email: string;
  password: string;

  constructor(fName: string, lName: string, email: string, password: string) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.password = password;
  }
}
