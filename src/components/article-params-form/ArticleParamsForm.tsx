import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { useState, useRef } from 'react';
import { useClose } from '../hooks/hooks';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { clsx } from 'clsx';
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

type UpdateCallback = {
	onUpdate: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onUpdate }: UpdateCallback) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [sideBarOpen, setSideBarOpen] = useState(false);
	const toggleSideBar = () => {
		setSideBarOpen(!sideBarOpen);
	};

	const sideBarRef = useRef<HTMLElement>(null);

	useClose({
		isOpen: sideBarOpen,
		onClose: () => setSideBarOpen(false),
		rootRef: sideBarRef,
	});

	const handleConfirm = (element: React.FormEvent) => {
		element.preventDefault();
		onUpdate(articleState);
		toggleSideBar();
	};

	const handleClear = () => {
		setArticleState(defaultArticleState);
		onUpdate(defaultArticleState);
		toggleSideBar();
	};

	const setArticleGroup =
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setArticleState((preventState) => ({ ...preventState, [key]: value }));
		};

	return (
		<>
			<ArrowButton toggleButton={toggleSideBar} isOpen={false} />
			<aside
				ref={sideBarRef}
				className={clsx(
					styles.container,
					sideBarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleConfirm}>
					<div className={styles.topContainer}>
						<Text
							size={31}
							uppercase={true}
							weight={800}
							align='left'
							as={'h2'}>
							{'Задайте параметры'}
						</Text>
						<Select
							title='шрифт'
							options={fontFamilyOptions}
							selected={articleState.fontFamilyOption}
							onChange={setArticleGroup('fontFamilyOption')}></Select>
						<RadioGroup
							title='размер шрифта'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							onChange={setArticleGroup('fontSizeOption')}
							name='font-size'></RadioGroup>
						<Select
							title='цвет шрифта'
							options={fontColors}
							selected={articleState.fontColor}
							onChange={setArticleGroup('fontColor')}></Select>
						<Select
							title='цвет фона'
							options={backgroundColors}
							selected={articleState.backgroundColor}
							onChange={setArticleGroup('backgroundColor')}></Select>
						<Select
							title='ширина контента'
							options={contentWidthArr}
							selected={articleState.contentWidth}
							onChange={setArticleGroup('contentWidth')}></Select>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClear} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
