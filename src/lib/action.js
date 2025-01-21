'use server';

export async function SignUp(formData) {
    const rawUserData = {
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirmPassword')
    };
}