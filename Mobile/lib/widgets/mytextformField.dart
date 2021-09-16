import 'package:e_commerce/constant.dart';
import 'package:flutter/material.dart';

class MyTextFormField extends StatelessWidget {
  final TextEditingController controller;
  final String name;

  MyTextFormField({
    this.controller,
    this.name,
  });
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      style: TextStyle(color: Colors.black),
      decoration: InputDecoration(
        hintStyle: TextStyle(color:MyColors.tan),
        hintText: name,
        fillColor: Colors.white.withOpacity(.4),
        filled: true,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(35),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }
}
