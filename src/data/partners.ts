export interface PartnerStep {
	title: string;
	text: string;
}

/** Placeholder cards on the founding tier, shown until real logos land. */
export const foundingSlots: readonly string[] = ['01', '02', '03', '04'];

export const inKind: readonly string[] = [
	'CNC & welding hours',
	'Carbon, alloy, fasteners',
	'Cells & BMS hardware',
	'CAD / CFD licences',
	'Workshop space in Umeå',
	'Transport to competition',
	'Engineering mentorship',
	'Photo, film, print',
];

export const steps: readonly PartnerStep[] = [
	{
		title: 'Get in touch',
		text: 'Send us a mail with a sentence or two about your company. No formal proposal needed to start the conversation.',
	},
	{
		title: 'We talk it through',
		text: 'We tell you where the project stands and what we need. You tell us what you can offer.',
	},
	{
		title: 'We agree the details',
		text: 'Cash, parts, hours or services — we shape the partnership around what actually suits you.',
	},
];

export const included: readonly string[] = [
	'Logo placement on the car',
	'Logo on the website',
	'Updates from the build through the season',
	'A standing invitation to visit the workshop',
];
