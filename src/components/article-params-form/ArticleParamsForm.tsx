import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';
import { clsx } from 'clsx';

import { useState, useRef } from 'react';
import { useClose } from '../hooks/hooks';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(articleState);

	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	const toggleSideBar = () => {
		setIsSideBarOpen(!isSideBarOpen);
	};

	const sideBarRef = useRef<HTMLElement | null>(null);

	useClose({
		isOpen: isSideBarOpen,
		onClose: () => setIsSideBarOpen(false),
		rootRef: sideBarRef,
	});

	const handleConfirm = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		toggleSideBar();
	};

	const handleClear = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		toggleSideBar();
	};

	const handleArticleGroup = (key: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [key]: value }));
		};
	};

	return (
		<>
			<ArrowButton toggleButton={toggleSideBar} isOpen={isSideBarOpen} />
			<aside
				ref={sideBarRef}
				className={clsx(
					styles.container,
					isSideBarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleConfirm}>
					<Text size={31} uppercase={true} weight={800} align='left' as={'h2'}>
						{'Задайте параметры'}
					</Text>

					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleArticleGroup('fontFamilyOption')}
					/>

					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleArticleGroup('fontSizeOption')}
						name='font-size'
					/>

					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleArticleGroup('fontColor')}
					/>

					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleArticleGroup('backgroundColor')}
					/>

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleArticleGroup('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClear} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
