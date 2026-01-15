"use client";

import { ICONS } from "@/utils/images";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton() {
    const { data: session } = useSession();

    if (session) {
        console.log("SESSION DATA (BROWSER):", session);
        console.log("USER DATA (BROWSER):", session.user);

        return (
            <div>
                <p>{session.user?.name}</p>
                <p>{session.user?.email}</p>
                {/* <img src={session.user?.image} width={50} alt="profile" /> */}
                <button onClick={() => signOut()}>Logout</button>
            </div>
        );
    }

    return <button className="w-full my-2 cursor-pointer outline-none border-warning border-2 rounded-2xl p-2 flex justify-center items-center gap-2 " onClick={() => signIn("google")}>
        <Image src={ICONS.google} alt="google icon" height={30} width={20} />
        <p className="text-sm font-semibold">Login with Google</p>
    </button>;
}
