// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ytdl = require('ytdl-core')
const slugify = require('slugify')

export default (req, res) => {
    let URL = req.query.URL;
    let itag = req.query.itag;
    let name = req.query.name;
    let generate = slugify(name, {
        replacement: '-', 
        remove: undefined, 
        lower: false,     
        strict: false,     
        locale: 'vi'       
      })
    
    res.setHeader('Content-Disposition', `attachment; filename="anonym-${generate}.mp4"`)
    ytdl(URL, {
        filter: format => format.itag == itag
    }).pipe(res)
}
