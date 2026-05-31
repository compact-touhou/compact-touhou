const cirno1 = document.getElementById('Cirnoimg1');
const cirno2 = document.getElementById('Cirnoimg2');
const body = document.getElementById('bg2');
const form = document.getElementById('form');
const twitter = document.getElementById('twitter');
const bubble1 = document.getElementById('bubble1');
const main = document.getElementById('main2');

const cirno_float = "cirno-flying.gif";
const cirno_wave = "cirno-hit.gif";
const cirno_fear = "cirno-fear.gif";
const cirno_no_fear = "cirno-no-fear.png";
const cirno_surprise = "cirno-surprise.png";
const cirno_spell = "cirno-spell.gif";
const cirno_guard = "cirno-guard.gif";
const cirno_wait = "cirno-wait.gif";

const STATES = {
    FLY: 'flying',
    FEAR: 'fear',
    NO_FEAR: 'no_fear',
    HIT: 'hit',
    SPELL: 'spell',
    GUARD: 'guard'
};

const speech = ['Hey!', 'Stop it!', "You'll regret it!", 'Warn you!', 'Take this!'];

const cirno1State = {
    doc: cirno1,
    state: STATES.FLY,
    hovered: false,
    timeout: null
};

const cirno2State = {
    doc: cirno2,
    state: STATES.FLY,
    hovered: false,
    timeout: null
};

function shakeScreen(){
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 400);
}

function render(cirno){
    switch(cirno.state){
        case STATES.FLY:
            cirno.doc.src = cirno_float;
            break;
            
        case STATES.FEAR:
            cirno.doc.src = cirno_fear;
            break;
            
        case STATES.NO_FEAR:
            cirno.doc.src = cirno_no_fear;
            break;
                
        case STATES.HIT:
            cirno.doc.src = cirno_wave;
            break;
        
        case STATES.SPELL:
            cirno.doc.src = cirno_spell;
            break;
        
        case STATES.GUARD:
            cirno.doc.src = cirno_guard;
            break;
    }
}

function setState(cirno, newState){
    cirno.state = newState;
    render(cirno);
}

let click_count = 0;
let wasSpell = false;

function setupCirno(cirno){

    cirno.doc.addEventListener('mouseover', () => {
        cirno.hovered = true;
        
        if (cirno.state === STATES.HIT) return;
        if (cirno.state === STATES.GUARD) return;
        if (cirno.state === STATES.SPELL) return;
        
        clearTimeout(cirno.timeout);

        if (!wasSpell)
            setState(cirno, STATES.FEAR);
    });

    cirno.doc.addEventListener('mouseout', () => {
        cirno.hovered = false;

        if (cirno.state === STATES.HIT) return;
        if (cirno.state === STATES.GUARD) return;
        if (cirno.state === STATES.SPELL) return;
        if (wasSpell) return;

        clearTimeout(cirno.timeout);
        setState(cirno, STATES.NO_FEAR);
        
        cirno.timeout = setTimeout(() => {
            if (!cirno.hovered)
                setState(cirno, STATES.FLY);
        }, 500);
    });

    cirno.doc.addEventListener('click', () =>{

        if (cirno.state === STATES.SPELL) return;

        clearTimeout(cirno.timeout);

        click_count++;
        if (click_count == 3){
            body.classList.add('show');
            main.classList.add('changed');
            document.body.classList.add('spell-mode');
            wasSpell = true;
            setState(cirno, STATES.SPELL);
            //bubble1.textContent = speech[4];
            shakeScreen();

            cirno.timeout = setTimeout(() => {
                bubble1.classList.remove('show');
                setState(cirno, STATES.FLY);
            }, 3000);
            return;
        }
        
        if (wasSpell){
            setState(cirno, STATES.GUARD);
            cirno.timeout = setTimeout(() => {
                setState(cirno, STATES.FLY);
            }, 500);
        }else{
            setState(cirno, STATES.HIT);

            //bubble1.textContent = speech[click_count-1];
            //bubble1.classList.add('show');

            cirno.timeout = setTimeout(() => {
                //bubble1.classList.remove('show');
                if(cirno.hovered)
                    setState(cirno, STATES.FEAR);
                else
                    setState(cirno, STATES.FLY);
            }, 700);
        }
    });

}


setupCirno(cirno1State);
setupCirno(cirno2State);

twitter.addEventListener('mouseover', () => {
    cirno1.src = cirno_wait;
    cirno2.src = cirno_wait;
});

form.addEventListener('mouseover', () => {
    cirno1.src = cirno_surprise;
    cirno2.src = cirno_surprise;
});

twitter.addEventListener('mouseout', () => {
    cirno1.src = cirno_float;
    cirno2.src = cirno_float;
});

form.addEventListener('mouseout', () => {
    cirno1.src = cirno_float;
    cirno2.src = cirno_float;
});