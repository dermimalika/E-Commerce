import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:e_commerce/model/categoryicon.dart';
import 'package:e_commerce/model/product.dart';
import 'package:flutter/material.dart';

class CategoryProvider with ChangeNotifier {
  List<Product> bed = [];
  Product bedData;
  List<Product> chaire = [];
  Product chaireData;
  List<Product> lamps = [];
  Product lampsData;
  List<Product> table = [];
  Product tableData;


  List<CategoryIcon> chaireIcon = [];
  CategoryIcon chaireiconData;

  Future<void> getChaireIconData() async {
    List<CategoryIcon> newList = [];
    QuerySnapshot chaireSnapShot = await FirebaseFirestore.instance
        .collection("categoryicon")
        .doc("bpETPDU4dP0k4bnyCtFc")
        .collection("chaire")
        .get();
    chaireSnapShot.docs.forEach(
          (element) {
        chaireiconData = CategoryIcon(image: element.data()["image"]);
        newList.add(chaireiconData);
      },
    );
    chaireIcon = newList;
    notifyListeners();
  }

  List<CategoryIcon> get getChaireIcon {
    return chaireIcon;
  }

  List<CategoryIcon> bedIcon = [];
  CategoryIcon bediconData;
  Future<void> getBedIcon() async {
    List<CategoryIcon> newList = [];
    QuerySnapshot bedSnapShot = await FirebaseFirestore.instance
        .collection("categoryicon")
        .doc("bpETPDU4dP0k4bnyCtFc")
        .collection("bed")
        .get();
    bedSnapShot.docs.forEach(
          (element) {
        bediconData = CategoryIcon(image: element.data()["image"]);
        newList.add(bediconData);
      },
    );
    bedIcon = newList;
    notifyListeners();
  }

  List<CategoryIcon> get getBedIconData {
    return bedIcon;
  }

  List<CategoryIcon> lampsIcon = [];
  CategoryIcon lampsiconData;
  Future<void> getlampsIconData() async {
    List<CategoryIcon> newList = [];
    QuerySnapshot lampsSnapShot = await FirebaseFirestore.instance
        .collection("categoryicon")
        .doc("bpETPDU4dP0k4bnyCtFc")
        .collection("lamps")
        .get();
    lampsSnapShot.docs.forEach(
          (element) {
        lampsiconData = CategoryIcon(image: element.data()["image"]);
        newList.add(lampsiconData);
      },
    );
    lampsIcon = newList;
    notifyListeners();
  }

  List<CategoryIcon> get getShoeIcon {
    return lampsIcon;
  }

  List<CategoryIcon> tableIcon = [];
  CategoryIcon tableiconData;
  Future<void> getTableIconData() async {
    List<CategoryIcon> newList = [];
    QuerySnapshot tableSnapShot = await FirebaseFirestore.instance
        .collection("categoryicon")
        .doc("bpETPDU4dP0k4bnyCtFc")
        .collection("table")
        .get();
    tableSnapShot.docs.forEach(
          (element) {
        tableiconData = CategoryIcon(image: element.data()["image"]);
        newList.add(tableiconData);
      },
    );
    tableIcon = newList;
    notifyListeners();
  }

  List<CategoryIcon> get getTableIcon {
    return tableIcon;
  }





  Future<void> getBedData() async {
    List<Product> newList = [];
    QuerySnapshot bedSnapShot = await FirebaseFirestore.instance
        .collection("category")
        .doc("gWXoWmZkecoVcnSgNJfc")
        .collection("beds")
        .get();
    bedSnapShot.docs.forEach(
          (element) {
        bedData = Product(
            image: element.data()["image"],
            name: element.data()["name"],
            price: element.data()["price"]);
        newList.add(bedData);
      },
    );
    bed = newList;
    notifyListeners();
  }

  List<Product> get getBedList {
    return bed;
  }

  Future<void> getChaireData() async {
    List<Product> newList = [];
    QuerySnapshot bedSnapShot = await FirebaseFirestore.instance
        .collection("category")
        .doc("gWXoWmZkecoVcnSgNJfc")
        .collection("chaire")
        .get();
    bedSnapShot.docs.forEach(
          (element) {
        bedData = Product(
            image: element.data()["image"],
            name: element.data()["name"],
            price: element.data()["price"]);
        newList.add(bedData);
      },
    );
    chaire = newList;
    notifyListeners();
  }

  List<Product> get getChaireList {
    return chaire;
  }

  Future<void> getLampsData() async {
    List<Product> newList = [];
    QuerySnapshot bedSnapShot = await FirebaseFirestore.instance
        .collection("category")
        .doc("gWXoWmZkecoVcnSgNJfc")
        .collection("lamps")
        .get();
    bedSnapShot.docs.forEach(
          (element) {
        bedData = Product(
            image: element.data()["image"],
            name: element.data()["name"],
            price: element.data()["price"]);
        newList.add(bedData);
      },
    );
    lamps = newList;
    notifyListeners();
  }

  List<Product> get getlampsList {
    return lamps;
  }

  Future<void> getTableData() async {
    List<Product> newList = [];
    QuerySnapshot bedSnapShot = await FirebaseFirestore.instance
        .collection("category")
        .doc("gWXoWmZkecoVcnSgNJfc")
        .collection("tables")
        .get();
    bedSnapShot.docs.forEach(
          (element) {
        bedData = Product(
            image: element.data()["image"],
            name: element.data()["name"],
            price: element.data()["price"]);
        newList.add(bedData);
      },
    );
    table = newList;
    notifyListeners();
  }

  List<Product> get getTableList {
    return table;
  }



  List<Product> searchList;
  void getSearchList({List<Product> list}) {
    searchList = list;
  }

  List<Product> searchCategoryList(String query) {
    List<Product> searchBed = searchList.where((element) {
      return element.name.toUpperCase().contains(query) ||
          element.name.toLowerCase().contains(query);
    }).toList();
    return searchBed;
  }
}
