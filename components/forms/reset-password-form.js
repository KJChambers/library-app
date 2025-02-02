'use client';

import { useActionState } from "react"
import { useFormStatus } from "react-dom";

export default function ResetPasswordForm({ action }) {
    const [state, formAction] = useActionState(action, {});
    const status = useFormStatus();

    return (
        <form action={formAction} className="space-y-6">

        </form>
    )
}