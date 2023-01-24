import styles from '../styles/Home.module.css';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'

export default function Logout() {

    const router = useRouter()

    function HandleLogOutUser() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        router.push('/login');
    }

    return (
        <>
            <div className={styles.mainTitleContainer} onClick={() => HandleLogOutUser()}>
                <div className={styles.logoutButton}>
                    <span className={styles.logout}>Log out</span>
                    <Image
                        priority
                        src="/logout_icon.svg"
                        height={35}
                        width={35}
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}