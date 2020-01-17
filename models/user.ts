export type SerializedUserType = {
  pk: string;
  sk: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type UserType = {
  Item: {
    PK: { S: string };
    SK: { S: string };
    email: { S: string };
    password: { S: string };
    firstName: { S: string };
    lastName: { S: string };
    dateOfBirth: { S: string };
  };
};

interface SerializeInterface {
  ({ Item }: UserType): SerializedUserType;
}

const serialize: SerializeInterface = ({ Item }) => {
  const user: SerializedUserType = {
    pk: Item.PK.S,
    sk: Item.SK.S,
    email: Item.email.S,
    password: Item.password.S,
    firstName: Item.firstName.S,
    lastName: Item.lastName.S,
    dateOfBirth: Item.dateOfBirth.S,
  };

  return user;
};

function User(data: SerializedUserType): void {
  this.PK.S = data.pk;
  this.SK.S = data.sk;
  this.email.S = data.email;
  this.password.S = data.password;
  this.firstName.S = data.firstName;
  this.lastName.S = data.lastName;
  this.dateOfBirth.S = data.dateOfBirth;
}

User.serialize = serialize;

export default User;
