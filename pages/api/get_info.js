// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ytdl = require('ytdl-core')

export default async(req, res) => {
    try {
        let URL = req.query.URL;
        let data = await ytdl.getInfo(URL)
        res.status(200).send(data)
    } catch (error) {
        res.status(200).send(error)
        
    }
}
