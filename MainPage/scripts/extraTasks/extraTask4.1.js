class Node {
    constructor(value) {
        this._next = null;
        this._value = value;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }

    get value() {
        return this._value;
    }
}

class List {
    constructor(value) {
        this._root = new Node(value);
        this._lenght = 1;
    }

    addNode(value, i) {
        if (i > this._lenght) {
            return false;
        }

        let current = this._root;

        let end;

        if (typeof i === 'undefined') {
            end = this._lenght - 1;
        } else {
            end = i;
        }

        for (let j = 0; j < end; j++) {
            current = current.next;
        }

        const inserted = new Node(value);
        inserted.next = current.next;

        current.next = inserted;

        this._lenght++;

        return true;
    }

    removeNode(i) {
        if (i > this._lenght || this._lenght === 1) {
            return false;
        }

        let removed;

        if (i === 0) {
            removed = this._root;
            this._root = removed.next;
            removed = null;
            this._lenght--;
            return true;
        }

        let prev = this._root;
        let current;

        for (let j = 0; j < i - 1; j++) {
            prev = prev.next;
            current = prev.next;
        }

        removed = current;
        current = removed.next;
        prev.next = current;
        removed = null;
        this._lenght--;
        return true;
    }

    print() {
        let current = this._root;
        for (;current !== null;) {
            console.log(current.value);
            current = current.next;
        }
    }
}

/*------------------------------------------------------------------------------------------------*/

console.log('---initialising---');
const lst = new List(1);

for (let i = 2; i < 11; i++) {
    console.log(lst.addNode(i)); /* true */
}
lst.print();

console.log('---removing---');

console.log(lst.removeNode(0)); /* true */
lst.print();

console.log(lst.removeNode(11)); /* false: out of range */
lst.print();

console.log(lst.removeNode(5)); /* true */
lst.print();

console.log('---inserting---');

console.log(lst.addNode(7, 4)); /* true */
lst.print();

console.log(lst.addNode(7, 11)); /* false: out of range */
lst.print();

console.log('---removing-all---');
for (let i = 0; i < 12; i++) {
    console.log(lst.removeNode(0)); /* 8 true,  4 false, because last
    4 times there is only 1 element in collection */
}
lst.print();
