import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Data = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: number;
};
type Pages = {
  data: Data[];
  after: string
}
type GetImagesResponse = {
  headers: [];
  data: Pages[];
};
export default function Home(): JSX.Element {
  const getImages = async (
    pageParam: string = null
  ): Promise<GetImagesResponse> => {
    const { data, headers } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });
    console.log(data, headers);
  
    const formmatedData = data.map(page=>{
      return{
        after: page.after,
        pages:[
        {
          data:[
            {
              title: page.data.title,
              description: page.data.description,
              url: page.data.url,
              ts: page.data.ts,
              id: page.data.id
            }
          ]
        }
        ]
        
      }
        
      
    })
    return { data, headers };
  };
  const getNextPageParam = async (data: any) => {
    const after = data.map(data => data.after);
    return after;
  };
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', () => getImages(), {
    getNextPageParam: (lastpage, page) => lastpage.data.map(data=> data.after) ?? null,
  });

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
