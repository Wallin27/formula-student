export interface ScoredEvent {
	name: string;
	points: number;
	desc: string;
}

export const staticEvents: readonly ScoredEvent[] = [
	{
		name: 'Engineering Design',
		points: 150,
		desc: 'Judges interrogate every design decision and the reasoning behind it.',
	},
	{
		name: 'Cost & Manufacturing',
		points: 100,
		desc: 'A full bill of materials and manufacturing plan for the car.',
	},
	{
		name: 'Business Plan Presentation',
		points: 75,
		desc: 'Pitch the car as a commercial product to a panel of investors.',
	},
];

export const dynamicEvents: readonly ScoredEvent[] = [
	{ name: 'Acceleration', points: 75, desc: '75 m from a standing start.' },
	{
		name: 'Skidpad',
		points: 75,
		desc: 'A figure-of-eight measuring steady-state cornering grip.',
	},
	{
		name: 'Autocross',
		points: 100,
		desc: 'A single flying lap that also sets the Endurance starting order.',
	},
	{
		name: 'Endurance',
		points: 325,
		desc: '22 km flat out. The event that decides most competitions.',
	},
	{
		name: 'Efficiency',
		points: 100,
		desc: 'Energy consumed over Endurance, scored against your pace.',
	},
];

const total = (events: readonly ScoredEvent[]) =>
	events.reduce((sum, event) => sum + event.points, 0);

export const staticTotal = total(staticEvents);
export const dynamicTotal = total(dynamicEvents);
export const competitionTotal = staticTotal + dynamicTotal;
