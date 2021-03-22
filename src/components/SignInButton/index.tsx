import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { CgSpinner } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const [signInLoading, setSignInLoading] = useState(false);
  const [session, loading] = useSession();

  if (loading || signInLoading) {
    return (
      <button
        type="button"
        disabled={loading || signInLoading}
        className={`${styles.signInButton} ${styles.loading}`}
      >
        <CgSpinner color="#eba417" className={styles.closeIcon} />
      </button>
    );
  }

  if (session) {
    return (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => {
          setSignInLoading(true);
          signOut();
        }}
      >
        <FaGithub color="#04d361" />
        {session.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => {
        setSignInLoading(true);
        signIn('github');
      }}
    >
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}
