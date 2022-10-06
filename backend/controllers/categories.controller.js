const Categories = require("../model/categories.model");

// NODEJS CALL REST API TO INSSERT NEW Categories
exports.insertNewCategories = async (req, res) => {
    const obj = await Categories.insertCategories(req.body);
    res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getAllCategories = async (req, res) => {
  const obj = await Categories.findAllFromCategories();
  res.send(obj);
};

// NODEJS CALL REST API TO FETCH ALL DATA
exports.getCategory = async (req, res) => {
    const obj = await Categories.findCategory(req.params.cat_id);
    res.send(obj);
};

// NODEJS CALL REST API FOR UPDATE
exports.updateCategories = async (req, res) => {
    const obj = await Categories.updateCategories(req.params.cat_id, req.body);
    res.send(obj);
};

// NODEJS CALL REST API FOR DELETE
exports.deleteCategories = async (req, res) => {
    const obj = await Categories.deleteCategoriesById(req.body);
    res.send(obj);
};