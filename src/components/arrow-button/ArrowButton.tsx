import arrow from 'src/images/arrow.svg';
import { clsx } from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type ArrowButtonForms = {
	isOpen: boolean;
	toggleButton: OnClick;
};

export const ArrowButton = ({ isOpen, toggleButton }: ArrowButtonForms) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={toggleButton}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
