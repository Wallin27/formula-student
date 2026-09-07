/** @type {import("stylelint").Config} */
export default {
	extends: ["stylelint-config-standard"],

	// Most of the CSS now lives in <style> blocks inside .astro components.
	// postcss-html pulls those out so they get linted like a .css file.
	overrides: [
		{
			files: ["**/*.astro"],
			customSyntax: "postcss-html",
		},
	],

	rules: {
		// The codebase is BEM (block__element--modifier). The standard config's
		// pattern rejects `__` and `--` outright, which flagged 82 selectors.
		"selector-class-pattern": [
			"^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
			{
				message: (selector) =>
					`Expected class selector "${selector}" to be kebab-case BEM (block__element--modifier)`,
			},
		],

		// -webkit-backdrop-filter and -webkit-mask-image are still required by
		// Safari and are cheap. Autoprefixer is not in the pipeline.
		"property-no-vendor-prefix": [
			true,
			{ ignoreProperties: ["-webkit-backdrop-filter", "-webkit-mask-image"] },
		],

		// Range notation (width <= 720px) needs Safari 16.4+. The prefixed form
		// costs nothing and keeps the responsive layout working further back.
		"media-feature-range-notation": "prefix",

		// False positives under BEM: selectors in different blocks are reported
		// as conflicting even though they can never match the same element.
		"no-descending-specificity": null,

		// Astro's escape hatch for styling an element rendered by a child
		// component, which does not carry this file's scope hash.
		"selector-pseudo-class-no-unknown": [
			true,
			{ ignorePseudoClasses: ["global"] },
		],
	},
};
