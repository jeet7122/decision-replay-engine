import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return(
        <div className="flex flex-col justify-center items-center min-h-9/12 py-10">
            <SignUp path="/sign-up" routing="path" />
        </div>
    )
}