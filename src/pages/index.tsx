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
    pageParam = null
  ): Promise<GetImagesResponse> => {
    if (pageParam) {
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return data;
    }

    const { data } = await api.get('/api/images')

    return data

  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', (data) => getImages(data.pageParam), {
    getNextPageParam: lastpage => lastpage.after ? lastpage.after : null,
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

  if (isLoading) return (
    <Loading />
  )

  if (isError) return (
    <Error />
  )

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && <Button role='button' mt='2.5rem' onClick={() => fetchNextPage()} > {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}</Button>}
      </Box>
    </>
  );
}
