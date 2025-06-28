const YOUTUBE_API_KEY = "AIzaSyAOg6ok-3-87KIBlf_SMYLuAsBXAHr8ukw";
export const VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=IN&key=" + YOUTUBE_API_KEY;
export const MOST_POPULAR_PARAMS = "&chart=mostPopular&regionCode=IN&maxResults=18";
export const VIDEO_CATEGORY_API = "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" + YOUTUBE_API_KEY;
export const SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=" + YOUTUBE_API_KEY;
export const COMMENTS_API = "https://www.googleapis.com/youtube/v3/comments";
export const AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=";