function cleanNumeric(value) {
    return parseFloat(value) || 0;
}

function roundNumeric(value) {
    return Math.round(value * 100) / 100;
}

function calculate_term_length(price, monthly_payment) {
    let present_value = price * 0.9;  // 90% of price
    let target_value = price * 0.7;   // 70% of price
    let term_length = 0;
    let remaining_value = present_value;

    while (remaining_value > target_value && monthly_payment > 0) {
        remaining_value -= monthly_payment;
        term_length += 1;
    }

    return term_length;
}

function compute_financial_metrics(data) {
    let price = cleanNumeric(data.price);
    let rent = cleanNumeric(data.rent);
    let property_taxes = cleanNumeric(data.property_taxes);
    let insurance = cleanNumeric(data.insurance);
    let hoa_fee = cleanNumeric(data.hoa_fee);

    let management_fee = 0;
    let capex_fee = 0;
    let vacancy_fee = 0;
    let monthly_creative_payments = 0;
    let downpayment = 0;

    let multiplier = parseFloat(document.getElementById('cashOfferMultiplier').value);
    let cash_offer = roundNumeric(price * multiplier);

    if (rent > 0) {
        management_fee = roundNumeric(rent * 0.1);
        capex_fee = roundNumeric(rent * 0.05);
        vacancy_fee = roundNumeric(rent * 0.05);
        monthly_creative_payments = roundNumeric(rent - (management_fee + capex_fee + vacancy_fee + property_taxes + insurance + 350));
        downpayment = roundNumeric(price * 0.1);
    }

    if (monthly_creative_payments <= 0) {
        monthly_creative_payments = roundNumeric(rent * 0.5);  // Example default value
    }

    let term_length_months = calculate_term_length(price, monthly_creative_payments);

    let new_fields = {
        management_fee: management_fee,
        capex_fee: capex_fee,
        vacancy_fee: vacancy_fee,
        monthly_creative_payments: monthly_creative_payments,
        downpayment: downpayment,
        cash_offer: cash_offer,
        hoa_fee: hoa_fee,
        term_length_months: term_length_months
    };

    data = { ...data, ...new_fields };

    return data;
}

function generateOffer() {
    const form = document.getElementById('offerForm');
    let data = {
        user_name: form.user_name.value,
        contact_first_name: form.contact_first_name.value,
        contact_address: form.contact_address.value,
        price: form.price.value,
        rent: form.rent.value,
        property_taxes: form.property_taxes.value,
        insurance: form.insurance.value,
        hoa_fee: form.hoa_fee.value,
    };

    data = compute_financial_metrics(data);

    const template = `
<p>Hello ${data.contact_first_name},</p>

<p>Thank you for taking the time to review our offer to purchase your listing located at <strong>${data.contact_address}</strong>.</p>

<p>My team and I have carefully put together three offers for your consideration. Please review the details below and let us know if any options align with your expectations.</p>

<h3>Offer 1 - Cash Purchase:</h3>
<p><strong>Offer Price:</strong> $${data.cash_offer}<br>
<strong>Closing Costs:</strong> Covered by us in full</p>

<h3>Offer 2 - Seller Financing (Longer Term):</h3>
<p><strong>Offer Price:</strong> $${data.price}<br>
<strong>Monthly Payment:</strong> $${data.monthly_creative_payments}<br>
<strong>Down Payment:</strong> $${data.downpayment}</p>

<h3>Offer 3 - Seller Financing (Shorter Term):</h3>
<p><strong>Offer Price:</strong> $${data.price}<br>
<strong>Monthly Payment:</strong> $${data.monthly_creative_payments}<br>
<strong>Term Length:</strong> ${data.term_length_months} months<br>
<strong>Balloon Amount:</strong> $${data.cash_offer}</p>

<p>For all three offers:</p>
<p><strong>Inspection Period:</strong> 10 business days (Please allow time for our contractor to schedule)<br>
<strong>Earnest Money Deposit (EMD):</strong> $1,500 non-refundable, submitted on the first day post-inspection<br>
<strong>Close of Escrow (COE):</strong> On or before 30 days from the signed contract</p>

<p>In all offers, your commission will be covered. In the cash offer, it will come out of the seller's proceeds and in the seller financing offers, it will come out of the down payment to the seller.</p>

<p>Additionally, should there be any missed payments under the seller financing options, the property will revert back to the seller in lieu of foreclosure.</p>

<p>Please don’t hesitate to reach out to discuss any aspect of these proposals or to schedule a meeting.</p>

<p>Looking forward to your response.</p>

<p>Best regards,<br>
<strong>${data.user_name}</strong></p>
`;

    CKEDITOR.instances.offerOutput.setData(template);
}

function copyToClipboard() {
    const offerOutput = CKEDITOR.instances.offerOutput.getData();
    const el = document.createElement('textarea');
    el.value = offerOutput.replace(/<[^>]+>/g, '');  // Remove HTML tags for plain text copy
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied to clipboard');
}

function clearFormFields() {
    const form = document.getElementById('offerForm');
    const user_name = form.user_name.value;  // Preserve the user's name

    // Clear all form fields
    form.reset();

    // Restore the user's name
    form.user_name.value = user_name;
}

function clearEditor() {
    CKEDITOR.instances.offerOutput.setData('');
}

window.onload = function() {
    CKEDITOR.replace('offerOutput', {
        height: 400
    });

    // Attempt to hide CKEditor's version warning
    CKEDITOR.on('instanceReady', function (ev) {
        var editor = ev.editor;
        editor.on('notificationShow', function (notifEvt) {
            if (notifEvt.data.message.includes("This CKEditor 4.16.0 version is not secure.")) {
                notifEvt.cancel();
            }
        });
    });
}

