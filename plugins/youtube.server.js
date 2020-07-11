const { google } = require('googleapis');
const token = process.env.YOUTUBE_TOKEN;

export default ({ store }) => {
    const youtube = google.youtube('v3');
    
    youtube.videos.list({
        key: token, 
        id: [
            'Ks-_Mh1QhMc'
        ],
        part: [
            'snippet'
        ]
    }).then(response => {
        
    }).catch(err => {
        
    });
}
