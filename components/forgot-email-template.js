import generateToken from "@/lib/generate-token";

export default function EmailTemplate({ firstName, email }) {
    const token = generateToken({ email });
    const url = `http://localhost:3000/login/reset/${token}`;
    return (
        <div>
            <h1>Hello, {firstName}!</h1>
            <p>You (or, someone) requested a password reset link for the email: {email}</p>
            <a 
                href={url} 
                style="
                    background-color: #7f22fe;
                    cursor: pointer;
                    color: #ede9fe;
                    font-weight: 600;
                    padding: 12px;
                    border-radius: 6px;
                "
            >
                Click here to reset
            </a>
            <br /> <br />
            <small>If you did not request this email, you can ignore it. This is not part of a subscriber list.</small>
        </div>
    );
}