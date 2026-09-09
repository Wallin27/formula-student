import { useRef, useState } from 'react';
import '@/styles/contact-form.css';

/**
 * The site is a static build, so there is no server of ours to post to.
 * Netlify parses the built HTML at deploy time, finds the form by its name,
 * and captures anything posted to a path on this site. Fields are read from
 * the DOM rather than state so the honeypot behaves like a real form.
 */
const FORM_NAME = 'contact';

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

		setStatus('sending');
		setFailure('');

		try {
			// An unchecked honeypot submits nothing at all, which is what Netlify wants.
			const formData = new FormData(formRef.current!);

			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData as unknown as string[][]).toString(),
			});

			// Netlify answers with HTML, not JSON — the status is all we get.
			if (!response.ok) {
				throw new Error('The message could not be sent.');
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
		<form
			ref={formRef}
			className="contact-form"
			name={FORM_NAME}
			method="post"
			data-netlify="true"
			netlify-honeypot="botcheck"
			onSubmit={handleSubmit}
			noValidate
		>
			<input type="hidden" name="form-name" value={FORM_NAME} />
			<input type="checkbox" name="botcheck" className="contact-form__botcheck" tabIndex={-1} autoComplete="off" />

			<div className="contact-form__field">
				<label className="contact-form__label" htmlFor="contact-subject">Subject</label>
				<input
					id="contact-subject"
					name="subject"
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
						name="name"
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
						name="email"
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
					name="message"
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
