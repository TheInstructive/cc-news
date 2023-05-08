import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bySlug } from "./collections";
import {convertNews} from './ConvertNews'
import "./App.css";

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

export default function AnnouncementDetail() {
  const { slug } = useParams();
  const { annouid } = useParams();
  const collection = bySlug(slug);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [imageNum, setimageNum] = useState(0)

  const [announcemenetContent, setAnnouncemenetContent] = useState("");

  useEffect(() => {
    fetch(
      `https://mellifluous-centaur-e6602b.netlify.app/news?id=${collection.id}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.id === annouid);
        console.log(filteredData);
        setData(filteredData);
        const content = convertNews(filteredData[0].content);
        setAnnouncemenetContent(content);
      })
      .catch((error) => console.error(error));
  }, [collection.id, page]);

  function nextImage(){
    if(imageNum === data[0].media.length-1){return}
    else{setimageNum(imageNum+1)}
  }

  function prevImage(){
      if(imageNum === 0){return}
      else{setimageNum(imageNum-1)}
  }

  function getDate(item) {
    return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
  }


  const currentUrl = window.location.href;



  return (
    <>
      <div className="news-details">

        <div className="news-header">
          <img src={collection.image}></img>
          <div className="news-header-details">
          {data &&
          <>
          <h2>{collection.name}</h2>
          <p>by <b>{data[0].author.tag}</b></p>
          <p>{getDate(data[0])}</p>
          </>
          }
          </div>
        </div>

        {data && data[0].media.length > 0 &&
                <div className='news-image-gallery'>
                {data[0].media[0].type === 'image' && (
                    <img src={data[0].media[imageNum].url} /> 
                )}

                {data[0].media[0].type === 'video' && (
                    <video muted autoPlay height={200} src={data[0].media[imageNum].url} controls />
                )}

                {data[0].media.length > 1 &&
                    <div className='news-image-control-panel'>
                    <button onClick={prevImage} id='news-image-prev'> PREV </button>
                    <h3>{imageNum+1}/{data[0].media.length}</h3>
                    <button onClick={nextImage} id='news-image-next'> NEXT </button>
                    </div>
                }
                </div>
        }

        <div className="news-content">
          {announcemenetContent}
          <p></p>
        </div>

        <div className="news-footer">
          <h2>Share on: </h2>
          <TwitterShareButton
          title={`🚨 Attention #crofam! A new ${collection.name} announcement has just been made. Get all the details and share the hype!`}
          url={currentUrl}
          via={'CronosClubAFE'}
          hashtags={["cronos","cronosnft","cronosnews","cronosclub"]}
          >
          <TwitterIcon size={32} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton
          url={currentUrl}
          separator=""
          title={`🚨 Attention #crofam! A new ${collection.name} announcement has just been made. Get all the details and share the hype!`} 
          >
          <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <TelegramShareButton
          url={currentUrl}
          title={`🚨 Attention #crofam! A new ${collection.name} announcement has just been made. Get all the details and share the hype!`}
          >
          <TelegramIcon size={32} round={true} />
          </TelegramShareButton>

          <FacebookShareButton
          quote={`🚨 Attention #crofam! A new ${collection.name} announcement has just been made. Get all the details and share the hype!`}
          url={currentUrl}
          >
          <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

        </div>

      </div>
      </>
    
  );
}
