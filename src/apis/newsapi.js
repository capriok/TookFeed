import axios from 'axios';
const KEY = '569386ab4fcf4954aee7dd0351c13cc0';

////////////main api key////////////
//569386ab4fcf4954aee7dd0351c13cc0//

//backup api keys(testing)
// 64a57da735c94c7ca9b164ab5c3cb6e3
// 32d741fa6d244453bb472813043174ca
// 75ddc2508be94480a8bb05e57296ca97
// 5b0a5b215b5d472881c830c90648727c
// 69ff4adfecfd476e88c3ec2964ed2861

export default axios.create({
   baseURL: `https://newsapi.org/v2/`,
});
