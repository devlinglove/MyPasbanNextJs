
import { getUserQueryOptions } from '@/lib/auth';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ReactNode } from 'react';
import { UserInfo } from './user-info';

export const DashboardInfo = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUserQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
        <UserInfo />
    </HydrationBoundary>
  );
};