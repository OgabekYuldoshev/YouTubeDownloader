import { useEffect, useState } from "react"

export default function MainPage(){

    const [url, setUrl] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [name, setName] = useState('')
    const [select, setSelected] = useState(0)
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)



    const getInfo = async ()=>{
        await fetch(`/api/get?URL=${url}`).then(res=>res.json()).then(json=>{
            setImgUrl(json.videoDetails.thumbnails.reverse()[0].url)
            setName(json.videoDetails.title)
            json.formats.map(format=>{
                if(format.container === 'mp4' && format.qualityLabel !== null){
                    setData(data => [...data, {itag:format.itag, container:format.container, quality: format.qualityLabel }])
                }
            })
            setShow(true)
        })
    }

    const DownloadVideo = () => {
        window.location.href = `/api/download?URL=${url}&itag=${select}&name=${name}`
    }

    return(
        <div className="bg-gray-50 flex items-center justify-center relative w-full h-screen">
            <div className="flex flex-col items-center justify-center">
            <div >
                <h1 className="text-2xl text-center py-5 font-medium">Youtube Downloader</h1>
                <div className="flex md:flex-row flex-col items-center">
                    <input type="text" onChange={(e)=>{setUrl(e.target.value)}} className="focus:outline-none rounded border w-96 px-5 py-2" placeholder="Link Here : https://youtu.be/Ris6sh2DOxg" />
                    <button onClick={getInfo} className="focus:outline-none m-1 text-white bg-blue-400 rounded border px-5 py-2">Convert</button>
                </div>
            </div>
            {
                show ? (
                    <div className="mt-10">
                        <div>
                            <img src={imgUrl} className="md:w-1/2 w-4/5 object-cover mx-auto" />
                            <h1 className="text-center md:text-2xl text-xl font-bold py-5">{name}</h1>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <select onChange={(e)=>setSelected(e.target.value)} name="quality" className="focus:outline-none rounded border px-5 py-1 w-64">
                                <option selected disabled value="0">Select option</option>
                            {
                                data.map((item, index)=>(
                                        <option key={index} value={item.itag}>{item.quality +' '+ item.container}</option>
                                    )
                                )
                            }
                            </select>
                            <button onClick={DownloadVideo} className="focus:outline-none text-white bg-blue-400 rounded border px-5 py-2">Download</button>
                        </div>
                    </div>
                ) : null
            }
            </div>
            <div className='absolute bottom-5 right-5 md:text-base text-sm'>
                <span className="mr-2">Powered by</span>
                <a className="text-blue-500" href="https://github.com/OgabekYuldoshev">@OgabekYuldoshev</a>
            </div>
        </div>
    )
}