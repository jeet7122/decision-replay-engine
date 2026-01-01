import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className='flex flex-col justify-center items-center min-h-9/12 pt-16'>
            <SignIn path="/sign-in" routing="path"/>;
        </div>
    )
}