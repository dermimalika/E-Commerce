class User {
  String username;
  String email;
  String password;
  String phone;


  User(this.email,this.password,this.username,this.phone );
}

class LoginUser{
  String email;
  String password;
  LoginUser(this.password,this.email);
}
class RegisterUser{
  String firstname;
  String familyname;
  String email;
  String password;
  String phone;


  RegisterUser(this.email,this.password,this.firstname,this.phone,this.familyname );
}
