import { GameQuery } from "../App";
import { useInfiniteQuery } from "@tanstack/react-query"
import APIClient , { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>('/games');

export interface Game {
    id: number;
    name: string;
    background_image:string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
  }

const useGames = ( gameQuery:GameQuery) => 
useInfiniteQuery<FetchResponse<Game>,Error>({
  queryKey: ['games',gameQuery],
  queryFn: ({pageParam = 1}) => apiClient.getAll({
    params: {
      genres: gameQuery.genre?.id , 
      parent_platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      earch:gameQuery.searchText,
      page: pageParam,
  }
  }),
  getNextPageParam : (lastPage,allPages) => {
    return lastPage.next ? allPages.length + 1 : undefined;
  }
});


export default useGames;