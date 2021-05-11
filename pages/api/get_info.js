// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ytdl = require('ytdl-core')

export default async(req, res) => {
    let URL = req.query.URL;
    // let id = URL.replace('https://youtu.be/', '')
    let data = await ytdl.getInfo(URL)
    res.status(200).send(data)
}
