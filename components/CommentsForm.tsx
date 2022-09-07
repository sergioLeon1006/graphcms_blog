import React, {useRef,useState,useEffect} from 'react'
import { submitComment } from '../services';

function CommentsForm({slug}:any) {
  const [error, setError] = useState(false);
  // const [localStorage, setLocalStorage]:any = useState(null);
  const [succes, setSucces] = useState(false);
  const commentElement:any = useRef();
  const nameElement:any = useRef();
  const emailElement:any = useRef();
  const storeDataElement:any = useRef();

  useEffect(() => {
    nameElement.current.value = window.localStorage.getItem('name');
    emailElement.current.value = window.localStorage.getItem('email');
  }, [])
  

  const handleCommentSubmission = () =>{
    setError(false);

    const {value: comment} =  commentElement.current;
    const {value: name} =  nameElement.current;
    const {value: email} =  emailElement.current;
    const {value: stored} =  storeDataElement.current;

    if (!comment || !name || !email) {
      setError(true);
      return false;
    }

    const commentObject = {name,email,comment, slug};

    if (stored) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    }else{
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObject).then((res) => {
      setSucces(true);
      setTimeout(() => {
          setSucces(false);
      }, 3000);
    })
  }


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibol border-b pb-4">Leave a Comment</h3>
      <div className="grid grid-cols-1 gab-4 mb-4">
        <textarea ref={commentElement} 
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Comment'
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input ref={nameElement} 
          type="text" 
          className="py-4 px-4 mx-auto outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Full name'
          name="name"
        />
        <input ref={emailElement} 
          type="email" 
          className="py-4 px-4 mx-auto outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='email'
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <input ref={storeDataElement} type="checkbox" id="storeData" name="storeData" value="true"/>
          <label className="text-gray-500 cursor-pointer mx-4" htmlFor="storeData">Save e-mail and name for the next time</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required!</p>}
      <div className="mt-8">
        <button 
          type="button" 
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer" 
          onClick={handleCommentSubmission}>
          Post comment  
        </button>
        {succes && <span className="text-xl float-right font-semibold mt-3 text-green-500">Coment summited </span>}
      </div>
    </div>
  )
}

export default CommentsForm