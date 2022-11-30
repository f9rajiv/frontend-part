import React,{useState,useEffect} from "react";
import axios from'axios'

const Table =()=>{
const[posts,setPosts]=useState([])

const fetchUrl ="http://localhost:8080/product/"
useEffect(()=>{
    async function fetchData(){
        const data = await axios.get(fetchUrl)
        setPosts(data.data)
    }
    fetchData()

},[fetchUrl])
console.log(posts)

    return(
        <div>
        <table className="table table-bordered border-primary">
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
                {posts.map((post)=>
                <tr key={post._id}>
                    <td>{post.product_name}</td>
                    <td>{post.category_name}</td>
                    <td>{post.description}</td>
                    <td>{post.createdAt}</td>
                    <td>{post.status}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}

export default Table