window.onload = function () {

    // 
    const inputLong = document.querySelectorAll(".inputLong");
    const error = document.querySelectorAll(".error");
    const perBtn = document.querySelectorAll(".perBtn");
    const inputSlt = document.querySelector(".inputSlt");
    const reset = document.querySelector(".reset");
    const numRes = document.querySelectorAll(".numRes");
    let calc = {
        "bill": 0,
        "people": 1,
        "tip": 0
    };
    //prout 
    // Working exemple of some():
    // x = [1,2,3]
    // let elmnt = (elmnt) => elmnt === 1;
    // if (x.some(elmnt)) {
    // }

    // Put big number into 2e10^9
    function sci_notation(num, limit) {
        if (num > limit) {
            return num.toExponential(2);
        }
        else { return num.toFixed(2); }
    }

    // Manage empty int variable with default value replacement
    function nan_to_num(value, default_if_empty) {
        if (isNaN(value)) {
            return default_if_empty;
        }
        else {
            return value;
        }
    }

    // Authorise decimal, only once, and transform "," to "."
    function oao_decimal(input, e) {
        if (isNaN(e.key) && e.key != "." && e.key != ",") {
        e.preventDefault();
        }
        else if (input.value.includes(".") && isNaN(e.key)) {
            e.preventDefault();
            return
        }
        else if (e.key == ",") {
            input.value += ".";
            e.preventDefault();
        }
    }

    // Caculate and Show result
    function upd_result(calc) {
        let tip = calc["bill"] * calc["tip"] / 100;
        let tot = (calc["bill"] + tip) / calc["people"];



        numRes[0].textContent = "$" + sci_notation(tip, 99999);
        numRes[1].textContent = "$" + sci_notation(tot, 99999);
    }
    
    // Update result and Show hide error/reset
    inputLong.forEach((input) => {

        // Authorise only numbers
        input.addEventListener("keypress", function(e) {
            oao_decimal(input, e);
        });

        input.addEventListener("input", function() {

            // Send values for result calculation
            bill = calc["bill"] = nan_to_num(parseFloat(inputLong[0].value), 0);
            people = calc["people"] = nan_to_num(parseFloat(inputLong[1].value), 1);
            console.log(calc);
            upd_result(calc);

            // Display or not the reset button
            if ([bill, people].includes(0)) {
                reset.classList.add("resetoff")
            }
            else {
                reset.classList.remove("resetoff")
            }

            // Show error if value == 0
            for (let x = 0; x < 2; x++) {
                if ([bill, people][x] == 0) {
                    error[x].style.display = "block";
                }
                else {
                    error[x].style.display = "none";
                }
            }

        });        
    });

    // Event when click on the tip button
    perBtn.forEach((btn) => {
        btn.addEventListener("click", function(e) {
            calc["tip"] = parseFloat(e.target.innerText.slice(0, -1));
            upd_result(calc)
        });

    });

    inputSlt.addEventListener("keypress", function(e) {
        oao_decimal(inputSlt, e);
    });

    inputSlt.addEventListener("input", function() {
        calc["tip"] = inputSlt.value;
        upd_result(calc)
    });

    // Reset action
    reset.addEventListener("click", function() {
        console.log(reset.classList);
        if (!reset.classList.contains("resetoff")) {
            inputLong.forEach((input) => {input.value = null});
            error.forEach((error) => {error.style.display = "none"});
            inputSlt.value = null;
            numRes.forEach((res) => {res.textContent = "$0.00"});
            calc = {
                "bill": 0,
                "people": 1,
                "tip": 0
            };
            reset.classList.add("resetoff");
        }
    });
}