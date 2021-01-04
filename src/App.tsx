import React, { useEffect, useState } from 'react';
import { fromEvent, Subscription } from 'rxjs';
import {debounceTime, throttleTime} from 'rxjs/operators'
import './App.scss';

const teams:Array<string> = [
    "Italy",
    "Brasil",
    "Portugal",
    "France",
    "Germany",
    "Russia",
    "Argentina",
    "Uruguay",
    "Croatia",

]


type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

class Scroller {

private _scroll$ = fromEvent(window,"scroll");

  isScrolling$ =  this._scroll$.pipe(throttleTime(300));
  stopScrolling$ =  this._scroll$.pipe(debounceTime(300));

  private _sub = new Subscription();

  constructor(setFn:ReactSetter<boolean>){

    this._sub.add(this.isScrolling$.subscribe(_ =>{
      setFn(true);
    }))

    this._sub.add(this.stopScrolling$.subscribe(_ =>{
      setFn(false);
    }))

  }

  onDestroy(){
    this._sub.unsubscribe();
  }

}

function App() {

  const [isAnimating, setIsAnimating] = useState(false)

  // useEffect(() => {

  //   const _sub:Subscription = new Subscription();

  //   const scroll$ = fromEvent(window,"scroll");

  //   const tear1 = scroll$.pipe(throttleTime(300)).subscribe(res => {
  //     setIsAnimating(true);      
  //   });
  //   _sub.add(tear1);

  //   const tear2 = scroll$.pipe(debounceTime(400)).subscribe(res =>{

  //     setIsAnimating(false);
  //   });
  //   _sub.add(tear2);

  //   return function cleanup() {
  //       if(_sub){_sub.unsubscribe()}
  //   }
  // }, [])

    useEffect(() => {

    const scroller = new Scroller(setIsAnimating);

    return function cleanup() {
        scroller.onDestroy();
    }
  }, [])

  return (
    <div className="-grid">
          {teams.map((it, index) => (
            <div className={"-text " + (isAnimating ? "--animate" : "")} key={index}>{it}</div>
          ))}
    </div>
  );
}

export default App;
