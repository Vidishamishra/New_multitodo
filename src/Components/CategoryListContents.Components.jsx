import React from 'react';
 
const CategoryListContents = (props) =>{
   
    const {task_container, toggleCheckSubject, showList, removeSubject} = props;
     return task_container.map(function(task, index){
         return(
            <div className="card-dimension" key={index}>
            <button className="btn-rounded" type="button" onClick={() => toggleCheckSubject(task)}>
            { (task.status) ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-square" aria-hidden="true"></i>}
             </button>
  
            <div className="category-items">{task.title}</div>
            <button className="btn-rounded" type="button" onClick={() => showList(index)}><i className="fa fa-plus" aria-hidden="true"></i></button>
            <button className="btn-rounded" type="button" onClick={() => removeSubject(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
            </div>
          )
       }
     )

}

export default CategoryListContents;