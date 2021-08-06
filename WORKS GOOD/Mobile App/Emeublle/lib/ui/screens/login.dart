import 'package:app/constant.dart';
import 'package:app/ui/screens/forgotpassword.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:app/services/auth.dart';
import 'package:google_fonts/google_fonts.dart';


class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    String _username, _password;
    return Scaffold(
      backgroundColor: MyColors.grain,
      body: SafeArea(
        child: Center(

          child: ListView(
            shrinkWrap: true,
            padding: const EdgeInsets.all(15.0),
            children: <Widget>[
              Container(
                height:200,
                width: 200.0,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/images/E-meuble.png'),),),
              ),
              Text(
                "Login",
                style: GoogleFonts.bebasNeue(
                  fontWeight: FontWeight.w400,
                  fontSize: 20,
                  color: Color(0xffffffff),
                )


              ),
              SizedBox(height: 9),
              Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    TextFormField(
                      onSaved: (value) => _username = value,
                      validator: (value) {
                        if (value.isEmpty)
                          return "Cannot be empty";
                        else
                          return null;
                      },
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintStyle: TextStyle(color: Colors.white70),
                        hintText: "Username",
                        fillColor: Colors.white.withOpacity(.1),
                        filled: true,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(35),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                    SizedBox(height: 11),
                    TextFormField(
                      onSaved: (value) => _password = value,
                      validator: (value) {
                        if (value.isEmpty)
                          return "Cannot be empty";
                        else
                          return null;
                      },
                      style: TextStyle(color: Colors.white),
                      obscureText: true,
                      decoration: InputDecoration(
                        hintStyle: TextStyle(color: Colors.white70),
                        hintText: "Password",
                        fillColor: Colors.white.withOpacity(.1),
                        filled: true,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(35),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: FlatButton(
                  child: Text(
                    "Forgot Password?",
                    style: GoogleFonts.bebasNeue(
                      fontWeight: FontWeight.w400,
                      fontSize: 20,
                      color: MyColors.oxblood,
                    )
                  ),
                  onPressed: ()  {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context)=>ForgotpasswordScreen()));





                  },
                ),
              ),
              Consumer<AuthService>(
                builder: (context, snapshot, _) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      if (snapshot.status == LoginStatus.error)
                        Text(
                          "${snapshot.error}",
                          style: TextStyle(color: Colors.red),
                        ),
                      SizedBox(
                        width: double.infinity,
                        child: RaisedButton(
                          child: snapshot.status == LoginStatus.loading
                              ? SizedBox(
                                  height: 15,
                                  width: 15,
                                  child: CircularProgressIndicator(),
                                )
                              : Text(
                                  "Sign In",
                              style: GoogleFonts.bebasNeue(
                                fontWeight: FontWeight.w400,
                                fontSize: 20,
                                color: Color(0xffd8cdc7),
                              )
                                ),
                          onPressed: () async {
                            if (_formKey.currentState.validate()) {
                              _formKey.currentState.save();
                              if (await snapshot.login(
                                  password: _password, username: _username))
                                Navigator.pushReplacementNamed(context, 'home');
                            }
                          },
                          color: MyColors.oxblood,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
              SizedBox(height: 11),
              Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      height: 3,
                      color: Colors.white,
                    ),
                  ),
                  SizedBox(width: 9),
                  Text(
                    "or",
                    style: GoogleFonts.bebasNeue(
                      fontWeight: FontWeight.w400,
                      fontSize: 20,
                      color: Color(0xffffffff),
                    )
                  ),
                  SizedBox(width: 9),
                  Expanded(
                    child: Container(
                      height: 3,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "Don't have an account?",
                      style: GoogleFonts.bebasNeue(
                        fontWeight: FontWeight.w400,
                        fontSize: 20,
                        color: Color(0xffffffff),
                      )
                  ),
                  FlatButton(
                    child: Text(
                      "Sign Up",
                        style: GoogleFonts.bebasNeue(
                          fontWeight: FontWeight.w400,
                          fontSize: 20,
                          color:MyColors.oxblood,
                        )
                    ),
                    onPressed: () {
                      Provider.of<AuthService>(context, listen: false).clear();
                      Navigator.pushNamed(context, 'signup');
                    },
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
