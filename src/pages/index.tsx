import { Button, Box, SimpleGrid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { Card } from '../components/Card';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImagesResponse = {
  after: string | null;
  data: Card[];
};
export default function Home(): JSX.Element {
  const getImages = async (
    pageParam: string = null
  ): Promise<GetImagesResponse> => {
    if(pageParam){
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });
    console.log(data);

    return  data ;
    }
    
    const { data } = await api.get('/api/images')
    console.log(data);

    return data
    
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', () => getImages(), {
    getNextPageParam: (lastpage) => lastpage.after ?? null,
  });

  const formattedData = useMemo(() => {
    let formattedDataTotal = [] as Card[];
    const dataPages = data?.pages;

    dataPages?.map(page => {
      formattedDataTotal = [...formattedDataTotal, ...page.data];
      return;
    });

    return formattedDataTotal;
  }, [data]);

  if(isLoading) return(
    <Loading/>
  )

  if(isError) return(
    <Error/>
  )

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        
        {hasNextPage && <Button onClick={()=>fetchNextPage} > {isFetchingNextPage ? 'Carregando' : 'Carregar Mais'}</Button>}
      </Box>
    </>
  );
}
