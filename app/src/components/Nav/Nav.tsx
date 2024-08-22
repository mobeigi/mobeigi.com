import Link from "next/link";

export const Nav = () => (
    <nav>
        <span>NAV IN HEADER</span>
        <Link href={"/"}>
            Home
        </Link>
        <Link href={"/about"}>
            About
        </Link>
    </nav>
)