// import React, { Component } from 'react';
// import {
//   Button, TextField, Dialog, DialogActions, LinearProgress,
//   DialogTitle, DialogContent, TableBody, Table,
//   TableContainer, TableHead, TableRow, TableCell
// } from '@mui/material';
// import { Pagination } from '@mui/material';
// import swal from 'sweetalert';
// import { withRouter } from './utils';
// const axios = require('axios');

// class Dashboard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       token: '',
//       openProductModal: false,
//       openProductEditModal: false,
//       id: '',
//       name: '',
//       desc: '',
//       price: '',
//       discount: '',
//       file: '',
//       fileName: '',
//       page: 1,
//       search: '',
//       products: [],
//       pages: 0,
//       loading: false
//     };
//   }

//   componentDidMount = () => {
//     let token = localStorage.getItem('token');
//     if (!token) {
//       // this.props.history.push('/login');
//       this.props.navigate("/login");
//     } else {
//       this.setState({ token: token }, () => {
//         this.getProduct();
//       });
//     }
//   }

//   getProduct = () => {
    
//     this.setState({ loading: true });

//     let data = '?';
//     data = `${data}page=${this.state.page}`;
//     if (this.state.search) {
//       data = `${data}&search=${this.state.search}`;
//     }
//     axios.get(`http://localhost:2000/get-product${data}`, {
//       headers: {
//         'token': this.state.token
//       }
//     }).then((res) => {
//       this.setState({ loading: false, products: res.data.products, pages: res.data.pages });
//     }).catch((err) => {
//       swal({
//         text: err.response.data.errorMessage,
//         icon: "error",
//         type: "error"
//       });
//       this.setState({ loading: false, products: [], pages: 0 },()=>{});
//     });
//   }

//   deleteProduct = (id) => {
//     axios.post('http://localhost:2000/delete-product', {
//       id: id
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'token': this.state.token
//       }
//     }).then((res) => {

//       swal({
//         text: res.data.title,
//         icon: "success",
//         type: "success"
//       });

//       this.setState({ page: 1 }, () => {
//         this.pageChange(null, 1);
//       });
//     }).catch((err) => {
//       swal({
//         text: err.response.data.errorMessage,
//         icon: "error",
//         type: "error"
//       });
//     });
//   }

//   pageChange = (e, page) => {
//     this.setState({ page: page }, () => {
//       this.getProduct();
//     });
//   }

//   logOut = () => {
//     localStorage.setItem('token', null);
//     // this.props.history.push('/');
//     this.props.navigate("/");
//   }

  // onChange = (e) => {
  //   if (e.target.files && e.target.files[0] && e.target.files[0].name) {
  //     this.setState({ fileName: e.target.files[0].name }, () => { });
  //   }
  //   this.setState({ [e.target.name]: e.target.value }, () => { });
  //   if (e.target.name == 'search') {
  //     this.setState({ page: 1 }, () => {
  //       this.getProduct();
  //     });
  //   }
  // };

//   addProduct = () => {
//     const fileInput = document.querySelector("#fileInput");
//     const file = new FormData();
//     file.append('file', fileInput.files[0]);
//     file.append('name', this.state.name);
//     file.append('desc', this.state.desc);
//     file.append('discount', this.state.discount);
//     file.append('price', this.state.price);

//     axios.post('http://localhost:2000/add-product', file, {
//       headers: {
//         'content-type': 'multipart/form-data',
//         'token': this.state.token
//       }
//     }).then((res) => {

//       swal({
//         text: res.data.title,
//         icon: "success",
//         type: "success"
//       });

//       this.handleProductClose();
//       this.setState({ name: '', desc: '', discount: '', price: '', file: null, page: 1 }, () => {
//         this.getProduct();
//       });
//     }).catch((err) => {
//       swal({
//         text: err.response.data.errorMessage,
//         icon: "error",
//         type: "error"
//       });
//       this.handleProductClose();
//     });

//   }

//   updateProduct = () => {
//     const fileInput = document.querySelector("#fileInput");
//     const file = new FormData();
//     file.append('id', this.state.id);
//     file.append('file', fileInput.files[0]);
//     file.append('name', this.state.name);
//     file.append('desc', this.state.desc);
//     file.append('discount', this.state.discount);
//     file.append('price', this.state.price);

//     axios.post('http://localhost:2000/update-product', file, {
//       headers: {
//         'content-type': 'multipart/form-data',
//         'token': this.state.token
//       }
//     }).then((res) => {

//       swal({
//         text: res.data.title,
//         icon: "success",
//         type: "success"
//       });

//       this.handleProductEditClose();
//       this.setState({ name: '', desc: '', discount: '', price: '', file: null }, () => {
//         this.getProduct();
//       });
//     }).catch((err) => {
//       swal({
//         text: err.response.data.errorMessage,
//         icon: "error",
//         type: "error"
//       });
//       this.handleProductEditClose();
//     });

//   }

//   handleProductOpen = () => {
//     this.setState({
//       openProductModal: true,
//       id: '',
//       name: '',
//       desc: '',
//       price: '',
//       discount: '',
//       fileName: ''
//     });
//   };

//   handleProductClose = () => {
//     this.setState({ openProductModal: false });
//   };

//   handleProductEditOpen = (data) => {
//     this.setState({
//       openProductEditModal: true,
//       id: data._id,
//       name: data.name,
//       desc: data.desc,
//       price: data.price,
//       discount: data.discount,
//       fileName: data.image
//     });
//   };

//   handleProductEditClose = () => {
//     this.setState({ openProductEditModal: false });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.loading && <LinearProgress size={40} />}
//         <div className="no-printme">
//           <h2>Dashboard</h2>
//           <Button
//             className="button_style"
//             variant="contained"
//             color="primary"
//             size="small"
//             onClick={this.handleProductOpen}
//           >
//             Add Product
//           </Button>
//           <Button
//             className="button_style"
//             variant="contained"
//             size="small"
//             onClick={this.logOut}
//           >
//             Log Out
//           </Button>
//         </div>

//         {/* Edit Product */}
//         <Dialog
//           open={this.state.openProductEditModal}
//           onClose={this.handleProductClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
//           <DialogContent>
//             <TextField
//               id="standard-basic"
//               type="text"
//               autoComplete="off"
//               name="name"
//               value={this.state.name}
//               onChange={this.onChange}
//               placeholder="Product Name"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="text"
//               autoComplete="off"
//               name="desc"
//               value={this.state.desc}
//               onChange={this.onChange}
//               placeholder="Description"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="number"
//               autoComplete="off"
//               name="price"
//               value={this.state.price}
//               onChange={this.onChange}
//               placeholder="Price"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="number"
//               autoComplete="off"
//               name="discount"
//               value={this.state.discount}
//               onChange={this.onChange}
//               placeholder="Discount"
//               required
//             /><br /><br />
//             <Button
//               variant="contained"
//               component="label"
//             > Upload
//             <input
//                 type="file"
//                 accept="image/*"
//                 name="file"
//                 value={this.state.file}
//                 onChange={this.onChange}
//                 id="fileInput"
//                 placeholder="File"
//                 hidden
//               />
//             </Button>&nbsp;
//             {this.state.fileName}
//           </DialogContent>

//           <DialogActions>
//             <Button onClick={this.handleProductEditClose} color="primary">
//               Cancel
//             </Button>
//             <Button
//               disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == ''}
//               onClick={(e) => this.updateProduct()} color="primary" autoFocus>
//               Edit Product
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Add Product */}
//         <Dialog
//           open={this.state.openProductModal}
//           onClose={this.handleProductClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">Add Product</DialogTitle>
//           <DialogContent>
//             <TextField
//               id="standard-basic"
//               type="text"
//               autoComplete="off"
//               name="name"
//               value={this.state.name}
//               onChange={this.onChange}
//               placeholder="Product Name"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="text"
//               autoComplete="off"
//               name="desc"
//               value={this.state.desc}
//               onChange={this.onChange}
//               placeholder="Description"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="number"
//               autoComplete="off"
//               name="price"
//               value={this.state.price}
//               onChange={this.onChange}
//               placeholder="Price"
//               required
//             /><br />
//             <TextField
//               id="standard-basic"
//               type="number"
//               autoComplete="off"
//               name="discount"
//               value={this.state.discount}
//               onChange={this.onChange}
//               placeholder="Discount"
//               required
//             /><br /><br />
//             <Button
//               variant="contained"
//               component="label"
//             > Upload
//             <input
//                 type="file"
//                 accept="image/*"
//                 name="file"
//                 value={this.state.file}
//                 onChange={this.onChange}
//                 id="fileInput"
//                 placeholder="File"
//                 hidden
//                 required
//               />
//             </Button>&nbsp;
//             {this.state.fileName}
//           </DialogContent>

//           <DialogActions>
//             <Button onClick={this.handleProductClose} color="primary">
//               Cancel
//             </Button>
//             <Button
//               disabled={this.state.name === '' || this.state.desc === '' || this.state.discount === '' || this.state.price === '' || this.state.file === null}
//               onClick={(e) => this.addProduct()} color="primary" autoFocus>
//               Add Product
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <br />

//         <TableContainer>
//           <TextField
//             id="standard-basic"
//             className="no-printme"
//             type="search"
//             autoComplete="off"
//             name="search"
//             value={this.state.search}
//             onChange={this.onChange}
//             placeholder="Search by product name"
//             style={{width:'190px'}}
//             required
//           />
//           <Button
//             className="button_style no-printme"
//             variant="outlined"
//             color="primary"
//             size="small"
//             onClick={(e)=>{window.print()}}
//           >
//             Print product details
//           </Button>
//           <Table aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Name</TableCell>
//                 <TableCell align="center">Image</TableCell>
//                 <TableCell align="center">Description</TableCell>
//                 <TableCell align="center">Price</TableCell>
//                 <TableCell align="center">Discount</TableCell>
//                 <TableCell align="center" className="no-printme">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {this.state.products.map((row) => (
//                 <TableRow key={row.name}>
//                   <TableCell align="center" component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="center"><img src={`http://localhost:2000/${row.image}`} width="70" height="70" /></TableCell>
//                   <TableCell align="center">{row.desc}</TableCell>
//                   <TableCell align="center">{row.price}</TableCell>
//                   <TableCell align="center">{row.discount}</TableCell>
//                   <TableCell align="center">
//                     <Button
//                       className="button_style no-printme"
//                       variant="outlined"
//                       color="primary"
//                       size="small"
//                       onClick={(e) => this.handleProductEditOpen(row)}
//                     >
//                       Edit
//                   </Button>
//                     <Button
//                       className="button_style no-printme"
//                       variant="outlined"
//                       color="secondary"
//                       size="small"
//                       onClick={(e) => this.deleteProduct(row._id)}
//                     >
//                       Delete
//                   </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <br />
//           <Pagination className="no-printme" count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
//         </TableContainer>

//       </div>
//     );
//   }
// }

// export default withRouter(Dashboard);




import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell, Pagination,InputAdornment
} from '@mui/material';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom v6
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openProductEditModal, setOpenProductEditModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, [page, search, token]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    } else {
      setToken(token);
      getProduct();
    }
  }, [navigate]);

  const getProduct = () => {
    setLoading(true);
    const data = `?page=${page}${search ? `&search=${search}` : ''}`;
    axios.get(`http://localhost:2000/get-product${data}`, {
      headers: { 'token': token }
    }).then((res) => {
      setLoading(false);
      setProducts(res.data.products);
      setPages(res.data.pages);
    }).catch((err) => {
      swal({ text: err.response.data.errorMessage, icon: "error", type: "error" });
      setLoading(false);
      setProducts([]);
      setPages(0);
    });
  };

  const deleteProduct = (id) => {
    axios.post('http://localhost:2000/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      setPage(1);
      getProduct();
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  };
  
  const pageChange = (e, newPage) => {
    setPage(newPage);
  };
  
  const logOut = () => {
    localStorage.setItem('token', null);
    navigate("/");
  };
  
  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      if (files && files[0]) {
        setFile(files[0]);
        setFileName(files[0].name);
      }
    } else {
      if (name === 'name') {
        setName(value);
      } else if (name === 'desc') {
        setDesc(value);
      } else if (name === 'price') {
        setPrice(value);
      } else if (name === 'discount') {
        setDiscount(value);
      } else if (name === 'search') {
        setSearch(value);
      }
    }
  };
  
  const addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const formData = new FormData();
    // formData.append('file', fileInput.files[0]);
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('discount', discount);
    formData.append('price', price);
  
    axios.post('http://localhost:2000/add-product', formData, {
      headers: {
        'content-type': 'multipart/form-data',

        'token': token
      }
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      handleProductClose();
      setName('');
      setDesc('');
      setDiscount('');
      setPrice('');
      setFile('');
      setFileName('');
      setPage(1);
      getProduct();
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      handleProductClose();
    });
  };
  
  const updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', fileInput.files[0]);
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('discount', discount);
    formData.append('price', price);
  
    axios.post('http://localhost:2000/update-product', formData, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': token
      }
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      handleProductEditClose();
      setName('');
      setDesc('');
      setDiscount('');
      setPrice('');
      setFile('');
      setFileName('');
      getProduct();
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      handleProductEditClose();
    });
  };
  
  const handleProductOpen = () => {
    setOpenProductModal(true);
    setId('');
    setName('');
    setDesc('');
    setPrice('');
    setDiscount('');
    setFileName('');
  };
  
  const handleProductClose = () => {
    setOpenProductModal(false);
  };
  
  const handleProductEditOpen = (data) => {
    setOpenProductEditModal(true);
    setId(data._id);
    setName(data.name);
    setDesc(data.desc);
    setPrice(data.price);
    setDiscount(data.discount);
    setFileName(data.image);
  };
  
  const handleProductEditClose = () => {
    setOpenProductEditModal(false);
  };
  



  // The deleteProduct, pageChange, logOut, onChange, addProduct, updateProduct, handleProductOpen, handleProductClose, handleProductEditOpen, and handleProductEditClose methods need to be converted into functions here.

  // The JSX code for rendering the component goes here
  return (
   
  <div>
    {loading && <LinearProgress size={40} />}
    <div className="no-printme">
      <h2>Dashboard</h2>
      <Button
        className="button_style"
        variant="contained"
        color="primary"
        size="small"
        onClick={handleProductOpen}
      >
        Add Product
      </Button>
      <Button
        className="button_style"
        variant="contained"
        size="small"
        onClick={logOut}
      >
        Log Out
      </Button>
    </div>

    {/* Edit Product Dialog */}
    <Dialog
      open={openProductEditModal}
      onClose={handleProductEditClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
      <DialogContent>
      <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Product Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={desc}
              onChange={onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={price}
              onChange={onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={discount}
              onChange={onChange}
              placeholder="Discount"
              required
            /><br /><br />
            {/* <Button
              variant="contained"
              component="label"
            > Upload
            <input
                type="file"
                accept="image/*"
                name="file"
                value={file}
                onChange={onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {fileName} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProductEditClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={name === '' || desc === '' || discount === '' || price === ''}
          onClick={updateProduct}
          color="primary"
          autoFocus
        >
          Edit Product
        </Button>
      </DialogActions>
    </Dialog>

    {/* Add Product Dialog */}
    <Dialog
      open={openProductModal}
      onClose={handleProductClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Product</DialogTitle>
      <DialogContent>
        {/* Form fields for adding a new product */}
        <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Product Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={desc}
              onChange={onChange}
              placeholder="Description"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={price}
              onChange={onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={discount}
              onChange={onChange}
              placeholder="Discount"
              required
            /><br /><br />
            {/* <Button
              variant="contained"
              component="label"
            > Upload
            <input
                type="file"
                accept="image/*"
                name="file"
                value={file}
                onChange={onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>&nbsp;
            {fileName} */}

            {/* Form fields for adding a new product */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProductClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={name === '' || desc === '' || discount === '' || price === '' }
          onClick={addProduct}
          color="primary"
          autoFocus
        >
          Add Product
        </Button>
      </DialogActions>
    </Dialog>

    {/* Products Table and Search */}
    <TableContainer>
      <TextField
        id="standard-basic"
        className="no-printme"
        type="search"
        autoComplete="off"
        name="search"
        value={search}
        onChange={onChange}
        placeholder="Search by product name"
        style={{ width: '50%' , padding:'20px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className="button_style no-printme"
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => window.print()}
        style={{margin:'25px', padding:'10px' }}
      >
        Print product details
      </Button>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center" className="no-printme">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
                <img src={`http://localhost:2000/${row.image}`} alt={row.name} width="70" height="70" />
              </TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.discount}</TableCell>
              <TableCell align="center">
                <Button
                  className="button_style no-printme"
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleProductEditOpen(row)}
                >
                  Edit
                </Button>
                <Button
                  className="button_style no-printme"
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => deleteProduct(row._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="no-printme"
        count={pages}
        page={page}
        onChange={pageChange}
        color="primary"
      />
    </TableContainer>
  </div>
);


}

export default Dashboard;
