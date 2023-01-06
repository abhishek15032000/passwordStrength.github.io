

const strengthMeter=document.getElementById('strength-meter');
const passwordInput=document.getElementById('password-input');
const reasonContainer=document.getElementById('reasons');

passwordInput.addEventListener('input',updateStrengthMeter)
updateStrengthMeter();

function updateStrengthMeter(){
     const weakness=calculatePasswordStrength(passwordInput.value);
     let strength=100;
     reasonContainer.innerHTML='';
     weakness.forEach(weakness=>{
        if(weakness == null ){
            return;
        }
       strength-=weakness.deduction;
       const messageElement=document.createElement('div');
       messageElement.innerText=weakness.message;
       reasonContainer.appendChild(messageElement);
     })
     console.log(strength);
     strengthMeter.style.setProperty('--strength',strength);
}

function calculatePasswordStrength(password){
   const weakness=[];
   weakness.push(lengthWeakness(password));
   weakness.push(characterTypeWeakness(password,/[a-z]/g,"lowercase characters"));
   weakness.push(characterTypeWeakness(password,/[A-Z]/g,"Uppercase characters"));
   weakness.push(numberWeakness(password));
   weakness.push(specialCharacterCheck(password));
   weakness.push(repeatCharacterWeakness(password));
   return weakness;
}

function lengthWeakness(password){
   const length=password.length;
   if(length<=8){
     return {
        message:'Your password is too short',
        deduction:40,
     }
   }

   if(length<=10){
    return {
        message:"Your password could be longer",
        deduction:15,
    }
   }
}

function characterTypeWeakness(password,regex,type){
    const matches=password.match(regex) || [];
    if(matches.length===0){
        return {
            message:`Your password has no ${type}`,
            deduction:20,
        }
    }
    if(matches.length<=2){
        return{
            message:`Your password could use more ${type}`,
            deduction:5,
        }
    }
}

function numberWeakness(password){
    return characterTypeWeakness(password,/[0-9]/g,"Numbers");
}

function specialCharacterCheck(password){
    return characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g,"Special Characters");
}

function repeatCharacterWeakness(password){
    const matches=password.match(/(.)\1/g)|| [];
    if(matches.length>0){
        return {
            message:'Your password has repeat characters',
            deduction:matches.length*10,
        }
    }
}