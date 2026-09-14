export interface PartnerStep {
	title: string;
	text: string;
}

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
		title: 'We agree on the details',
		text: 'Cash, parts, hours or services, we shape the partnership around what actually suits you.',
	},
];
