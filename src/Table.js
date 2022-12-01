import React,{useState,useEffect} from "react";
import axios from'axios'
import './Table.css'

const Table =()=>{
const[search,setSearch]=useState('')
const[posts,setPosts]=useState([])
const [addPost,setAddPost]=useState({
    product_name:'',
    category_name:'',
    description:'',
    status:'',
})
const [editPost,setEditPost]=useState({
  id:'',
  product_name:'',
  category_name:'',
  description:'',
  status:'',
})
const handleChange =(input)=>(e)=>{
    e.preventDefault()

    setAddPost({...addPost,[input]: e.target.value})
    console.log(addPost)
 
}
const postData =(e)=>{
    e.preventDefault();
    const {product_name,category_name,description,status}=addPost;
    axios.post('http://localhost:8080/product/',{
      product_name,category_name,description,status

    }) 
    window.location.reload();
}
const handleEditChange =(input)=>(e)=>{
  e.preventDefault()

  setEditPost({...editPost,[input]: e.target.value})
  console.log(editPost)
  
}


const updateData = async ()=>{
 
    await  axios.put(`http://localhost:8080/product/${editPost.id}`,editPost
    
  ) 
}
const postDelete =(id)=>{
  window.location.reload();
    axios.delete(`http://localhost:8080/product/${id}`) 
}



const fetchUrl ="http://localhost:8080/product/"
useEffect(()=>{
    async function fetchData(){
        const data = await axios.get(fetchUrl)
        setPosts(data.data)
    }
    fetchData()

},[fetchUrl])


    return(

        <div className="fontStyle">
         
            <h3>Product Table</h3>
          

            <div className="d-flex flex-row">
        <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2" 
        data-bs-toggle="modal" 
        data-bs-target="#addModalForm">
          Add New Product
        </button>

        <form className="row g-3 ms-auto">
          <div className="col-auto">
            <input
              type="text"
              className="form-control ms-auto"
              placeholder="search Product"
              onChange={(e)=>setSearch(e.target.value)}
             
            />
          </div>
        </form>
        </div>
        <table className="table ">
            <thead>
                <tr>
                    <th scope="col"> Name</th>
                    <th scope="col"> Category</th>
                    <th scope="col"> Description</th>
                    <th scope="col"> Created At</th>
                    <th scope="col"> Status</th>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody>
                {posts.filter((post)=>{
                  return search.toLowerCase()=== '' ? 
                  post: post.product_name.toLowerCase().includes(search)
                   ||post.category_name.toLowerCase().includes(search)
                }).map((post)=>(<tr key={post._id}>
                    <td>{post.product_name}</td>
                    <td>{post.category_name}</td>
                    <td>{post.description}</td>
                    <td>{post.createdAt}</td>
                    <td>{post.status}</td>
                    <td><button
              type="button"
              className=" btn btn-success ml-auto d-block mb-2"
              data-bs-toggle="modal"
              data-bs-target="#editModalForm"
              onClick={()=>setEditPost({
                product_name:post.product_name,
                category_name:post.category_name,
                description:post.description,
                status:post.status,
                id:post._id
                })}>
              Edit
            </button></td>
                    <td><button
              type="button"
              className=" btn btn-danger ml-auto d-block mb-2"
              onClick={()=>postDelete(post._id)}
             >
              Delete
            </button></td>
                </tr>)
                
                )}
                
            </tbody>
        </table>
         {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form method="POST">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addPost.product_name}
                    name="product_name"
                    placeholder="product_name"
                    required
                    onChange={handleChange("product_name")}
                
            
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addPost.category_name}
                    name="category_name"
                    placeholder="Category"
                    required
                    onChange={handleChange("category_name")}

                    
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="description"
                    value={addPost.description}
                    placeholder="Description"
                    required
                    onChange={handleChange("description")}

                  
                  ></textarea>
                  
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addPost.status}
                    name="status"
                    placeholder="Status"
                    required
                    onChange={handleChange("status")}

                    
                  />
                </div>
                
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end" onClick={postData}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


 {/*edit Modal */}
 <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Row</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
              <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    value={editPost.product_name}
                    placeholder="product_name"
                    required
                    onChange={handleEditChange("product_name")}
                
            
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category_name"
                    value={editPost.category_name}
                    placeholder="Category"
                    required
                    onChange={handleEditChange("category_name")}
                    
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="4"
                    cols="50"
                    className="form-control"
                    name="description"
                    value={editPost.description}
                    placeholder="Description"
                    required
                    onChange={handleEditChange("description")}
                  
                  ></textarea>
                  
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    value={editPost.status}
                    placeholder="Status"
                    required
                    onChange={handleEditChange("status")}
                    
                  />
                </div>
                
              
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-success float-end"
                   onClick={()=>updateData()}>Save Row</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>







        </div>
    )
}

export default Table