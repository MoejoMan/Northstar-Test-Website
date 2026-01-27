from flask import Flask, render_template, request, redirect, url_for, flash, abort
import os
import smtplib
import ssl
from email.message import EmailMessage

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')


@app.after_request
def set_security_headers(response):
    """Add security headers to all responses."""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response


def send_email(subject: str, body: str, recipient: str = None) -> bool:
    """Send an email using SMTP settings from environment variables.
    If recipient is not provided, sends to MAIL_RECIPIENT (admin).
    Returns True on success, False otherwise.
    """
    server = os.environ.get('MAIL_SERVER')
    port = int(os.environ.get('MAIL_PORT', '587'))
    username = os.environ.get('MAIL_USERNAME')
    password = os.environ.get('MAIL_PASSWORD')
    default_recipient = os.environ.get('MAIL_RECIPIENT')

    if not all([server, username, password, default_recipient]):
        app.logger.warning('Mail not sent: missing SMTP configuration')
        return False

    target = recipient or default_recipient
    message = EmailMessage()
    message['Subject'] = subject
    message['From'] = username
    message['To'] = target
    message.set_content(body)

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(server, port, timeout=10) as smtp:
            smtp.starttls(context=context)
            smtp.login(username, password)
            smtp.send_message(message)
        return True
    except Exception as exc:  # pylint: disable=broad-except
        app.logger.error('Mail send failed: %s', exc)
        return False

@app.route('/')
def home():
    return render_template('portfolio.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        company = request.form.get('company')
        contact_name = request.form.get('contact_name')
        email = request.form.get('email')
        message = request.form.get('message')
        phone = request.form.get('phone', '')
        service = request.form.get('service', '')
        consent = request.form.get('consent')
        honeypot = (request.form.get('website') or '').strip()

        if honeypot:
            flash('Submission blocked.', 'error')
            return redirect(url_for('contact'))

        if not all([company, contact_name, email, message, consent]):
            flash('Please fill in all required fields and accept the policy.', 'error')
            return redirect(url_for('contact'))

        body = (
            f"Company: {company}\n"
            f"Name: {contact_name}\n"
            f"Email: {email}\n"
            f"Phone: {phone}\n"
            f"Service: {service}\n"
            f"Message:\n{message}\n"
        )

        sent = send_email('New inquiry (contact form)', body)
        if sent:
            confirmation_body = (
                f"Thank you for reaching out.\n\n"
                f"We received your inquiry and will review it shortly.\n"
                f"You can expect a response within 24 business hours.\n\n"
                f"Best regards,\n"
                f"The team"
            )
            send_email('Inquiry confirmation', confirmation_body, recipient=email)
            flash('Thank you! We received your inquiry. We\'ll respond within 24 hours.', 'success')
        else:
            flash('We could not send your message right now. Please email us directly.', 'error')
        return redirect(url_for('contact'))
    
    return render_template('contact_business.html')

@app.route('/demo')
def demo():
    return render_template('home.html')

@app.route('/demo/careers')
def demo_careers():
    return render_template('careers.html')

@app.route('/demo/contact', methods=['GET', 'POST'])
def demo_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        consent = request.form.get('consent')
        honeypot = (request.form.get('website') or '').strip()

        if honeypot:
            flash('Submission blocked.', 'error')
            return redirect(url_for('demo_contact'))

        if not all([name, email, message, consent]):
            flash('Please fill in all fields and accept the policy.', 'error')
            return redirect(url_for('demo_contact'))

        body = (
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Message:\n{message}\n"
        )
        send_email('Demo contact form submission', body)
        flash('Thank you! We received your message.', 'success')
    
    return render_template('contact.html')


@app.route('/privacy')
def privacy():
    return render_template('privacy.html')


@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/careers')
def careers():
    return render_template('careers.html')

@app.route('/apply', methods=['POST'])
def apply_for_job():
    job_title = request.form.get('job_title')
    name = request.form.get('name')
    email = request.form.get('email')
    
    if job_title and name and email:
        flash(f'Application received for {job_title}. We\'ll review your details and be in touch soon!', 'success')
        return redirect(url_for('careers'))
    else:
        flash('Please fill in all fields.', 'error')
        return redirect(url_for('careers'))

@app.errorhandler(403)
def forbidden(e):
    return render_template('403.html'), 403


@app.errorhandler(500)
def internal_error(e):
    return render_template('500.html'), 500


@app.errorhandler(503)
def service_unavailable(e):
    return render_template('503.html'), 503


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
