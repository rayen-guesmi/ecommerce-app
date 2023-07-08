import React, { useEffect, useState } from 'react'
import layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdateName] = useState("")

    //handle form

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/crate-category', {
                name,
            })

            if (data?.success) {
                toast.success(`${data.name} is created`)
                getAllCategory()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong in input form')
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //update category

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdateName("")
                setVisible(false)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error('Somet hing went wrong')
        }
    }
    //delete category

    const handleDelete = async (pId) => {

        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`, { name: updatedName })
            if (data.success) {
                toast.success(`category is deleted`)

            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error('Something went wrong')
        }
    }


    return (
        <layout title={"Dashboard - Create Category"} >
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>

                                                <td>
                                                    <button className=' btn btn-primary ms-2'
                                                        onClick={() => {
                                                            setVisible = (true)
                                                            setUpdateName(c.name)
                                                            setSelected(c)
                                                        }}>
                                                        Edit
                                                    </button>
                                                    <button className=' btn btn-danger ms-2'
                                                        onClick={() => { handleDelete(c._id) }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr >
                                        </>
                                    ))}



                                </tbody>
                            </table>

                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}>
                            <CategoryForm value={updatedName}
                                setValue={setUpdateName}
                                handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </layout >
    )
}

export default CreateCategory