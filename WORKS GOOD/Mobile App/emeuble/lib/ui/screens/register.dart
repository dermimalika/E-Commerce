import 'dart:convert';

import 'package:emeuble/objects/user.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class Register extends StatefulWidget {
  Register({Key? key}) : super(key: key);

  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final _formKey = GlobalKey<FormState>();
  RegisterUser user = RegisterUser("", "","","","");
  String url = "http://localhost:8080/api/register";

  Future save() async {
    var res = await http.post(Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': user.email, 'password': user.password,'phone':user.phone,'firstname':user.firstname,'familyname':user.familyname}));
    print(res.body.toString());
    if (res.body != null) {
      Navigator.pop(context);
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
                  height: 800,
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

                        Text("Register",
                            style: GoogleFonts.bebasNeue(
                              fontWeight: FontWeight.w400,
                              fontSize: 20,
                              color: Color(0xff76323f),
                            )),
                        Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "First Name",
                            style: GoogleFonts.bebasNeue(
                              // fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Color(0xff76323f),
                            ),
                          ),
                        ),
                        TextFormField(
                          controller: TextEditingController(text: user.firstname),
                          onChanged: (val) {
                            user.firstname = val;
                          },
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'First Name is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Colors.white),
                          decoration: InputDecoration(
                              icon: Icon(Icons.person_outline),

                              labelText: 'First Name',

                              errorStyle:
                              TextStyle(fontSize: 10, color: Colors.black),
                              border: OutlineInputBorder(
                                  borderSide: BorderSide.none)),
                        ),
                        Container(
                          height: 2,
                          color: Color(0xff76323f),
                        ),

                        Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "Family Name",
                            style: GoogleFonts.bebasNeue(
                              // fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Color(0xff76323f),
                            ),
                          ),
                        ),
                        TextFormField(
                          controller: TextEditingController(text: user.familyname),
                          onChanged: (val) {
                            user.familyname = val;
                          },
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'Family Name is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Colors.white),
                          decoration: InputDecoration(
                              icon: Icon(Icons.person_outline),

                              labelText: 'Family Name',

                              errorStyle:
                              TextStyle(fontSize: 10, color: Colors.black),
                              border: OutlineInputBorder(
                                  borderSide: BorderSide.none)),
                        ),
                        Container(
                          height: 2,
                          color: Color(0xff76323f),
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
                              return 'Email is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Colors.white),
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
                          color:Color(0xff76323f),
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
                              return 'Password is Empty';
                            }
                            return null;
                          },
                          style: TextStyle(fontSize: 15, color: Colors.white),
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
                        Center(
                          child: InkWell(
                            onTap: () {
                              Navigator.pop(context);
                            },
                            child: Text(
                              "Already have Account ?",
                              style: GoogleFonts.bebasNeue(
                                  fontWeight: FontWeight.bold,
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
                  height: 20,
                ),
                Container(
                  height: 60,
                  width: 130,
                  child: FlatButton(
                    color: Color(0xffffffff),
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        save();
                      }
                    },

                    child: Text('Register',
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
