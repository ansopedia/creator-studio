import SignInForm from "@/components/forms/login";

const SignInPage = () => {
  return (
    <>
      <h5 className="text-themeTextWhite text-base font-bold">Login</h5>
      <p className="text-themeTextGray leading-tight">Welcome Back Ansopedian!</p>
      <SignInForm />
      <div className="relative my-10 w-full">
        <div className="text-themeTextGray absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-black p-3 text-xs">
          OR CONTINUE WITH
        </div>
      </div>
    </>
  );
};

export default SignInPage;
