import Link from "next/link";
import Image from "next/image";


export const HeaderLogo = () => {

    return (
        <Link href={"/"}>
            <div className={"items-center hidden lg:flex "}>
                <Image alt="logo" src={"/logo.svg"} height={28} width={28}/>
                <p className={"font-semibold text-2xl text-white ml-2.5"}>Finance</p>
            </div>
        </Link>
    )
}