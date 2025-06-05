// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get('plan');

// Plan configurations
const planConfigs = {
    daily: { name: 'Premium (1 Day)', price: '$2.99' },
    weekly: { name: 'Premium (1 Week)', price: '$9.99' },
    biweekly: { name: 'Premium (2 Weeks)', price: '$16.99' },
    sixmonths: { name: 'Ultimate (6 Months)', price: '$49.99' },
    annual: { name: 'Ultimate (1 Year)', price: '$89.99' }
};

// Update plan details
if (selectedPlan && planConfigs[selectedPlan]) {
    const price = planConfigs[selectedPlan].price;
    document.getElementById('plan-name').textContent = planConfigs[selectedPlan].name;
    document.getElementById('plan-price').textContent = price;
    document.getElementById('payment-amount').textContent = price;
    document.getElementById('paypal-amount').textContent = price;
    document.getElementById('vodafone-amount').textContent = price;
}

// Payment method selection
const paymentMethods = document.querySelectorAll('.payment-method');
const paymentForms = document.querySelectorAll('.payment-form');

paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        // Update active state for buttons
        paymentMethods.forEach(m => m.classList.remove('active'));
        method.classList.add('active');

        // Show corresponding form
        const selectedMethod = method.getAttribute('data-method');
        paymentForms.forEach(form => {
            form.classList.remove('active');
            if (form.classList.contains(selectedMethod)) {
                form.classList.add('active');
            }
        });
    });
});

// Card number formatting
const cardNumber = document.getElementById('card-number');
cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Expiry date formatting
const expiryDate = document.getElementById('expiry-date');
expiryDate.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Form submission
const forms = document.querySelectorAll('.payment-form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        const payBtn = e.target.querySelector('.pay-btn');
        const originalText = payBtn.innerHTML;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            alert('Payment successful! Redirecting to download page...');
            window.location.href = 'index.html';
        } catch (error) {
            alert('Payment failed. Please try again.');
            payBtn.innerHTML = originalText;
        }
    });
});