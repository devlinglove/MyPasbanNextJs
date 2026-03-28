import { ReactNode, Suspense } from 'react';

import { Spinner } from '@/components/ui/spinner';

import { AuthLayoutComponent }  from './_components/auth-layout-component';

export const metadata = {
  title: 'Bulletproof React',
  description: 'Welcome to Bulletproof React',
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
        <AuthLayoutComponent>{children}</AuthLayoutComponent>
    </Suspense>
  );
};

export default AuthLayout;