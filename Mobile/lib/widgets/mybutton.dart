import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../constant.dart';

class MyButton extends StatelessWidget {
  final Function onPressed;
  final String name;
  MyButton({this.name, this.onPressed});
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 45,
      width: double.infinity,
      child: FlatButton(
        child: Text(
          name,
           style: GoogleFonts.bebasNeue(
        fontWeight: FontWeight.w400,
          fontSize: 30,
          color:MyColors.oxblood,
        )
        ),

        onPressed: onPressed,
      ),
    );
  }
}
