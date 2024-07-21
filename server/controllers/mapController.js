import axios from 'axios';
import SearchHistory from '../models/SearchHistory.js';
import User from '../models/User.js';

// Search Location
export const searchLocation = async (req, res) => {
  const term  = req.body;
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: term.searchTerm,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    // Ensure that results exist
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ msg: 'No locations found' });
    }
    const location = response.data.results[0];
    console.log(location);
    const imageUrl = location.photos && location.photos.length > 0
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location.photos[0].photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        : '';

   const searchHistory = new SearchHistory({
    user: req.user._id,
    term: searchTerm,
    location,
    imageUrl
  });
  
    await searchHistory.save();
    console.log("search", searchHistory)
    const user = await User.findById(req.user._id);
    if (user) {
      console.log("user", user)
      user.searchHistory.push(searchHistory);
      await user.save();
    } else {
      console.log("user", user)
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ location, imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Search History
export const searchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('searchHistory');
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}

// Delete Search History Item
export const deletedSearchHistory = async (req, res) => {
  try {
    await SearchHistory.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user);
    user.searchHistory = user.searchHistory.filter(item => item.toString() !== req.params.id);
    await user.save();
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}

