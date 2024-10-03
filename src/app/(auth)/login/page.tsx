import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/forms/login";

const LoginPage = () => {
  return (
    <div className="container m-auto flex h-dvh w-dvw items-center justify-center gap-6 p-6">
      <div className="lg:1/4 w-full sm:w-2/3 md:w-2/4 lg:w-1/3">
        <h5 className="text-themeTextWhite text-base font-bold">Login</h5>
        <p className="text-themeTextGray leading-tight">
          Welcome Back <span className="text-orange-500">Ansopedian!</span>
        </p>
        <LoginForm />
        <p className="mt-4">
          Don&apos;t have an account yet?
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <div className="hidden items-center justify-center sm:block sm:w-2/3 md:w-2/3 lg:w-1/3">
        <Image src="/images/login-illustrator.svg" alt="login" width={500} height={500} />
      </div>
    </div>
  );
};

export default LoginPage;
