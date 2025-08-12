import Table from 'react-bootstrap/Table';
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import UpdateProduct from './UpdateProduct';
const ProductList = () => {
        const [list, setList] = useState([]);
        const [edit, setEdit] = useState(false);
        const [editData, setEditdata] = useState({});
    const [refresh, setRefresh] = useState(1)
    const [filepath, setFielpath] = useState();
        useEffect(() => {
            axios.get("http://localhost:8001/api/get-products")
                .then(response => {
                    // console.log(response.data.data)
                    setFielpath(response.data.filepath);
                    setList(response.data.data);
                    setRefresh(r => r + 1)
    
                })
        }, [refresh])
    
        //Delete Category
        const del = (id, name)=>{
            const conf = window.confirm(`Do you want to delete ${name}`);
            if (conf) {
                axios.delete(`http://localhost:8001/api/delete-product/${id}`,
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
                <h1>Product List</h1><br/>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product </th>
                            <th>Category </th>
                            <th>Subcategory </th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Rating</th>
                            <th>Availablity</th>
                            <th>Short desc.</th>
                            <th>Long desc.</th>
                            <th>Type</th>
                            <th>Mfg</th>
                            <th>Life</th>
                            <th>Tags</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item,no) => {
                                return <tr>
                                    <td>{no + 1}</td>
                                    <td><img src={`${filepath}${item.images[0]}`} style={{width:'150px',borderRadius:'25%'} } alt='product image' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.category.category_name} </td>
                                    <td>{item.sub_category?.category_name || "no subcategory"} </td>
                                    <td>{item.brand ? item.brand.name : "No Brand"} </td>
                                    <td>{item.price} </td>
                                    <td>{item.discount} </td>
                                    <td>{item.rating} </td>
                                    <td>{item.availability} </td>
                                    <td className="text-truncate" style={{ width: '150px', maxWidth: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    {item.short_description}
</td>
                                    <td className="text-truncate" style={{ width: '150px', maxWidth: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    {item.long_description}
</td>
                                    <td>{item.type} </td>
                                    <td>{item.mfg} </td>
                                    <td>{item.life} </td>
                                    <td>{item.tags} </td>

                                    {/* <td>{item.sub_category.category_name} </td> */}
                                    <td>
                                        <button onClick={() => {
                                            setEdit(true);
                                            setEditdata(item);
                                        }} style={{backgroundColor:'transparent',border:'none',color:'white'}}>{<CiEdit />} </button>
                                    </td>
                                    <td>
                                        <button onClick={()=>del(item._id,item.name)} style={{backgroundColor:'transparent',border:'none',color:'white'}}>
                                        {<MdDelete/>} 
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
                <UpdateProduct show={edit} onHide={()=>setEdit(false)} data={editData}/>
            </div>
        )
    
}

export default ProductList;