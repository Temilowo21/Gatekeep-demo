import mongoose from 'mongoose';

// Review Schema
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    }, // ✅ Link review to user
  },
  {
    timestamps: true,
  }
);

// Product Schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }, // User who created the product (admin or brand)

    brandOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }, // ✅ Specific brand that owns the product

    name: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
        required: true,
      },
    ], // ✅ Array of images (good setup)

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    reviews: [reviewSchema], // ✅ Array of reviews

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Export Product Model
const Product = mongoose.model('Product', productSchema);
export default Product;
