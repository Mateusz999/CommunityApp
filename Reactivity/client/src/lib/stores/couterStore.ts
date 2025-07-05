import {  makeAutoObservable } from 'mobx'


export default class CounterStore {
    title = 'Counter Store';
    counter = 0;
    events: string[] = [
        `Wartość zainicjalizowana ${this.counter}`
    ]


    constructor(){
        // makeObservable(this, {
        //     title: observable,
        //     counter: observable,
        //     increment: action,
        //     decrement: action
        // })

        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.counter += amount;
        this.events.push(`Zwiększone przez ${amount} - licznik wynosi teraz ${this.counter}`)
    }

    decrement = (amount = 1) => {
        this.counter -= amount;
        this.events.push(`Zmniejszone przez ${amount} - licznik wynosi teraz ${this.counter}`)

    }
    
    get eventCount(){
        return this.events.length
    }

}