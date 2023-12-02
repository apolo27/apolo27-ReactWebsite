import request from "superagent";

const keywords = ['tutorial', 'diy'];
const keywordQuery = keywords.join('|');
 
export function getTutorials() {

    request.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCzfVpVDOvqLXVKLMDPczp5BUcs2jzU7Dg&channelId=UCUb8Jn33w9TgVRim_wwWoGA&q=${keywordQuery}&part=snippet,id&order=date&maxResults=3&type=video`).end((err, resp) => {
        if (!err) {
          const videos = [];
          JSON.parse(resp.text).items.map(video => {
            return videos.push({
              title: video.snippet.title,
              thumbnail: video.snippet.thumbnails.medium.url,
              url: "https://www.youtube.com/watch?v=" + video.id.videoId
            });
          });
          localStorage.setItem("tutorials", JSON.stringify(videos))
          .then(console.log("tutoriales guardados en el localStorage: " + localStorage.tutorials));
          
        }
      });
}