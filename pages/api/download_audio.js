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
        
        res.setHeader('Content-Disposition', `attachment; filename="anonym-${generate}.mp3"`)
        const audio = await ytdl(URL, {
            quality: 'highestaudio',
            filter: 'audioonly',
            format: 'mp3'
        })
        audio.pipe(res)
    } catch (error) {
        res.status(200).send(error)
    }
}
