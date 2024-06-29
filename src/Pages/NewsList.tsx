/* eslint-disable react-hooks/exhaustive-deps */

import { getStoryIDS, fetchStoryDetails } from "../Utils/Api/api"
import React, { useState, useEffect } from "react";
import NewsItem from "../Components/NewsItem/NewsItem";
import Loader from "../Components/Loader/Loader";
import { Story } from "../Utils/Types/types";
type listProps = {
  filter: string;
  reboot: number;
};

const NewsList: React.FC<listProps> = ({ filter, reboot }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countNews, setCountnews] = useState<number>(15);
/*
  * Загружает и устанавливает истории новостей.
   */
  const loadStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const storyIds = await getStoryIDS(filter);

      const storyDetails = [];
      for (let i = 0; i < countNews; i++) {
        const details = await fetchStoryDetails(storyIds[i]);
        storyDetails.push(details);
      }
      setStories(storyDetails);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  /**
   * useEffect хук для загрузки историй при изменении фильтра, количества новостей или перезагрузки.
   */
  useEffect(() => {
    loadStories();
  }, [filter, countNews, reboot]);

   /**
   * useEffect хук для периодической загрузки историй каждые 30 секунд.
   */ 
  // useEffect(() => {
  // //   const intervalId = setInterval(() => {
  // //     loadStories();
  // //   }, 30000);

  // //   return () => clearInterval(intervalId);
  // // }, [filter, countNews]);

  return (
    <>
       {error && <p>{error}</p>}
      <div className="container newsList">
        {loading && <Loader />}
        {!loading
          ? stories.map((story) => <NewsItem story={story} key={story.id} />)
          : null}
        {!loading ? (
          <button onClick={() => setCountnews(countNews + 15)} className="addButton">
            Показать больше
          </button>
        ) : null}
      </div>
    </>
  );
};

export default NewsList;
