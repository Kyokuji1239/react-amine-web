import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './PublicProfile.module.css';
import { useUser } from '../context/UserContext';

export default function PublicProfile() {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const authorFromState = state?.author;
    const authorFromUser = user?.id === id ? {
        id: user.id,
        name: user.profile?.name || '匿名',
        avatar: user.profile?.avatar || '',
        school: user.profile?.school || '',
        className: user.profile?.className || '',
        email: user.profile?.email || '',
    } : null;

    const author = authorFromState || authorFromUser;

    if (!author) {
        return (
            <div className={styles.page}>
                <p>无法加载用户资料（id: {id}）</p>
                <button onClick={() => navigate(-1)}>返回</button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div
                    className={styles.avatar}
                    style={author.avatar ? { backgroundImage: `url(${author.avatar})` } : undefined}
                />
                <div>
                    <h2>{author.name}</h2>
                    <div className={styles.meta}>{author.school} · {author.className}</div>
                    <div className={styles.meta}>{author.email}</div>
                </div>
            </div>
        </div>
    );
}