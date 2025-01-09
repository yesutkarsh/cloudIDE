"use client"
import React, { useState } from "react";
import style from "./style.module.css";
import SelectLang from "./components/SelectLang";
import Link from "next/link";
export default function Homepage() {
  return (
    <>
      <div class="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className={style.heading}>
            <span>Code Anytime, Anywhere</span>
            <p>A powerful Isolated online Coding Environment.</p>
           <Link href={"/createInstance"}>
            <h1>Select Language 
            <i class="ri-arrow-right-line"></i>
            </h1>
           </Link>
        </div>
        <Link href={"/createInstance"}>
        </Link>
      </div>
    </>
  );
}
