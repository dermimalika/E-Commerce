import 'package:app/constant.dart';

class Product {
  final int id;
  final double price, rating;
  final String name, description,  image;
  List<dynamic> feedbacks;

  Product({
    this.id,
    this.price,
    this.rating,
    this.name,
    this.description,

    this.image,
    this.feedbacks,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      feedbacks: json['feedbacks']['feedbacks'],
      description: json['description'],
      id: json['id'],
      image: "$baseServerUrl${json['image']['url']}",

      name: json['name'],
      price: json['price'].toDouble(),
      rating: json['rating'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'price': price,
        'rating': rating,
        'name': name,
        'description': description,

        'image': image,
        'feedbacks': feedbacks,
      };
}
