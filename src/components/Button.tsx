import '@/styles/button.css';

interface ButtonProps {
	text: string;
	href: string;
	size?: 'small' | 'medium' | 'large';
	variant?: 'primary' | 'secondary';
	className?: string;
}


export default function Button({
	text,
	href,
	size = 'medium',
	variant = 'primary',
	className = '',
}: ButtonProps) {
	return (
		<a className={`btn btn--${size} btn--${variant} ${className}`.trim()} href={href}>
			<span className="btn__text">{text}</span>
			<span className="btn__arrow" aria-hidden="true" />
		</a>
	);
}