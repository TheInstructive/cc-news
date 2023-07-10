import React, { useEffect, useRef, useState } from 'react'
import '../App.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faLink} from '@fortawesome/free-solid-svg-icons'
import {convertNews} from '../ConvertNews'
import { Link } from 'react-router-dom';

export default function AnnouncementItem(props) {
    const [showDetails, setshowDetails] = useState(false)
    const [imageNum, setimageNum] = useState(0)
    const [zoomImg, setzoomImg] = useState(false)
    const announcementImages = props.annouImages
    const { announcementDesc } = props;
    const content = convertNews(announcementDesc);
    const announcementID = props.annouID
    const getslug = props.giveSlug
    const getPage = props.getPage

    function nextImage(){
        if(imageNum === announcementImages.length-1){return}
        else{setimageNum(imageNum+1)}
    }
    
    function prevImage(){
        if(imageNum === 0){return}
        else{setimageNum(imageNum-1)}
    }

    useEffect(() => {
        setshowDetails(props.isDetailsShown);
      }, [props.isDetailsShown]);
    
      const announcementDetails = () => {
        props.onDetailsToggle();
        setshowDetails(!showDetails);
        scrollToElement()
      };
    
    function zoomImage(){
        setzoomImg(!zoomImg)
    }

    const myRef = useRef(null)
    const scrollToElement = () => {
        if (myRef.current) {
          setTimeout(() => {
            window.scrollTo({
              top: myRef.current.offsetTop -50,
              behavior: "smooth"
            });
          }, 200);
        }
      };
    
    return (
        <>
        {zoomImg && <Modal modalTitle= {"IMAGE "+(imageNum+1)} modalContent = {<img src={announcementImages[imageNum].url} alt="Modal" />} button = {zoomImage}/> }
        
        <div className='news-table-element'>
        <img src={props.collectionImage} alt="Collection"></img>
        <div className='news-author'>
        <FontAwesomeIcon size='1x' icon={faUser} /> &nbsp;&nbsp;&nbsp;
        <h2>{props.announcementTitle}</h2>
        </div>
        <h3 ref={myRef} >{props.announcementDate}</h3>
        <button onClick={announcementDetails}>{showDetails ? "HIDE" : "SHOW" }</button>
        <Link id='getlink' to={`/${getslug}/${getPage}/${announcementID}`}><FontAwesomeIcon size='1x' icon={faLink} /></Link>
        </div>
        
        {showDetails &&
            <>
            <div className="news-details">
            {announcementImages.length > 0 &&
                <div className='news-image-gallery'>

                {announcementImages[imageNum].type === 'image' && (
                    <img onClick={zoomImage} src={announcementImages[imageNum].url} alt={props.announcementTitle} /> 
                )}

                {announcementImages[imageNum].type === 'video' && (
                    <video muted autoPlay height={200} src={announcementImages[imageNum].url} controls />
                )}

                {announcementImages.length > 1 &&
                    <div className='news-image-control-panel'>
                    <button onClick={prevImage} id='news-image-prev'> PREV </button>
                    <h3>{imageNum+1}/{announcementImages.length}</h3>
                    <button onClick={nextImage} id='news-image-next'> NEXT </button>
                    </div>
                }
                </div>
            }
            <div className="news-content">
            {content}
            </div>
            </div>
            </>
        }
        </>
        )
    }
    