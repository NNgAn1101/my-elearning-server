// backend/utils/helper.js

// Hàm tự động tìm ID lớn nhất và cộng thêm 1
const getNextId = async (Model) => {
    const lastItem = await Model.findOne().sort({ _id: -1 });
    return lastItem ? lastItem._id + 1 : 1;
};

module.exports = { getNextId };