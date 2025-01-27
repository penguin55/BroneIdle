var modifierTime = 1;

function checkParamterStatus(){
    growUp();
}

function growUp(){
    if (statusBrone.broneAge == 3) return;

    if (statusBrone.getAgi() >= 5 && statusBrone.getStr() >= 5 && statusBrone.broneAge == 0) {
        PlayGrowSFX();
        statusBrone.broneAge = 1;
    } else if (statusBrone.getAgi() >= 20 && statusBrone.getStr() >= 20 && statusBrone.broneAge == 1) {
        PlayGrowSFX();
        statusBrone.broneAge = 2;
    } else if (statusBrone.getAgi() >= 50 && statusBrone.getStr() >= 50 && statusBrone.broneAge == 2) {
        PlayGrowSFX();
        statusBrone.broneAge = 3;
    }
    if (statusBrone.broneAge > 0) brone.changeFrame(statusBrone.broneAge + 5, 0);
    else brone.changeFrame(statusBrone.broneAge, 0);
}

function barUpdate(){
    var indexBar;

    indexBar = Math.floor(statusBrone.getStamina() / 10);
    barStamina.changeFrame(0, indexBar);

    indexBar = Math.floor(statusBrone.getEat() / 10);
    barEat.changeFrame(0, indexBar);

    indexBar = Math.floor(statusBrone.getClean() / 10);
    barClean.changeFrame(0, indexBar);
}


function TimeNow(){
    return Date.now();
}

function decrementEat(){
    var time = (TimeNow() - statusBrone.timeStampHunger)/1000;
    var multiply = Math.floor(time/(10*60/modifierTime));
    if ( time >= 10*60 / modifierTime) {
        statusBrone.timeStampHunger = TimeNow();
        statusBrone.eat( (-statusBrone.modifierHunger * (2**statusBrone.broneAge)) * multiply );
    }
}

function decreamentBath(){
    var time = (TimeNow() - statusBrone.timeStampBath)/1000;
    var multiply = Math.floor(time/(3*60/modifierTime));
    if ( time >= 3*60 / modifierTime) {
        statusBrone.timeStampBath = TimeNow();
        statusBrone.bath(-statusBrone.modifierBath * multiply);
    }
}

function decrementStatus(){
    decrementEat();
    decreamentBath();
}

function convertToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return mins + ':' + secs;
}