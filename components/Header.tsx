import React, {Fragment, useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {Menu, Transition} from "@headlessui/react";
import {HiCurrencyDollar, HiOutlineCurrencyDollar} from "react-icons/hi2";
import {IoCard, IoCardOutline, IoExit, IoExitOutline, IoMenu} from "react-icons/io5";
import Link from "next/link";
import {handleSignOut} from "@/lib/firebase";
import {useRouter} from "next/router";
import {UserContext} from "@/lib/context/UserContext";


export default function Header() {
    const {totalSaved} = useContext(SavingsDataContext);

    return (
        <div className={"w-full bg-blue-600 px-4 h-48"}>
            <div className={"flex items-center justify-between w-full mt-4"}>
                <div className={""}>
                    <p className={"text-gray-300"}>Total Amount Saved</p>
                    <p className={"text-white text-2xl"}>${totalSaved}</p>
                </div>

                <div className="inline-flex items-center justify-center text-lg text-blue">
                    <ProfileDropdown/>
                </div>
            </div>
        </div>
    );
}

const ProfileDropdown = () => {
    const {user} = useContext(UserContext);
    const router = useRouter();

    return (
        <Menu as="div" className="relative z-10 inline-block text-left">
            {/*<Menu.Button className="inline-flex w-full items-center justify-center text-lg text-blue">*/}
            {/*    <IoIosArrowDown size={20} className={"mr-2 text-white"}/>*/}
            {/*    <div className={"border-2 p-1 rounded-full"}>*/}
            {/*        <img className={"rounded-full w-20 h-20"} src={"/img/lovely-couple.png"}/>*/}
            {/*    </div>*/}
            {/*</Menu.Button>*/}
            <Menu.Button className="inline-flex w-full items-center justify-center text-lg text-blue">
                <IoMenu size={32} className={"mr-2 text-white"}/>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5">
                    <Menu.Item>
                        <div className={"px-2 py-2"}>
                            <p>Hey, {user?.displayName}</p>
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        {({active, close}: any) => (
                            <Link
                                className={`${
                                    active ? "bg-blue-100" : "text-gray-900"
                                } flex items-center px-2 py-2`}
                                href={"/"}
                                onClick={close}
                            >
                                    <span className={"mr-2"}>
                                        {active ? <HiCurrencyDollar size={24}/> :
                                            <HiOutlineCurrencyDollar size={24}/>}
                                    </span>
                                <span>Goals</span>
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active, close}: any) => (
                            <Link
                                className={`${
                                    active ? "bg-blue-100" : "text-gray-900"
                                } flex items-center px-2 py-2`}
                                href={"/accounts"}
                                onClick={close}
                            >
                                    <span className={"mr-2"}>
                                        {active ? <IoCard size={24}/> : <IoCardOutline size={24}/>}
                                    </span>
                                <span>Accounts</span>
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active, close}: any) => (
                            <Link
                                className={`${
                                    active ? "bg-blue-100" : "text-gray-900"
                                } flex items-center px-2 py-2`}
                                href={"/"}
                                onClick={() => handleSignOut(router)}
                            >
                                    <span className={"mr-2"}>
                                        {active ? <IoExit size={24}/> : <IoExitOutline size={24}/>}
                                    </span>
                                <span>Sign out</span>
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active, close}: any) => (
                            <Link
                                className={`${
                                    active ? "bg-blue-100" : "text-gray-900"
                                } flex justify-center-center px-2 py-2`}
                                href={"https://www.buymeacoffee.com/yourrichlife"}
                                onClick={close}
                            >
                                {/*<img className={"w-44 "} alt={"Buy me a coffee ->"} src={"/img/bmc-button.png"} />*/}
                                <img className={"w-36 "} alt={"Buy me a coffee ->"} src={"/img/bmc-no-background.png"} />
                            </Link>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}