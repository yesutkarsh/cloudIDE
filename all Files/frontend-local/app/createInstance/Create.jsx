import React from 'react'
import style from "./style.module.css"
export default function Create() {
  return (
    <>
    <div className={style.wrapper}>
    <div className={style.title}>
    <h1>Hi There,</h1>
    <p> Creating Instance can take up to 2 minutes. </p>
    </div>
    <div className={style.cards}>
<div className={style.card}>
    <h1>Cloud JS Instance</h1>
    <div className='flex justify-center flex-col items-center'>
    <div className={style.logo}><i class="ri-javascript-fill"></i></div>
    <p>Ready to Run Your JavaScript Code <br /> On Cloud.</p>
    <span><i class="ri-cloud-fill"></i> Available</span>
    </div>
    <button>Create Instance</button>
</div>
    </div>
    </div>
    </>
  )
}
