import errorImage from '@assets/images/error.png';

import styles from './styles.module.scss';

export default function ErrorFallbackUI() {
    return (
        <div className={styles.fallback}>
            <h2 className={styles['fallback__title']}>
                Uh oh, something went wrong :(
            </h2>
            <p className={styles['fallback__description']}>
                But don't worry, our octokitty is working on fixing the issue.
                Until it's fixed, how about some milk? ;)
            </p>
            <img src={errorImage} alt="Octokitty as a bodyguard" />
        </div>
    );
}
