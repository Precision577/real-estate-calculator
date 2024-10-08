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
    let downpayment_percentage = cleanNumeric(data.downpaymentPercentage) || 0.1;  // Default to 10% if not provided

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
        downpayment = roundNumeric(price * downpayment_percentage);
    }

    if (monthly_creative_payments <= 0) {
        monthly_creative_payments = roundNumeric(rent * 0.5);  // Example default value
    }

    let long_term_length_months = calculate_term_length(price, monthly_creative_payments);
    let short_term_length_months = calculate_short_term_length(price, monthly_creative_payments);

    let new_fields = {
        management_fee: management_fee,
        capex_fee: capex_fee,
        vacancy_fee: vacancy_fee,
        monthly_creative_payments: monthly_creative_payments,
        downpayment: downpayment,
        cash_offer: cash_offer,
        hoa_fee: hoa_fee,
        long_term_length_months: long_term_length_months,
        short_term_length_months: short_term_length_months
    };

    data = { ...data, ...new_fields };

    return data;
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

function calculate_short_term_length(price, monthly_payment) {
    return calculate_term_length(price, monthly_payment) / 2;  // Example calculation for shorter term
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

    let long_term_length_months = calculate_term_length(price, monthly_creative_payments);
    let short_term_length_months = calculate_short_term_length(price, monthly_creative_payments);

    let new_fields = {
        management_fee: management_fee,
        capex_fee: capex_fee,
        vacancy_fee: vacancy_fee,
        monthly_creative_payments: monthly_creative_payments,
        downpayment: downpayment,
        cash_offer: cash_offer,
        hoa_fee: hoa_fee,
        long_term_length_months: long_term_length_months,
        short_term_length_months: short_term_length_months
    };

    data = { ...data, ...new_fields };

    return data;
}

function cleanNumeric(value) {
    return parseFloat(value) || 0;
}

function roundNumeric(value) {
    return Math.round(value * 100) / 100;
}

function calculate_term_length(price, monthly_payment, target_percentage = 0.7) {
    let present_value = price * 0.9;  // 90% of price
    let target_value = price * target_percentage;   // Target percentage of price
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
    let downpayment_percentage = cleanNumeric(data.downpaymentPercentage) / 100 || 0.1;  // Default to 10% if not provided

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
        downpayment = roundNumeric(price * downpayment_percentage);
    }

    if (monthly_creative_payments <= 0) {
        monthly_creative_payments = roundNumeric(rent * 0.5);  // Example default value
    }

    let long_term_length_months = calculate_term_length(price, monthly_creative_payments, 0.7); // 70% of price for long term
    let short_term_length_months = calculate_term_length(price, monthly_creative_payments, 0.8); // 80% of price for short term

    let new_fields = {
        management_fee: management_fee,
        capex_fee: capex_fee,
        vacancy_fee: vacancy_fee,
        monthly_creative_payments: monthly_creative_payments,
        downpayment: downpayment,
        cash_offer: cash_offer,
        hoa_fee: hoa_fee,
        long_term_length_months: long_term_length_months,
        short_term_length_months: short_term_length_months
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
        downpaymentPercentage: form.downpaymentPercentage.value
    };

    data = compute_financial_metrics(data);

    const template = `
<p>Hello ${data.contact_first_name},</p>

<p>Thank you for taking the time to review our cash purchase offer for your listing located at <strong>${data.contact_address}</strong>.</p>

<h3>Offer Details:</h3>
<p><strong>Offer Price:</strong> $${data.cash_offer}<br>
<strong>Closing Costs:</strong> Covered by us in full</p>

<p>For this offer:</p>
<p><strong>Inspection Period:</strong> 10 business days<br>
<strong>Earnest Money Deposit (EMD):</strong> $1,500 non-refundable, submitted on the first day post-inspection<br>
<strong>Close of Escrow (COE):</strong> On or before 30 days from the signed contract</p>

<p>Your commission will be covered out of the seller's proceeds.</p>

<p>Please don’t hesitate to reach out to discuss any aspect of this proposal or to schedule a meeting.</p>

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

