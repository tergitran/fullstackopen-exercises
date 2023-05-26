// const Header = (props) => {
//   return <h1>{props.course}</h1>;
// };
// const Part = (props) => {
//   const { part, exercises } = props;
//   return (
//     <p>
//       {part} {exercises}
//     </p>
//   );
// };
// const Content = (props) => {
//   const { parts } = props;
//   const contentList = parts.map((item) => (
//     <Part part={item.name} exercises={item.exercises}></Part>
//   ));
//   return <>{contentList}</>;
// };
// const Total = (props) => {
//   const { parts } = props;
//   const sum = parts.reduce((s, it) => s + it.exercises, 0);
//   return <p>Number of exercises {sum}</p>;
// };

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name}></Header>
//       <Content parts={course.parts}></Content>
//       <Total parts={course.parts}></Total>
//     </div>
//   );
// };

import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
 }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;
