// 侧栏顶部放置用户面板组件
import React, { useState } from 'react';
import styles from './UserPanel.module.css';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserPanel() {
    const { user, login } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        await login({ username: username.trim() });
        setOpen(false);
    };

    const handleLoginClick = async () => {
        await login();
        navigate('/profile');
    };

    const name = user?.profile?.name || '未登录';
    const avatar = user?.profile?.avatar;
    const isLoggedIn = !!user;

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div
                    className={styles.avatar}
                    style={avatar ? { backgroundImage: `url(${avatar})` } : undefined}
                />
                <div className={styles.info}>
                    {isLoggedIn ? (
                        <button className={styles.nameBtn} onClick={() => navigate('/profile')}>
                            {name || '点击设置昵称'}
                        </button>
                    ) : (
                        <button className={styles.action} onClick={handleLoginClick}>登录</button>
                    )}
                </div>
            </div>

            {open && (
                <form className={styles.loginBox} onSubmit={handleLogin}>
                    <input
                        className={styles.input}
                        placeholder="输入昵称"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className={styles.submit} type="submit">确定</button>
                    <button className={styles.cancel} type="button" onClick={() => setOpen(false)}>取消</button>
                </form>
            )}
        </div>
    );
}