import '@/styles/footer.css';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import MailIcon from '@/components/icons/MailIcon.tsx';

export default function Footer() {
	// Runs at build time — updates on the next deploy.
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<a className="site-footer__brand" href="/">
				<img src="/assets/logo-brand.svg" alt="Umeå Formula Student — home" />
			</a>

			<div className="site-footer__meta">
				<ul className="site-footer__social">
					<li>
						<a href="https://www.instagram.com/" aria-label="Instagram">
							<InstagramIcon />
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/" aria-label="LinkedIn">
							<LinkedInIcon />
						</a>
					</li>
					<li>
						<a href="mailto:info@umeaformulastudent.se" aria-label="Email">
							<MailIcon />
						</a>
					</li>
				</ul>

				<address className="site-footer__contact">
					<span>Umeå University · 901 87 Umeå, Sweden</span>
					<a href="mailto:info@umeaformulastudent.se">info@umeaformulastudent.se</a>
				</address>

				<p className="site-footer__copy">© {year} Umeå Formula Student. All rights reserved.</p>
			</div>
		</footer>
	);
}
