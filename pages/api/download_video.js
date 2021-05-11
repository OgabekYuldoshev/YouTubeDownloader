// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ytdl = require('ytdl-core')
const slugify = require('slugify')

export default async (req, res) => {
    try {
        let URL = req.query.URL;
        let name = req.query.name;
        let generate = slugify(name, {
            replacement: '-', 
            remove: undefined, 
            lower: false,     
            strict: false,     
            locale: 'vi'       
        })
        
        res.setHeader('Content-Disposition', `attachment; filename="anonym-${generate}.mp4"`)
        const video = await ytdl(URL, {
            quality: 'highestvideo',
            filter: 'videoandaudio',
            format: 'mp4'
        })
        video.pipe(res)
    } catch (error) {
        res.status(200).send(error)
    }
}
