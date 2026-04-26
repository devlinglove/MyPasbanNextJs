import { Link } from "@/components/ui/link";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { checkLoggedIn } from "@/utils/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const isLoggedIn = await checkLoggedIn();

  if(isLoggedIn){
    redirect('/app')
  }

  if(!isLoggedIn){
    redirect('/auth/login')
  }

  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
    </Suspense>
  );
}
