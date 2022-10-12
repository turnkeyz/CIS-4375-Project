const Categories = require("../model/categories.model");

// add category to db
exports.insertNewCategories = async (req, res) => {
    const obj = await Categories.insertCategories(req.body);
    res.send(obj);
};

// fetch all categories from 
exports.getAllCategories = async (req, res) => {
  const obj = await Categories.findAllFromCategories();
  res.send(obj);
};

// get one category
exports.getCategory = async (req, res) => {
    const obj = await Categories.findCategory(req.params.cat_id);
    res.send(obj);
};

// update category
exports.updateCategories = async (req, res) => {
    const obj = await Categories.updateCategories(req.params.cat_id, req.body);
    res.send(obj);
};

// delete category
exports.deleteCategories = async (req, res) => {
    const obj = await Categories.deleteCategoriesById(req.body);
    res.send(obj);
};