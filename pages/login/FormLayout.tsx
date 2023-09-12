import React from 'react'
import styles from '../../styles/FormLayout.module.css'
type Props = {
  children: React.ReactNode
}

const FormLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly m-0">
          <div className="text-center overscroll-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default FormLayout
