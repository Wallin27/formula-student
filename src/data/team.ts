export interface Milestone {
	date: string;
	heading: string;
	text: string;
	/** Fills the marker on the timeline spine. */
	done: boolean;
}

export interface Member {
	name: string;
	role: string;
	initials: string;
}

// PLACEHOLDER MILESTONES — dates and wording are guesses, replace them
export const milestones: readonly Milestone[] = [
	{
		date: 'Spring 2026',
		heading: 'The team is founded',
		text: 'A handful of students from different programmes at Umeå University decide to put the first Formula Student team in Umeå together.',
		done: true,
	},
	{
		date: 'Autumn 2026',
		heading: 'Recruitment opens',
		text: 'The founding group starts building out the subgroups and looking for members across every discipline.',
		done: true,
	},
	{
		date: 'Winter 2026/27',
		heading: 'Concept and design',
		text: 'Vehicle concept is locked and the design of the first car begins in earnest.',
		done: false,
	},
	{
		date: 'Spring 2027',
		heading: 'Manufacturing and testing',
		text: 'Parts come off the machines, the car is assembled, and the first shakedown runs happen.',
		done: false,
	},
	{
		date: 'Summer 2027',
		heading: 'First competition',
		text: 'Our first Formula Student event, and the goal everything so far has been built around.',
		done: false,
	},
];

// PLACEHOLDER PEOPLE — 3 cards for the 3 confirmed members, replace before launch
export const members: readonly Member[] = [
	{ name: 'Johan Rainer', role: 'Founder & SB Lead', initials: 'JR' },
	{ name: 'Namn Efternamn', role: 'Role to be confirmed', initials: 'NE' },
	{ name: 'Namn Efternamn', role: 'Role to be confirmed', initials: 'NE' },
];

export const studyYears: readonly string[] = ['1', '2', '3', '4', '5', 'Master', 'Other'];
