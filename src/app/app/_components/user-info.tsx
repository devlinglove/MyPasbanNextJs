'use client';

import { useUser } from '@/lib/auth';

export const UserInfo = () => {
  const user = useUser();

  return (
    <>
      <h1 className="text-xl">
        Welcome <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user.data?.role}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user.data?.role === 'USER' && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
    </>
  );
};