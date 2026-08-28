export interface NavLink {
	href: string;
	label: string;
}

export const navLinks: readonly NavLink[] = [
	{href: '/', label: 'Home'},
	{href: '/team', label: 'Team'},
	{href: '/sponsors', label: 'Sponsors'},
	{href: '/events', label: 'Events'},
	{href: '/contact', label: 'Contact'},
	{href: '/join-team', label: 'Join Now'},
];