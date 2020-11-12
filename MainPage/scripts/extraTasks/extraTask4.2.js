function add(coefficient, argument) {
    if (typeof argument !== 'undefined') {
        return coefficient + argument;
    }

    return (x) => x + coefficient;
}

function sub(coefficient, argument) {
    if (typeof argument !== 'undefined') {
        return coefficient - argument;
    }

    return (x) => x - coefficient;
}

function mul(coefficient, argument) {
    if (typeof argument !== 'undefined') {
        return coefficient * argument;
    }

    return (x) => x * coefficient;
}

function div(coefficient, argument) {
    if (typeof argument !== 'undefined') {
        return coefficient / argument;
    }

    return (x) => x / coefficient;
}

function pipe(...args) {
    return (x) => {
        let tmp = x;
        for (const f of args) {
            tmp = f(tmp);
        }
        return tmp;
    };
}

/*------------------------------------------------------------------------------------------------*/

const a = add(1, 2);
console.log(a); /* 3 */

const b = mul(a, 10);
console.log(b); /* 30 */

const sub1 = sub(1);
const c = sub1(b);
console.log(c); /* 29 */

const d = mul(sub(a, 1))(c);
console.log(d); /* 58 */

const doSmth = pipe(add(d), sub(c), mul(b), div(a));
const result = doSmth(0);
console.log(result); /* 290 */

const x = pipe(add(1), mul(2))(3);
console.log(x); /* 8 */
