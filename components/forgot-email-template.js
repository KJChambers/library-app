import generateToken from "@/lib/generate-token";

export default function EmailTemplate({ firstName, email }) {
    const token = generateToken({ email });
    const url = `https://wwwbook-chamber.com/login/reset/${token}`;
    return (
        <div>
            <h1>Hello, {firstName}!</h1>
            <p>You (or, someone) requested a password reset link for the email: {email}</p>
            <a 
                href={url}
            >
                Click here to reset
            </a>
            <br /> <br />
            <small>If you did not request this email, you can ignore it. This is not part of a subscriber list.</small>
        </div>
    );
}