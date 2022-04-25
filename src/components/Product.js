import { useState, useEffect } from 'react'
import { Search, SentimentDissatisfied } from '@mui/icons-material'
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import ProductCard from './ProductCard'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const Product = () => {
  const [products, setProduct] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [checkbox, setCheckbox] = useState({
    tshirts: false,
    shirts: false,
  })
  const { tshirts, shirts } = checkbox

  const [brand, setBrand] = useState({
    roadster: false,
    wrogn: false,
  })
  const { roadster, wrogn } = brand

  const [price, setPrice] = useState({
    oneToTen: false,
    tenToThirty: false,
    thirtyToFifty: false,
    fiftyToThousand: false,
  })
  const { oneToTen, tenToThirty, thirtyToFifty, fiftyToThousand } = price

  const performAPICall = async () => {
    setLoading(true)
    try {
      let url = `https://fakestoreapi.com/products`
      const response = await axios.get(url)
      // console.log(response.data)
      setLoading(false)
      response.data.map((res) => {
        if (res.id % 2 === 0) {
          res.newCategory = 'tshirts'
          res.rate = res.rating.rate
          res.brand = 'roadster'
          return res
        } else {
          res.newCategory = 'shirts'
          res.rate = res.rating.rate
          res.brand = 'wrogn'
          return res
        }
      })
      setProduct(response.data)
      setFilteredProducts(response.data)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    performAPICall(setProduct)
  }, [])

  const handleChange = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
    // console.log({ ...checkbox, [event.target.name]: event.target.checked })
    if (
      event.target.name === 'tshirts' &&
      event.target.checked === true &&
      checkbox.shirts === false
    ) {
      const filteredProduct = products.filter(
        (product) => product.newCategory === 'tshirts'
      )
      console.log('Displaying tshirts')
      setFilteredProducts(filteredProduct)
    } else if (
      event.target.name === 'shirts' &&
      event.target.checked === true &&
      checkbox.tshirts === false
    ) {
      const filteredProduct = products.filter(
        (product) => product.newCategory === 'shirts'
      )
      console.log('Displaying shirts')
      setFilteredProducts(filteredProduct)
    } else if (
      event.target.name === 'shirts' &&
      event.target.checked === false &&
      checkbox.tshirts === true
    ) {
      const filteredProduct = products.filter(
        (product) => product.newCategory === 'tshirts'
      )
      console.log('Displaying tshirts')
      setFilteredProducts(filteredProduct)
    } else if (
      event.target.name === 'tshirts' &&
      event.target.checked === false &&
      checkbox.shirts === true
    ) {
      const filteredProduct = products.filter(
        (product) => product.newCategory === 'shirts'
      )
      console.log('Displaying shirts')
      setFilteredProducts(filteredProduct)
    } else {
      setFilteredProducts(products)
      console.log('Displaying products')
    }
  }

  const handleBrandChange = (event) => {
    setBrand({ ...brand, [event.target.name]: event.target.checked })
    console.log({ ...brand, [event.target.name]: event.target.checked })
    if (event.target.name === 'roadster' && event.target.checked && !wrogn) {
      const filteredProduct = products.filter(
        (product) => product.brand === 'roadster'
      )
      setFilteredProducts(filteredProduct)
      console.log('Roadster brand')
    } else if (
      event.target.name === 'wrogn' &&
      event.target.checked &&
      !roadster
    ) {
      const filteredProduct = products.filter(
        (product) => product.brand === 'wrogn'
      )
      setFilteredProducts(filteredProduct)
      console.log('Wrogn brand')
    } else if (
      event.target.name === 'roadster' &&
      !event.target.checked &&
      wrogn
    ) {
      const filteredProduct = products.filter(
        (product) => product.brand === 'wrogn'
      )
      setFilteredProducts(filteredProduct)
      console.log('Wrogn brand')
    } else if (
      event.target.name === 'wrogn' &&
      !event.target.checked &&
      roadster
    ) {
      const filteredProduct = products.filter(
        (product) => product.brand === 'roadster'
      )
      setFilteredProducts(filteredProduct)
      console.log('Roadster brand')
    } else {
      setFilteredProducts(products)
      console.log('All products of all brand')
    }
  }

  const handlePriceChange = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.checked })
    if (
      event.target.name === 'oneToTen' &&
      event.target.checked &&
      !tenToThirty
    ) {
      const filteredProduct = products.filter((product) => product.price <= 10)
      setFilteredProducts(filteredProduct)
      console.log('Price 1 - 10')
    } else if (
      event.target.name === 'tenToThirty' &&
      event.target.checked &&
      !oneToTen &&
      !thirtyToFifty
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 10 && product.price <= 30
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 10 - 30')
    } else if (
      event.target.name === 'thirtyToFifty' &&
      event.target.checked &&
      !tenToThirty &&
      !fiftyToThousand
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 30 && product.price <= 50
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 30 - 50')
    } else if (
      event.target.name === 'fiftyToThousand' &&
      event.target.checked &&
      !thirtyToFifty
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 50 && product.price <= 1000
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 50 - 1000')
    } else if (
      event.target.name === 'tenToThirty' &&
      event.target.checked &&
      oneToTen
    ) {
      const filteredProduct = products.filter((product) => product.price <= 30)
      setFilteredProducts(filteredProduct)
      console.log('Price less than 30')
    } else if (
      event.target.name === 'thirtyToFifty' &&
      event.target.checked &&
      tenToThirty
    ) {
      const filteredProduct = products.filter((product) => product.price <= 50)
      setFilteredProducts(filteredProduct)
      console.log('Price less than 50')
    } else if (
      event.target.name === 'fiftyToThousand' &&
      event.target.checked &&
      thirtyToFifty
    ) {
      const filteredProduct = products.filter(
        (product) => product.price <= 1000
      )
      setFilteredProducts(filteredProduct)
      console.log('Price less than 1000')
    } else if (
      event.target.name === 'tenToThirty' &&
      !event.target.checked &&
      oneToTen
    ) {
      const filteredProduct = products.filter((product) => product.price <= 10)
      setFilteredProducts(filteredProduct)
      console.log('Price less than 10')
    } else if (
      event.target.name === 'thirtyToFifty' &&
      !event.target.checked &&
      tenToThirty
    ) {
      const filteredProduct = products.filter((product) => product.price <= 30)
      setFilteredProducts(filteredProduct)
      console.log('Price less than 30')
    } else if (
      event.target.name === 'fiftyToThousand' &&
      !event.target.checked &&
      thirtyToFifty
    ) {
      const filteredProduct = products.filter((product) => product.price <= 50)
      setFilteredProducts(filteredProduct)
      console.log('Price less than 50')
    } else if (
      event.target.name === 'oneToTen' &&
      !event.target.checked &&
      tenToThirty
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 10 && product.price <= 30
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 10 - 30')
    } else if (
      event.target.name === 'tenToThirty' &&
      !event.target.checked &&
      thirtyToFifty
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 30 && product.price <= 50
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 30 - 50')
    } else if (
      event.target.name === 'thirtyToFifty' &&
      !event.target.checked &&
      fiftyToThousand
    ) {
      const filteredProduct = products.filter(
        (product) => product.price >= 50 && product.price <= 1000
      )
      setFilteredProducts(filteredProduct)
      console.log('Price 50 - 1000')
    } else {
      setFilteredProducts(products)
      console.log('All products')
    }
  }

  return (
    <div>
      <Grid container columns={12}>
        <Grid item xs={10} sm={3} style={{ marginTop: '2rem' }}>
          <Item sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <Typography style={{ fontWeight: 'bold' }}>Categories</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tshirts}
                    name="tshirts"
                    onChange={handleChange}
                  />
                }
                label="Tshirts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={shirts}
                    name="shirts"
                    onChange={handleChange}
                  />
                }
                label="Shirts"
              />
            </FormGroup>
          </Item>
          <Item sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: 2 }}>
            <Typography style={{ fontWeight: 'bold' }}>Brand</Typography>
            <FormControlLabel
              label="Roadster"
              control={
                <Checkbox
                  checked={roadster}
                  name="roadster"
                  onChange={handleBrandChange}
                />
              }
            />
            <FormControlLabel
              label="WROGN"
              control={
                <Checkbox
                  checked={wrogn}
                  name="wrogn"
                  onChange={handleBrandChange}
                />
              }
            />
          </Item>
          <Item sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: 2 }}>
            <Typography style={{ fontWeight: 'bold' }}>Price</Typography>
            <FormControlLabel
              label="Rs.1 - Rs.10"
              control={
                <Checkbox
                  name="oneToTen"
                  checked={oneToTen}
                  onChange={handlePriceChange}
                />
              }
            />
            <FormControlLabel
              label="Rs.10 - Rs.30"
              control={
                <Checkbox
                  name="tenToThirty"
                  checked={tenToThirty}
                  onChange={handlePriceChange}
                />
              }
            />
            <FormControlLabel
              label="Rs.30 - Rs.50"
              control={
                <Checkbox
                  name="thirtyToFifty"
                  checked={thirtyToFifty}
                  onChange={handlePriceChange}
                />
              }
            />
            <FormControlLabel
              label="Rs.50-Rs.1000"
              control={
                <Checkbox
                  name="fiftyToThousand"
                  checked={fiftyToThousand}
                  onChange={handlePriceChange}
                />
              }
            />
          </Item>
          <Item sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: 2 }}>
            <Typography style={{ fontWeight: 'bold' }}>Color</Typography>
            <FormControlLabel label="Blue" control={<Checkbox />} />
            <FormControlLabel label="Black" control={<Checkbox />} />
            <FormControlLabel label="Navy Blue" control={<Checkbox />} />
          </Item>
          <Item sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: 2 }}>
            <Typography style={{ fontWeight: 'bold' }}>Discount</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="ten"
                control={<Radio />}
                label="10% & above"
              />
              <FormControlLabel
                value="twenty"
                control={<Radio />}
                label="20% & above"
              />
              <FormControlLabel
                value="thirty"
                control={<Radio />}
                label="30% & above"
              />
            </RadioGroup>
          </Item>
        </Grid>
        <Grid item style={{ width: '100%' }} xs={12} sm={9}>
          {/* <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
          </Box> */}

          {isLoading ? (
            <Box className="loading">
              <CircularProgress />
              <h4>Loading Products...</h4>
            </Box>
          ) : (
            <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Grid item xs={6} md={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Box className="loading">
                  <SentimentDissatisfied color="action" />
                  <h4 style={{ color: '#636363' }}>No products found</h4>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </div>
  )
}
export default Product
