//------------------
//-----PLANNER
//------------------
const toggles = document.querySelectorAll(".dropdown-chevron");

// Toggler chevron with screen size conditions
const mobileMax = window.matchMedia("(max-width: 481px)");

toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        toggle.parentNode.classList.toggle("active");
    });
});

// Cards options

const prefCards = document.querySelectorAll(".preference-option");
const beanCards = document.querySelectorAll(".bean-type-option");
const qtyCards = document.querySelectorAll(".quantity-option");
const grindCards = document.querySelectorAll(".grind-option");
const delivCards = document.querySelectorAll(".delivery-option");

const optionPref = document.querySelectorAll(".option.preference-option");
const optionBean = document.querySelectorAll(".option.bean-type-option");
const optionQty = document.querySelectorAll(".option.quantity-option");
const optionGrind = document.querySelectorAll(".option.grind-option");
const optionDeliv = document.querySelectorAll(".option.delivery-option");

const cardsArea = document.querySelector(".dropdowns");

//Cards titles values
let prefCardValue = document.querySelector("#order-summary span.coffeeType");
let beanCardValue = document.querySelector("#order-summary span.coffeeBean");
let qtyCardValue = document.querySelector("#order-summary span.coffeeQty");
let grindCardValue = document.querySelector("#order-summary span.coffeeGrind");
let delivCardValue = document.querySelector("#order-summary span.coffeeDeliv");

//Selected options list - left screen
const selectPref = document.querySelector("li.planner-selector.preference");
const selectBean = document.querySelector("li.planner-selector.bean-type");
const selectQty = document.querySelector("li.planner-selector.quantity");
const selectGrind = document.querySelector("li.planner-selector.grind");
const selectDeliv = document.querySelector("li.planner-selector.delivery");

//Elements for disabling Grind option if Capsule is selected
const capsule = document.getElementById("capsOpt");
const grindDropDown = document.querySelector(".grind-dropdown .dropdown-chevron");
const preferGrind = document.querySelector(".grind-dropdown");
let coffeeTypeBeforeText = document.getElementById("coffeeTypeBeforeText");
const grindTextOrder = document.getElementById("grind");
const grindTextModal = document.getElementById("grind-modal");

function isPrefActive() {
    prefCards.forEach((card) => {
        card.addEventListener("click", function () {
            prefCards.forEach((btn) => btn.classList.remove("active"));
            card.classList.add("active");
            if (this.classList.contains("active") && capsule.classList.contains("active")) {
                //If Capsule is selected
                preferGrind.classList.add("disable");
                selectGrind.classList.add("disable");
                grindDropDown.classList.add("disable");
                grindDropDown.classList.remove("active");
                preferGrind.classList.remove("active");
                selectPref.classList.add("prefActive");
                coffeeTypeBeforeText.textContent = " using";
                prefCardValue.textContent = this.childNodes[1].textContent;
                prefCardValue.textContent = `${this.childNodes[1].textContent}s`;
                grindCardValue.textContent = "_____";
                grindTextOrder.style.display = "none";
                grindTextModal.style.display = "none";
            } else if (this.classList.contains("active") && !capsule.classList.contains("active")) {
                prefCardValue.textContent = this.childNodes[1].textContent;
                coffeeTypeBeforeText.textContent = " as";
                selectPref.classList.add("prefActive");
                preferGrind.classList.remove("disable");
                preferGrind.classList.add("active");
                selectGrind.classList.remove("disable");
                grindDropDown.classList.remove("disable");
                grindDropDown.classList.add("active");
            }
        });
    });
}

function isBeanActive() {
    beanCards.forEach((card) => {
        card.addEventListener("click", function () {
            beanCards.forEach((btn) => btn.classList.remove("active"));
            card.classList.add("active");
            if ((this.classList.contains = "active")) {
                beanCardValue.textContent = this.childNodes[1].textContent;
                selectBean.classList.add("prefActive");
            }
        });
    });
}
function isQtyActive() {
    qtyCards.forEach((card) => {
        card.addEventListener("click", function () {
            qtyCards.forEach((btn) => btn.classList.remove("active"));
            card.classList.add("active");
            if ((this.classList.contains = "active")) {
                qtyCardValue.textContent = this.childNodes[1].textContent;
                selectQty.classList.add("prefActive");
            }
        });
    });
}
function isGrindActive() {
    grindCards.forEach((card) => {
        card.addEventListener("click", function () {
            grindCards.forEach((btn) => btn.classList.remove("active"));
            card.classList.add("active");
            if ((this.classList.contains = "active")) {
                grindCardValue.textContent = this.childNodes[1].textContent;
                selectGrind.classList.add("prefActive");
            }
        });
    });
}

function isDelivActive() {
    delivCards.forEach((card) => {
        card.addEventListener("click", function () {
            delivCards.forEach((btn) => btn.classList.remove("active"));
            card.classList.add("active");
            if ((this.classList.contains = "active")) {
                delivCardValue.textContent = this.childNodes[1].textContent;
                selectDeliv.classList.add("prefActive");
            }
        });
    });
}

cardsArea.addEventListener("click", function () {
    isPrefActive();
    isBeanActive();
    isQtyActive();
    isGrindActive();
    isDelivActive();
    isOrderComplete();
    updateShipmentPrice();
    updateFinalPrice();
});
updatePriceIfQuantityIsChanged();
//Activate Create my plan! button

const createPlanBtn = document.getElementById("createPlan");
createPlanBtn.disabled = true;

function isOrderComplete() {
    if (
        prefCardValue.textContent !== "_____" &&
        beanCardValue.textContent !== "_____" &&
        qtyCardValue.textContent !== "_____" &&
        delivCardValue.textContent !== "_____"
    ) {
        createPlanBtn.disabled = false;
        createPlanBtn.classList.add("active");
    } else {
        createPlanBtn.disabled = true;
    }
}

//Order Summary Modal
const bkPage = document.querySelector(".background-modal");
const closeX = document.querySelector(".close-X");
const bkPageActive = document.querySelector(".background-modal.active");
const modal = document.querySelector(".modal");
const checkoutBtn = document.querySelector(".modal-bottom .btn");

function goBack() {
    if (bkPage.classList.contains("active")) {
        bkPage.classList.remove("active");
        modal.classList.remove("active");
    }
}

bkPage.addEventListener("click", goBack);
closeX.addEventListener("click", goBack);

createPlanBtn.addEventListener("click", () => {
    bkPage.classList.add("active");
    modal.classList.add("active");
    orderSummary();
});
checkoutBtn.addEventListener("click", () => {
    window.location = "index.html";
});

//Order summary modal
const prefOrderSummary = document.querySelector(".coffeeTypeOrder");
const beanOrderSummary = document.querySelector(".coffeeBeanOrder");
const qtyOrderSummary = document.querySelector(".coffeeQtyOrder");
const grindOrderSummary = document.querySelector(".coffeeGrindOrder");
const delivOrderSummary = document.querySelector(".coffeeDelivOrder");

function orderSummary() {
    prefOrderSummary.textContent = prefCardValue.textContent;
    beanOrderSummary.textContent = beanCardValue.textContent;
    qtyOrderSummary.textContent = qtyCardValue.textContent;
    grindOrderSummary.textContent = grindCardValue.textContent;
    delivOrderSummary.textContent = delivCardValue.textContent;
}
//Amount values
const amountWeekly = document.getElementById("amountWeekly");
const amountBiWeekly = document.getElementById("amountBiWeekly");
const amountMonthly = document.getElementById("amountMonthly");

let quantity = qtyCardValue;
let delivery = delivCardValue;

function updateShipmentPrice() {
    if (quantity.textContent == "250g") {
        amountWeekly.textContent = "$7.20";
        amountBiWeekly.textContent = "$9.60";
        amountMonthly.textContent = "$12.00";
    } else if (quantity.textContent == "500g") {
        amountWeekly.textContent = "$13.00";
        amountBiWeekly.textContent = "$17.50";
        amountMonthly.textContent = "$22.00";
    } else if (quantity.textContent == "1000g") {
        amountWeekly.textContent = "$22.00";
        amountBiWeekly.textContent = "$32.00";
        amountMonthly.textContent = "$42.00";
    }
    //return
}

//Modal - Calculation per month cost

const mobileAmountPerMonth = document.querySelector(".btn-amount");
const amountPerMonth = document.querySelector(".amount");
let weeklyTotal = document.querySelector(".weeklyChoice.delivery-option.option");
let BiWeeklyTotal = document.querySelector(".BiWeeklyChoice.delivery-option.option");
let MonthlyTotal = document.querySelector(".monthlyChoice.delivery-option.option");

//User regex to extract $ sign
//If delivery card is selected extract the selected amount to modal order
//finalPrice = parseFloat(amountWeekly.textContent);

function updateFinalPrice() {
    weeklyTotal.addEventListener("click", function () {
        //amountPerMonth.textContent = amountWeekly.textContent + "/mo";
        amountPerMonth.textContent =
            "$" + Number(amountWeekly.textContent.replace(/[$]/g, "")) * 4 + "/mo";
        mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
    });
    BiWeeklyTotal.addEventListener("click", function () {
        amountPerMonth.textContent =
            "$" + Number(amountBiWeekly.textContent.replace(/[$]/g, "")) * 2 + "/mo";
        mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
    });
    MonthlyTotal.addEventListener("click", function () {
        amountPerMonth.textContent =
            "$" + Number(amountMonthly.textContent.replace(/[$]/g, "")) * 1 + "/mo";
        mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
    });
    //amountPerMonth.textContent = "$" + finalPrice.toFixed(2) + "/mo";
}

function updatePriceIfQuantityIsChanged() {
    const firstQuantity = document.getElementById("firstQuantity");
    const secondQuantity = document.getElementById("secondQuantity");
    const thirdQuantity = document.getElementById("thirdQuantity");
    let weeklyTotalActive = document.querySelector(".weeklyChoice.delivery-option.option.active");
    let BiWeeklyTotalActive = document.querySelector(
        ".BiWeeklyChoice.delivery-option.option.active"
    );
    let MonthlyTotalActive = document.querySelector(".monthlyChoice.delivery-option.option.active");

    firstQuantity.addEventListener("click", function () {
        if ((amountWeekly.textContent = "$7.20") && weeklyTotalActive) {
            amountPerMonth.textContent =
                "$" + Number(amountWeekly.textContent.replace(/[$]/g, "")) * 4 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(weeklyTotalActive);
        } else if (amountWeekly.textContent == "$13.00") {
            amountPerMonth.textContent =
                "$" + Number(amountWeekly.textContent.replace(/[$]/g, "")) * 4 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        } else if (amountWeekly.textContent == "$22.00") {
            amountPerMonth.textContent =
                "$" + Number(amountWeekly.textContent.replace(/[$]/g, "")) * 4 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        }
    });
    secondQuantity.addEventListener("click", function () {
        if (amountBiWeekly.textContent == "$9.60") {
            amountPerMonth.textContent =
                "$" + Number(amountBiWeekly.textContent.replace(/[$]/g, "")) * 2 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        } else if (amountBiWeekly.textContent == "$17.50") {
            amountPerMonth.textContent =
                "$" + Number(amountBiWeekly.textContent.replace(/[$]/g, "")) * 2 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        } else if (amountBiWeekly.textContent == "$32.00") {
            amountPerMonth.textContent =
                "$" + Number(amountBiWeekly.textContent.replace(/[$]/g, "")) * 2 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        }
    });
    thirdQuantity.addEventListener("click", function () {
        if (amountMonthly.textContent == "$12.00") {
            amountPerMonth.textContent =
                "$" + Number(amountMonthly.textContent.replace(/[$]/g, "")) * 1 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        } else if (amountMonthly.textContent == "$22.00") {
            amountPerMonth.textContent =
                "$" + Number(amountMonthly.textContent.replace(/[$]/g, "")) * 1 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        } else if (amountMonthly.textContent == "$42.00") {
            amountPerMonth.textContent =
                "$" + Number(amountMonthly.textContent.replace(/[$]/g, "")) * 1 + "/mo";
            mobileAmountPerMonth.textContent = "-" + amountPerMonth.textContent;
            console.log(amountPerMonth.textContent);
        }
    });
}



