import 'dart:convert';

import 'package:emeuble/ui/screens/Home.dart';
import 'package:emeuble/ui/screens/register.dart';
import 'package:emeuble/objects//user.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  LoginUser user = LoginUser("","");
  String url = "http://localhost:8080/api/login";

  Future save() async {
    var res = await http.post(Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': user.email, 'password': user.password}));
    print(res.body);
    if (res.body != null) {
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => Home(),
          ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff76323f),
      body: SingleChildScrollView(
        child: Form(
            key: _formKey,
            child: Column(
              children: [
                Container(


                  height: 750,

                  width: MediaQuery.of(context).size.width,
                  decoration: BoxDecoration(


                    color: Color(0xffffffff),
                    boxShadow: [
                      BoxShadow(
                          blurRadius: 10,
                          color: Colors.black,
                          offset: Offset(1, 5))
                    ],

                  ),


                  child: Container(


                    padding: const EdgeInsets.fromLTRB(16.0, 0,16.0, 0),
                    child: Column(

                      children: [
                        Container(
                          height:200,
                          width: 200.0,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: AssetImage('assets/images/E-meuble.png'),),),
                        ),

                        Text("Login",
                            style: GoogleFonts.bebasNeue(
                              fontWeight: FontWeight.w400,
                              fontSize: 20,

                              color: Color(0xff76323f),
                            )),
                        SizedBox(
                          height: 50,
                        ),
                        Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "Email",
                            style: GoogleFonts.bebasNeue(
                              // fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Color(0xff76323f),
                            ),
                          ),
                        ),
                        TextFormField(

                          controller: TextEditingController(text: user.email),
                          onChanged: (val) {
                            user.email = val;
                          },
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'Password is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Color(0xff76323f)),
                          decoration: InputDecoration(
                              icon: Icon(Icons.email_outlined),

                              labelText: 'Email',
                              errorStyle:
                              TextStyle(fontSize: 10, color: Colors.black),
                              border: OutlineInputBorder(
                                  borderSide: BorderSide.none)),
                        ),
                        Container(

                          height: 2,
                          color: Color(0xff76323f),
                        ),
                        SizedBox(
                          height: 60,
                        ),
                        Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "Password",
                            style: GoogleFonts.bebasNeue(
                              // fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Color(0xff76323f),
                            ),
                          ),
                        ),
                        TextFormField(
                          obscureText: true,
                          controller:
                          TextEditingController(text: user.password),
                          onChanged: (val) {
                            user.password = val;
                          },
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'Email is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Color(0xff76323f)),
                          decoration: InputDecoration(
                              icon: Icon(Icons.lock_outline),
                              labelText: 'password',
                              errorStyle:
                              TextStyle(fontSize: 10, color: Colors.black),
                              border: OutlineInputBorder(
                                  borderSide: BorderSide.none)),
                        ),
                        Container(
                          height: 2,
                          color: Color(0xff76323f),
                        ),
                        SizedBox(
                          height: 40,
                        ),
                        InkWell(


                          child: Text("Forgot Password?",
                              style: GoogleFonts.bebasNeue(
                                fontWeight: FontWeight.w400,
                                fontSize: 17,
                                color: Color(0xff76323f),
                              ),textAlign:TextAlign.left),
                          onTap: () {

                          },
                        )


                        ,
                        Center(
                          heightFactor: 4.3,
                          child: InkWell(
                            onTap: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => Register()));
                            },
                            child: Text(
                              "Dont have Account ?",
                              style: GoogleFonts.bebasNeue(
                                  fontWeight: FontWeight.w400,
                                  fontSize: 20,
                                  color: Color(0xff76323f)),
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: 40,
                ),
                Container(
                  height: 70,
                  width: 200,
                  child: FlatButton(
                    color: Color(0xffffffff),

                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        save();
                      }
                    },

                    child:Text('Login',
                      style: GoogleFonts.bebasNeue(
                        fontWeight: FontWeight.normal,
                        fontSize: 20,
                        color: Color(0xff76323f),) ,),

                  ),
                )
              ],
            )),
      ),
    );
  }
}
