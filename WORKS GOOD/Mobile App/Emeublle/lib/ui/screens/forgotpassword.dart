import 'package:app/constant.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:app/services/auth.dart';

class ForgotpasswordScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    String _email;
    return Scaffold(
      backgroundColor: MyColors.grain,
      body: SafeArea(
        child: Center(
          child: ListView(
            shrinkWrap: true,
            padding: const EdgeInsets.all(15.0),
            children: <Widget>[
              Text(
                "Change Password",
                  style:GoogleFonts.bebasNeue(
            fontWeight: FontWeight.w400,
            fontSize: 20,
            color: Color(0xffffffff),
          ),


              ),
              SizedBox(height: 9),
              Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    TextFormField(
                      onSaved: (value) => _email = value,
                      validator: (value) {
                        if (value.isEmpty)
                          return "Cannot be empty";
                        else
                          return null;
                      },
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintStyle: TextStyle(color: Colors.white70),
                        hintText: "Email",
                        fillColor: Colors.white.withOpacity(.1),
                        filled: true,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(35),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                    SizedBox(height: 11),

                  ],
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
                            "Reset Password",
                              style: GoogleFonts.bebasNeue(
                                fontWeight: FontWeight.w400,
                                fontSize: 20,
                                color: Color(0xffffffff),
                              )
                          ),
                          onPressed: () async {


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


            ],
          ),
        ),
      ),
    );
  }
}
