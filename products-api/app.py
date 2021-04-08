from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

#  init app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db
db = SQLAlchemy(app)
# init ma
ma = Marshmallow(app)

# models
class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(128), nullable=False, unique=True)
  price = db.Column(db.Float)
  stocked = db.Column(db.Boolean)
  category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
  category = db.relationship('Category', backref=db.backref('category', lazy=True))

  def __init__(self, name, price, stocked, category):
    self.name = name
    self.price = price
    self.stocked = stocked
    self.category = category
  
  def __repr__(self):
    return f'{self.name}'
  
  def is_valid(self):
    if self.name is None or self.price is None or self.stocked is None or self.category is None:
      return False
    return True


class Category(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(128))
  # products = db.relationship('Product', backref='category', lazy=True)

  def __init__(self, name):
    self.name = name
  
  def __repr__(self):
    return f'{self.name}'

  def is_valid(self):
    if self.name is None:
      return False
    return True

# schemas
class ProductSchema(ma.Schema):
  class Meta:
    # fields to expose
    fields = ('id', 'name', 'price', 'stocked', 'category_id')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class CategorySchema(ma.Schema):
  class Meta:
    # fields to expose
    fields = ('id', 'name')

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


# routes
@app.route("/api/products/", methods=['GET'])
def get_all_products():
  all_products = Product.query.all()
  return products_schema.jsonify(all_products)


@app.route("/api/products/<int:id>/", methods=['GET'])
def get_product(id):
  product = Product.query.get(id)

  if product is not None:
    return product_schema.jsonify(product)
  
  return jsonify({"error": "No se encontro el producto"}), 404


@app.route("/api/products/<string:filter>/", methods=['GET'])
def filter_product(filter):
  print(filter)
  products = Product.query.filter(Product.name.contains(filter))

  if products is not None:
    return products_schema.jsonify(products)
  
  return jsonify({"error": "No hay ninguna coincidencia"})
  

@app.route("/api/products/", methods=['POST'])
def save_product():
  name = request.json['name']
  price = request.json['price']
  stocked = request.json['stocked']
  category_id = request.json['category_id']

  category = Category.query.get(category_id)

  new_product = Product(name=name, price=price, stocked=stocked, category=category)

  if new_product.is_valid():

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)
  
  return jsonify({'error': 'No se pudo guardar'}), 500


@app.route("/api/products/<int:id>/", methods=['PUT'])
def update_product(id):

  old_product = Product.query.get(id)

  name = request.json['name']
  price = request.json['price']
  stocked = request.json['stocked']
  category_id = request.json['category_id']

  category = Category.query.get(category_id)

  old_product.name = name
  old_product.price = price
  old_product.stocked = stocked
  old_product.category = category

  if old_product.is_valid():

    db.session.commit()

    return product_schema.jsonify(old_product)
  
  return jsonify({'error': 'No se pudo actualizar'})


@app.route("/api/products/<int:id>/", methods=['DELETE'])
def delete_product(id):
  product = Product.query.get(id)

  if product is not None:
    db.session.delete(product)
    db.session.commit()

    return product_schema.jsonify(product)
  
  return jsonify({"error": "No se pudo eliminar"})


@app.route("/api/categories/", methods=['GET'])
def get_all_categories():
  all_categories = Category.query.all()
  return categories_schema.jsonify(all_categories)


@app.route("/api/categories/<int:id>/", methods=['GET'])
def get_category(id):
  category = Category.query.get(id)

  if category is not None:
    return category_schema.jsonify(category)
  
  return jsonify({"error": "No se encontro la categoria"}), 404


@app.route("/api/categories/", methods=['POST'])
def save_category():
  name = request.json['name']

  new_category = Category(name=name)

  if new_category.is_valid():

    db.session.add(new_category)
    db.session.commit()

    return category_schema.jsonify(new_category)
  
  return jsonify({'error': 'No se pudo guardar'}), 500


@app.route("/api/categories/<int:id>/", methods=['PUT'])
def update_category(id):

  old_category = Category.query.get(id)

  name = request.json['name']

  old_category.name = name

  if new_category.is_valid():

    db.session.commit()

    return category_schema.jsonify(old_category)
  
  return jsonify({'error': 'No se pudo actualizar'}), 500


@app.route("/api/categories/<int:id>/", methods=['DELETE'])
def delete_category(id):
  category = Category.query.get(id)

  if category is not None:
    db.session.delete(category)
    db.session.commit()

    return category_schema.jsonify(category)
  
  return jsonify({"error": "No se pudo eliminar"}), 404

# run app
if __name__ == '__main__':
  app.run(debug=True)