import { AddShoppingCartOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material'
import React from 'react'
import './ProductCard.css'

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia component="img" src={product.image} alt={product.name} />
      <CardContent>
        <Typography>{product.title}</Typography>
        <Typography paddingY="0.5rem" fontWeight="700">
          Rs. {product.price}
        </Typography>
        <Rating
          name="read-only"
          value={product.rate}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button
          className="card-button"
          fullWidth
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
