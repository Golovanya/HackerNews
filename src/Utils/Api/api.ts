const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
import { Story } from "../Types/types";


/*
 * Получает идентификаторы историй на основе предоставленного фильтра.
 * @param {string} filter - Фильтр для применения 
 */
export const getStoryIDS = (filter: string): Promise<number[]> => {
  return fetch(`${BASE_URL}/${filter}.json?print=pretty`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching stories:', error);
      throw error;
    });
};

/*
 * Получает детали истории на основе идентификатора истории.
 * @param {number} storyId - Идентификатор истории.
 */

export const fetchStoryDetails = async (storyId: number) => {
    const response = await fetch(`${BASE_URL}/item/${storyId}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch story details");
    }
    const storyDetails = await response.json();
    return storyDetails;
  };

  /*
 * Получает детали комментария на основе идентификатора.
 * @param {number} id - Идентификатор комментария.
 */
  export const fetchCommentDetails = async (id: number): Promise<Story> => {
    const response = await fetch(`${BASE_URL}/item/${id}.json?print=pretty`);
    const result = await response.json();
    return result;
  };

