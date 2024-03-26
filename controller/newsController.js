const { News , Category} = require('../model/model');

const newsController = {
    //POST NEWS
    addNews: async (req, res) => {
        try {
            // Dữ liệu từ yêu cầu có thể được truy cập thông qua req.body
            const news = new News(req.body);
            console.log(req.body)
            // const saveNews = await news.save();//phương thức save() được sử dụng để lưu một đối tượng vào cơ sở dữ liệu MongoDB
            // if (req.body.category) {
            //     const category = await Category.findById(req.body.category);
            //     await category.updateOne({ $push: { news: saveNews._id } });
            // }
            // res.status(200).json(saveNews);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllNews: async (req, res) => {
        try {
            const news = await News.find().populate('category')
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET ALL NEWS
    getAnNews: async (req, res) => {
        try {
            const news = await News.findById(req.params.id).populate('category')
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateNews: async (req,res) => {
        try {
            const news = await News.findById(req.params.id);
            await news.updateOne({ '$set': req.body });
            res.status(200).json("Update SuccessFully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteNews: async (req, res) => {
        try {
            // Loại bỏ ID của tin tức khỏi mảng 'news' trong các documents của collection 'Category'
            await Category.updateMany({ news: req.params.id }, { $pull: { news: req.params.id } });
    
            // Xóa tin tức khỏi collection 'News' dựa trên ID
            await News.findByIdAndDelete(req.params.id);
    
            // Trả về phản hồi thành công nếu không có lỗi
            res.status(200).send('Bản ghi đã được xóa thành công');
        } catch (error) {
            // Trả về phản hồi lỗi nếu có lỗi xảy ra
            res.status(500).json(error);
        }
    }
    
}
module.exports = newsController