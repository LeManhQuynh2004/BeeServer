const {Booking , User} = require('../model/model')

const bookingController = {
    //POST 
    addBooking : async (req,res) =>{
        try {
            console.log(req.body);
            const newBooking = new Booking(req.body)
            const saveBooking = await newBooking.save()
            if(req.body.user){
                const user = await User.findById(req.body.user);
                await user.updateOne({ $push: { bookings: saveBooking._id} });
            }
            res.status(200).json(saveBooking)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //GET ALL
    getAllBooking : async (req,res) => {
        try {
            const bookings = await Booking.find().populate('user')
            res.status(200).json(bookings)
        } catch (error) {
            res.status(500).json(error);    
        }
    },
    //GET AN BOOKING
    getAnBooking : async (req,res) => {
        try {
            const booking = await Booking.findById(req.params.id).populate('user')
            res.status(200).json(booking)
        } catch (error) {
            res.status(500).json(error);    
        }
    },
    //UPDATE
    updateBooking : async (req,res) => {
        try {
            const booking = await Booking.findById(req.params.id).populate('user')
            await booking.updateOne({ '$set': req.body });
            res.status(200).json("Update SuccessFully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteBooking: async (req, res) => {
        try {
            // Remove the booking ID from the bookings array in all users
            await User.updateMany(
                { bookings: req.params.id }, // Find users with the booking ID
                { $pull: { bookings: req.params.id } } // Pull the booking ID from the array
            );
    
            // Delete the booking
            await Booking.findByIdAndDelete(req.params.id);
    
            res.status(200).json("Delete Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
}
module.exports = bookingController;