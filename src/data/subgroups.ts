export interface Subgroup {
	name: string;
	text: string;
}

/**
 * The four groups the car is built by. This is the single source for both the
 * team page's subgroup cards and the application form's department picker, so
 * what people read and what they can pick can never drift apart.
 */
export const subgroups: readonly Subgroup[] = [
	{
		name: 'Chassis & Composites',
		text: 'The frame, the bodywork and everything in between. The structure the whole car is built around.',
	},
	{
		name: 'Suspension & Brakes',
		text: 'Uprights, wishbones, steering and stopping power, the parts that decide how the car behaves on track.',
	},
	{
		name: 'High & Low Voltage',
		text: 'The accumulator, motors and wiring, plus the sensors and control electronics that keep it all talking.',
	},
	{
		name: 'Business & Marketing',
		text: 'Partnerships, budget and the cost and business events, which are worth real points at competition.',
	},
];

/** Applicants can also say they have no preference. */
export const UNDECIDED_DEPARTMENT = 'Not sure yet — place me where I fit';

export const departments: readonly string[] = [
	...subgroups.map((group) => group.name),
	UNDECIDED_DEPARTMENT,
];
