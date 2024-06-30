from flask import render_template, request, jsonify
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_offer', methods=['POST'])
def generate_offer():
    data = request.json

    # Extracting the data
    cash_offer = data.get('cash_offer', 0)
    price = data.get('price', 0)
    monthly_creative_payments = data.get('monthly_creative_payments', 0)
    downpayment = data.get('downpayment', 0)
    term_length_months = data.get('term_length_months', 0)

    # Creating the offers
    offers = {
        "cash_offer": f"${cash_offer}",
        "price": f"${price}",
        "monthly_creative_payments": f"${monthly_creative_payments}",
        "downpayment": f"${downpayment}",
        "term_length_months": term_length_months,
    }

    return jsonify(offers)

