export default function User(data) {};

User.serialize = ({ Item: item }) => {
  return {
    pk: item.PK.S,
    sk: item.SK.S,
    email: item.email.S,
    password: item.password.S,
    firstName: item.firstName.S,
    lastName: item.lastName.S,
    dateOfBirth: item.dateOfBirth.S,
  };
}
