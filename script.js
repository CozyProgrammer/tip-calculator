// ── STEP 1: GRAB ALL THE HTML ELEMENTS ──
const billInput    = document.getElementById('bill');
const tipInput     = document.getElementById('tip');
const peopleInput  = document.getElementById('people');
const presetBtns   = document.querySelectorAll('.preset');
const resetBtn     = document.getElementById('reset');

const billError    = document.getElementById('bill-error');
const tipError     = document.getElementById('tip-error');
const peopleError  = document.getElementById('people-error');

const totalTipEl   = document.getElementById('total-tip');
const grandTotalEl = document.getElementById('grand-total');
const perPersonEl  = document.getElementById('per-person');

// ── STEP 2: LISTEN FOR TYPING ──
billInput.addEventListener('input', calculate);
tipInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

// ── STEP 3: PRESET BUTTONS ──
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    presetBtns.forEach(b => b.classList.remove('active'));
    // Add active to clicked button
    btn.classList.add('active');
    // Put that value into tip input
    tipInput.value = btn.dataset.value;
    calculate();
  });
});

// ── STEP 4: RESET ──
resetBtn.addEventListener('click', () => {
  billInput.value    = '';
  tipInput.value     = '';
  peopleInput.value  = '';
  presetBtns.forEach(b => b.classList.remove('active'));
  billError.textContent   = '';
  tipError.textContent    = '';
  peopleError.textContent = '';
  totalTipEl.textContent  = 'Rs 0.00';
  grandTotalEl.textContent = 'Rs 0.00';
  perPersonEl.textContent = 'Rs 0.00';
});

// ── STEP 5: THE MAIN CALCULATE FUNCTION ──
function calculate() {

  // Read values from inputs
  const bill   = parseFloat(billInput.value);
  const tip    = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  // Clear previous errors
  billError.textContent   = '';
  tipError.textContent    = '';
  peopleError.textContent = '';

  // ── VALIDATION ──
  let valid = true;

  if (billInput.value === '') {
    // Empty is fine — just don't calculate yet
    valid = false;
  } else if (isNaN(bill) || bill <= 0) {
    billError.textContent = 'Enter a valid positive amount';
    valid = false;
  }

  if (tipInput.value === '') {
    valid = false;
  } else if (isNaN(tip) || tip < 0) {
    tipError.textContent = 'Tip cannot be negative';
    valid = false;
  } else if (tip > 100) {
    tipError.textContent = 'Tip seems too high (max 100%)';
    valid = false;
  }

  if (peopleInput.value === '') {
    valid = false;
  } else if (isNaN(people) || people < 1 || !Number.isInteger(people)) {
    peopleError.textContent = 'Enter a whole number of at least 1';
    valid = false;
  }

  // ── CALCULATE ONLY IF ALL VALID ──
  if (!valid) return;

  const totalTip   = bill * (tip / 100);
  const grandTotal = bill + totalTip;
  const perPerson  = grandTotal / people;

  // Rounding policy — round UP to nearest paisa
  // So the group never underpays
  totalTipEl.textContent   = 'Rs ' + Math.ceil(totalTip   * 100) / 100;
  grandTotalEl.textContent = 'Rs ' + Math.ceil(grandTotal * 100) / 100;
  perPersonEl.textContent  = 'Rs ' + Math.ceil(perPerson  * 100) / 100;
}
