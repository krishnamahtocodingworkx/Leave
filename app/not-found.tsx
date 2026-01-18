import { redirect } from "next/navigation";

export default function NotFound() {
    redirect("/");
    return <h1 className="text-center mt-10 text-2xl font-semibold">404 - Page Not Found</h1>;
}
