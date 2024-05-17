import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonForms = {
	toggleButton: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ toggleButton, isOpen }: ArrowButtonForms) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={() => {
				toggleButton();
			}}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
