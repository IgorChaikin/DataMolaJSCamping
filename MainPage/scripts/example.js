let persons=[
    {
        name:'Anton',
        lastname:'Ivanov',
        age: 19
    },

    {
        name:'Ivan',
        lastname:'Petrov',
        age: 21
    },

    {
        name:'Igor',
        lastname:'Chaikin',
        age: 20
    },
];

function compare(a,b){
    if(+a.age>+b.age)
        return -1;
    if (+a.age<+b.age)
        return 1;
    return 0;
}

for(let i=0;i<persons.length;i++)
{
    console.log('\nName:'+persons[i].name+'\nLastname:'+persons[i].lastname+'\nAge:'+persons[i].age);
}

console.log('-------------------------');

persons.forEach(person => console.log('\nName:'+person.name+'\nLastname:'+person.lastname+'\nAge:'+person.age));

let noIgor = persons.filter(person => person.name !== 'Igor');

console.log('-------------------------');

for(let i=0;i<noIgor.length;i++)
{
    console.log('\nName:'+noIgor[i].name+'\nLastname:'+noIgor[i].lastname+'\nAge:'+noIgor[i].age);
}

persons.sort(compare);

console.log('-------------------------');

for(let i=0;i<persons.length;i++)
{
    console.log('\nName:'+persons[i].name+'\nLastname:'+persons[i].lastname+'\nAge:'+persons[i].age);
}

let newPersons = persons.map(person => Object.assign(person, {fullname: person.name+' '+person.lastname}));

console.log('-----------old--------------');

for(let i=0;i<persons.length;i++)
{
    console.log('\nName:'+persons[i].name+'\nLastname:'+persons[i].lastname+'\nAge:'+persons[i].age);
}

console.log('------------new-------------');

for(let i=0;i<newPersons.length;i++)
{
    console.log('\nName:'+newPersons[i].name+'\nLastname:'+newPersons[i].lastname+'\nFullname:'+newPersons[i].fullname+'\nAge:'+newPersons[i].age);
}
