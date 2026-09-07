/** Details repeated across the nav, footer, contact page and application form. */
export const site = {
	name: 'Umeå Formula Student',
	email: 'info@umeaformulastudent.se',
	address: {
		line1: 'Umeå University',
		line2: '901 87 Umeå, Sweden',
		/** One-line form, for the footer. */
		inline: 'Umeå University, 901 87 Umeå, Sweden',
	},
	social: {
		instagram: 'https://www.instagram.com/',
		linkedin: 'https://www.linkedin.com/',
	},
} as const;

export const mailto = `mailto:${site.email}`;
