export class Person {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public birthdate: string,
    public photo: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.photo = photo;
  }
}
