from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/careers')
def careers():
    return render_template('careers.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        if name and email and message:
            # In production, integrate with email service or database
            # For now, we'll just acknowledge receipt
            flash('Thank you! We received your message. We\'ll get back to you soon.', 'success')
            return redirect(url_for('contact'))
        else:
            flash('Please fill in all fields.', 'error')
    
    return render_template('contact.html')

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

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
