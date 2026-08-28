import { navLinks } from '@/config/nav';
import Button from '@/components/Button';
import '@/styles/nav.css';

interface Props {
	currentPath: string;
}

export default function Nav({ currentPath }: Props) {
	// Strip Astro's trailing slash so the current path matches nav.ts.
	const current = currentPath.replace(/\/+$/, '') || '/';
	const joinLink = navLinks.find((link) => link.href === '/join-team');
	const primaryLinks = navLinks.filter((link) => link.href !== '/join-team');

	return (
		<nav className="site-nav">
			<a className="site-nav__brand" href="/">
				<img src="/assets/logo-brand.svg" alt="Umeå Formula Student — home" width={36} height={19} />
			</a>

			<ul className="site-nav__links">
				{primaryLinks.map((link) => (
					<li key={link.href}>
						<a href={link.href} aria-current={link.href === current ? 'page' : undefined}>
							{link.label}
						</a>
					</li>
				))}
			</ul>

			{joinLink && (
				<div className="site-nav__cta">
					<Button href={joinLink.href} text={joinLink.label} size="small" />
				</div>
			)}
		</nav>
	);
}
