import React, { useEffect, useState } from "react";
import CollectionItem from "./components/CollectionItem";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchCollectionData } from "./FetchData";

export default function Newsletter() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTag = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags((tags) => [...tags, value]);
    } else {
      setSelectedTags((tags) => tags.filter((tag) => tag !== value));
    }
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setCollections(collectionData);
        setAvailableTags([
          ...collectionData.reduce(
            (ret, col) => new Set([...ret, ...col.tag.split(", ")]),
            new Set()
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollection();
  }, []);

  useEffect(() => {
    const filteredBySearch = collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm)
    );

    const filteredByTags =
      selectedTags.length > 0
        ? filteredBySearch.filter(
            (collection) =>
              collection.tag &&
              selectedTags.some((tag) => collection.tag.includes(tag))
          )
        : filteredBySearch;

    setFilteredCollections(filteredByTags);
  }, [searchTerm, selectedTags, collections]);

  return (
    <div className="newsletter-container">
      <div className="mobile-app-wrapper">
        <div className="mobile-app">
          <p>
            Download the <b>Cronos.News</b> Mobile App to receive instant
            notifications from collections!
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=news.cronos"
            target="_blank"
          >
            <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"></img>
          </a>
        </div>
      </div>
      <h1>SELECT A COLLECTION TO SEE ANNOUNCEMENTS</h1>
      <input
        placeholder="SEARCH"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />
      <p id="bot-msg">
        Looking to showcase your project on our platform? If you're a project
        owner, <Link to="/bot">click here to get started!</Link>
      </p>

      <div className="collection-tags">
        {availableTags.map((tag, idx) => (
          <label
            key={idx}
            htmlFor={tag}
            className={`collection-tag ${
              selectedTags.includes(tag) && "selected-tag"
            }`}
          >
            <input
              onChange={handleTag}
              type="checkbox"
              value={tag}
              id={tag}
            ></input>
            <a>{tag}</a>
          </label>
        ))}
      </div>

      <div className="collections-container">
        {filteredCollections.map((collection) => (
          <CollectionItem
            key={collection.name}
            collectionName={collection.name}
            collectionImage={`https://collections.cronos.news/${collection.image}`}
            buttonClick={() => navigate(`/${collection.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
