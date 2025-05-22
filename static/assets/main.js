/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
	/**
	 * @typedef {('auto'|'light'|'dark')} Theme
	*/

	/**
	 * @return {?Theme}
	 */
	function getStoredTheme() {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'auto' || savedTheme === 'light' || savedTheme === 'dark') {
			return savedTheme;
		}

		return null;
	}

	/**
	 * @param {Theme} theme
	 */
	function setStoredTheme(theme) {
		localStorage.setItem('theme', theme);
	}

	/**
	 * @return Theme
	 */
	function getPreferredTheme() {
		var storedTheme = getStoredTheme();
		if (storedTheme) {
			return storedTheme;
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	/**
	 * @param {Theme} theme
	 */
	function setTheme(theme) {
		if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-bs-theme', theme);
		}
	}

	setTheme(getPreferredTheme());

	/**
	 * @param {Theme} theme
	 * @param {boolean} focus
	 */
	function showActiveTheme(theme, focus = false) {
		/** @type {HTMLElement} */
		const themeSwitcher = document.querySelector('#bd-theme');
		if (!themeSwitcher) {
			return;
		}

		/** @type {HTMLElement} */
		const themeSwitcherText = document.querySelector('#bd-theme-text');
		/** @type {HTMLElement} */
		const activeThemeIcon = document.querySelector('#theme-icon-active');
		/** @type {HTMLElement} */
		const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
		const classNameOfActiveIcon = btnToActive.dataset.bsThemeIcon;

		document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});

		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		activeThemeIcon.className = classNameOfActiveIcon;

		const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
		themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

		if (focus) {
			themeSwitcher.focus();
		}
	}

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		var storedTheme = getStoredTheme();
		if (storedTheme !== 'light' && storedTheme !== 'dark') {
			setTheme(getPreferredTheme());
		}
	});

	window.addEventListener('DOMContentLoaded', () => {
		showActiveTheme(getPreferredTheme());

		document.querySelectorAll('[data-bs-theme-value]')
			.forEach(toggle => {
				toggle.addEventListener('click', () => {
					/** @type {Theme} */
					var theme = toggle.getAttribute('data-bs-theme-value');
					setStoredTheme(theme);
					setTheme(theme);
					showActiveTheme(theme, true);
				});
			});
	});
})();


// Font chooser
(() => {
	/** @typedef {string} Font */

	/**
	 * @return {?Font}
	 */
	function getStoredFont() {
		return localStorage.getItem('font');
	}

	/**
	 * @param {Font} font
	 */
	function setStoredFont(font) {
		localStorage.setItem('font', font);
	}

	/**
	 * @param {Font} font
	 */
	function setFont(font) {
		if (font) {
			document.documentElement.style.setProperty('--article-font', font);
		}
	}

	setFont(getStoredFont());

	/**
	 * @param {Font} font
	 * @param {boolean} focus
	 */
	function showActiveFont(font, focus = false) {
		if (!font) {
			return;
		}

		/** @type {HTMLElement} */
		const fontSwitcher = document.querySelector('#bd-font');
		if (!fontSwitcher) {
			return;
		}

		/** @type {HTMLElement} */
		const fontSwitcherText = document.querySelector('#bd-font-text');
		/** @type {HTMLElement} */
		const btnToActive = document.querySelector(`[data-font-value="${font}"]`);

		document.querySelectorAll('[data-font-value]').forEach((element) => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});

		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		const fontSwitcherLabel = `${fontSwitcherText.textContent} (${btnToActive.dataset.fontValue})`;
		fontSwitcher.setAttribute('aria-label', fontSwitcherLabel);

		if (focus) {
			fontSwitcher.focus();
		}
	}

	window.addEventListener('DOMContentLoaded', () => {
		showActiveFont(getStoredFont());

		document.querySelectorAll('[data-font-value]')
			.forEach((toggle) => {
				toggle.addEventListener('click', () => {
					const font = toggle.getAttribute('data-font-value');
					setStoredFont(font);
					setFont(font);
					showActiveFont(font, true);
				});
			});
	});
})();
