import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task_container: [],
      task_list: [],
      subject_name: "",
      chapter_name: "",
      task_id: "",
      error: {}
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
      error: {
        ...this.state.error,
        task: null
      }
    })
  }

  showList = (index) => {


    let add_task = this.state.task_container[index]
    let task_value = { ...add_task }
    this.setState({

      task_list: task_value.list,
      task_id: task_value.title
    })
  }


  addSubjectName = (event) => {
    event.preventDefault()
    let selected_subject = this.state.subject_name
    let temporary_container = this.state.task_container
    if (selected_subject.trim()) {
      temporary_container.push(
        {
          title: selected_subject,
          status: false,
          list: []
        }
      )

      this.setState({
        task_container: temporary_container,
        subject_name: ""
      })
    }
    else {
      this.setState({
        error: {
          ...this.state.error,
          task: "Enter some text!!"
        }
      })
    }
  }

  removeSubject = (index) => {
    // debugger
    let removable_subject = [...this.state.task_container]
    this.setState({
      task_container : removable_subject
    })

    if(this.state.task_id === this.state.task_container[index].title){
      this.setState({
        task_id : "",
        task_list : []
      })
    }

  }

  toggleCheckSubject = (task) => {
    debugger
    let subjectCopy = [...this.state.task_container]
    var l = []
    let i, j
    for (i = 0; i < subjectCopy.length; i++) {
      if (subjectCopy[i].title === task.title) {
        break
      }
    }
    if (!subjectCopy[i].status) {
      subjectCopy[i].status = !subjectCopy[i].status
      for (j = 0; j < subjectCopy[i].list.length; j++) {

        subjectCopy[i].list[j].chapter_status = true
      }
    }
    else {
      subjectCopy[i].status = !subjectCopy[i].status
      for (j = 0; j < subjectCopy[i].list.length; j++) {
        subjectCopy[i].list[j].chapter_status = false
      }
    }
    l = subjectCopy[i].list
    this.setState({
      task_container : subjectCopy,
      tasl_list : l
    })
  }

  addChapterName = (event) => {
    event.preventDefault()
    let select_subject = [...this.state.task_container]
    let i;
    if (!!this.state.task_id && this.state.task_id.length > 0 ) {

      let selected_chapter = this.state.chapter_name


      for (i = 0; i < select_subject.length; i++) {
        if (select_subject[i].title === this.state.task_id) {

          if (selected_chapter.length > 0) {
            select_subject[i].list.push({
              chapter_title: this.state.chapter_name,
              chapter_status: false
            })
            break
          }
        }
      }
      this.setState({
        task_container: select_subject,
        task_list: select_subject[i].list,
        chapter_name: ""
      })
    }
    else {
      if(!!this.state.task_id && this.state.task_id.length > 0){
        this.setState({
          error: {
            ...this.state.error,
            task: "Please select a subject"
          }
      })}
      else{
      this.setState({
        error: {
          ...this.state.error,
          task: "Please enter some text"
        }
      })
    }

    }

  }

  removeChapter = (index) => {
    // debugger
    let removable_task = [...this.state.task_container]
    var temp_list = []
    let i
    for (i = 0; i < removable_task.length; i++) {
      if (removable_task[i].title === this.state.task_id) {
        removable_task[i].list.splice(index, 1)
        break
      }
    }
    temp_list = removable_task[i].list

    this.setState({
      task_container: removable_task,
      task_list: temp_list
    })
  }

  checkSubject = () => {
    var subjectCopy = [...this.state.task_container];
    let i
    for (i = 0; i < subjectCopy.length; i++) {
      if (subjectCopy[i].title === this.state.task_id) { // return selected subject status
        return  subjectCopy[i].status
      }
    }
  }


  toggleCheckChapter = (subtask) => {
    debugger
    
    var subjectCopy = [...this.state.task_container]
    var a =[]
    let i,j,count=0



    for (i = 0; i < subjectCopy.length; i++) {
      if (subjectCopy[i].title === this.state.task_id) {
        for(j=0;j < subjectCopy[i].list.length; j++){
          if(subjectCopy[i].list[j].chapter_title === subtask.chapter_title){
            subjectCopy[i].list[j].chapter_status = !subjectCopy[i].list[j].chapter_status
          }
          if(subjectCopy[i].list[j].chapter_status === true){ // counting number of checked chapters
            count++
          }
        }


        if(subjectCopy[i].list.length === count){ // if all chapter are checked then check the subject
          subjectCopy[i].status = true;
        }
        else{
          subjectCopy[i].status = false;
        }

        break
        }
      }
      a = subjectCopy[i].list;

    this.setState({
      task_container: subjectCopy,
      task_list: a
    })

  }


  render() {

    let categoryListContents = () => this.state.task_container.map(function (task, index) {
      return (

        <div className="card-dimension">
          <button className="btn-rounded" type="button" onClick={() => this.toggleCheckSubject(task)}>
          { (task.status) ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-square" aria-hidden="true"></i>}
        </button>

          <div className="category-items">{task.title}</div>
          <button className="btn-rounded" type="button" onClick={() => this.showList(index)}><i className="fa fa-plus" aria-hidden="true"></i></button>
          <button className="btn-rounded" type="button" onClick={() => this.removeSubject(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
      )
    }, this);

     let listContents = () => this.state.task_list.map(function(subtask, index){
       return (
        <div className="card-dimension">
            <button className="btn-rounded" type="button" onClick={() => this.toggleCheckChapter(subtask)}>
              {subtask.status}
              { this.checkSubject()}
          { (subtask.chapter_status ) ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-square" aria-hidden="true"></i>}
        </button>
           <div className="category-items">{subtask.chapter_title}</div>
           <button className="btn-rounded" type="button" onClick={() => this.removeChapter(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
         </div>
       )
     },this); 

    return (
      <React.Fragment>

        <nav className="navbar">
          <span className="nav-header mx-auto">TODO LIST</span>
        </nav>

        <div className="container vertical-center">

          <div className="row main-container">
            <div className="col-lg-4 card offset-lg-1 card category-container shadow bg-white rounded ">
              <div className="card-header">
                <span className="text2">Subject</span>

              </div>

              <div className="input-btn-style">
                <input className="form-control category-title shadow" type="text" onChange={this.handleChange} value={this.state.subject_name} name="subject_name" required placeholder="Add Subject Name"></input>
                
                <button className="btn-rounded shadow" type="button" onClick={this.addSubjectName}><i className="fa fa-plus" aria-hidden="true"></i></button>
                {this.state.error.task && <div className="error"> {this.state.error.task} </div>}
              </div>
              <div className="content">
              {categoryListContents()}
            </div>
            </div>
           
            {this.state.task_id &&
              <div className="col-lg-4 card offset-lg-2 card subcategory-container shadow bg-white rounded">
                <div className="card-header">
                  <span className="text2">Chapters of : {this.state.task_id}</span>
                </div>

                <div className="input-btn-style">
                  <input className="form-control category-title shadow" type="text" onChange={this.handleChange} value={this.state.chapter_name} name="chapter_name" required placeholder="Add Chapter Name"></input>
                  
                  <button className="btn-rounded shadow" type="button" onClick={this.addChapterName}><i className="fa fa-plus" aria-hidden="true"></i></button>
                  {this.state.error.task && <div className="error"> {this.state.error.task} </div>}
                </div>

                <div className="content">
                  {listContents()}
                </div>
              </div>}
          </div>
        </div>
      </React.Fragment>

    )
  }

}
export default App;