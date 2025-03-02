const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: {
    type: Number,
    min: 0,
    validate: {
      validator: function (value) {
        return value === undefined || value === null || value < this.price;
      },
      message: "Discount price must be lower than the original price."
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Other'],
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'discontinued', 'comingSoon', 'seasonal'],
    default: 'active',
    index: true
  },
  stock: { type: Number, default: 1 },
  isAvailable: {
    type: Boolean,
    default: function () {
      return this.stock > 0 && this.status === 'active';
    }
  },

  images: [{
    filename: { type: String, },
    url: {
      type: String,
    },
    public_id: { type: String, required: true }
  }],

  material: { type: String, required: true },
  weight: { type: Number, required: true, min: 0 },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    unit: { type: String, enum: ['mm', 'cm', 'in'], default: 'mm' }
  },

  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now },
  lastRestocked: { type: Date },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", 
      required: false,
    },
  ],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


productSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});


productSchema.pre('save', function (next) {
  this.isAvailable = this.stock > 0 && this.status === 'active';
  next();
});


productSchema.index(
  { name: 'text', description: 'text', material: 'text', tags: 'text' },
  { weights: { name: 10, tags: 5, material: 3, description: 1 } }
);

module.exports = mongoose.model('Product', productSchema);