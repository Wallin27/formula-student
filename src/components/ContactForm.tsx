import { useRef, useState } from 'react';
import '@/styles/contact-form.css';

/**
 * The site is a static build, so there is no server of ours to post to.
 * Submissions go to Web3Forms, which relays them to the address the access
 * key was issued for. Swap ENDPOINT + the body shape to move providers.
 */
const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env['PUBLIC_WEB3FORMS_KEY'] as string | undefined;

type Field = 'subject' | 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Record<Field, string> = { subject: '', name: '', email: '', message: '' };

function validate(values: Record<Field, string>) {
	const errors: Partial<Record<Field, string>> = {};

	if (!values.subject.trim()) errors.subject = 'Please add a subject.';
	if (!values.name.trim()) errors.name = 'Please tell us your name.';

	if (!values.email.trim()) {
		errors.email = 'Please add an email address so we can reply.';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
		errors.email = 'That does not look like a valid email address.';
	}

	if (!values.message.trim()) {
		errors.message = 'Please write a message.';
	} else if (values.message.trim().length < 10) {
		errors.message = 'Please add a little more detail.';
	}

	return errors;
}

export default function ContactForm() {
	const [values, setValues] = useState<Record<Field, string>>(EMPTY);
	const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
	const [status, setStatus] = useState<Status>('idle');
	const [failure, setFailure] = useState('');
	const formRef = useRef<HTMLFormElement>(null);

	function update(field: Field, value: string) {
		setValues((prev) => ({ ...prev, [field]: value }));
		// clear the error as soon as the person starts correcting it
		setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const found = validate(values);
		setErrors(found);

		const firstInvalid = (Object.keys(found) as Field[])[0];
		if (firstInvalid) {
			formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
			return;
		}

		if (!ACCESS_KEY) {
			setStatus('error');
			setFailure('The form is not configured yet — PUBLIC_WEB3FORMS_KEY is missing.');
			return;
		}

		setStatus('sending');
		setFailure('');

		try {
			const response = await fetch(ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: ACCESS_KEY,
					from_name: 'Umeå Formula Student website',
					subject: values.subject,
					name: values.name,
					email: values.email,
					message: values.message,
					// honeypot: real people never see this, bots fill it in
					botcheck: (formRef.current?.elements.namedItem('botcheck') as HTMLInputElement)?.value,
				}),
			});

			const result = await response.json();
			if (!response.ok || !result.success) {
				throw new Error(result.message ?? 'The message could not be sent.');
			}

			setStatus('sent');
			setValues(EMPTY);
		} catch (error) {
			setStatus('error');
			setFailure(error instanceof Error ? error.message : 'The message could not be sent.');
		}
	}

	if (status === 'sent') {
		return (
			<div className="contact-form__done" role="status">
				<p className="contact-form__done-title">Thanks — your message is on its way.</p>
				<p className="contact-form__done-text">
					We read everything that lands in the inbox and will get back to you as soon as we can.
				</p>
				<button type="button" className="btn btn--medium btn--primary" onClick={() => setStatus('idle')}>
					Send another
				</button>
			</div>
		);
	}

	return (
		<form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
			<input type="checkbox" name="botcheck" className="contact-form__botcheck" tabIndex={-1} autoComplete="off" />

			<div className="contact-form__field">
				<label className="contact-form__label" htmlFor="contact-subject">Subject</label>
				<input
					id="contact-subject"
					className="contact-form__input"
					type="text"
					value={values.subject}
					onChange={(event) => update('subject', event.target.value)}
					aria-invalid={Boolean(errors.subject)}
					aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
					placeholder="Sponsorship, joining the team, something else…"
				/>
				{errors.subject && (
					<p className="contact-form__error" id="contact-subject-error">{errors.subject}</p>
				)}
			</div>

			<div className="contact-form__row">
				<div className="contact-form__field">
					<label className="contact-form__label" htmlFor="contact-name">Name</label>
					<input
						id="contact-name"
						className="contact-form__input"
						type="text"
						autoComplete="name"
						value={values.name}
						onChange={(event) => update('name', event.target.value)}
						aria-invalid={Boolean(errors.name)}
						aria-describedby={errors.name ? 'contact-name-error' : undefined}
					/>
					{errors.name && (
						<p className="contact-form__error" id="contact-name-error">{errors.name}</p>
					)}
				</div>

				<div className="contact-form__field">
					<label className="contact-form__label" htmlFor="contact-email">Email</label>
					<input
						id="contact-email"
						className="contact-form__input"
						type="email"
						autoComplete="email"
						value={values.email}
						onChange={(event) => update('email', event.target.value)}
						aria-invalid={Boolean(errors.email)}
						aria-describedby={errors.email ? 'contact-email-error' : undefined}
					/>
					{errors.email && (
						<p className="contact-form__error" id="contact-email-error">{errors.email}</p>
					)}
				</div>
			</div>

			<div className="contact-form__field">
				<label className="contact-form__label" htmlFor="contact-message">Message</label>
				<textarea
					id="contact-message"
					className="contact-form__input contact-form__textarea"
					rows={7}
					value={values.message}
					onChange={(event) => update('message', event.target.value)}
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? 'contact-message-error' : undefined}
				/>
				{errors.message && (
					<p className="contact-form__error" id="contact-message-error">{errors.message}</p>
				)}
			</div>

			<div className="contact-form__actions">
				<button type="submit" className="btn btn--large btn--primary" disabled={status === 'sending'}>
					{status === 'sending' ? 'Sending…' : 'Send message'}
				</button>

				{status === 'error' && (
					<p className="contact-form__error contact-form__error--form" role="alert">{failure}</p>
				)}
			</div>
		</form>
	);
}
