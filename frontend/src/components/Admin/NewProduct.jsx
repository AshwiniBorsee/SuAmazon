import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { categories } from '../../utils/constants';

const NewProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState('');
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    title: '',
    description: '',
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [cuttedPrice, setCuttedPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [logo, setLogo] = useState('');
  const [logoPreview, setLogoPreview] = useState('');

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.title.trim() || !specsInput.title.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: '', description: '' });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput('');
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((s, i) => i !== index));
  };

  const handleLogoChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        setLogo(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const newProductSubmitHandler = (e) => {
    e.preventDefault();

    // required field checks
    if (highlights.length <= 0) {
      enqueueSnackbar('Add Highlights', { variant: 'warning' });
      return;
    }
    if (!logo) {
      enqueueSnackbar('Add Brand Logo', { variant: 'warning' });
      return;
    }
    if (specs.length <= 1) {
      enqueueSnackbar('Add Minimum 2 Specifications', { variant: 'warning' });
      return;
    }
    if (images.length <= 0) {
      enqueueSnackbar('Add Product Images', { variant: 'warning' });
      return;
    }

    const formData = new FormData();

    formData.set('name', name);
    formData.set('description', description);
    formData.set('price', price);
    formData.set('cuttedPrice', cuttedPrice);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('warranty', warranty);
    formData.set('brandname', brand);
    formData.set('logo', logo);

    images.forEach((image) => {
      formData.append('images', image);
    });

    highlights.forEach((h) => {
      formData.append('highlights', h);
    });

    specs.forEach((s) => {
      formData.append('specifications', JSON.stringify(s));
    });

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar('Product Created', { variant: 'success' });
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate('/admin/products');
    }
  }, [dispatch, error, success, navigate, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Admin: New Product | Ecommerce" />

      {loading && <BackdropLoader />}
      <form
        onSubmit={newProductSubmitHandler}
        encType="multipart/form-data"
        className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
        id="mainform"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              size="medium"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              multiline
              rows={3}
              required
              variant="outlined"
              size="small"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              size="medium"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cutted Price"
              type="number"
              variant="outlined"
              size="medium"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              fullWidth
              value={cuttedPrice}
              onChange={(e) => setCuttedPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              select
              variant="outlined"
              size="medium"
              required
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((el, i) => (
                <MenuItem value={el} key={i}>
                  {el}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              type="number"
              variant="outlined"
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Warranty"
              type="number"
              variant="outlined"
              size="medium"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              fullWidth
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center border rounded">
                        <TextField
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        type="text"
                        placeholder="Highlight"
                        className="px-2 flex-1 outline-none border-none"
                        />
                        <Button
                        onClick={() => addHighlight()}
                        variant="contained"
                        color="secondary"  // Set to secondary for pink color
                        className="rounded-r"
                        style={{ marginLeft: '8px', backgroundColor: '#ff4081' }}
                        >
                        Add
                        </Button>
                    </div>

              <div className="flex flex-col gap-1.5">
                {highlights.map((h, i) => (
                  <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50" key={i}>
                    <Typography variant="body2" color="textPrimary">
                      {h}
                    </Typography>
                    <IconButton onClick={() => deleteHighlight(i)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="flex justify-between gap-4 items-start">
              <TextField
                label="Brand"
                type="text"
                variant="outlined"
                size="small"
                required
                fullWidth
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                {!logoPreview ? <ImageIcon /> : <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />}
              </div>
              <label className="rounded bg-gray-600 text-center cursor-pointer text-white py-2 px-8 shadow hover:shadow-lg">
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                Choose Logo
              </label>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="flex flex-col gap-2">
              <Typography variant="h6" component="div" className="font-medium">
                Specifications
              </Typography>

              <div className="flex justify-evenly gap-2 items-center">
                <TextField
                  value={specsInput.title}
                  onChange={handleSpecsChange}
                  name="title"
                  label="Name"
                  placeholder="Model No"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  value={specsInput.description}
                  onChange={handleSpecsChange}
                  name="description"
                  label="Description"
                  placeholder="WJDK42DF5"
                  variant="outlined"
                  size="small"
                />
                <Button onClick={() => addSpecs()} variant="contained" color="primary"  style={{ marginLeft: '8px', backgroundColor: '#ff4081' }}>
                  Add
                </Button>
              </div>

              <div className="flex flex-col gap-1.5">
                {specs.map((spec, i) => (
                  <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2" key={i}>
                    <Typography variant="body2" color="textSecondary">
                      {spec.title}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                      {spec.description}
                    </Typography>
                    <IconButton onClick={() => deleteSpec(i)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="flex flex-col gap-2">
              <Typography variant="h5" component="div" className="font-medium">
                Product Images
              </Typography>
              <div className="flex gap-2 overflow-x-auto h-28 border rounded">
                {imagesPreview.map((image, i) => (
                  <img draggable="false" src={image} alt="Product" key={i} className="w-full h-full object-contain" />
                ))}
              </div>
              <label className="rounded font-medium bg-gray-600 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-1">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleProductImageChange}
                  className="hidden"
                />
                Choose Files
              </label>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="w-50"  style={{ marginLeft: '8px', backgroundColor: '#ff4081' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewProduct;
