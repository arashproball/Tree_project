import Node from './components/Node';
import './App.css'
import { Layoute } from "./components/Layoute";


function App() {
  
  const initialList = [
    {
      id: 0,
      text: "مهدی فایضی",
      level: 0,
      children: [
        {
          id: 0,
          text: "Creola Katherine Johnson",
          level: 1,
          children: [
            {
              id: 0,
              text: "Child Node 1",
              level: 2,
              children: []
            }
          ]
        },
        {
          id: 1,
          text: "Mohammad آرش Salam",
          level: 1,
          children: [
            {
              id: 0,
              text: "Child Node 2",
              level: 2,
              children: [{
                id:0,
                text: "Child Node 2",
                level: 3,
                children: []
              
              },{
                id:1,
                text: "Child Node 2",
                level: 3,
                children: [{
                    id: 0,
                    text: "Mario José Molina-Pasquel Henríquez",
                    level: 4,
                    children: []
                  }]
              }]
            }
          ]
        }
      ]
    },
    {
      id: 1,
      text: "Mario José Molina-Pasquel Henríquez",
      level: 0,
      children: []
    },{
      id: 2,
      text: "Mario José Molina-Pasquel Henríquez",
      level: 0,
      children: []
    }
  ]
return(
  <div className='conteiner'>
  <Layoute/>
  <div className="TreeView">
    

    
      
    <Node initialList={initialList} /> 
    
    {/* <MultiPurposeButton /> Use your compzonent here */}


    
  </div></div>
);

}
export default App
