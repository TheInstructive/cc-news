import React, { useEffect, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {fetchNewsData, fetchCollectionData} from './FetchData'

function getDate(item) {
  return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
}

export default function Announcement() {
  const [currentDetailsId, setCurrentDetailsId] = useState(null);

  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [collection, setCollection] = useState(null);
  const [collections, setCollections] = useState([]);


  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setCollection(collectionData.filter(col => col.slug === slug)[0]);
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchCollection();
  }, [slug, page]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await fetchNewsData(collection.id, page);
        setData(newsData);  
      } catch (error) {
        console.log(error)
      }
    };
  
     fetchNews();
  }, [collection, page]);

  const handleDetailsToggle = (announcementId) => {
    setCurrentDetailsId(currentDetailsId === announcementId ? null : announcementId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setCollections(collectionData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollection();
  }, []);

  const filteredCollections = collections.filter((collection) => {
    return collection.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const navigateToAnnouncement = (slug) => {
    navigate(`/${slug}`)
  }

  const handleButtonClick = (slug) => {
    setPage(0);
    navigateToAnnouncement(slug);
  } 
  
if(collection && data){
  return (
    <div className='main-container'>
        <div className='news-collections'>
            <input placeholder='SEARCH' type="text" value={searchTerm} onChange={handleSearch} />
            {filteredCollections.map((collection) => (
            
             <button onClick={() => handleButtonClick(collection.slug)} className='news-item' key={collection.slug}>
             <img src={`https://collections.cronos.news/${collection.image}`} alt={collection.name}></img>
             <h2>{collection.name}</h2>
             </button>
             
             ))}

        </div>

        <div style={{marginTop:'1em'}} className='mobile-app-wrapper'>
          <div className='mobile-app'>
            <p>Download the <b>Cronos.News</b> Mobile App to receive instant notifications from collections!</p>
            <a href='https://play.google.com/store/apps/details?id=news.cronos' target='_blank'><img src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'></img></a>
          </div>
          </div>

        <div className='news-container'>
            <h1>NEWS FROM <b>{collection.name}</b></h1>
            <div className='news-table'>
            {data && data.length > 0 && (
            data.map((announcement) => (
                <AnnouncementItem
                    key={announcement.id}
                    collectionImage={`https://collections.cronos.news/${collection.image}`}
                    annouImages={announcement.media}
                    announcementTitle={announcement.author.tag}
                    announcementDate={getDate(announcement)}
                    announcementDesc={announcement.content}
                    announcementAuthor = {`https://cdn.discordapp.com/avatars/${announcement.author.id}/${announcement.author.avatar}.png`}
                    isDetailsShown={currentDetailsId === announcement.id}
                    onDetailsToggle={() => handleDetailsToggle(announcement.id)}
                    annouID = {announcement.id}
                    giveSlug = {slug}
                    getPage = {page}
                />
            ))
        )}

            {data && data.length  < 1 && 
            <h2>NO ANNOUNCEMENTS YET</h2>
            }

                

            </div>
        </div>
        <div className='pagination'>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous Page</button>
        <button disabled={data && data.length  < 10} onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
    </div>
  )
}
}