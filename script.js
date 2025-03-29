document.addEventListener("DOMContentLoaded", () => {
  const personalInfoElement = document.querySelector(".personal-info");
  const yourPlanElement = document.querySelector(".your-plan");
  const addOnsElement = document.querySelector(".add-ons");
  const summaryElement = document.querySelector(".summary");
  const thanksElement = document.querySelector(".thanks");
  const step1 = document.querySelector(".number-1");
  const step2 = document.querySelector(".number-2");
  const step3 = document.querySelector(".number-3");
  const step4 = document.querySelector(".number-4");
  const personalForm = document.querySelector("form");
  const nameInput = document.querySelector(".name-element");
  const emailInput = document.querySelector(".email-element");
  const phoneNumberInput = document.querySelector(".phone-element");
  const nameError = document.querySelector(".name-error");
  const emailError1 = document.querySelector(".email-error-1");
  const phoneError = document.querySelector(".phone-error");
  const emailError2 = document.querySelector(".email-error-2");
  const phoneInput = document.querySelector("#phone");
  const toggle = document.getElementById("toggle");
  const monthLabel = document.getElementById("month-label");
  const yearLabel = document.getElementById("year-label");
  const arcadePrice = document.querySelector(".arcade-price");
  const advancedPrice = document.querySelector(".advanced-price");
  const proPrice = document.querySelector(".pro-price");
  const freeMonths = document.querySelectorAll(".free-months");
  const selectPlans = document.querySelectorAll(".select-plan");
  const goBackBtn = document.querySelector(".go-back");
  const nextStepBtn = document.querySelector(".Next-step");
  const checkboxes = document.querySelectorAll(".addon-checkbox");
  const totalPriceElement = document.querySelector("#total-price");
  const addons = document.querySelectorAll(".addon");
  const goBackBtn2 = document.querySelector(".go-back-btn");
  const nextStepBtn2 = document.querySelector(".next-step-btn");
  const servicePrice = document.querySelector(".service-price");
  const storagePrice = document.querySelector(".storage-price");
  const themePrice = document.querySelector(".theme-price");
  const planNameElement = document.querySelector(".plan-name");
  const planPricingElement = document.querySelector(".plan-pricing");
  const addOnsItemsElement = document.querySelector(".add-ons-items");
  const billingPeriod = document.querySelector(".billing-period");
  const billingUnit = document.querySelector(".billing-unit");
  const goBackBtn3 = document.querySelector(".go-back-btn-2");
  const confirmBtn = document.querySelector(".confirm-btn");

  let currentStep = 1;
  let maxCompletedStep = 1;
  let isMonthly = true;
  let selectedPlan = { name: "Arcade", price: 9 };

  // Initial setup: Show only Step 1
  personalInfoElement.classList.add("active");
  step1.classList.add("selected");

  function showStep(step) {
    if (step > maxCompletedStep) return;

    // Remove active class from all sections
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });

    // Remove selected class from all step numbers
    step1.classList.remove("selected");
    step2.classList.remove("selected");
    step3.classList.remove("selected");
    step4.classList.remove("selected");

    // Show the requested step
    if (step === 1) {
      personalInfoElement.classList.add("active");
      step1.classList.add("selected");
    } else if (step === 2) {
      yourPlanElement.classList.add("active");
      step2.classList.add("selected");
    } else if (step === 3) {
      addOnsElement.classList.add("active");
      step3.classList.add("selected");
    } else if (step === 4) {
      // Fixed syntax error here
      summaryElement.classList.add("active");
      step4.classList.add("selected");
    } else if (step === 5) {
      thanksElement.classList.add("active");
      step4.classList.add("selected"); // Keep Step 4 highlighted for thank you page
    }

    currentStep = step;
  }

  document
    .querySelector(".step-1")
    .addEventListener("click", () => showStep(1));
  document
    .querySelector(".step-2")
    .addEventListener("click", () => showStep(2));
  document
    .querySelector(".step-3")
    .addEventListener("click", () => showStep(3));
  document
    .querySelector(".step-4")
    .addEventListener("click", () => showStep(4));

  personalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (nameInput.value.trim() === "") {
      nameError.style.display = "block";
      nameInput.classList.add("incorrect");
      valid = false;
    } else {
      nameError.style.display = "none";
      nameInput.classList.remove("incorrect");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError1.style.display = !emailInput.value.trim() ? "block" : "none";
      emailError2.style.display = emailInput.value.trim() ? "block" : "none";
      emailInput.classList.add("incorrect");
      valid = false;
    } else {
      emailError1.style.display = "none";
      emailError2.style.display = "none";
      emailInput.classList.remove("incorrect");
    }

    const phoneRegex = /^\+\d{1,3}\d{7,10}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneError.style.display = "block";
      phoneInput.classList.add("incorrect");
      valid = false;
    } else {
      phoneError.style.display = "none";
      phoneInput.classList.remove("incorrect");
    }

    if (valid) {
      maxCompletedStep = Math.max(maxCompletedStep, 2);
      showStep(2);
    }
  });

  const inputElements = [nameInput, emailInput, phoneNumberInput];
  inputElements.forEach((input) => {
    input.addEventListener("focus", () => input.classList.add("outline"));
    input.addEventListener("blur", () => input.classList.remove("outline"));
  });

  phoneInput.addEventListener("input", (e) => {
    let value = phoneInput.value;
    const regex = /^\+\d{0,14}$/;
    if (!regex.test(value)) {
      phoneInput.value = value.slice(0, -1);
    }
    if (value.length === 1 && value !== "+") {
      phoneInput.value = "+";
    }
  });

  selectPlans[0].classList.add("plan-selected");
  selectPlans.forEach((selectPlan) => {
    selectPlan.addEventListener("click", () => {
      selectPlans.forEach((plan) => plan.classList.remove("plan-selected"));
      selectPlan.classList.add("plan-selected");
      selectedPlan = {
        name: selectPlan.dataset.plan,
        price: isMonthly
          ? parseInt(selectPlan.dataset.priceMonth)
          : parseInt(selectPlan.dataset.priceYear),
      };
    });
  });

  monthLabel.classList.add("active");
  toggle.addEventListener("click", () => {
    isMonthly = !isMonthly;
    toggle.classList.toggle("active", !isMonthly);

    if (isMonthly) {
      monthLabel.classList.add("active");
      yearLabel.classList.remove("active");
      arcadePrice.textContent = "$9/mo";
      advancedPrice.textContent = "$12/mo";
      proPrice.textContent = "$15/mo";
      servicePrice.textContent = "+$1/mo";
      storagePrice.textContent = "+$2/mo";
      themePrice.textContent = "+$2/mo";
      freeMonths.forEach((freeMonth) => (freeMonth.style.display = "none"));
    } else {
      monthLabel.classList.remove("active");
      yearLabel.classList.add("active");
      arcadePrice.textContent = "$90/yr";
      advancedPrice.textContent = "$120/yr";
      proPrice.textContent = "$150/yr";
      servicePrice.textContent = "+$10/yr";
      storagePrice.textContent = "+$20/yr";
      themePrice.textContent = "+$20/yr";
      freeMonths.forEach((freeMonth) => (freeMonth.style.display = "block"));
    }

    const selectedPlanElement = document.querySelector(".plan-selected");
    selectedPlan.price = isMonthly
      ? parseInt(selectedPlanElement.dataset.priceMonth)
      : parseInt(selectedPlanElement.dataset.priceYear);
  });

  goBackBtn.addEventListener("click", () => showStep(1));
  nextStepBtn.addEventListener("click", () => {
    maxCompletedStep = Math.max(maxCompletedStep, 3);
    showStep(3);
  });

  goBackBtn2.addEventListener("click", () => showStep(2));
  nextStepBtn2.addEventListener("click", () => {
    maxCompletedStep = Math.max(maxCompletedStep, 4);
    updateSummary();
    showStep(4);
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const addon = e.target.closest(".addon");
      addon.classList.toggle("addon-selected", checkbox.checked);
    });
  });

  function updateSummary() {
    planNameElement.textContent = `${selectedPlan.name} (${
      isMonthly ? "Monthly" : "Yearly"
    })`;
    planPricingElement.textContent = `$${selectedPlan.price}/${
      isMonthly ? "mo" : "yr"
    }`;

    addOnsItemsElement.innerHTML = "";
    let total = selectedPlan.price;

    addons.forEach((addon) => {
      const checkbox = addon.querySelector(".addon-checkbox");
      if (checkbox.checked) {
        const price = isMonthly
          ? parseInt(addon.dataset.priceMonth)
          : parseInt(addon.dataset.priceYear);
        total += price;

        const addonItem = document.createElement("div");
        addonItem.className = "add-items";
        addonItem.innerHTML = `
                  <div class="add-on-name">${addon.dataset.name}</div>
                  <div class="add-price">+$${price}/${
          isMonthly ? "mo" : "yr"
        }</div>
              `;
        addOnsItemsElement.appendChild(addonItem);
      }
    });

    totalPriceElement.textContent = total;
    billingPeriod.textContent = isMonthly ? "month" : "year";
    billingUnit.textContent = isMonthly ? "mo" : "yr";
  }

  goBackBtn3.addEventListener("click", () => showStep(3));
  confirmBtn.addEventListener("click", () => {
    maxCompletedStep = Math.max(maxCompletedStep, 5);
    showStep(5);
  });
  document
    .querySelector(".change")
    .addEventListener("click", () => showStep(2));
});
