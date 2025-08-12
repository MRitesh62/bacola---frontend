import Table from 'react-bootstrap/Table';
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import UpdateCategory from '../UpdateCategory';
const CategoryList = () => {
    const [list, setList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editData, setEditdata] = useState({});
    const[refresh,setRefresh]=useState(1)
    useEffect(() => {
        axios.get("http://localhost:8001/api/get-categories")
            .then(response => {
                // console.log(response.data.data.sub_category),
                setList(response.data.data);
                setRefresh(r => r + 1)

            })
    }, [refresh])

    //Delete Category
    const del = (id, name)=>{
        const conf = window.confirm(`Do you want to delete ${name}`);
        if (conf) {
            axios.delete(`http://localhost:8001/api/delete-category/${id}`,
                { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                .then(response => {
                    // console.log(response);
                    setRefresh(r=>r+1)
                
                })
            .catch(err=>console.log(err)
            )
        }
    }
    return (
        <div style={{width:'100%'}}>
            <h1>Categories List</h1><br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        {/* <th>Subcategory Name</th> */}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item,no) => {
                            return <tr>
                                <td>{no+1}</td>
                                <td>{item.category_name} </td>
                                {/* <td>{item.sub_category.category_name} </td> */}
                                <td>
                                    <button onClick={() => {
                                        setEdit(true);
                                        setEditdata(item);
                                    }} style={{backgroundColor:'transparent',border:'none',color:'white'}}>{<CiEdit />} </button>
                                </td>
                                <td>
                                    <button onClick={()=>del(item._id,item.category_name)} style={{backgroundColor:'transparent',border:'none',color:'white'}}>
                                    {<MdDelete/>} 
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
            <UpdateCategory show={edit} onHide={()=>setEdit(false)} data={editData}/>
        </div>
    )
}

export default CategoryList;