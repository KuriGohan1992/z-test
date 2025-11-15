function validate(){
  // Null Hypothesis
   const nullValue = Number(document.getElementById("null-val").value);
   const nullOperatorValue = document.getElementById("null-operator-val").value;

   // Alternative Hypothesis
   const altValue = Number(document.getElementById("alt-val").value);
   const altOperatorValue = document.getElementById("alt-operator-val").value;

   // Available Data
   // const availableData = document.getElementById("available-data").value;

   // Sample Mean and Size
   const sampleMeanValue = Number(document.getElementById("sample-mean-val").value);
   const sampleSizeValue = parseInt(document.getElementById("sample-size-val").value, 10);

   // Population Standard Deviation
   const populationSdValue = Number(document.getElementById("population-sd-val").value);

   // Significance & Confidence Levels
   const significanceLevel = Number(document.getElementById("significance-level").value);
   const confidenceLevel = Number(document.getElementById("confidence-level").value.replace("%",""));

   //I aint writing allat, gpt wrote each check
   if (isNaN(Number(nullValue))) {
      alert("Null Hypothesis must be a number");
      return false;
   }

   if (isNaN(Number(altValue))) {
      alert("Alternative Hypothesis must be a number");
      return false;
   }

   if (isNaN(Number(sampleMeanValue))) {
      alert("Sample mean must be a number");
      return false;
   }

   if (!Number.isInteger(Number(sampleSizeValue)) || Number(sampleSizeValue) <= 0) {
      alert("Sample size must be a positive integer");
      return false;
   }

   if (Number(populationSdValue) <= 0 || isNaN(Number(populationSdValue))) {
      alert("Population Standard Deviation must be a positive number");
      return false;
   }

      
   if (!nullValue) {
      alert("Please fill in the Null Hypothesis value.");
      return false;
   }

   if (!nullOperatorValue) {
      alert("Please select the Null Hypothesis operator.");
      return false;
   }

   if (!altValue) {
      alert("Please fill in the Alternative Hypothesis value.");
      return false;
   }

   if (!altOperatorValue) {
      alert("Please select the Alternative Hypothesis operator.");
      return false;
   }

   // if (!availableData) {
   //    alert("Please select Available Data.");
   //    return;
   // }

   if (!sampleMeanValue) {
      alert("Please fill in the Sample Mean.");
      return false;
   }

   if (!sampleSizeValue) {
      alert("Please fill in the Sample Size.");
      return false;
   }

   if (!populationSdValue) {
      alert("Please fill in the Population Standard Deviation.");
      return false;
   }

   if (!significanceLevel) {
      alert("Please select a Significance Level.");
      return false;
   }

   if (!confidenceLevel) {
      alert("Please select a Confidence Level.");
      return false;
   }
   return true;
}

function getValue(){
   if (!validate()) return;
   const nullValue = Number(document.getElementById("null-val").value);
   const nullOperatorValue = document.getElementById("null-operator-val").value;

   // Alternative Hypothesis
   const altValue = Number(document.getElementById("alt-val").value);
   const altOperatorValue = document.getElementById("alt-operator-val").value;

   // // Available Data
   // const availableData = document.getElementById("available-data").value;

   // Sample Mean and Size
   const sampleMeanValue = Number(document.getElementById("sample-mean-val").value);
   const sampleSizeValue = parseInt(document.getElementById("sample-size-val").value, 10);

   // Population Standard Deviation
   const populationSdValue = Number(document.getElementById("population-sd-val").value);

   // Significance & Confidence Levels
   const significanceLevel = Number(document.getElementById("significance-level").value);
   const confidenceLevel = Number(document.getElementById("confidence-level").value.replace("%",""));

   console.log("Null Hypothesis: μ " + nullOperatorValue + " " + nullValue);
   console.log("Alternative Hypothesis: μ " + altOperatorValue + " " + altValue);
   // console.log("Available Data: " + availableData);
   console.log("Sample Mean: " + sampleMeanValue);
   console.log("Sample Size: " + sampleSizeValue);
   console.log("Population Standard Deviation: " + populationSdValue);
   console.log("Significance Level: " + significanceLevel);
   console.log("Confidence Level: " + confidenceLevel);

   // Cham's Javascript code

   const zValue = (sampleMeanValue - nullValue) / (populationSdValue/Math.sqrt(sampleSizeValue));

   document.getElementById('svg-wrap').style.display = 'block';

   const results = document.getElementById('results');
   const zstatistic = document.getElementById('zstatistic');
   const critical = document.getElementById('critical');
   const decision = document.getElementById('decision');
   let reject = false;
   let criticalValue;

   if (nullOperatorValue === '=') {
      criticalValue = jStat.normal.inv(1 - (significanceLevel / 2), 0, 1);
      showGraphArea('left', -criticalValue, zValue);
      showGraphArea('right', criticalValue, zValue);
      if (zValue <= -criticalValue || zValue >= criticalValue) {
            reject = true;
      }
   } else if (nullOperatorValue === '≥') {
      criticalValue = -jStat.normal.inv(1 - significanceLevel, 0, 1);
      showGraphArea('left', criticalValue, zValue);
      if (zValue <= criticalValue) {
            reject = true;
      }
   } else if (nullOperatorValue === '≤') {
      criticalValue = jStat.normal.inv(1 - significanceLevel, 0, 1);
      showGraphArea('right', criticalValue, zValue);
      if (zValue >= criticalValue) {
            reject = true;
      }
   }

   results.innerHTML = '\\[ \\textbf{Results}\\]';
   
   zstatistic.innerHTML = `\\[ \\textbf{Z-Statistic: } ${zValue.toFixed(4)}\\]`;
   if (nullOperatorValue === '=') {            
      critical.innerHTML = `\\[ \\textbf{Critical Value: } \\pm${criticalValue.toFixed(4)}\\]`;
   } else {
      critical.innerHTML = `\\[ \\textbf{Critical Value: } ${criticalValue.toFixed(4)}\\]`;
   }
   if (reject === true) {
      decision.innerHTML = '\\[ \\textbf{Decision: } \\text{Reject Null Hypothesis}\\]';
   } else {
      decision.innerHTML = '\\[ \\textbf{Decision: } \\text{Fail to Reject Null Hypothesis}\\]';      
   }

   const solution = document.getElementById('solution');
   const data = document.getElementById('data');
   solution.style.display = 'block';

   data.innerHTML = `
      <div id="data">
         <strong>Data: </strong>
         \\[ \\bar{x} = ${sampleMeanValue} \\quad\\quad \\sigma = ${populationSdValue} \\quad\\quad \\alpha = ${significanceLevel} \\]
      </div>      
   `

   
   const step1 = document.getElementById('step1');
   const step2 = document.getElementById('step2');
   const step3 = document.getElementById('step3');
   const step4 = document.getElementById('step4');
   const step5 = document.getElementById('step5');

   step1.innerHTML = `
      <li>State the hypothesis:</li>
      \\[
         \\begin{array}{rcl}
         \\text{H}_0\\!:~ \\mu~${nullOperatorValue}~${nullValue} \\\\
         \\text{H}_1\\!:~ \\mu~${altOperatorValue}~${altValue} \\\\
         
         \\end{array}
      \\]   
   `      
   if (nullOperatorValue === '=') {
      step1.innerHTML += 'Since the alternative hypothesis includes the possibility of a difference in both directions (greater than and less than the null hypothesis value), this is a two-sided test.'
   } else {
      step1.innerHTML += 'Since the alternative hypothesis specifies a difference in only one direction (either greater than or less than the null hypothesis value), we say this is a one-sided test.'
   }

   step2.innerHTML = `
      <li>Specify the significance level(α)/confidence level:</li>
      \\[
         
         \\begin{array}{}
            \\alpha \\; = \\; 1 \\;- \\; \\text{Confidence Level} \\\\
            \\alpha \\; = \\; 1 \\;- \\; ${confidenceLevel/100}
         \\end{array}
      \\]
   `

   step3.innerHTML = `
      <li>Determine the critical values and state the decision rule:</li>
   `

   if (nullOperatorValue === '=') {
      step3.innerHTML += `
         Since this is a two-sided test, we will divide the significance level (α) equally between the two tails. The critical value from the standard normal distribution table is:
         \\[
            \\begin{array}{}
               \\left (p \\right ) = ${significanceLevel}/2 \\\\
               \\left (p \\right ) = ${significanceLevel / 2} \\\\
               z_{${significanceLevel / 2}} = ${criticalValue.toFixed(4)}
            \\end{array}                  
         \\]
         The critical values for a two sided test are:
         \\[
            \\begin{array}{}
               z = ${1 * criticalValue.toFixed(4)} \\; \\text{and} -\\!z = ${-1 * criticalValue.toFixed(4)} \\\\
               \\textbf{Critical Value: } \\pm${criticalValue.toFixed(4)}
            \\end{array}
         \\]
      `
   } else if (nullOperatorValue === '≥') {
      step3.innerHTML += `
         Since this is a one-sided left-tailed test, we will allocate the significance level (α) to the left tail of the distribution. The critical value from the standard normal distribution table is:
         \\[
            \\begin{array}{}
               \\left (p \\right ) = ${significanceLevel} \\\\
               \\left (p \\right ) = ${significanceLevel} \\\\
               z_{${significanceLevel}} = ${criticalValue.toFixed(4)}
            \\end{array}                  
         \\]
         The critical value for a left tailed test is:
         \\[
            \\begin{array}{}               
               -\\!z = ${criticalValue.toFixed(4)} \\\\
               \\textbf{Critical Value: } ${criticalValue.toFixed(4)}
            \\end{array}
         \\]
      `
   } else if (nullOperatorValue === '≤') {
      step3.innerHTML += `
         Since this is a one-sided right-tailed test, we will allocate the significance level (α) to the right tail of the distribution. The critical value from the standard normal distribution table is:
         \\[
            \\begin{array}{}
               \\left (p \\right ) = ${significanceLevel} \\\\
               \\left (p \\right ) = ${significanceLevel} \\\\
               z_{${significanceLevel}} = ${criticalValue.toFixed(4)}
            \\end{array}                  
         \\]
         The critical value for a right tailed test is:
         \\[
            \\begin{array}{}
               z = ${1 * criticalValue.toFixed(4)} \\\\
               \\textbf{Critical Value: } ${criticalValue.toFixed(4)}
            \\end{array}
         \\]
      `
   }

   
   step4.innerHTML = `
      <li>Calculate the z-statistic:</li>
      \\[
         \\begin{array}{}
            Z = \\frac{\\overline{x} - \\mu_0}{\\sigma/\\sqrt{n}}
            \\Rightarrow
            \\frac{${sampleMeanValue} - ${nullValue}}{${populationSdValue}/\\sqrt{${sampleSizeValue}}}
            =
            ${zValue.toFixed(4)} \\\\
            \\textbf{Z-Statistic: } ${zValue.toFixed(4)}
               
         \\end{array}
      \\]
   `

   step5.innerHTML = `
      <li>Make a decision based on the result:</li>
   `

   if (nullOperatorValue === '=') {
      step5.innerHTML += `
      \\[
         \\begin{array}{}
            \\text{if Z-Statistic}  \\leq \\text{-Critical Value}\\\\
            \\text{or Z-Statistic} \\geq \\text{Critical Value, then reject } H_{0}\\\\
            \\\\
            \\text{if } ${zValue.toFixed(4)} \\leq ${-criticalValue.toFixed(4)} \\text{ or }  ${zValue.toFixed(4)} \\geq ${1*criticalValue.toFixed(4)} \\text{, then reject } H_{0}
         \\end{array}
      \\]
      `      
   } else if (nullOperatorValue === '≥') {
      step5.innerHTML += `
      \\[
         \\begin{array}{}
            \\text{if Z-Statistic}  \\leq \\text{Critical Value, then reject } H_{0}\\\\
            \\\\
            \\text{if } ${zValue.toFixed(4)} \\leq ${criticalValue.toFixed(4)} \\text{, then reject } H_{0}
         \\end{array}
      \\]
      `
   } else if (nullOperatorValue === '≤') {
      step5.innerHTML += `
      \\[
         \\begin{array}{}
            \\text{if Z-Statistic}  \\geq \\text{Critical Value, then reject } H_{0}\\\\
            \\\\
            \\text{if } ${zValue.toFixed(4)} \\geq ${criticalValue.toFixed(4)} \\text{, then reject } H_{0}
         \\end{array}
      \\]
      `
   }

   if (reject) {
      step5.innerHTML += `
         \\[ \\textbf{Decision: } \\text{Reject Null Hypothesis}\\]
      `
   } else {
      step5.innerHTML += `
         \\[ \\textbf{Decision: } \\text{Fail to Reject Null Hypothesis}\\]
      `         
   }
      
   MathJax.typeset();


   
   
}

   
function reset(){
   // Clear text input fields
   document.getElementById("null-val").value = "";
   document.getElementById("alt-val").value = "";
   document.getElementById("sample-mean-val").value = "";
   document.getElementById("sample-size-val").value = "";
   document.getElementById("population-sd-val").value = "";

   // Reset dropdowns to default (first option)
   document.getElementById("null-operator-val").selectedIndex = 0;
   document.getElementById("alt-operator-val").selectedIndex = 0;
   // document.getElementById("available-data").selectedIndex = 0;
   document.getElementById("significance-level").selectedIndex = 0;
   document.getElementById("confidence-level").selectedIndex = 0;

   const altInput = document.getElementById("alt-val");
   const altSelect = document.getElementById("alt-operator-val");
   altInput.value = "";
   altSelect.selectedIndex = 0;

   const results = document.getElementById('results');
   const zstatistic = document.getElementById('zstatistic');
   const critical = document.getElementById('critical');
   const decision = document.getElementById('decision');
   document.getElementById('svg-wrap').style.display = 'none';

   results.innerHTML = '';
   zstatistic.innerHTML = '';        
   critical.innerHTML = '';        
   decision.innerHTML = '';

   const solution = document.getElementById('solution');
   solution.style.display = 'none';
}

   //Function to perform live updates kada "change" o pag select ng option ng user.
function updateAltValue(){
   let input = document.getElementById("null-val").value;
   let altValue = document.getElementById("alt-val");
   altValue.value = input;

   let nullOperatorValue = document.getElementById("null-operator-val").value;
   let altSelect = document.getElementById('alt-operator-val');

   if(nullOperatorValue === "="){
      altSelect.value = "≠"; 
   } else if(nullOperatorValue === "≤"){
      altSelect.value = ">"; 
   } else if(nullOperatorValue === "≥"){
      altSelect.value = "<"; 
   }
}

function updateNullValue(){
   let input = document.getElementById("alt-val").value;
   let nullValue = document.getElementById("null-val");
   nullValue.value = input;

   let altOperatorValue = document.getElementById("alt-operator-val").value;
   let nullSelect = document.getElementById('null-operator-val');

   if(altOperatorValue === "≠"){
      nullSelect.value = "="; 
   } else if(altOperatorValue === ">"){
      nullSelect.value = "≤"; 
   } else if(altOperatorValue === "<"){
      nullSelect.value = "≥"; 
   }
}


function updateConfidence(){
   let input = document.getElementById("significance-level").value; 
   let confidenceSelect = document.getElementById("confidence-level");

   if(input === "0.05"){
      confidenceSelect.value = "95%";
   } else if (input === "0.01"){
      confidenceSelect.value = "99%";
   } else {
      confidenceSelect.value = "90%";
   }
}

function updateSignificance(){
   let input = document.getElementById("confidence-level").value;
   let significanceSelect = document.getElementById("significance-level");

   if(input=="95%"){
      significanceSelect.value = "0.05";
   } else if (input =="99%"){
      significanceSelect.value = "0.01";
   } else if (input =="90%"){
      significanceSelect.value = "0.10";
   }
}

// Cham's Javascript Code
function showGraphArea(tail, value, zValue) {
   const left = document.getElementById('leftangle');
   const right = document.getElementById('rightangle');
    
   if (tail === 'left') {
      left.setAttribute('x', `${value * 150}`);
   } else if (tail === 'right') {
      right.setAttribute('x', `${600 + value * 150}`)
   }

   const line = document.getElementById('zline');
   const z_text = document.getElementById('z');
   console.log(zValue);
   line.setAttribute('x1', `${zValue * 150 + 600}`)
   line.setAttribute('x2', `${zValue * 150 + 600}`)
   z_text.setAttribute('x', `${zValue * 150 + 593}`)
}

