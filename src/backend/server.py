import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS so your React app (port 5173/3000) can talk to this server (port 5000)
CORS(app)

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv("MAIL_USERNAME")
SENDER_PASSWORD = os.getenv("MAIL_PASSWORD")

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    
    # Extract fields from the frontend request
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone', 'Not provided') # New field
    subject = data.get('subject', 'New Portfolio Inquiry') # New field
    message = data.get('message')

    if not all([name, email, message]):
        return jsonify({"error": "Missing required fields"}), 400

    # Create the email content
    email_body = f"""
    You have received a new message from your portfolio contact form.
    
    -----------------------------------
    Name:    {name}
    Email:   {email}
    Phone:   {phone}
    Subject: {subject}
    -----------------------------------
    
    Message:
    {message}
    """

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = SENDER_EMAIL  # Sending to yourself
    msg['Subject'] = f"Portfolio ReachOut: {subject}"
    msg.attach(MIMEText(email_body, 'plain'))

    try:
        # Connect to Gmail SMTP Server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure the connection
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return jsonify({"message": "Email sent successfully!"}), 200
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))