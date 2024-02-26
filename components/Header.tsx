import React, {useState, useEffect} from "react"


export default function Header(props: { totalSaved: number }) {
    return (
        <div className={"flex justify-between bg-blue-600 w-11/12 mt-4 rounded-xl p-4"}>
            <div className={""}>
                <p className={"text-gray-300"}>Total Amount Saved</p>
                <p className={"text-white text-2xl"}>${props.totalSaved}</p>
            </div>
            <img className={"rounded-full w-20 h-20"} src={"/img/prof-pic.png"}/>
        </div>
    );
}
