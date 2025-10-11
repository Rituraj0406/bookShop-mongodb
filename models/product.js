const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(String(id)) : null; // if no id, it will be null
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOperation;
    if(this._id){
      // update product
      dbOperation = db
        .collection('products')
        .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOperation = db
        .collection('products')
        .insertOne(this);
    }
    return dbOperation
      .then(result => {
        console.log('Product created:', result);
      })
      .catch(err => console.log(err));
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(product => {
        console.log('Fetched products:', product);
        return product;
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({_id: new mongodb.ObjectId(String(prodId))})
      .next()
      .then(product => {
        console.log('Fetched product:', product);
        return product;
      })
      .catch(err => console.log(err));
  }

  static deleteById(prodId){
    const db = getDb();
    return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectId(String(prodId))})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => console.log(err));
  }

}

module.exports = Product;