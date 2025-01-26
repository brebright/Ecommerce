const userModel = require("../../models/userModel")
const deleteUser = async(req,res) =>{
    const userId = req.params.id;
  
    console.log('useris ' ,userId)
    try {
      // Find the user by ID and delete
      const deletedUser = await userModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
}
module.exports = deleteUser;

  