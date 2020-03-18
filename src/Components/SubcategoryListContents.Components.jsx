import React from 'react'

const SubcategoryListContents = (props) =>{

    const {task_list, toggleCheckChapter, removeChapter} = props;
    return  task_list.map(function(subtask, index){
            return (
             <div className="card-dimension">
                 <button className="btn-rounded" type="button" onClick={() => toggleCheckChapter(subtask)}>
                   
               { (subtask.chapter_status ) ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-square" aria-hidden="true"></i>}
             </button>
                <div className="category-items">{subtask.chapter_title}</div>
                <button className="btn-rounded" type="button" onClick={() => removeChapter(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            )
            }
    )
}
 
export default SubcategoryListContents;