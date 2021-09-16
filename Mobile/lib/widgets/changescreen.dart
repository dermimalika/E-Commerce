import 'package:e_commerce/constant.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ChangeScreen extends StatelessWidget {
  final String whichAccount;
  final Function onTap;
  final String name;
  ChangeScreen({this.name, this.onTap,this.whichAccount});
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        children: <Widget>[
          Text(whichAccount,
              style: GoogleFonts.bebasNeue(
                fontWeight: FontWeight.w400,
                fontSize: 20,
                color: Color(0xffffffff),
              )
          ),
          SizedBox(
            width: 10,
          ),
          GestureDetector(
            onTap: onTap,
            child: Text(
              name,
                style: GoogleFonts.bebasNeue(
                  fontWeight: FontWeight.w400,
                  fontSize: 20,
                  color: MyColors.oxblood,
                )
            ),
          ),
        ],
      ),
    );
  }
}
